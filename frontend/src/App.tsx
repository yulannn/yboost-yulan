import './App.css';
import AppRoutes from './routes/routes';
import { CartProvider } from './components/context/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="App min-h-screen bg-custom">
        <AppRoutes />
      </div>
    </CartProvider>
  );
}

export default App;
