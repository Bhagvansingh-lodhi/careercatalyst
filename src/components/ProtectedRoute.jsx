import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Simple check - modify this based on how you store auth token
  const token = localStorage.getItem('token');
  console.log('ProtectedRoute - Token exists:', !!token);
  
  if (!token) {
    console.log('Redirecting to login...');
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
