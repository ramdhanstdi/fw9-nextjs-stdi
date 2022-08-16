import { Button, Col, Row } from 'react-bootstrap';
import React from 'react'
import Auth from '../../component/Auth'
import success from '../../public/images/success.png'
import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';

const CreatePinSuccess = () => {
  const logOut =()=>{
    Router.push('/home')
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Pin Created</title>
      </Head>
      <Row className="mw-100 mh-100 mx-0">
        <Auth/>
        <Col md={5} className='p-4 p-md-5'>
          <div className="d-flex-column me-0 me-md-5">
            <div>
              <Image src={success} width={50} height={50} alt="success"/>
            </div>
            <div>
              <h1 className="auth-h1form mt-5">Your PIN Was Successfully Created</h1>
            </div>
            <div>
              <p className="auth-text-form mt-5">Your PIN was successfully created and you can now access all the features in Zwallet. Login to your new account and start exploring!</p>
            </div>
            <div>
              <Button onClick={logOut} className="auth-button w-100" type="submit">Login Now</Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default CreatePinSuccess
