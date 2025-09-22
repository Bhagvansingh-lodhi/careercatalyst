// components/Button.jsx
const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors duration-200'
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    success: 'bg-green-600 text-white hover:bg-green-700',
  }
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button