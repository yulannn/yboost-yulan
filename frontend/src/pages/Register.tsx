import RegisterForm from '../components/forms/RegisterForm';
import Navbar from '../components/navigation/Navbar';
import { motion } from 'framer-motion';

const Register = () => {
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
              Inscription
            </h1>
            <p className="text-gray space-font">
              Créez votre compte
            </p>
          </div>

          <div className="bg-white shadow-card p-8 md:p-10">
            <RegisterForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
