import './createPost.css'
import { React, useState } from 'react'
import Input from '../../components/input/input'
import axios from 'axios'
const PostForm = () => {
  const [isImage, setIsImage] = useState('')
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const [persons, setPersons] = useState('')
  function imageSubmitted(e) {
    var url = URL.createObjectURL(e.target.files[0])
    setIsImage(url)
  }
  let postForm = document.querySelector('.postForm form')
  async function onFormSubmitted(e) {
    e.preventDefault()
    let formData = new FormData(postForm)
    let res = await fetch('http://localhost:8000/createPost', {
      method: 'post',
      body: formData,
      credentials: 'include',
    })
    res = await res.json()
    console.log(res)
  }

  return (
    <>
      <div className="postForm h-100 w-100 d-flex flex-column justify-content-center align-items-center ">
        <form
          onSubmit={onFormSubmitted}
          className="d-flex postForm justify-content-around align-items-center gap-5"
        >
          <>
            <div className="mb-3 col-4">
              <Input
                value={caption}
                label="Write Caption"
                name="caption"
                placeholder="Write something here"
                onChange={(e) => {
                  setCaption(e.target.value)
                }}
              ></Input>
              <Input
                value={location}
                label="Add location"
                name="location"
                onChange={(e) => {
                  setLocation(e.target.value)
                }}
                placeholder="Enter address"
              ></Input>
              <Input
                onChange={(e) => {
                  setPersons(e.target.value)
                }}
                value={persons}
                label="Tag person"
                name="tagedPersons"
                placeholder="addPersons"
              ></Input>
              <Input type="submit" value="+ Post"></Input>
            </div>
          </>
          <label className="imageField flex-column" htmlFor="imageDoc">
            <input
              onChange={imageSubmitted}
              accept="image/*"
              style={{ display: 'none' }}
              type="file"
              id="imageDoc"
              className="form-control"
              name="image"
            />
            {isImage && (
              <div className="imgPreview">
                {' '}
                <img src={isImage} alt="" />{' '}
              </div>
            )}
            <i className="ri-camera-3-line"></i>
            <p>Select your Image</p>
            <img src="" alt="" />
          </label>
        </form>
      </div>
    </>
  )
}

export default PostForm
