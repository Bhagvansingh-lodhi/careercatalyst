// components/ResourceItem.jsx
const ResourceItem = ({ resource }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-indigo-600">
            <a 
              href={resource.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {resource.name}
            </a>
          </h3>
          <p className="text-gray-600 text-sm mt-1">{resource.description}</p>
        </div>
        <div className="flex items-center bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {resource.rating}
        </div>
      </div>
    </div>
  )
}

export default ResourceItem