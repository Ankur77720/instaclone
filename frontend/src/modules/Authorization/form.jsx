import React, { useState } from 'react'
import Input from '../../components/input/input'

const Form = () => {
  const [isLogged, setLoggedIn] = useState(true)
  return (
    <>
      {isLogged ? (
        <>
          <h1 className='m-0' >Welcome back</h1> <p className="m-0">Login to your account</p>
        </>
      ) : (
        <>
          <h1 className='m-0'>Welcome</h1>
          <p className='m-0' >register new account</p>
        </>
      )}
      <div className="sides">
        {!isLogged && (
          <Input
            type="text"
            name="username"
            id="input0"
            placeholder="Example @username"
            label="Enter your username"
          />
        )}
        <Input
          type="email"
          name="email"
          id="input1"
          placeholder="Example example@exp.com"
          label="Enter your Email address"
        />
        <Input
          type="password"
          name="password"
          id="input2"
          placeholder="Password"
          label="Enter your password"
        />
        <Input type="submit" id="input2" value="Log In" />
        <span className="d-flex  justify-content-center align-items-center ">
          {isLogged ? `Don't have account ?` : `alrady have an account ?`}
          <span
            onClick={() => setLoggedIn(!isLogged)}
            className="btn btn-link p-0 text-dark"
          >
            {' '}
            {isLogged ? `Create one here` : `login here`}
          </span>
        </span>
      </div>
    </>
  )
}

export default Form
