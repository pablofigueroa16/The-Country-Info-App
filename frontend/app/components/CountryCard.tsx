import Image from 'next/image'
import React from 'react'
import defaultImage from '../images/pngwing.com.png'

interface Country {
  name: string
  flagUrl?: string
}

interface CountryCardProps {
  country: Country | null
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const imageUrl = country?.flagUrl ? country.flagUrl : defaultImage

  return (
    <div className='flex flex-col items-center justify-center mt-8 md:w-1/2 md:mb-0'>
      <Image
        width={80}
        height={80}
        src={imageUrl}
        alt={`${country?.name}`}
        className='w-32 h-20 object-cover mb-4 rounded-md border border-gray-300 shadow-md'
      />
      <h1 className='text-3xl font-bold text-black'>{country?.name}</h1>
    </div>
  )
}

export default CountryCard
