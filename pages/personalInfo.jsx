import React from 'react'
import Link from 'next/link'
import { Row,Col } from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import { showProfile } from '../redux/asyncAction/profile'
import Head from 'next/head'
import Dashboard from '../component/Dashboard'
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

const PersonalInfo = (props) => {
  const data = Object.values(props.data)
  const id = useSelector((state=>state.auth.id))
  const dispatch = useDispatch()
  React.useEffect(()=>{
    dispatch(showProfile(id))
  },[])
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Personal Info</title>
      </Head>
      <Dashboard data={props.data}>
          <Col md={9} className='d-flex flex-column mt-3 w-100'>
            {data?.map((val)=>{
              const firstname = val.firstName?.split(' ').map(str =>str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(' ')
              const lastname = val.lastName?.split(' ').map(str =>str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(' ')
              const phone = val.noTelp?.split('')
              const email = val.email
              if(val.id){
                  return(
                    <>
                      <div className='wrap-right-el d-flex-column px-3 px-md-4 pt-3 pt-md-4'>
                        <h1 className="wrap-title mb-3">Personal Info</h1>
                        <p className='wrap-text'>We got your personal information from the sign<br/>up proccess. If you want to make changes<br/>on your information, contact our support.</p>
                        <div className="d-flex-column wrap-receiver p-3 my-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex">
                              <div className="d-flex-column justify-content-center ms-1">
                                <p  className="wrap-text mb-2">First Name</p>
                                <p className="wrap-name-confirm">{firstname}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex-column wrap-receiver p-3 my-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex">
                              <div className="d-flex-column justify-content-center ms-1">
                                <p  className="wrap-text mb-2">Last Name</p>
                                <p className="wrap-name-confirm">{lastname}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex-column wrap-receiver p-3 my-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex">
                              <div className="d-flex-column justify-content-center ms-1">
                                <p  className="wrap-text mb-2">Verified E-mail</p>
                                <p className="wrap-name-confirm">{email}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex-column wrap-receiver p-3 my-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex">
                              <div className="d-flex-column justify-content-center ms-1">
                                <p  className="wrap-text mb-2">Phone Number</p>
                                <p className="wrap-name-confirm">{phone}</p>
                              </div>
                            </div>
                            <Link className="wrap-text" href="/manageNumber">
                              <p className="p-3">Manage</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  )
              }
            })}
          </Col>
      </Dashboard>
    </>
  )
}

export default PersonalInfo