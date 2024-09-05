'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex flex-col w-full h-screen items-center justify-center bg-gradient-to-b from-blue-500 to-blue-300 text-white px-4'>
      <h1 className='text-3xl md:text-4xl font-bold mb-4 text-center'>
        Welcome to the Country Info App
      </h1>
      <Link
        className='text-lg md:text-xl font-semibold text-blue-800 bg-white px-4 md:px-6 py-2 md:py-3 rounded-md shadow-md hover:bg-gray-200 transition duration-300'
        href='/country'
      >
        Go to Country List
      </Link>
    </div>
  )
}
