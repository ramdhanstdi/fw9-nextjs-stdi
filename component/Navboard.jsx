import React from 'react';
import {FiGrid, FiPlus, FiUser, FiLogOut,FiArrowUp} from 'react-icons/fi'
import { Col } from 'react-bootstrap';
import Link from 'next/link'
import router from 'next/router'
import {useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/reducer/auth';
import { showProfile } from '../redux/asyncAction/profile';

const NavBoard = () => {
  const token = useSelector((state=>state.auth.token))
  console.log(token);
  const dispatch = useDispatch()
  const logOut =()=>{
    dispatch(logout(()=>{
      router.push('/login')
    }))
  }
  React.useEffect(() => {
    if(token){
      dispatch(showProfile(token))
    }
    if(!token){
      router.push('auth/Login')
    }
  }, [token]);
  return(
    <>
      <Col className="col-12 col-md-3 d-flex flex-column">
        <div className="d-flex flex-md-column wrap-dashboard mt-3 ps-md-4 py-3 pt-md-4 h-100">
          <div className="flex-fill d-flex justify-content-around justify-content-md-start flex-md-column gap-md-5 ">
            <Link href='/home' className="d-flex align-items-center wrap-nav-dashboard">
              <div>
                <FiGrid className="navboard-icons"/>
                <p className="ms-2 ms-md-3 my-0 wrap-nav-text">Dasboard</p>
              </div>
            </Link>
            <Link href='/transfer' className="d-flex align-items-center wrap-nav-dashboard">
              <div>
                <FiArrowUp className="navboard-icons"/>
                <p className="ms-2 ms-md-3 my-0 wrap-nav-text">Transfer</p>
              </div>
            </Link>
            <Link href='/topUp' className="d-flex align-items-center wrap-nav-dashboard ">
              <div>
                <FiPlus className="navboard-icons"/>
                <p className="ms-2 ms-md-3 my-0 wrap-nav-text">Top Up</p>
              </div>
            </Link>
            <Link href='/profile' className="d-flex align-items-center wrap-nav-dashboard">
              <div>
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
    </>
  )
}

export default NavBoard