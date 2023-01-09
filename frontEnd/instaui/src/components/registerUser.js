import React from 'react'

function Register() {
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
          action="http://localhost:8000/register"
          className="w-25"
          enctype="multipart/form-data"
          style={{ height: 'fit-content' }}
        >
          <div className="mb-3">
            <label for="input1" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              placeholder="Example 1234567890"
              className="form-control"
              id="input1"
            />
          </div>
          <div className="mb-3">
            <label for="input2" className="form-label">
              Email address
            </label>
            <input
              type="text"
              name="email"
              placeholder="Example example@gmail.com"
              className="form-control"
              id="input2"
            />
          </div>
          <div className="mb-3">
            <label for="input3" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Example username"
              className="form-control"
              id="input3"
            />
          </div>
          <div className="mb-3">
            <label for="input4" className="form-label">
              Full name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Example john doe"
              className="form-control"
              id="input4"
            />
          </div>
          <div className="mb-3">
            <label for="input5" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Example **************"
              className="form-control"
              id="input5"
            />
          </div>
          <div className="mb-3">
            <label for="input6" className="form-label">
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
