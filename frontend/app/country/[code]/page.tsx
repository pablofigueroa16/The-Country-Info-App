'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import PopulationChart from '../../components/PopulationChart'
import BorderCountries from '@/app/components/BorderCountries'
import CountryCard from '@/app/components/CountryCard'
import ButtonBack from '@/app/components/ButtonBack'
import Style from "@/app/spinner.module.css"

interface CountryData {
  name: string
  flagUrl: string
  borderCountries: BorderCountry[]
  populationData: PopulationData[]
}

interface BorderCountry {
  countryCode: string
  name: string
  commonName: string
}

interface PopulationData {
  year: number
  value: number
}

const CountryInfo = ({ params }: { params: { code: string } }) => {
  const { code } = params
  const [country, setCountry] = useState<CountryData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchCountryInfo = async (code: string) => {
    setLoading(true)
    try {
      const response = await axios.get<CountryData>(
        `${process.env.NEXT_PUBLIC_BACKEND_PORT}/country/${code}`,
      )
      setCountry(response.data)
      setError(null)
    } catch (error) {
      setError('Error fetching country information. Please try again later.')
      console.error('Error fetching country info:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (code) {
      fetchCountryInfo(code)
    }
  }, [code])

  if (loading)
    return (
      <div className='flex justify-center items-center w-full h-screen bg-gradient-to-b from-blue-500 to-blue-300'>
        <div className='flex flex-col items-center'>
          <div className={Style.spinner}></div>
          <p className='text-3xl text-white mt-4'>Loading...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className='flex justify-center items-center w-full h-screen bg-gradient-to-b from-blue-500 to-blue-300'>
        <p className='text-3xl text-white'>{error}</p>
      </div>
    )

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-blue-500 to-blue-300 text-white px-4'>
      <div className='w-full max-w-3xl flex flex-col md:flex-row mt-4 md:justify-between md:items-start bg-white rounded-lg shadow-md p-6 mb-4'>
        {country && <CountryCard country={country} />}
        <div className='md:w-1/2'>
          <h3 className='text-2xl font-semibold mb-4 text-center text-black'>
            Border Countries
          </h3>
          <BorderCountries country={country} />
        </div>
      </div>

      <div className='w-full max-w-3xl bg-white text-black rounded-lg shadow-md p-6 mb-8'>
        <h2 className='text-xl font-semibold mt-6 mb-4 text-center'>
          Population Over Time
        </h2>
        <div className='w-full max-w-2xl mx-auto'>
          <PopulationChart data={country?.populationData || []} />
        </div>
      </div>
      <ButtonBack />
    </div>
  )
}

export default CountryInfo
