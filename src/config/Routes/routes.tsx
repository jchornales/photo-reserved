import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../../App';
import AuthPage from '../../pages/AuthPage';
import Home from '../../pages/Home';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}
