import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FiArrowUp, FiPlus } from 'react-icons/fi'
import graph from '../public/images/graphic.png'
import defaultimg from '../public/images/default.png'
import Link from 'next/link';
import Dashboard from '../component/Dashboard'
import {useDispatch, useSelector } from 'react-redux'
import { showProfile } from '../redux/asyncAction/profile'
import { showHistory } from '../redux/asyncAction/history'
import { showAllProfile } from '../redux/asyncAction/getAllProfile'
import { balance } from '../redux/reducer/profile'
import Head from 'next/head'
import Image from 'next/image'

const DataDynamic = ({name,transaction,amount,receiver,sender,photo,userid}) => {
  const dispatch = useDispatch()
  const urlImage=`/res.cloudinary.com/${photo}`
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
            <p  className="wrap-type">{transaction}</p>
          </div>
        </div>
        {receiver===userid?
          <p className="history-income">+Rp{amount}</p>:
          <p className="history-espense">-Rp{amount}</p>}
      </div>
    </>
  )
}

const Home = () => {
  const profile = useSelector((state=>state.profile?.value))
  const data = profile?Object.values(profile):null
  const dataHistory = useSelector((state=>state.history.value))
  console.log(dataHistory);
  const id = useSelector((state=>state.auth.id))
  const dispatch = useDispatch()
  React.useEffect(()=>{
    dispatch(showProfile(id))
    dispatch(showHistory({id}))
  },[])
  return (
    <Dashboard>
            <Row>
              <Col className='col-12'>
                <div className='wrap-balance mt-3'>
                  <div className='wrap-details d-flex justify-content-between'>
                    <div className="wrap-info">
                      <p>Balance</p>
                      {data?.map((val)=>{
                        if(val.id){
                          dispatch(balance(val.balance))
                          return(
                            <>
                              <h1>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(val.balance))}</h1>
                              <p>{val.noTelp}</p>
                            </>
                          )
                        }
                      })}
                    </div>
                    <div>
                      <Link href='/transfer'>
                        <div  className="d-flex justify-content-around align-items-center wrap-transfer mt-4 mx-3 mx-md-4">
                          <FiArrowUp className="wrap-i d-none d-md-flex navboard-icons"/>
                          <p className="link-balance text-center my-0">Transfer</p>
                        </div>
                      </Link>
                      <Link href='/topUp'>
                        <div  className="d-flex justify-content-around align-items-center wrap-topup mt-4 mx-3 mx-md-4">
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
                      <p className="wrap-grap-balance">Rp2.120.000</p>
                    </div>
                    <div className="wrap-expense mt-3 mt-md-4 mx-3 mx-md-4">
                      <i className="wrap-expense-i" data-feather="arrow-up"></i>
                      <p className="wrap-grap-p">Expense</p>
                      <p className="wrap-grap-balance">Rp1.560.000</p>
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
                  {dataHistory?.data?.map((val,index)=>{
                    return(
                      <>
                        <DataDynamic key={index} receiver={val.receiver_id} name={val.sender_id?val.firstName+' '+val.lastName:val.type} transaction={val.status} amount={val.amount} sender={val.sender_id} photo={val.profile_photo} userid={val.user_id}/>
                      </>
                    )
                  })}
                </div>
              </Col>
            </Row>
    </Dashboard>
  )
}

export default Home