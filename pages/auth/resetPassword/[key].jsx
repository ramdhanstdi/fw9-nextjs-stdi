import { Button, Col, Form, Row } from 'react-bootstrap';
import { FiLock} from 'react-icons/fi';
import React from 'react'
import Auth from '../../../component/Auth';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { useDispatch,useSelector } from 'react-redux';
import Head from 'next/head';
import {useRouter} from 'next/router';
import { resetPassword } from '../../../redux/asyncAction/auth';

const passwordSchema = Yup.object().shape({
  newPassword: Yup.string().min(3).required('Required'),
  confirmPassword: Yup.string().min(3).required('Required')
})

const AuthPassword = ({errors,handleChange,handleSubmit}) =>{
  let lock = true
  lock = errors.newPassword!==undefined&&errors.confirmPassword!==undefined
  return(
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="d-flex mt-5">
          <span className="auth-form"> <FiLock/> </span>
          <div className="d-flex-column w-100">
            <Form.Control name="newPassword" onChange={handleChange} className="auth-form" type="password" placeholder="Enter Your Password" isInvalid={!!errors.newPassword}/>
            <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="d-flex mt-5">
          <span className="auth-form"> <FiLock/> </span>
          <div className="d-flex-column w-100">
            <Form.Control name="confirmPassword" onChange={handleChange} className="auth-form" type="password" placeholder="Enter Your Password" isInvalid={!!errors.confirmPassword}/>
            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
          </div>
        </Form.Group>
        <div>
          <Button disabled={lock} className="btn-primary auth-button w-100 mt-5" type="submit">Reset Password</Button>
        </div>
      </Form>
    </>
  )
}

const FormInput = () => {
  const route = useRouter()
  const {key} = route.query
  const dispatch = useDispatch()
  const passswordReset = (val) => {
    if(val.newPassword!==val.confirmPassword){
      window.alert('Password Not Match')
    }else{
      dispatch(resetPassword({keysChangePassword:key,newPassword:val.newPassword,confirmPassword:val.confirmPassword}))
      route.push('/auth/Login')
    }
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Forgot Passsword</title>
      </Head>
      <Row className="mw-100 mh-100 mx-0">
        <Auth/>
        <Col md={5} className='p-4 p-md-5'>
          <div className="d-flex-column me-0 me-md-5">
            <div>
              <h1 className="auth-h1form mt-2 mt-md-5">Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.</h1>
            </div>
            <div>
              <p className="auth-text-form mt-5">Now you can create a new password for your STD iWallet account. Type your password twice so we can confirm your new passsword.</p>
            </div>
            <Formik validationSchema={passwordSchema} initialValues={{newPassword:'',confirmPassword:''}} onSubmit={passswordReset}>
              {(props)=><AuthPassword {...props}/>}
            </Formik>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default FormInput
