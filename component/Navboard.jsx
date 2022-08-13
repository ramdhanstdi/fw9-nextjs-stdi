import React from 'react';
import {FiGrid, FiPlus, FiUser, FiLogOut,FiArrowUp} from 'react-icons/fi'
import { Col,Modal,Button,Form } from 'react-bootstrap';
import Link from 'next/link'
import router from 'next/router'
import {useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/reducer/auth';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { topUp } from '../redux/asyncAction/transfer';

const amountSchema = Yup.object().shape({
  topup: Yup.number().min(20000).required('Required'),
})

const FormTopUp = ({errors, handleSubmit, handleChange}) =>{
  console.log(errors);
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

const NavBoard = () => {
  const [show, setShow] =React.useState(false);
  const id = useSelector((state=>state.auth.token))
  const dispatch = useDispatch()
  const logOut =()=>{
    dispatch(logout(()=>{
      router.push('/auth/login')
    }))
  }
  React.useEffect(() => {
    if(!id){
      router.push('/auth/Login')
    }
  }, [id]);
  return(
    <>
      <Col className="col-12 col-md-3 d-flex flex-column">
        <div className="d-flex flex-md-column wrap-dashboard mt-3 ps-md-4 py-3 pt-md-4 h-100">
          <div className="flex-fill d-flex justify-content-around justify-content-md-start flex-md-column gap-md-5 ">
            <Link href='/home'>
              <div className="d-flex align-items-center wrap-nav-dashboard">
                <FiGrid className="navboard-icons"/>
                <p className="ms-2 ms-md-3 my-0 wrap-nav-text">Dasboard</p>
              </div>
            </Link>
            <Link href='/transfer'>
              <div className="d-flex align-items-center wrap-nav-dashboard">
                <FiArrowUp className="navboard-icons"/>
                <p className="ms-2 ms-md-3 my-0 wrap-nav-text">Transfer</p>
              </div>
            </Link>
            <Link href='' >
              <div onClick={()=>setShow(true)} className="d-flex align-items-center wrap-nav-dashboard ">
                <FiPlus className="navboard-icons"/>
                <p className="ms-2 ms-md-3 my-0 wrap-nav-text">Top Up</p>
              </div>
            </Link>
            <Link href='/profile'>
              <div className="d-flex align-items-center wrap-nav-dashboard">
                <FiUser className="navboard-icons"/>
                <p className="ms-2 ms-md-3 my-0 wrap-nav-text">Profile</p>
              </div>
            </Link>
          </div>
          <div className="d-flex flex-column gap-5">
            <div onClick={logOut} className="d-flex wrap-log-out wrap-nav-dashboard align-items-center pe-4 pe-md-0 py-md-3 my-2">
              <FiLogOut className="navboard-icons"/>
              <p className="ms-2 ms-md-3 my-0 wrap-nav-text">Log out</p>
            </div>
          </div>
        </div>
      </Col>
      <MyModal show={show} onHide={()=>setShow(false)}/>
    </>
  )
}

export default NavBoard