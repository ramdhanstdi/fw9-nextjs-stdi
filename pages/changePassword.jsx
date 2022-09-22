import React from 'react'
import { Row,Col, Form, Button } from 'react-bootstrap'
import { FiLock } from 'react-icons/fi'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { useDispatch,useSelector } from 'react-redux'
import { changePassword } from '../redux/asyncAction/changePassword'
import Dashboard from '../component/Dashboard'
import Head from 'next/head';
import Router from 'next/router';
import cookies from 'next-cookies'
import axiosServer from '../helpers/httpServer'

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

const passwordSchema = Yup.object().shape({
  oldPassword:Yup.string().required('Required'),
  newPassword: Yup.string().min(3).required('Required'),
  confirmPassword: Yup.string().min(3).required('Required')
})

const AuthPassword = ({errors,handleChange,handleSubmit}) =>{
  let lock=true
  lock = errors.currentpassword!==undefined&&errors.password!==undefined
  return(
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <div className="d-flex-column mx-auto wrap-profile-list">
          <Form.Group className="d-flex mt-5">
            <span className="auth-form"> <FiLock/> </span>
            <div className="d-flex-column w-100">
              <Form.Control name="oldPassword" onChange={handleChange} className="auth-form" type="password" placeholder="Enter Your oldPassword" isInvalid={!!errors.oldPassword}/>
              <Form.Control.Feedback type="invalid">{errors.oldPassword}</Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="d-flex mt-5">
            <span className="auth-form"> <FiLock/> </span>
            <div className="d-flex-column w-100">
              <Form.Control name="newPassword" onChange={handleChange} className="auth-form" type="password" placeholder="Enter Your newPassword" isInvalid={!!errors.newPassword}/>
              <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="d-flex mt-5">
            <span className="auth-form"> <FiLock/> </span>
            <div className="d-flex-column w-100">
              <Form.Control name="confirmPassword" onChange={handleChange} className="auth-form" type="password" placeholder="Enter Your newPassword" isInvalid={!!errors.confirmPassword}/>
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </div>
          </Form.Group>
        </div>
        <div className="text-center wrap-button my-5">
          <Button disabled={lock} type='submit' className="button-insert">Change Password</Button>
        </div>
      </Form>
    </>
  )
}

const ChangePassword = (props) => {
  const dispatch = useDispatch()
  const id = useSelector((state=>state.auth.id))
  const changePasswordRequest = (val) => {
    const oldPassword = val.oldPassword
    const newPassword = val.newPassword
    const confirmPassword = val.confirmPassword
    if(val.newPassword!==val.confirmPassword){
      window.alert('Confirm Password Not Match')
    }else{
      dispatch(changePassword({id,oldPassword,newPassword,confirmPassword}))
    }
  }
  React.useEffect(()=>{

  },[])
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Change Password</title>
      </Head>
      <Dashboard data={props.data}>
        <Row>
          <Col md={9} className='d-flex flex-column mt-3 w-100'>
            <div className='wrap-right-el d-flex-column px-3 px-md-4 pt-3 pt-md-4'>
              <h1 className="wrap-title mb-3">Change Password</h1>
              <p className='wrap-text'>You must enter your current password and then type your new password twice.</p>
              <Formik validationSchema={passwordSchema} initialValues={{currentpassword:'',password:'',newpassword:''}} onSubmit={changePasswordRequest}>
                {(props)=><AuthPassword{...props}/>}
              </Formik>
            </div>
          </Col>
        </Row>
    </Dashboard>
    </>
  )
}

export default ChangePassword