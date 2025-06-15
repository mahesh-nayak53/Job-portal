import React from 'react'

const PageHeadder = ({title,path}) => {
  return (
    <div className='max-w-screen-2xl  mt-3 bg-gradient-to-r from-purple-300 via-pink-300 to-red-400 rounded flex items-center justify-center'>
      <div>
        <h2 className='text-3xl text-[#1a3b9c] font-medium text-center'>{title}</h2>
        <p className='text-sm  text-center'><a href="/">Home</a> / {path}</p>
      </div>
    </div>
  )
}

export default PageHeadder
