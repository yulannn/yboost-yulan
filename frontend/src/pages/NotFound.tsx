import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-full h-full pb-8">
      <h1 className="text-4xl font-bold text-center mt-20 text-black">404</h1>
      <h2 className="text-2xl font-bold text-center mt-10 text-black">
        Page Not Found
      </h2>
      <button
        onClick={() => navigate('/')}
        className="btn border-none bg-blue-300 hover:bg-blue-400 text-white px-6 py-2 custom-shadow text-lg font-bold opacity-80 hover:opacity-100 w-1/4 mt-10"
      >
        Go back to Home
      </button>
    </div>
  );
};

export default NotFound;
