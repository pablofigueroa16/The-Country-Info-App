"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Country {
  name: string;
  countryCode: string;
}

const CountryList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>(`http://localhost:3000/countries`);
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(countries.length / countriesPerPage);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-blue-500 to-blue-300 text-white px-4">
      <h1 className="text-3xl md:text-4xl font-bold m-4 md:m-8">Available Countries</h1>

      <ul className="flex flex-wrap justify-center gap-4 w-full max-w-4xl bg-white text-black rounded-lg shadow-md p-4 md:p-6">
        {currentCountries.map((country) => (
          <li 
            key={country.countryCode} 
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 border border-gray-300 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Link 
              className="block text-lg md:text-xl font-bold text-gray-800 p-4 bg-gray-100 hover:bg-blue-200 transition-colors duration-300 text-center truncate"
              href={`/country/${country.countryCode}`}
            >
              {country.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded-md shadow-md transition-colors duration-300 ${
              currentPage === index + 1
                ? 'bg-blue-800 text-white'
                : 'bg-white text-blue-800 hover:bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
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

export default CountryList;
