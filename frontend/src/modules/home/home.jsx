import './home.css'
import React from 'react'

import { ReactComponent as Avatar } from '../../assets/avatar.svg'
import { ReactComponent as Logout } from '../../assets/logout.svg'
import { ReactComponent as HomeIcon } from '../../assets/home.svg'
import { ReactComponent as ExploreIcon } from '../../assets/explore.svg'
import { ReactComponent as BookMarkIcon } from '../../assets/bookmark.svg'
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg'
import { ReactComponent as ShareIcon } from '../../assets/share.svg'
import { ReactComponent as GridIcon } from '../../assets/grid.svg'
import { ReactComponent as Search } from '../../assets/search.svg'
import { ReactComponent as Add } from '../../assets/add.svg'
import { useNavigate } from 'react-router-dom'
import Post from '../../components/post/post'
import { useState } from 'react'
import { useEffect } from 'react'
const axios = require('axios')
function Home() {
  const navigate = useNavigate()
  var [userData, setUserData] = useState({})
  userData.post = []
  userData.following = []
  userData.followers = []
  useEffect(() => {
    setUserData(async () => {
      let userData = await fetch('http://localhost:8000/userData')
      userData = await userData.json()
      return userData
    })
  }, [])
  return (
    <>
      <div className="d-flex h-100" id="home">
        <div className="sidebar bg-dark">
          {userData && (
            <div className="userSection d-flex flex-column justify-content-center align-items-center">
              <div className="mb-4 avatar">
                <Avatar />
              </div>
              <div className="w-100 userCount text-light d-flex justify-content-around align-items-center text-center">
                <div>
                  <h5 className="m-0 p-0">{userData.following.length}</h5>
                  <p className="m-0 p-0">Following</p>
                </div>
                <div>
                  <h5 className="m-0 p-0">{userData.post.length}</h5>
                  <p className="m-0 p-0">Post</p>
                </div>
                <div>
                  <h5 className="m-0 p-0">{userData.followers.length}</h5>
                  <p className="m-0 p-0">Followers</p>
                </div>
              </div>
            </div>
          )}
          <div className="navigation py-3 w-100 d-flex flex-column justify-content-around align-items-start">
            <button className="d-flex justify-content-start align-items-center gap-3 mb-3 w-100 btn text-light ">
              <HomeIcon />
              <h5>Home</h5>
            </button>
            <button className="d-flex justify-content-start align-items-center gap-3 mb-3 w-100 btn text-light ">
              <ExploreIcon />
              <h5>Explore</h5>
            </button>
            <button className="d-flex justify-content-start align-items-center gap-3 mb-3 w-100 btn text-light ">
              <BookMarkIcon />
              <h5>My Favourite</h5>
            </button>
            <button className="d-flex justify-content-start align-items-center gap-3 mb-3 w-100 btn text-light ">
              <ShareIcon />
              <h5>Direct</h5>
            </button>
            <button className="d-flex justify-content-start align-items-center gap-3 mb-3 w-100 btn text-light ">
              <GridIcon />
              <h5>Status</h5>
            </button>
            <button className="d-flex justify-content-start align-items-center gap-3 mb-3 w-100 btn text-light ">
              <SettingsIcon />
              <h5>Settings</h5>
            </button>
          </div>
          <div className="logOut py-3 w-100 d-flex flex-column justify-content-around align-items-start">
            <button className="d-flex justify-content-start align-items-center gap-3 mb-3 w-100 btn text-light ">
              <Logout />
              <h5>Logout</h5>
            </button>
          </div>
        </div>
        <div className="feed d-flex flex-column justify-content-start align-items-center">
          <div className="topBar d-flex p-2 py-3 w-100 justify-content-between gap-5 align-items-center">
            <div className="search w-25 h-100 d-flex justify-content-center align-items-center ">
              <input
                className="p-1 px-2 "
                style={{
                  borderRight: 'none',
                  borderTopLeftRadius: '1rem',
                  borderBottomLeftRadius: '1rem',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',
                  marginLeft: '5rem',
                }}
                type="text"
                placeholder="Enter your Search"
              />
              <div
                className="btn bg-danger d-flex justify-content-center align-items-center"
                style={{
                  borderTopRightRadius: '1rem',
                  borderBottomRightRadius: '1rem',
                  borderEndStartRadius: '0px',
                  borderStartStartRadius: '0px',
                  height: '95%',
                }}
              >
                <Search />
              </div>
            </div>
            <button
              onClick={() => {
                navigate('/createPost')
              }}
              className="bg-danger d-flex justify-content-start align-items-center gap-3 btn text-light "
            >
              <Add />
              <p>Create new post</p>
            </button>
          </div>
          <Post source="https://images.pexels.com/photos/6625410/pexels-photo-6625410.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          <Post source="https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
          <Post source="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
        </div>
        <div className="activity"></div>
      </div>
    </>
  )
}

export default Home
