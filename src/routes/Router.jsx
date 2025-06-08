import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import Login from '../pages/Login.jsx';
import Home from '../pages/Home.jsx';
import Exercises from '../pages/Exercises.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import { CreateExerciseTable } from '../pages/CreateExerciseTable.jsx';
import { BrowserRouter } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/createExerciseTable" element={<ProtectedRoute><CreateExerciseTable /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}
export default Router;
