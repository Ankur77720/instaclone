import React, { useState } from 'react'

function Register() {
  const [username, setusername] = useState('')
  const [name, setname] = useState('')
  const [contact, setcontact] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  async function onsubmit(e) {
    e.preventDefault()
    var files = document.querySelector('#input6')
    console.log(files.files[0])
    var formData = new FormData()
    formData.append('username', username)
    formData.append('name', name)
    formData.append('contact', contact)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('image', files.files[0])
    let res = await fetch('http://localhost:8000/register', {
      method: 'POST',
      body: formData,
    })
    res = await res.json()
    console.log(res)
  }
  return (
    <div>
      <div
        id="main"
        className="w-100 d-flex flex-column justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <img
          style={{ height: '80px' }}
          className="mb-3"
          src="./images/instagram-text-icon.svg"
          alt=""
        />
        <form
          method="post"
          onSubmit={onsubmit}
          className="w-25"
          encType="multipart/form-data"
          style={{ height: 'fit-content' }}
        >
          <div className="mb-3">
            <label htmlFor="input1" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              placeholder="Example 1234567890"
              className="form-control"
              id="input1"
              onChange={(e) => setcontact(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="input2" className="form-label">
              Email address
            </label>
            <input
              type="text"
              name="email"
              placeholder="Example example@gmail.com"
              className="form-control"
              id="input2"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="input3" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Example username"
              className="form-control"
              id="input3"
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="input4" className="form-label">
              Full name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Example john doe"
              className="form-control"
              id="input4"
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="input5" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Example **************"
              className="form-control"
              id="input5"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="input6" className="form-label">
              Choose profile pic
            </label>
            <input
              type="file"
              name="image"
              className="form-control"
              id="input6"
            />
          </div>
          <div className="mb-3">
            <input
              type="submit"
              className="btn btn-primary w-100"
              value="Sign up"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
export default Register
