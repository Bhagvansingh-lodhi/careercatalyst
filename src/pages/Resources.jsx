// pages/Resources.jsx
import { resources } from '../data/resourcesData'
import ResourceItem from '../components/ResourceItem'

const Resources = () => {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Resources</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Curated list of the best resources to help you prepare for placements. These include YouTube channels, websites, PDFs, and more.
        </p>
        
        <div className="space-y-8">
          {resources.map((resourceCategory) => (
            <div key={resourceCategory.category} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-indigo-600 mb-4">{resourceCategory.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resourceCategory.items.map((item) => (
                  <ResourceItem key={item.id} resource={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Resources