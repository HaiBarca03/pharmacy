import React from 'react'
import Header from '../Header/Header'
import AppFooter from '../Footer/Footer'

const Default = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <AppFooter />
    </div>
  )
}

export default Default
