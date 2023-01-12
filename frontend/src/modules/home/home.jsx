import React from 'react'

import { ReactComponent as Avatar } from '../../assets/avatar.svg'
import { ReactComponent as HomeIcon } from '../../assets/home.svg'
import { ReactComponent as ExploreIcon } from '../../assets/explore.svg'
import { ReactComponent as GridIcon } from '../../assets/grid.svg'
import { ReactComponent as BookMarkIcon } from '../../assets/bookmark.svg'
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg'
import { ReactComponent as ShareIcon } from '../../assets/share.svg'

const Home = () => {
  return (
    <>
      <div className="d-flex h-100" id="home">
        <div className="sidebar bg-dark">
          <div className="userSection d-flex flex-column justify-content-center align-items-center">
            <div className="mb-4 avatar">
              <Avatar />
            </div>
            <div className="w-100 userCount text-light d-flex justify-content-around align-items-center text-center">
              <div>
                <h5 className="m-0 p-0">1000</h5>
                <p className="m-0 p-0">Following</p>
              </div>
              <div>
                <h5 className="m-0 p-0">1000</h5>
                <p className="m-0 p-0">Post</p>
              </div>
              <div>
                <h5 className="m-0 p-0">1000</h5>
                <p className="m-0 p-0">Followers</p>
              </div>
            </div>
          </div>
          <div className="navigation pt-3 w-100 d-flex flex-column justify-content-around align-items-start">
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
        </div>
        <div className="feed"></div>
        <div className="activity"></div>
      </div>
    </>
  )
}

export default Home
