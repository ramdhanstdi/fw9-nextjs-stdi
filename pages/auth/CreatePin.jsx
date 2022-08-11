import { Button, Col, Form, Row } from 'react-bootstrap';
import React from 'react'
import Auth from '../../component/Auth'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { useDispatch,useSelector } from 'react-redux';
import { createpin } from '../../redux/asyncAction/auth';
import Head from 'next/head'
import router from 'next/router';
import Router from 'next/router';

const pinSchema = Yup.object().shape({
  pin1: Yup.string().min(1).max(1).required(),
  pin2: Yup.string().min(1).max(1).required(),
  pin3: Yup.string().min(1).max(1).required(),
  pin4: Yup.string().min(1).max(1).required(),
  pin5: Yup.string().min(1).max(1).required(),
  pin6: Yup.string().min(1).max(1).required()
})

const AuthPin = ({errors,handleSubmit,handleChange}) => {
  return(
    <>
      <Form noValidate onSubmit={handleSubmit} >
        <div className="d-flex flex-rows justify-content-around wrapper-pin mw-100 gap-2 mt-5">
          <div className="d-flex auth-border-pin">
            <Form.Control name='pin1' onChange={handleChange} maxLength="1" min="0" max="9" className="auth-pin" type="text" isInvalid={!!errors.pin}/>
          </div>
          <div className="d-flex auth-border-pin">
            <Form.Control name='pin2' onChange={handleChange} maxLength="1" min="0" max="9" className="auth-pin" type="text"  isInvalid={!!errors.pin2}/>
          </div>
          <div className="d-flex auth-border-pin">
            <Form.Control name='pin3' onChange={handleChange} maxLength="1" min="0" max="9" className="auth-pin" type="text"  isInvalid={!!errors.pin3}/>
          </div>
          <div className="d-flex auth-border-pin">
            <Form.Control name='pin4' onChange={handleChange} maxLength="1" min="0" max="9" className="auth-pin" type="text"  isInvalid={!!errors.pin4}/>
          </div>
          <div className="d-flex auth-border-pin">
            <Form.Control name='pin5' onChange={handleChange} maxLength="1" min="0" max="9" className="auth-pin" type="text"  isInvalid={!!errors.pin5}/>
          </div>
          <div className="d-flex auth-border-pin">
            <Form.Control name='pin6' onChange={handleChange} maxLength="1" min="0" max="9" className="auth-pin" type="text"  isInvalid={!!errors.pin}/>
          </div>
        </div>
        <Form.Control.Feedback type='invalid'>{errors.pin}</Form.Control.Feedback>
        <div>
          <Button className="auth-button w-100 mt-5" type="submit">Confirm</Button>
        </div>
      </Form>
    </>
  )
}

const CreatePin = () => {
  const email = useSelector((state)=>state.auth.email)
  const token = useSelector((state=>state.auth.token))
  const dispatch = useDispatch()
  if(!token){
    Router.push('/auth/Login')
  }
  const pinRequest = (val) => {
    const pin = val.pin1+val.pin2+val.pin3+val.pin4+val.pin5+val.pin6
    const regExp = /^\d+$/;
    const request = {email,pin}
    if(regExp.test(pin)){
      if (pin.length!==6) {
        window.alert('Pin Should Have 6 Digit')
      }else{
        dispatch(createpin(request))
        router.push('/createPinSuccess')
      }
    }else{
      window.alert('Input Only Number')
    }
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Create Pin</title>
      </Head>
      <Row className="mw-100 mh-100 mx-0">
        <Auth/>
        <Col md={5} className='p-4 p-md-5'>
          <div className="d-flex-column me-0 me-md-5">
            <div>
              <h1 className="auth-h1form mt-2 mt-md-5">Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.</h1>
            </div>
            <div>
              <p className="auth-text-form mt-5">Create 6 digits pin to secure all your money and your data in STD iWallet app. Keep it secret and don’t tell anyone about your Zwallet account password and the PIN.</p>
            </div>
            <Formik validationSchema={pinSchema}
              initialValues={{pin1:'',pin2:'',pin3:'',pin4:'',pin5:'',pin6:''}}
              onSubmit={pinRequest}>
              {(props)=><AuthPin{...props}/>}
            </Formik>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default CreatePin