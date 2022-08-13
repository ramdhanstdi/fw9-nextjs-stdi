import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import defaultimg from '../public/images/default.png'
import {useDispatch, useSelector } from 'react-redux'
import { showAllProfile } from '../redux/asyncAction/getAllProfile'
import { FiArrowLeft, FiArrowRight, FiSearch } from 'react-icons/fi'
import { costumNameTransfer, costumPhoneTransfer, costumPhotoTransfer, costumReceiver } from '../redux/reducer/transfer'
import { Formik } from 'formik'
import { decrement, increment, searchNum } from '../redux/reducer/counter'
import Dashboard from '../component/Dashboard'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import axiosServer from '../helpers/httpServer'
import cookies from 'next-cookies'

export async function getServerSideProps(context) {
  try {
    const dataCookie = cookies(context);
    const result = await axiosServer.get(
      `user/profile/${dataCookie.id}`,
      {
        headers: {
          Authorization: `Bearer ${dataCookie.token}`,
        },
      }
    );
    return {
      props: {
        data: result.data,
      },
    };
  } catch (error) {
    console.log(error);
    if (error.response.status === 403) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          isError: true,
          msg: error.response,
        },
      };
    }
  }
}

const SearchProfile = ({errors,handleChange,handleSubmit}) =>{
  const dispatch = useDispatch()
  const pages = useSelector((state=>state.counter.num))
  const search = useSelector((state=>state.counter.search))
  React.useEffect(()=>{
    dispatch(showAllProfile({pages,search}))
  },[pages,search])
  return(
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="d-flex mt-4">
          <span className="wrap-search rounded-start"> <FiSearch className='ms-2'/> </span>
          <Form.Control className="wrap-search-input" onChange={(e)=>dispatch(searchNum(e.target.value))} name='search' type="text" placeholder="Search Receiver"/>
        </Form.Group>
      </Form>
    </>
  )
}

const DataDynamic = ({id,name,num_phone,photo}) => {
  const urlImage=`https://res.cloudinary.com/dd1uwz8eu/image/upload/v1659549135/${photo}`
  const dispatch = useDispatch()
  const passingData = () => {
    dispatch(costumNameTransfer(name))
    dispatch(costumPhoneTransfer(num_phone))
    dispatch(costumPhotoTransfer(urlImage))
    dispatch(costumReceiver(id))
    Router.push('/transferInput')
  }
  return(
    <>
      <div key={id} className="d-flex-column wrap-receiver p-3 my-3">
        <div onClick={passingData} className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <Image src={photo?urlImage:defaultimg} width={50} height={50} className="img-home-prof" alt="momotaro"/>
            <div className="d-flex-column justify-content-center ms-3">
              <p className="wrap-name-transfer">{name}</p>
              <p  className="wrap-type">{num_phone}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Transfer = (props) => {
  const dataProfile = useSelector((state=>state.getAllProfile.value))
  const dispatch = useDispatch()
  const pages = useSelector((state=>state.counter.num))
  const submitSearch = (val) =>{
    const search = val.search
    if(search){
      dispatch(showAllProfile({pages,search}))
    }
  }
  React.useEffect(()=>{
    dispatch(showAllProfile({pages}))
  },[pages])
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Transfer</title>
      </Head>
      <Dashboard data={props.data}>
        <Row>
          <Col md={9} className='d-flex flex-column mt-3 w-100'>
            <div className='wrap-right-el d-flex-column px-3 px-md-4 pt-3 pt-md-4'>
              <h1 className="wrap-title">Search Receiver</h1>
              <Formik onSubmit={submitSearch} initialValues={{search:''}}>
                {(props)=><SearchProfile{...props}/>}
              </Formik>
              {dataProfile?.map((val)=>{
                return(
                  <>
                    <React.Fragment >
                      <DataDynamic id={val.id} photo={val.image} name={val.firstName+' '+val.lastName} num_phone={val.noTelp}/>
                    </React.Fragment>
                  </>
                )
              })}
              <div className='d-flex justify-content-around m-3'>
                <Button className='auth-button m-0' onClick={()=>dispatch(decrement())}><FiArrowLeft/></Button>
                <Button className='auth-button m-0' onClick={()=>dispatch(increment())}><FiArrowRight/></Button>
              </div>
            </div>
          </Col>
        </Row>
      </Dashboard>
    </>
  )
}

export default Transfer