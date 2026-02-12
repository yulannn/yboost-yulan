import { useState } from 'react';
import { registerService } from '../../services/registerService';

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    country: '',
    profile_pic: '',
    role_id: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: name === 'role_id' ? Number(value) : value,
    });
  };

  const dataToSubmit = {
    ...registerData,
    role_id: registerData.role_id === '' ? 0 : Number(registerData.role_id),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await registerService.register(dataToSubmit);
      setSuccess(true);
      // Reset form
      setRegisterData({
        name: '',
        lastname: '',
        email: '',
        password: '',
        country: '',
        profile_pic: '',
        role_id: '',
      });
    } catch (err) {
      setError("Échec de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom */}
        <div>
          <label htmlFor="name" className="block text-sm space-font text-dark mb-2">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={registerData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-light text-dark space-font focus:outline-none focus:border-dark transition-colors"
            required
            autoComplete="family-name"
          />
        </div>

        {/* Prénom */}
        <div>
          <label htmlFor="lastname" className="block text-sm space-font text-dark mb-2">
            Prénom
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={registerData.lastname}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-light text-dark space-font focus:outline-none focus:border-dark transition-colors"
            required
            autoComplete="given-name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm space-font text-dark mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-light text-dark space-font focus:outline-none focus:border-dark transition-colors"
            required
            autoComplete="email"
          />
        </div>

        {/* Mot de passe */}
        <div>
          <label htmlFor="password" className="block text-sm space-font text-dark mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={registerData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-light text-dark space-font focus:outline-none focus:border-dark transition-colors"
            required
            autoComplete="new-password"
          />
        </div>

        {/* Pays */}
        <div>
          <label htmlFor="country" className="block text-sm space-font text-dark mb-2">
            Pays
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={registerData.country}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-light text-dark space-font focus:outline-none focus:border-dark transition-colors"
            autoComplete="country-name"
          />
        </div>

        {/* Photo de profil */}
        <div>
          <label htmlFor="profile_pic" className="block text-sm space-font text-dark mb-2">
            Photo de profil (URL)
          </label>
          <input
            type="text"
            id="profile_pic"
            name="profile_pic"
            value={registerData.profile_pic}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-light text-dark space-font focus:outline-none focus:border-dark transition-colors"
            autoComplete="off"
            placeholder="https://..."
          />
        </div>

        {/* Role ID */}
        <div className="md:col-span-2">
          <label htmlFor="role_id" className="block text-sm space-font text-dark mb-2">
            ID du rôle
          </label>
          <input
            type="number"
            id="role_id"
            name="role_id"
            value={registerData.role_id}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-light text-dark space-font focus:outline-none focus:border-dark transition-colors"
            required
            autoComplete="off"
            placeholder="1"
          />
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200">
          <p className="text-red-600 text-sm space-font">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200">
          <p className="text-green-600 text-sm space-font">
            Employé inscrit avec succès !
          </p>
        </div>
      )}

      {/* Bouton */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-dark text-light space-font text-sm tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'INSCRIPTION...' : "INSCRIRE L'EMPLOYÉ"}
      </button>

      {/* Lien connexion */}
      <p className="text-center text-gray space-font text-sm">
        Déjà un compte ?{' '}
        <a href="/login" className="text-dark hover:underline">
          Se connecter
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
