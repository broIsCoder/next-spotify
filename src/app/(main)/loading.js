import React from 'react'

const loadingContentPage = () => {
  return (
        <div className='h-full w-full flex justify-center items-center'>
        <img src="/loading.gif" className='min-h-[200px] max-h-[200px] min-w-[200px] max-w-[200px]' alt="loading content..." />
        </div>
  )
}

export default loadingContentPage