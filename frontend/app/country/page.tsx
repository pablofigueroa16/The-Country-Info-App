'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../components/Pagination'
import ButtonBack from '../components/ButtonBack'
import Countries from '../components/Countries'
import Style from '@/app/spinner.module.css'
interface Country {
  name: string
  countryCode: string
}

const CountryList = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const countriesPerPage = 10

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true)
      try {
        const response = await axios.get<Country[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_PORT}/countries`,
        )
        setCountries(response.data)
        setError(null)
      } catch (error) {
        setError('Error fetching countries. Please try again later.')
        console.error('Error fetching countries:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  const indexOfLastCountry = currentPage * countriesPerPage
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry,
  )

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalPages = Math.ceil(countries.length / countriesPerPage)

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-blue-500 to-blue-300 text-white px-4'>
      <h1 className='text-3xl md:text-4xl font-bold m-4 md:m-8'>
        Available Countries
      </h1>

      {loading && <div className='flex justify-center items-center w-full h-screen bg-gradient-to-b from-blue-500 to-blue-300'>
        <div className='flex flex-col items-center'>
          <div className={Style.spinner}></div>
          <p className='text-3xl text-white mt-4'>Loading...</p>
        </div>
      </div>}
      {error && <p className='text-xl text-red-500'>{error}</p>}
      {!loading && !error && <Countries currentCountries={currentCountries} />}

      {!loading && !error && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}

      <ButtonBack />
    </div>
  )
}

export default CountryList
