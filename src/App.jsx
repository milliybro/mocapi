import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";

import { TOKEN } from "./const";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import Layout from "./components/layout";

function App() {
  let [isLogin, setIsLogin] = useState(
    localStorage.getItem(TOKEN) ? true : false
  );
  return (
    <BrowserRouter>
      <Routes>
          <Route
            path="login"
            element={<LoginPage setIsLogin={setIsLogin} />} />
        <Route element={<Layout />}>

        <Route
          path=""
          element={isLogin ? <HomePage /> : <Navigate to="/login" />}
          ></Route>
          <Route
              path="category/:categoryId/product"
              element={<ProductsPage />}
              />
              </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
