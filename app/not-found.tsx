import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 h-screen" style={{ paddingTop: "5%" }}>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex justify-center items-center flex-col" style={{ width: "60%", border: "3px solid black", borderTop: "35px solid" }}>
          <Image src={"/logo-png/logo-black-transparent-up.png"} alt="CareerForge Logo"
            width={150}
            height={50} />
          <div className="mx-auto max-w-screen-sm text-center" >
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something went wrong.</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
            <Link href="/"
              className="mt-5 rounded bg-black p-3 font-medium text-gray hover:bg-opacity-90">
              Back to Homepage
            </Link>
          </div>
        </div>
      </section >
    </>
  )
}

export default Page
