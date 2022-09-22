import React from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { FiArrowUp, FiPlus } from 'react-icons/fi'
import graph from '../public/images/graphic.png'
import defaultimg from '../public/images/default.png'
import Link from 'next/link';
import Dashboard from '../component/Dashboard'
import {useDispatch} from 'react-redux'
import Head from 'next/head'
import Image from 'next/image'
import cookies from 'next-cookies'
import axiosServer from '../helpers/httpServer'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { topUp } from '../redux/asyncAction/transfer';

export async function getServerSideProps(context) {
  try {
    const dataCookie = cookies(context);
    const result = await axiosServer.get(
      `/user/profile/${dataCookie.id}`,
      {
        headers: {
          Authorization: `Bearer ${dataCookie.token}`,
        },
      }
      );
    const dashboard = await axiosServer.get(
      `/dashboard/${dataCookie.id}`,
      {
        headers: {
          Authorization: `Bearer ${dataCookie.token}`,
        },
      }
    );
    const page = !context.query?.page? 1 : context.query.page;
      const history = await axiosServer.get(
        `/transaction/history?page=${page}&limit=4&filter=MONTH`,
        {
          headers: {
            Authorization: `Bearer ${dataCookie.token}`,
          },
        }
        );
      return {
        props: {
          dataHistory:history.data.data,
          dataDasboard: dashboard.data.data,
          data: result.data.data,
        },
      };
  } catch (error) {
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
  topup: Yup.number().min(20000).required('Required'),
})

const FormTopUp = ({errors, handleSubmit, handleChange}) =>{
  return(
    <>
     <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <p className='wrap-text'>Input Your Name and Upload Your Profile</p>
          <div className="d-flex flex-column justify-content-around wrapper-pin mw-100 gap-2 mt-5">
            <div className="d-flex auth-border-pin">
              <Form.Control name='topup' onChange={handleChange} placeholder='Input Amount' isInvalid={!!errors.topup}/>
              <Form.Control.Feedback>{errors.topup}</Form.Control.Feedback>
            </div>
          </div>
          <br/>
        </Modal.Body>
        <Modal.Footer>
          <Button name='button-confirm' className='auth-button' type='submit'>Confirm</Button>
        </Modal.Footer>
      </Form>
    </>
  )
}

const MyModal = (props) => {
  const dispatch = useDispatch()
  const setTopUp = (val) =>{
    dispatch(topUp({amount:val.topup}))
  }
  return(
    <>
      <Modal {...props} aria-labelledby="modal-pin" centered className='mx-auto'>
        <Modal.Header closeButton>
          <Modal.Title id="modal-pin" className='wrap-title'>
                Enter Your Saldo
          </Modal.Title>
        </Modal.Header>
          <Formik onSubmit={setTopUp} initialValues={{topup:''}} validationSchema={amountSchema}>
            {(props)=><FormTopUp{...props}/>}
          </Formik>
      </Modal>    
    </>
  )
}

const DataDynamic = ({name,amount,photo,type,status}) => {
  const dispatch = useDispatch()
  const urlImage=`https://res.cloudinary.com/dd1uwz8eu/image/upload/v1659549135/${photo}`
  return(
    <>
    <Head>
      <title>Home</title>
    </Head>
      <div className="d-flex justify-content-between align-items-center mt-2 mt-md-5">
        <div className="d-flex justify-content-center">
          <Image src={photo?urlImage:defaultimg} width={45} height={45} className="img-home-prof img-fluid" alt="samuel"/>
          <div className="d-flex-column justify-content-center mx-3">
            <p className="wrap-name-transfer">{name}</p>
            <p  className="wrap-type">{status}</p>
          </div>
        </div>
        {type==='send'?
          <p className="history-espense">-Rp{amount}</p>:
          <p className="history-income">+Rp{amount}</p>}
      </div>
    </>
  )
}

const Home = (props) => {
  const [show, setShow] =React.useState(false);
  const data = props.data
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
    <Dashboard data={props.data}>
            <Row>
              <Col className='col-12'>
                <div className='wrap-balance mt-3'>
                  <div className='wrap-details d-flex justify-content-between'>
                    <div className="wrap-info">
                      <p>Balance</p>
                        <h1>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(data?.balance))}</h1>
                        <p>{data?.noTelp}</p>
                    </div>
                    <div>
                      <Link href='/transfer'>
                        <div  className="d-flex justify-content-around align-items-center wrap-transfer mt-4 mx-3 mx-md-4">
                          <FiArrowUp className="wrap-i d-none d-md-flex navboard-icons"/>
                          <p className="link-balance text-center my-0">Transfer</p>
                        </div>
                      </Link>
                      <Link href='#'>
                        <div onClick={()=>setShow(true)} className="d-flex justify-content-around align-items-center wrap-topup mt-4 mx-3 mx-md-4">
                          <FiPlus className="wrap-i d-none d-md-flex navboard-icons"/>
                          <p className="link-balance text-center my-0">TopUp</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={7} className="mt-3">
                <div className="wrap-grap">
                  <div className="d-flex justify-content-between">
                    <div className="wrap-income mt-3 mt-md-4 mx-3 mx-md-4">
                      <i className="wrap-income-i" data-feather="arrow-down"></i>
                      <p className="wrap-grap-p">Income</p>
                      <p className="wrap-grap-balance">+{props.dataDasboard?.totalIncome}</p>
                    </div>
                    <div className="wrap-expense mt-3 mt-md-4 mx-3 mx-md-4">
                      <i className="wrap-expense-i" data-feather="arrow-up"></i>
                      <p className="wrap-grap-p">Expense</p>
                      <p className="wrap-grap-balance">-{props.dataDasboard?.totalExpense}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Image className="img-fluid mw-100" src={graph} alt="graph"/>
                  </div>
                </div>
              </Col>
              <Col md={5} className="mt-3">
                <div className='d-flex-column wrap-history'>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="history-list">Transaction History</p>
                    </div>
                    <div>
                      <Link href="/history" className="see-all">See all</Link>
                    </div>
                  </div>
                  {props.dataHistory?.map((val,index)=>{
                    return(
                      <>
                        <DataDynamic key={index} status={val.status} name={val.fullName} type={val.type} amount={val.amount} photo={val.image}/>
                      </>
                    )
                  })}
                </div>
              </Col>
            </Row>
    </Dashboard>
    <MyModal show={show} onHide={()=>setShow(false)}/>
    </>
  )
}

export default Home