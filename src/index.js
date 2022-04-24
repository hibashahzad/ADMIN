import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Test from './User';
import SignInSide from './Login';
import User from './User';
import Category from './Services/services/CategoryServices';
import CategoryPage from './Category';

import SubCateg from './SubCategory';
import AddEditCategory from './EditCategory';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import AddEditSub from './AddEditCategory';
import BussnessUser from './Bussness';
import Quiz from './Quiz';
import PalmistQuiz from './palmistQuiz';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignInSide />} />
        <Route path="/Category" element={<CategoryPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/SubCat/:id" element={<SubCateg />} />
        <Route path="/SubCat" element={<SubCateg />} />
        <Route path="/Edit/:id" element={<AddEditCategory />} />
        <Route path="/AddSub/:id" element={<AddEditSub />} />
        <Route path="/AddSub/:id/:Sub" element={<AddEditSub />} />
        <Route path="/bussness" element={<BussnessUser />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/Quiz/:id" element={<Quiz />} />

        <Route path="/palmist/:id" element={<PalmistQuiz />} />
        <Route path="/palmist/:id/:sub" element={<PalmistQuiz />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
