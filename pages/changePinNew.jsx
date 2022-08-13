import React from 'react'
import { Footer } from '../component/Footer'
import { Row,Col, Form, Button } from 'react-bootstrap'
import { Formik } from 'formik';
import * as Yup from 'yup'
import Head from 'next/head';
import Dashboard from '../component/Dashboard';
import Router from 'next/router';
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

const pinSchema = Yup.object().shape({
  pin1: Yup.string().min(1).max(1).required(),
  pin2: Yup.string().min(1).max(1).required(),
  pin3: Yup.string().min(1).max(1).required(),
  pin4: Yup.string().min(1).max(1).required(),
  pin5: Yup.string().min(1).max(1).required(),
  pin6: Yup.string().min(1).max(1).required()
})

const AuthPin = ({errors,handleSubmit,handleChange}) => {
  let notify = [errors.pin1,errors.pin2,errors.pin3,errors.pin4,errors.pin5,errors.pin6].join()
  notify===',,,,,'?notify=false:notify=true
  return(
    <>
      <Form onSubmit={handleSubmit}>
        <div className="d-flex-column mx-auto wrap-profile-list">
          <div className="d-flex flex-rows justify-content-around wrapper-pin mw-100 gap-2 pt-0 pt-md-5 mt-5">
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
        </div>
        <span hidden={!notify} className='text-danger text-center'>Input Pin</span>
        <div className="text-center wrap-button my-5">
          <Button className="button-insert" type='submit'>Continue</Button>
        </div>
      </Form>
    </>
  )
}

const ChangePin = (props) => {
  const pinRequest = (val) => {
    const pin = val.pin1+val.pin2+val.pin3+val.pin4+val.pin5+val.pin6
    const regExp = /^\d+$/;
    if(regExp.test(pin)){
      if (pin.length!==6) {
        window.alert('Pin Should Have 6 Digit')
      }else{
        Router.push('/profile')
      }
    }else{
      window.alert('Input Only Number')
    }
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Change Pin</title>
      </Head>
      <Dashboard data={props.data}>
        <Row>
          <Col md={9} className='d-flex flex-column mt-3 w-100'>
            <div className='wrap-right-el d-flex-column px-3 px-md-4 pt-3 pt-md-4'>
              <h1 className="wrap-title mb-3">Change Pin</h1>
              <p className='wrap-text'>Type your new 6 digits security PIN to use in STD iWallet.</p>
              <Formik validationSchema={pinSchema}
                initialValues={{pin1:'',pin2:'',pin3:'',pin4:'',pin5:'',pin6:''}}
                onSubmit={pinRequest}>
                {(props)=><AuthPin{...props}/>}
              </Formik>
            </div>
          </Col>
        </Row>
    </Dashboard>
    </>
  )
}

export default ChangePin