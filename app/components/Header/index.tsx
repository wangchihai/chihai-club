import React from 'react';
import './index.css'
import {allPosts} from "contentlayer/generated";
import SearchBar from "./SearchBar";



function Header() {
  return (
    <div>
      <div className={'main-header'}>
        <div className={'user-info-wrapper'}>
          <div className={'avatar'}></div>
          <div className={'user-info'}>
            <div className={'user-name-info'}>chihai</div>
            <div className={'blog-desc'}>写字的地方</div>
          </div>
        </div>
        <SearchBar/>
      </div>


    </div>
  )
}


export default Header
