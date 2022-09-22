import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FiEdit2 } from 'react-icons/fi'
import { Formik } from 'formik';
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import { costumAmount } from '../redux/reducer/amount'
import {costumNotes} from '../redux/reducer/notes'
import { costumDateTransfer } from '../redux/reducer/transfer'
import Head from 'next/head';
import Dashboard from '../component/Dashboard';
import Router from 'next/router';
import cookies from 'next-cookies'
import axiosServer from '../helpers/httpServer'
import defaultimg from '../public/images/default.png'
import Image from 'next/image';

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

const amountSchema = Yup.object().shape({
  amount: Yup.number().min(1).required('Required'),
})

const AuthAmoount = ({errors, handleSubmit, handleChange, balance})=>{
  const transferName = useSelector((state=>state.transfer))
  const dispatch = useDispatch()
  return(
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group>
        <div className="w-100 wrap-input">
          <Form.Control name='amount' onChange={handleChange} type="number" className="wrap-amount text-center" placeholder='0.00' isInvalid={!!errors.amount}/>
          <Form.Control.Feedback>{errors.amount}</Form.Control.Feedback>
          <p className="wrap-available">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(balance))} Available</p>
        </div>
      </Form.Group>
      <Form.Group className="d-flex w-50 m-auto my-3 my-md-5">
        <span className="auth-form wrap-notes navboard-icons"><FiEdit2/></span>
        <Form.Control type="text" onChange={(e)=>{dispatch(costumNotes(e.target.value))}} className="text-center wrap-notes" placeholder="Add some notes"/>
      </Form.Group>
      <div className="d-md-flex justify-content-end">
        <Button className="btn auth-button w-100 my-5" type="submit">Continue</Button>
      </div>
    </Form>
  )
}

const TransferInput = (props) => {
  const dataName = useSelector((state=>state.transfer.name))
  const dataPhone = useSelector((state=>state.transfer.phone))
  const dataPhoto = useSelector((state=>state.transfer.photo))
  const receiver = useSelector((state=>state.transfer.receiver))
  const data = props.data
  const dataTime = new Date().toISOString()
  const dispatch = useDispatch()
  const transferRequest = (val) => {
    if(val.amount===''){
      window.alert('Input Amount')
    }else{
      dispatch(costumAmount(val.amount))
      dispatch(costumDateTransfer(dataTime))
      Router.push('/pinConfirm')
    }
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Transfer</title>
      </Head>
      <Dashboard data={props.data}>
        <Row>
          <Col md={9} className='d-flex flex-column mt-3 w-100'>
            <div className='wrap-right-el d-flex-column px-3 px-md-4 pt-3 pt-md-4'>
              <h1 className="wrap-title">Transfer money</h1>
              <div className="d-flex-column wrap-receiver p-3 my-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <Image src={!dataPhoto||dataPhoto.includes('null')?defaultimg:dataPhoto} width={45} height={45} className="img-home-prof" alt="samuel"/>
                    <div className="d-flex-column justify-content-center ms-3">
                      <p className="wrap-name-transfer">{dataName}</p>
                      <p  className="wrap-type">{dataPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="wrap-text">Type the amount you want to transfer and then<br/>press continue to the next steps.</p>
              <Formik validationSchema={amountSchema} initialValues={{amount:''}} onSubmit={transferRequest}>
                {(props)=><AuthAmoount{...props} balance={data.balance}/>}
              </Formik>
            </div>
          </Col>
        </Row>
      </Dashboard>
    </>
  )
}

export default TransferInput
