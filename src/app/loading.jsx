import React from 'react'

const loading = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <img src="/loading.gif" className='min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px]' alt="page loading..." />
    </div>
  )
}

export default loading