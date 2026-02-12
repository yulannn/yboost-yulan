import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import DetailsCocktail from '../pages/DetailsCocktail';
import Dashboard from '../pages/Dashboard';
import Panier from '../pages/Panier';
import OrderSucces from '../pages/OrderSucces';
import NotFound from '../pages/NotFound';
import { ProtectedRoute } from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/panier" element={<Panier />}></Route>
        <Route path="/order-success" element={<OrderSucces />} />
        <Route path="/cocktail/:cocktail_id" element={<DetailsCocktail />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
