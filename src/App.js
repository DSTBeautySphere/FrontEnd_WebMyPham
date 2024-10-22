import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './route';
import PrivateRoute from '../src/route/privateroute';
import Layout from '../src/Component/Layout/index';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Render các route công khai */}
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={
              <Layout>
                <route.component />
              </Layout>
            } />
          ))}

          {/* Render các route riêng tư */}
          {privateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <PrivateRoute component={route.component} />
                </Layout>
              }
            />
          ))}

          {/* Chuyển hướng đến trang sản phẩm nếu có token, nếu không thì đến trang đăng nhập */}
          <Route
            path="/"
          // element={token ? <Navigate to="/product/hosting" /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
