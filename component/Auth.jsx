import { Col} from 'react-bootstrap';
import React from 'react'
import Link from 'next/link';
import phone from '../public/images/image.png'
import { useSelector } from 'react-redux';
import Image from 'next/image';
import router from 'next/router';

const Auth = () => {
  return (
    <>
      <Col md={7} className='auth-bg d-flex-column justify-content-center mw-100 gap-5 p-4 p-md-5'>
        <div className="ms-0 ms-md-5 mb-5 mb-md-0">
          <Link href='/auth/Login'>
            <span className="auth-title">STD iWallet</span>
          </Link>
        </div>
        <div className="ms-0 ms-md-5 ">
          <Image src={phone} className={"img-fluid"} alt="display"/>
        </div>
        <div className="ms-0 ms-md-5">
          <h3 className="auth-h3">App that Covering Banking Needs.</h3>
        </div>
        <div className="ms-0 ms-md-5">
          <p className="auth-p">STD iWallet is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in STD iWallet everyday with worldwide users coverage.</p>
        </div>
      </Col>
    </>
  )
}

export default Auth