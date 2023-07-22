'use client'
import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import './searchBar.css'
import { useRouter,useSearchParams } from 'next/navigation'
import { GHCorner } from "react-gh-corner";

function SearchBar() {
  const [searchKey, setSearchKey] = useState<undefined|string>();
  const router= useRouter()
  const searchParams = useSearchParams()

  useEffect(()=>{
    setSearchKey(searchParams.get('query')||undefined)
  },[])
  const keyDown=(event)=>{
    if(event.code==='Enter'){
      if(searchKey!==undefined && searchKey.trim().length>0){
        router.push(`/?query=${encodeURIComponent(searchKey.trim())}`)

      }else{
        router.push('/')
      }
    }
  }

  const inputChange=(event)=>{
    setSearchKey(event.target.value)
  }

  return (
    <div className={'search-wrapper'}>
      <input className={'search-input'} value={searchKey} onInput={inputChange} onKeyDown={keyDown}/>
      <LuSearch className={'search-icon'}/>
      <GHCorner
        href="https://github.com/wangchihai/chihai-club"
        position="top-right"
        bgColor="black"
        size={80}
        ariaLabel="my github"
        openInNewTab={true}
      />
    </div>
  );
}

export default SearchBar;
