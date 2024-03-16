import React from 'react'

const Container = ({ children}) => {
    return (
        <div className="bg-slate-800 w-full h-full overflow-auto" >
            <div className='mt-[8vh] p-2'>{children}
            </div>
        </div>
    )
}

export default Container