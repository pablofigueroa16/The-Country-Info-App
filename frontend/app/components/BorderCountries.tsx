import Link from 'next/link'

interface BorderCountry {
  countryCode: string
  commonName: string
}

interface Country {
  borderCountries: BorderCountry[]
}

interface BorderCountriesProps {
  country: Country | null
}

const BorderCountries: React.FC<BorderCountriesProps> = ({ country }) => {
  return (
    <>
      {country.borderCountries.length > 0 ? (
        <ul className='flex flex-wrap justify-center gap-2 p-0 m-0'>
          {country.borderCountries.map(borderCountry => (
            <li
              key={borderCountry.countryCode}
              className='w-full truncate sm:w-1/2 md:w-1/3 lg:w-1/4 border border-gray-300 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg'
            >
              <Link
                className='block truncate w-full text-base md:text-base font-bold p-2 text-gray-800 bg-gray-100 hover:bg-blue-200 transition-colors duration-300 text-center'
                href={`/country/${borderCountry.countryCode}`}
              >
                {borderCountry.commonName}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No border countries available.</p>
      )}
    </>
  )
}

export default BorderCountries
