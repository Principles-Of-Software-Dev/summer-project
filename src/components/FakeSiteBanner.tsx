import React from 'react'
import '../styles/GlobalStyles.css'; 
import {ArrowRightIcon} from '@heroicons/react/outline'


const FakeSiteBanner = () => {
  return (
    <a href="https://github.com/Principles-Of-Software-Dev/summer-project/tree/master" >
      <div className='bg-zinc-100 w-screen h-10 drop-shadow-lg flex items-center border-b border-zinc-200 hover:bg-zinc-200 justify-center group mb-4'>
          
          <div className='flex items-center text-xs tracking-widest'>
              Click Here to Check our Repo Out!
        </div>
        {/* add horizontal bounce effect on hover */}
          <ArrowRightIcon className='transition h-5 m-2 group-hover:translate-x-1' />
      </div>
      </a>
  )
}

export default FakeSiteBanner;
