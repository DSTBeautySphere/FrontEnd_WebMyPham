import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import thư viện cookie

const PrivateRoute = ({ component: Component }) => {
  const token = Cookies.get('Token'); // Lấy token từ cookie
  console.log("token", token);
  return token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
