import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { FiMail,FiLock } from 'react-icons/fi';
import React from 'react'
import Auth from '../../component/Auth'
import { Link, useLocation, useNavigate } from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address format').required('Required'),
  password: Yup.string().required('Required')
})

const AuthLogin = ({errors,handleSubmit,handleChange}) =>{
  // const dispatch = useDispatch()
  let lock = true
  lock = errors.email!==undefined||errors.password!==undefined
  return(
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="d-flex mt-5">
          <span className="auth-form"> <FiMail/> </span>
          <div className="d-flex-column w-100">
            <Form.Control name="email" onChange={handleChange} className="auth-form" type="email" placeholder="Enter Your Email" isInvalid={!!errors.email}/>
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="d-flex mt-5">
          <span className="auth-form"> <FiLock/> </span>
          <div className="d-flex-column w-100">
            <Form.Control name="password" onChange={handleChange} className="auth-form" type="password" placeholder="Enter Your Password" isInvalid={!!errors.password}/>
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </div>
        </Form.Group>
        
        <div className="text-end mt-2">
          <Link to="/forgotPassword">Forgot password?</Link>
        </div>
        <div>
          <Button disabled={lock} className="auth-button w-100 mt-5" type="submit">Login</Button>
        </div>
      </Form>
    </>
  )
}

const Login = () => {
    // const dispatch = useDispatch()
  // const location = useLocation()
  // const navigate = useNavigate()
  // const token = useSelector((state=>state.auth.token))
  // const error = useSelector((state=>state.auth.errormsg))
  
  // if(error){
  //   window.alert(error)
  // }

  // const loginRequest = (val) => {
  //   const request = {email:val.email,password:val.password}
  //   if(val.email===''&&val.password===''){
  //     window.alert('Write Your Email and Password')
  //   }else{
  //     dispatch(loginemail(val.email))
  //     dispatch(login(request))
  //   }
  // }
  
  // React.useEffect(()=>{
  //   if (token) {
  //     navigate('/home');
  //   }
  // }, [navigate, token]);
  
  return (
    <>
      {/* {location.state?.errormsg&&(
        <Alert className="sticky-top text-center" variant="danger">{location.state.errormsg}</Alert>
      )} */}
      {/* <Head>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Head> */}
      <Row className="mw-100 mh-100 mx-0">
        {/* <Auth/> */}
        <Col md={5} className='p-4 p-md-5'>
          <div className="d-flex-column me-0 me-md-5">
            <div>
              <h1 className="auth-h1form mt-2 mt-md-5">Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h1>
            </div>
            <div>
              <p className="auth-text-form mt-5">Transfering money is eassier than ever, you can access STD iWallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
            </div>
            <Formik validationSchema={loginSchema} initialValues={{email:'',password:''}} >
              {(props)=><AuthLogin {...props}/>}
            </Formik>
            <div className="text-center">
              {/* <p className="mt-5">Don’t have an account? Let’s <Link href="/signUp">Sign Up</Link></p> */}
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Login