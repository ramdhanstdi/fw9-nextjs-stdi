import React from 'react'
import Footer from './Footer'
import Header from './Headers'
import NavBoard from './Navboard'
import { Col, Row } from 'react-bootstrap'

const Dashboard = (props) => {
  return (
    <>
      <Header data={props}/>
      <section>
        <Row className='px-2 px-md-5 mx-md-5'>
          <NavBoard/>
          <Col className='col-12 col-md-9'>
            {props.children}
          </Col>
        </Row>
      </section>
      <Footer/>
    </>
  )
}

export default Dashboard