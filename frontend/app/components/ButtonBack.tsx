'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const ButtonBack = () => {
  const pathname = usePathname()

  return (
    <Link
      className='mt-6 mb-4 text-lg font-semibold text-blue-800 bg-white px-6 py-3 rounded-md shadow-md hover:bg-gray-200 hover:scale-105 transition-transform duration-300'
      href={pathname === '/country' ? '/' : '/country'}
    >
      Back to Home
    </Link>
  )
}
export default ButtonBack
