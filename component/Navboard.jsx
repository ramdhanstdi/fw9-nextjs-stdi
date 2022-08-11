import React from 'react';
import {FiGrid, FiPlus, FiUser, FiLogOut,FiArrowUp} from 'react-icons/fi'
import { Col } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux/es/exports'
import { logout } from '../redux/reducer/auth';
import { showProfile } from '../redux/asyncAction/profile';

const NavBoard = () => {
  const token = useSelector((state=>state.auth.token))
  console.log(token);
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const logOut =()=>{
    dispatch(logout(()=>{
      navigate('/login')
    }))
  }
  React.useEffect(() => {
    if(token){
      dispatch(showProfile(token))
    }
    if(!token){
      navigate('/login')
    }
  }, [token]);
  return(
    <>
      <Col className="col-12 col-md-3 d-flex flex-column">
        <div className="d-flex flex-md-column wrap-dashboard mt-3 ps-md-4 py-3 pt-md-4 h-100">
          <div className="flex-fill d-flex justify-content-around justify-content-md-start flex-md-column gap-md-5 ">
            <Link to='/home' className="d-flex align-items-center wrap-nav-dashboard">
              <FiGrid className="navboard-icons"/>
              <p className="ms-2 ms-md-3 my-0 wrap-nav-text">Dasboard</p>
            </Link>
            <Link to='/transfer' className="d-flex align-items-center wrap-nav-dashboard">
              <FiArrowUp className="navboard-icons"/>
              <p className="ms-2 ms-md-3 my-0 wrap-nav-text">Transfer</p>
            </Link>
            <Link to='/topUp' className="d-flex align-items-center wrap-nav-dashboard ">
              <FiPlus className="navboard-icons"/>
              <p className="ms-2 ms-md-3 my-0 wrap-nav-text">Top Up</p>
            </Link>
            <Link to='/profile' className="d-flex align-items-center wrap-nav-dashboard">
              <FiUser className="navboard-icons"/>
              <p className="ms-2 ms-md-3 my-0 wrap-nav-text">Profile</p>
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