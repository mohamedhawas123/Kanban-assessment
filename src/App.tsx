import React from 'react';
import './App.css';
import { Toaster } from "sonner";
import AppRoutes from './routes/AppRoutes';



function App() {
  return (
    <>

      <AppRoutes />

      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
