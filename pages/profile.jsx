import React from 'react'
import Link from 'next/link'
import { Row,Col, Modal, Form, Button } from 'react-bootstrap'
import { FiArrowRight, FiEdit2 } from 'react-icons/fi'
import {useDispatch, useSelector } from 'react-redux'
import { editphoto, editprofile, showProfile } from '../redux/asyncAction/profile'
import defaultimg from '../public/images/default.png'
import { Formik } from 'formik'
import Head from 'next/head'
import Dashboard from '../component/Dashboard'
import Image from 'next/image'
import { logout } from '../redux/reducer/auth'
import cookies from 'next-cookies'
import axiosServer from '../helpers/httpServer'
import { resetmsg } from '../redux/reducer/profile'

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
        data: result.data.data,
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

const UploadPhoto = (props) =>{
  const [image,setImage] = React.useState(null)
  const dispatch = useDispatch()
  const id = useSelector((state=>state.auth.id))
  const upload=()=>{
    dispatch(editphoto({id,image}))
  }
  return(
    <>
      <Modal {...props} aria-labelledby="modal-pin" centered className='mx-auto'>
        <Modal.Header closeButton>
          <Modal.Title id="modal-pin" className='wrap-title'>
            Upload File
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='file' onChange={(event) => {setImage(event.target.files[0])}}></input>
          <Button name='upload' onClick={upload} className='auth-button' type='submit'>Upload</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

const FormUpdate=({erros,handleSubmit,handleChange,setFieldValue})=>{
  const [show, setShow] =React.useState(false);
  const profile = useSelector((state=>state.profile?.value))
  const data = profile?Object.values(profile):null
  return(
    <>
      <Form onSubmit={handleSubmit}>
        {data?.map((val)=>{
          if(val.id){
            const urlImage=`https://res.cloudinary.com/dd1uwz8eu/image/upload/v1659549135/${val.image}`
          return(
            <>
              <Modal.Body>
                <div className='d-flex justify-content-between'>
                  <Image src={val.image?urlImage:defaultimg} width={150} height={150} className='img-fluid' alt='profile'/>
                  <Button className='auth-button' onClick={()=>setShow(true)}>Change Profile</Button>
                </div>
                <p className='wrap-text'>Input Your Name and Upload Your Profile</p>
                <div className="d-flex flex-column justify-content-around wrapper-pin mw-100 gap-2 mt-5">
                  <div className="d-flex auth-border-pin">
                    <Form.Control name='first_name' onChange={handleChange} placeholder={val.firstName}/>
                  </div>
                  <div className="d-flex auth-border-pin">
                    <Form.Control name='last_name' onChange={handleChange} placeholder={val.lastName}/>
                  </div>
                </div>
                <br/>
              </Modal.Body>
            </>
          )}
        })}
        <Modal.Footer>
          <Button name='button-confirm' className='auth-button' type='submit'>Confirm</Button>
        </Modal.Footer>
      </Form>
      <UploadPhoto show={show} onHide={()=>setShow(false)}/>
    </>
  )
}

const MyModal = (props) => {
  const profile = useSelector((state=>state.profile?.value))
  const data = profile?Object.values(profile):null
  const id = useSelector((state=>state.auth.id))
  const dispatch = useDispatch()
  const setProfile = (val) =>{
    const firstName = val.first_name
    const lastName = val.last_name
    dispatch(editprofile({id,firstName,lastName}))
  }
  return(
    <>
      <Modal {...props} aria-labelledby="modal-pin" centered className='mx-auto'>
        <Modal.Header closeButton>
          <Modal.Title id="modal-pin" className='wrap-title'>
                Enter Your Data
          </Modal.Title>
        </Modal.Header>
        {data?.map((val)=>{
          const firstname = val.firstName
          const lastname = val.lastName
          if(val.id){
          return(
            <>
              <Formik onSubmit={setProfile} initialValues={{firstName:{firstname},lastName:{lastname}}}>
                {(props)=><FormUpdate{...props}/>}
              </Formik>
            </>
          )}
        })}
      </Modal>    
    </>
  )
}

const Profile = (props) => {
  const profile = useSelector((state=>state.profile?.value))
  const successmsg = useSelector((state=>state.profile?.successmsg))
  const data = profile?Object.values(profile):null
  const id = useSelector((state=>state.auth.id))
  const dispatch = useDispatch()
  const [show, setShow] =React.useState(false);
  const logOut =()=>{
    dispatch(logout(()=>{
      router.push('/auth/login')
    }))
  }
  if(successmsg){
    window.location.reload(false)
  }
  React.useEffect(() => {
    dispatch(resetmsg)
    if(id){
      dispatch(showProfile(id))
    }
    if(!id){
      router.push('/auth/login')
    }
  }, [successmsg,id]);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Profile</title>
      </Head>
        <Dashboard data={props.data}>
        <Row>
          <Col md={9} className='d-flex flex-column mt-3 w-100'>
            <div className='wrap-right-el d-flex-column px-3 px-md-4 pt-3 pt-md-4'>
              <div className="w-100 text-center my-3 my-md-5">
                {data?.map((val)=>{
                  const urlImage=`https://res.cloudinary.com/dd1uwz8eu/image/upload/v1659549135/${val.image}`
                  if(val.id){
                      return(
                        <>
                          <Image src={val.image?urlImage:defaultimg} width={55} height={55} className='img-home-prof img-fluid' alt="profile"/>
                          <div onClick={()=>setShow(true)}>
                            <p className="wrap-text my-2"><FiEdit2 className='me-2 wrap-text'/>Edit</p>    
                            <p className="wrap-name-profile mt-4">{val.firstName+' '+val.lastName}</p>
                            <p className="mx-5 wrap-text">{val.noTelp}</p>
                          </div>
                        </>
                      )
                  }
                })}
              </div>
              <div className="d-flex-column wrap-receiver p-3 my-3 mx-auto wrap-profile-list">
                <Link href='/personalInfo' className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-between ms-3">
                    <p  className="history-name mb-1">Personal Information</p>
                    <FiArrowRight className='navboard-icons'/>
                  </div>
                </Link>
              </div>
              <div className="d-flex-column wrap-receiver p-3 my-3 mx-auto wrap-profile-list ">
                <Link href='/changePassword' className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-between ms-3">
                    <p  className="history-name mb-1">Change Password</p>
                    <FiArrowRight className='navboard-icons'/>
                  </div>
                </Link>
              </div>
              <div className="d-flex-column wrap-receiver p-3 my-3 mx-auto wrap-profile-list">
                <Link href='/changePin' className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-between ms-3">
                    <p  className="history-name mb-1">Change PIN</p>
                    <FiArrowRight className='navboard-icons'/>
                  </div>
                </Link>
              </div>
              <div className="d-flex-column wrap-receiver p-3 my-3 mb-5 mx-auto wrap-profile-list">
                <div onClick={logOut} className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-between ms-3">
                    <p  className="history-name mb-1">Log Out</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          </Row>
        </Dashboard>
      <MyModal show={show} onHide={()=>setShow(false)}/>
    </>
  )
}

export default Profile