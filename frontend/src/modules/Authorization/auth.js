import './form.css'
import React from 'react'
import Form from './form'

const Auth = () => {
  return (
    <>
      <div
        id="main"
        className="d-flex justify-content-center align-items-center"
      >
        <Form />
        <div
          className="h-100 sideImage"
          style={{
            objectFit: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
    </>
  )
}

export default Auth
