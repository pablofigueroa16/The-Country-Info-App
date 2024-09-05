import Link from 'next/link'

interface Country {
  name: string
  countryCode: string
}

interface CountriesProps {
  currentCountries: Country[]
}

const Countries: React.FC<CountriesProps> = ({ currentCountries }) => {
  return (
    <ul className='flex flex-wrap justify-center gap-4 w-full max-w-4xl bg-white text-black rounded-lg shadow-md p-4 md:p-6'>
      {currentCountries.map(country => (
        <li
          key={country.countryCode}
          className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 border border-gray-300 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg'
        >
          <Link
            className='block text-lg md:text-xl font-bold text-gray-800 p-4 bg-gray-100 hover:bg-blue-200 transition-colors duration-300 text-center truncate'
            href={`/country/${country.countryCode}`}
          >
            {country.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Countries
