import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/input/input'
import axios from 'axios'

const Form = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Error, setError] = useState('')
  const navigate = useNavigate()
  const isLogged = window.location.pathname.includes('SignIn')
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let res = !isLogged
        ? await axios.post('http://localhost:8000/register', {
            username: username,
            email: email,
            password: password,
          })
        : await axios.post('http://localhost:8000/login', {
            username: username,
            password: password,
          })
      if (res.data.status === 201) {
        navigate('/home')
      } else {
        setError(`${res.data.message}`)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-50">
      {isLogged ? (
        <>
          <h1 className="m-0">Welcome back</h1>{' '}
          <p className="m-0">Login to your account</p>
        </>
      ) : (
        <>
          <h1 className="m-0">Welcome !</h1>
          <p className="m-0">register new account</p>
        </>
      )}
      {Error.length != 0 && <p className="text-danger">{Error} !</p>}
      <div className="sides">
        <form className="form" onSubmit={handleSubmit} method="post">
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Example @username"
            label="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
          {!isLogged && (
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Example example@exp.com"
              label="Enter your Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          )}
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            label="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          {isLogged ? (
            <Input type="submit" id="input2" value="Log In" />
          ) : (
            <Input type="submit" id="input2" value="Create Account" />
          )}
        </form>
        <span className="d-flex  justify-content-center align-items-center ">
          {isLogged ? `Don't have account ?` : `already have an account ?`}
          <span
            onClick={() => {
              setError('')
              isLogged ? navigate('/SignUp') : navigate('/SignIn')
            }}
            className="btn btn-link p-0 text-dark"
          >
            {' '}
            {isLogged ? `Create one here` : `login here`}
          </span>
        </span>
      </div>
    </div>
  )
}

export default Form
