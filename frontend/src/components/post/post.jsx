import './post.css'
import React from 'react'
import { ReactComponent as Avatar } from '../../assets/avatar.svg'
import { ReactComponent as Like } from '../../assets/like.svg'
import { ReactComponent as Comment } from '../../assets/comment.svg'
import { ReactComponent as Share } from '../../assets/sharePost.svg'
import { ReactComponent as Save } from '../../assets/Save.svg'

const Post = ({ source = '', likes = '', comments = '', user = '' }) => {
  return (
    <>
      <div className="post p-1 my-3 d-flex flex-column justify-content-between align-items-start px-2">
        <div className="user w-100 d-flex align-items-center justify-content-between gap-2 my-1 px-2">
          <div className="userData d-flex  align-items-center gap-2">
            <div className="avatar">
              <Avatar />
            </div>
            <div className="userText">
              <h6 className="p-0 m-0">harley</h6>
              <small className="p-0 m-0">@harley</small>
            </div>
          </div>
          <div
            className="bg-danger rounded p-2 px-3 text-light"
            style={{ cursor: 'pointer' }}
          >
            Follow
          </div>
        </div>
        <div className="data w-100">
          <img className="my-1" src={source} alt="" />
        </div>
        <div className="description w-100 mt-2 px-2 d-flex flex-column justify-content-center align-items-center">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            aliquid iure laboriosam unde ea natus rerum, voluptatum sint soluta
            suscipit nemo omnis sequi aperiam voluptatibus, minima odio iusto
            dignissimos. Ut.
          </p>
          <div
            className="line mt-3"
            style={{
              height: '1px',
              width: '95%',
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}
          ></div>
        </div>
        <div className="postActions w-100 mt-1 mb-1 d-flex justify-content-around align-items-center">
          <div
            className="p-2 mt-2 d-flex justify-content-around align-items-center gap-2"
            style={{
              borderRadius: '1rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <Like />
            <h6>2K Likes</h6>
          </div>
          <div
            className="p-2 mt-2 d-flex justify-content-center align-items-center gap-2"
            style={{
              borderRadius: '1rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <Comment />
            <h6>500 Comments</h6>
          </div>
          <div
            className="p-2 mt-2 d-flex justify-content-center align-items-center gap-2"
            style={{
              borderRadius: '1rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <Share />
            <h6>Share</h6>
          </div>
          <div
            className="p-2 mt-2 d-flex justify-content-center align-items-center gap-2"
            style={{
              borderRadius: '1rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <Save />
            <h6>Save</h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post
