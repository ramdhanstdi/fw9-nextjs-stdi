import React from 'react'
import background from '../public/images/Group 48.png'
import download from '../public/images/Group 50.png'
import corp from '../public/images/Group 51.png'
import icon1 from '../public/images/Group 10.png'
import icon2 from '../public/images/Group 11.png'
import icon3 from '../public/images/Group 12.png'
import kribo from '../public/images/kribo.png'
import{FiArrowLeft,FiArrowRight} from 'react-icons/fi';
import Head from 'next/head'
import Image from 'next/image'
import {useRouter} from 'next/router'
import { Button } from 'react-bootstrap'

export default function Home() {
  const router = useRouter()
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>STD iWallet</title>
      </Head>
      <div>
        <div className="header">
          <p className="title">STD iWallet</p>
          <div className="togle">
            <Button className="login" onClick={()=>{router.push('/auth/Login')}}><span>Login</span></Button>
            <Button className="signUp" onClick={()=>{router.push('/auth/SignUp')}}><span>Sign in</span></Button>
          </div>
        </div>
      </div>
      <div>
        <div className='awesome'>
          <div className='pict'>
            <Image src={background} className='awesome-background' alt='background'/>
          </div>
          <div className='awesome-text'>
            <p className="awesome-title" >Awesome App For Saving <span className="awesome-title-span">Time.</span></p>
            <p className="awesome-desc"> We bring you a mobile app for banking problems that oftenly wasting much of your times.</p>
            <Button className="tryIt" onClick={()=>{router.push('/auth/SignUp')}}><span>Try It Free</span></Button><br/><br/>
            <Image className='Image-download' src={download}alt="download"/>
          </div>
        </div>
      </div>
      <div>
        <div className="Image-corp">
          <Image src={corp} className="Image-display" alt="corp"/>
        </div>
      </div>
      <div>
        <div className="about">
          <p className="about-title"><span className='awesome-title-span'>About</span> the Application.</p>
          <p className="about-desc">We have some great features from the application and its totally free href use by all users around the world.</p>
          <div className="card-wrap">
            <div>
              <Image className='Image-card' src={icon1} alt=""/>
              <p className="card-title">24/7 Support</p>
              <p className="textCard">We have 24/7 contact support so you can contact us whenever you want and we will respond it.</p>
            </div>
            <div className="cardItems">
              <Image className='Image-card' src={icon2} alt=""/>
              <p className="card-title" >Data Privacy</p>
              <p className="textCard">We make sure your data is safe in our database and we will encrypt any data you submitted href us.</p>
            </div>
            <div>
              <Image className='Image-card' src={icon3} alt=""/>
              <p className="card-title" >Easy Download</p>
              <p className="textCard">STD iWallet is 100% totally free href use it&apos;s now available on Google Play Store and App Store. </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="awesome">
          <div className="pict">
            <Image src={background} className='awesome-background' alt='background'/>
          </div>
          <div className='awesome-list'>
            <p className="awesome-title">All The <span className='awesome-title-span'>Great</span> <br/> STD iWallet Features.</p>
            <p className="color-point">1. <span className="point">Small Fee</span></p>
            <p className="desc-list" >We only charge 5% of every success transaction done in Zwallet app</p>
            <p className="color-point">2. <span className="point">Data Secured</span></p>
            <p className="desc-list" >All your data is secured properly in our system and it’s encrypted.</p>    
            <p className="color-point">3. <span className="point">User Friendly</span></p>
            <p className="desc-list" >STD iWallet come up with modern and sleek design and not complicate.</p>
          </div>
        </div>
      </div>
      <div>
        <div className='saying'>
          <p className="awesome-title" >What Users are <span className='awesome-title-span'>Saying.</span></p>
          <p className="saying-desc">We have some great features from the application and it’s totally free href use by all users around the world.</p>
          <div className="saying-nav">
            <h1><FiArrowLeft/></h1>
            <div className="saying-card">
              <Image src={kribo} className="lp-image" alt="Alex"/>
              <p className="saying-title">Alex Hansinburg</p>
              <p className="saying-work">Designer</p>
              <p className="saying-desc">“This is the most outstanding app that I’ve ever try in my live, this app is such an amazing masterpiece and it’s suitable for you who is bussy with their bussiness and must transfer money href another person aut there. Just try this app and see the power!”</p>
            </div>
            <h1><FiArrowRight/></h1>
          </div>
        </div>
      </div>
      <div>
        <div className="footer">
          <p className="footer-title">STD iWallet</p>
          <p className="footer-desc">Simplify financial needs and saving <br/>much time in banking needs with <br/>one single app.</p>
          <hr className="footer-hr" />
          <div className="footer-end">
            <p className='footer-text-end'>2022 Stdiwallet. All right reserved.</p>
            <div className="footer-contact footer-text-end">
              <p className="footer-num">+62 5637 8882 9901</p>
              <p>contact@stdiwallet.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}