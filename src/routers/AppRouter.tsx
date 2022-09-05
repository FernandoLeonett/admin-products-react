import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import routes from "./routes";

import PublicRoute from "./PublicRoutes";
import React from "react";
import { ProductContextProvider } from "../context/context";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import FormPage from "../pages/form/FormPage";
import WelcomePage from "../pages/welcome/WelcomePage";
import EditProductPage from "../pages/editproduct/EditProductPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<PrivateRoute />} >
        <Route index element={<HomePage />} />
        <Route path={routes.form} element={<FormPage />} />
        <Route path={routes.edit} element={<EditProductPage />} />

      </Route>

      <Route path={routes.home} element={<PublicRoute />}>
        <Route path={routes.login} element={<LoginPage />} />

      </Route>
      <Route path={"*"} element={<h1>not found</h1>} />



    </Routes>
  );
};

export default AppRouter;
