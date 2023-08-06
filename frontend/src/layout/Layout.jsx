import React from 'react'
import Navbar from '../components/Navbar'
import Routers from '../routes/Routers'
import Footer from '../components/Footer'
const Layout = () => {
  return (
    <div>
        <Navbar />
        <Routers />
        <Footer />
    </div>
  )
}

export default Layout