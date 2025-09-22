// components/Card.jsx
const Card = ({ title, description, buttonText, onClick, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="p-6">
        {icon && <div className="text-4xl text-indigo-600 mb-4">{icon}</div>}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button
          onClick={onClick}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default Card