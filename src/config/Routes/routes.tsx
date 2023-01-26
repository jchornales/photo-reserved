import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../../App';
import AuthPage from '../../pages/AuthPage';
import CustomerPage from '../../pages/Customer';
import Home from '../../pages/Home';
import Photographer from '../../pages/Photographer';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/client" element={<CustomerPage />} />
        <Route path="/photographer" element={<Photographer />} />
      </Routes>
    </BrowserRouter>
  );
}
