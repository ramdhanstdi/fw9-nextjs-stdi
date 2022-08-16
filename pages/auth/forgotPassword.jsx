import { Button, Col, Form, Row } from 'react-bootstrap';
import { FiMail} from 'react-icons/fi';
import React from 'react'
import Auth from '../../component/Auth'
import { Formik } from 'formik';
import * as Yup from 'yup'
import Head from 'next/head';
import { useDispatch,useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/asyncAction/auth';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address format').required('Required'),
})

const AuthReset = ({errors,handleSubmit,handleChange}) =>{
  let lock = true
  lock = errors.email!==undefined||errors.password!==undefined
  return(
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="d-flex mt-5">
          <span className="auth-form"> <FiMail/> </span>
          <div className="d-flex-column w-100">
            <Form.Control name="email" onChange={handleChange} className="auth-form" type="email" placeholder="Enter Your Email" isInvalid={!!errors.email}/>
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </div>
        </Form.Group>
        <div>
          <Button disabled={lock} className="auth-button w-100 mt-5" type="submit">Confirm</Button>
        </div>
      </Form>
    </>
  )
}

const ResetPassword = () => {
  const dispatch = useDispatch()
  const error = useSelector((state=>state.auth.errormsg))
  
  if(error){
    window.alert(error)
  }

  const resetRequest = (val) => {
    const request = {email:val.email}
    if(val.email===''){
      window.alert('Write Your Email')
    }else{
      dispatch(forgotPassword(request))
    }
  }
  
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
      </Head>
      <Row className="mw-100 mh-100 mx-0">
        <Auth/>
        <Col md={5} className='p-4 p-md-5'>
          <div className="d-flex-column me-0 me-md-5">
            <div>
              <h1 className="auth-h1form mt-2 mt-md-5">Did You Forgot Your Password?Don’t Worry, You Can Reset YourPassword In a Minutes.</h1>
            </div>
            <div>
              <p className="auth-text-form mt-5">To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
            </div>
            <Formik validationSchema={loginSchema} initialValues={{email:''}} onSubmit={resetRequest} >
              {(props)=><AuthReset {...props}/>}
            </Formik>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default ResetPassword