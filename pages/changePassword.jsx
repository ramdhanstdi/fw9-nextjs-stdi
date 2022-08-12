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

const passwordSchema = Yup.object().shape({
  currentpassword:Yup.string().required('Required'),
  password: Yup.string().min(8).required('Required'),
  newpassword: Yup.string().min(8).required('Required')
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
              <Form.Control name="currentpassword" onChange={handleChange} className="auth-form" type="password" placeholder="Enter Your Password" isInvalid={!!errors.currentpassword}/>
              <Form.Control.Feedback type="invalid">{errors.currentpassword}</Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="d-flex mt-5">
            <span className="auth-form"> <FiLock/> </span>
            <div className="d-flex-column w-100">
              <Form.Control name="password" onChange={handleChange} className="auth-form" type="password" placeholder="Enter Your Password" isInvalid={!!errors.password}/>
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="d-flex mt-5">
            <span className="auth-form"> <FiLock/> </span>
            <div className="d-flex-column w-100">
              <Form.Control name="newpassword" onChange={handleChange} className="auth-form" type="password" placeholder="Enter Your Password" isInvalid={!!errors.newpassword}/>
              <Form.Control.Feedback type="invalid">{errors.newpassword}</Form.Control.Feedback>
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

const ChangePassword = () => {
  const dispatch = useDispatch
  const token = useSelector((state=>state.auth.token))
  const changePasswordRequest = (val) => {
    const currentpassword = val.currentpassword
    const password = val.password
    const newpassword = val.newpassword
    if(val.newpassword!==val.password){
      window.alert('New Password Not Match')
    }else{
      dispatch(changePassword({token,currentpassword,password,newpassword}))
      Router.push('/profile')
    }
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Change Password</title>
      </Head>
      <Dashboard>
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