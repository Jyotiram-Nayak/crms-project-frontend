import HomeLayout from '@/components/Layouts/HomeLayout'
import About from '@/components/Pages/About'
import React from 'react'

const page = () => {
  return (
    <>
       <HomeLayout>
          <About/>
        </HomeLayout>
    </>
  )
}

export default page
