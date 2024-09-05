interface PaginationProps {
  totalPages: number
  currentPage: number
  paginate: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  paginate,
}) => {
  return (
    <div className='flex flex-wrap justify-center mt-6 gap-2'>
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
  )
}

export default Pagination
