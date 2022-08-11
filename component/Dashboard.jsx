import React from 'react'
import { Footer } from './Footer'
import Header from './Headers'
import NavBoard from './Navboard'

export const Dashboard = (props) => {
  return (
    <>
    <Header/>
    <NavBoard/>
    <main>{props.children}</main>
    <Footer/>
    </>
  )
}
