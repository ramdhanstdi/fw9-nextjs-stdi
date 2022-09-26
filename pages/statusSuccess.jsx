import React from 'react'
import { Alert, Button, Col, Row } from 'react-bootstrap'
import success from '../public/images/success.png'
import { FiDownload, FiShare2 } from 'react-icons/fi'
import {useSelector, useDispatch} from 'react-redux'
import { resetAmount } from '../redux/reducer/amount'
import { resetNotes } from '../redux/reducer/notes'
import Head from 'next/head'
import Dashboard from '../component/Dashboard'
import Link from 'next/link'
import cookies from 'next-cookies'
import axiosServer from '../helpers/httpServer'
import defaultimg from '../public/images/default.png'
import Image from 'next/image'
import { resetMsg } from '../redux/reducer/transfer'

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

const StatusSuccess = (props) => {
  const dispatch = useDispatch()
  const balance = props.data.balance;
  const dataName = useSelector((state=>state.transfer.name))
  const dataPhone = useSelector((state=>state.transfer.phone))
  const dataPhoto = useSelector((state=>state.transfer.photo))
  const dataDate = useSelector((state=>state.transfer.date))
  const amount = useSelector((state=>state.amount.value))
  const notes = useSelector((state=>state.notes.value))
  const successmsg = useSelector((state=>state.transfer.successmsg))

  if(successmsg){
    dispatch(resetMsg())
  }
  const balanceleft = balance-amount
  console.log(balance,amount);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Success</title>
      </Head>
      <Dashboard data={props.data}>
      <Row>
          <Col md={9} className='d-flex flex-column mt-3 w-100'>
            <div className='wrap-right-el d-flex-column px-3 px-md-4 pt-3 pt-md-4'>
              <div className='w-100 text-center my-5'>
                <Image src={success} width={50} height={50} alt='success'/>
                <p className="wrap-status-transfer my-5">Transfer Success</p>
              </div>
              <div className="d-flex-column wrap-receiver p-3 my-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <div className="d-flex-column justify-content-center ms-3">
                      <p  className="wrap-type-confirm mb-1">Amount</p>
                      <p className="wrap-name-confirm">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(amount))}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex-column wrap-receiver p-3 my-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <div className="d-flex-column justify-content-center ms-3">
                      <p  className="wrap-type-confirm mb-1">Balance Left</p>
                      <p className="wrap-name-confirm">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(balanceleft))}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex-column wrap-receiver p-3 my-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <div className="d-flex-column justify-content-center ms-3">
                      <p  className="wrap-type-confirm mb-1">Date & Time</p>
                      <p className="wrap-name-confirm">{dataDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex-column wrap-receiver p-3 my-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <div className="d-flex-column justify-content-center ms-3">
                      <p  className="wrap-type-confirm mb-1">Notes</p>
                      <p className="wrap-name-confirm">{notes}</p>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="wrap-title">Transfer to</h1>
              <div className="d-flex-column wrap-receiver p-3 my-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <Image width={45} height={45} src={!dataPhoto||dataPhoto.includes('null')?defaultimg:dataPhoto} className="img-home-prof" alt="samuel"/>
                    <div className="d-flex-column justify-content-center ms-3">
                      <p className="wrap-name-transfer">{dataName}</p>
                      <p  className="wrap-type">{dataPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-md-flex justify-content-end">
                <Link href='#'>
                  <Button className="button-share my-2 my-md-5 me-3" type="submit"><FiShare2 className='navboard-icons me-3'/></Button>
                </Link>
                <Link href='#'>
                  <Button className="button-download my-2 my-md-5 me-3" type="submit"><FiDownload className='navboard-icons me-3'/>Download</Button>
                </Link>
                <Link href='/home'>
                  <Button className="auth-button my-2 my-md-5" onClick={[()=>dispatch(resetAmount),()=>dispatch(resetNotes),dispatch(resetMsg)]} type="submit">Continue</Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        </Dashboard>
    </>
  )
}

export default StatusSuccess