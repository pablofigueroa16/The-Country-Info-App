"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import PopulationChart from '../../components/PopulationChart';

interface CountryData {
  name: string;
  flagUrl: string;
  borderCountries: BorderCountry[];
  populationData: PopulationData[];
}

interface BorderCountry {
  countryCode: string;
  name: string;
  commonName: string;
}

interface PopulationData {
  year: number;
  value: number;
}

const CountryInfo = ({ params }: { params: { code: string } }) => {
  const { code } = params;
  const [country, setCountry] = useState<CountryData | null>(null);

  const fetchCountryInfo = async (code: string) => {
    try {
      const response = await axios.get<CountryData>(`http://localhost:3000/country/${code}`);
      setCountry(response.data);
      console.log('response.data', response.data);
    } catch (error) {
      console.error('Error fetching country info:', error);
    }
  };

  useEffect(() => {
    if (code) {
      fetchCountryInfo(code);
    }
  }, [code]);

  if (!country) return <div className='flex justify-center items-center w-full h-screen bg-gradient-to-b from-blue-500 to-blue-300'><p className="text-3xl text-white">Loading...</p></div>;

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-blue-500 to-blue-300 text-white px-4">
      <div className="w-full max-w-3xl flex flex-col md:flex-row mt-4 md:justify-between md:items-start bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex flex-col items-center justify-center mt-8 md:w-1/2 md:mb-0">
          <img
            src={country.flagUrl}
            alt={`Flag of ${country.name}`}
            className="w-32 h-20 object-cover mb-4 rounded-md border border-gray-300 shadow-md"
          />
          <h1 className="text-3xl font-bold text-black">{country.name}</h1>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4 text-center text-black">Border Countries</h3>
          {country.borderCountries.length > 0 ? (
            <ul className="flex flex-wrap justify-center gap-2 p-0 m-0">
              {country.borderCountries.map((borderCountry) => (
                <li 
                  key={borderCountry.countryCode} 
                  className="w-full truncate sm:w-1/2 md:w-1/3 lg:w-1/4 border border-gray-300 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Link 
                    className="block truncate w-full text-base md:text-base font-bold p-2 text-gray-800 bg-gray-100 hover:bg-blue-200 transition-colors duration-300 text-center"
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
        </div>
      </div>

      <div className="w-full max-w-3xl bg-white text-black rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mt-6 mb-4 text-center">Population Over Time</h2>
        <div className="w-full max-w-2xl mx-auto">
          <PopulationChart data={country.populationData} />
        </div>
      </div>

      <Link
        className="mt-6 mb-4 text-lg font-semibold text-blue-800 bg-white px-6 py-3 rounded-md shadow-md hover:bg-gray-200 hover:scale-105 transition-transform duration-300"
        href="/"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default CountryInfo;
