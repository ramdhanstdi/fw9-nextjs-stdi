import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import Head from 'next/head'
import Dashboard from '../component/Dashboard'
import cookies from 'next-cookies'
import axiosServer from '../helpers/httpServer'
import defaultimg from '../public/images/default.png'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { decrement, increment } from '../redux/reducer/counter'

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
      const page = !context.query?.page? 1 : context.query.page;
      const history = await axiosServer.get(
        `/transaction/history?page=${page}&limit=5&filter=MONTH`,
        {
          headers: {
            Authorization: `Bearer ${dataCookie.token}`,
          },
        }
        );
      return {
        props: {
          dataHistory:history.data.data,
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

const DataDynamic =({name,type,amount,photo,status})=>{
    const urlImage=`https://res.cloudinary.com/dd1uwz8eu/image/upload/v1659549135/${photo}`
    return (
        <>
          <div className="d-flex-column wrap-receiver p-3 my-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <Image width={45} height={45} src={photo?urlImage:defaultimg} className="img-home-prof rounded" alt="samuel"/>
                <div className="d-flex-column justify-content-center ms-3">
                  <p className="wrap-name-transfer">{name}</p>
                  <p  className="wrap-type">{status}</p>
                </div>
              </div>
              {type==='send'?
                <p className="history-espense">-Rp{amount}</p>:
                <p className="history-income">+Rp{amount}</p>}
            </div>
          </div>
        </>
    )
}

const History = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  console.log(props.dataHistory);
  const pages = useSelector((state=>state.counter.num))
  console.log(pages);
  const nextPage = () =>{
    dispatch(increment())
  }
  const prevPage = () =>{
    dispatch(decrement())
  }
  React.useEffect(()=>{
    router.push(`/history?page=${pages}&limit=5&filter=MONTH`)
  },[pages])
  return (
    <>
        <Head>
        <meta charSet="utf-8" />
        <title>History</title>
        </Head>
        <Dashboard data={props.data}>
            <Row>
            <Col md={9} className='d-flex flex-column mt-3'>
            <div className='wrap-right-el d-flex-column px-3 px-md-4 pt-3 pt-md-4'>
                <h1 className="wrap-title">Transaction History</h1>
                <p className="wrap-text mt-2 mt-md-3 mb-3 mb-md-5"></p>
                {props.dataHistory?.map((val,index)=>{
                return(
                    <DataDynamic key={index} name={val.fullName} type={val.type} status={val.status} amount={val.amount} photo={val.image}/>
                )
                })}
                <div className='d-flex justify-content-around m-3'>
                <Button className='auth-button m-0' onClick={prevPage}><FiArrowLeft/></Button>
                <Button className='auth-button m-0' onClick={nextPage}><FiArrowRight/></Button>
                </div>
            </div>
            </Col>
            </Row>
        </Dashboard>
    </>
  )
}

export default History