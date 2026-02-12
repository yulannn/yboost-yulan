import LoginForm from '../components/forms/LoginForm';
import Navbar from '../components/navigation/Navbar';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-light">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl integral-font text-dark mb-4 tracking-tight">
              Connexion
            </h1>
            <p className="text-gray space-font">
              Accédez à votre espace personnel
            </p>
          </div>

          <div className="bg-white shadow-card p-8 md:p-10">
            <LoginForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
