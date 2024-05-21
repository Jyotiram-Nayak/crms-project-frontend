import HomeLayout from '@/components/Layouts/HomeLayout'
import Contact from '@/components/Pages/Contact'
import React from 'react'

const page = () => {
  return (
    <>
       <HomeLayout>
          <Contact/>
        </HomeLayout>
    </>
  )
}

export default page
