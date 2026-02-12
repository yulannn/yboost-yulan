import { useRef, useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import { useEmployee } from "../services/employeeService";
import Navbar from "../components/navigation/Navbar";
import { motion } from "framer-motion";
import { Mail, User, Camera, Edit2 } from "lucide-react";

const Profile = () => {
  const { authState, updateAvatar } = useAuth();
  const employeeId = authState.user?.employee_id;
  const { data: employee, isLoading: employeeLoading } = useEmployee(
    employeeId ?? 0
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (authState.status === "loading") {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center space-font text-gray">Chargement...</div>
      </div>
    );
  }

  if (authState.status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-dark integral-font text-xl mb-4">Accès refusé</p>
          <p className="text-gray space-font">
            Vous devez vous connecter pour voir votre profil.
          </p>
        </div>
      </div>
    );
  }

  if (employeeLoading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center space-font text-gray">
          Chargement des informations...
        </div>
      </div>
    );
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !authState.user) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      await updateAvatar(formData);
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  function getRole() {
    if (employee?.role_id === 1) return "Serveur";
    if (employee?.role_id === 2) return "Bartender";
    if (employee?.role_id === 3) return "Administrateur";
    return "Employé";
  }

  return (
    <div className="min-h-screen bg-light">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl integral-font text-dark mb-4 tracking-tight">
            Profil
          </h1>
          <p className="text-gray space-font text-lg">
            Gérez vos informations personnelles
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white shadow-card"
        >
          {/* Cover + Avatar Section */}
          <div className="relative h-32 bg-dark">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <button
                  onClick={handleAvatarClick}
                  disabled={isUploading}
                  className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-gray-200 shadow-lg hover:shadow-xl transition-all group"
                >
                  {employee?.profile_pic ? (
                    <img
                      src={employee.profile_pic}
                      alt={`${employee.name} ${employee.lastname}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                      <User className="text-white" size={48} />
                    </div>
                  )}

                  {/* Overlay au hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                  </div>

                  {/* Loading state */}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 px-8 pb-8">
            {/* Nom et rôle */}
            <div className="mb-8">
              <h2 className="text-3xl integral-font text-dark mb-2 tracking-tight">
                {employee?.name} {employee?.lastname}
              </h2>
              <p className="text-lg space-font text-gray">
                {getRole()}
              </p>
            </div>

            {/* Informations */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4 p-4 bg-gray-50 border border-light">
                <Mail className="text-gray mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-sm space-font text-gray mb-1">Email</p>
                  <p className="text-base space-font text-dark">
                    {employee?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 border border-light">
                <User className="text-gray mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-sm space-font text-gray mb-1">ID Employé</p>
                  <p className="text-base space-font text-dark">
                    #{authState.user?.employee_id}
                  </p>
                </div>
              </div>

              {employee?.country && (
                <div className="flex items-start gap-4 p-4 bg-gray-50 border border-light">
                  <div className="text-gray mt-1">🌍</div>
                  <div className="flex-1">
                    <p className="text-sm space-font text-gray mb-1">Pays</p>
                    <p className="text-base space-font text-dark">
                      {employee.country}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-dark text-light space-font text-sm tracking-wider hover:bg-gray-800 transition-colors">
                <Edit2 size={16} />
                MODIFIER LE PROFIL
              </button>
            </div>
          </div>
        </motion.div>

        {/* Statistiques ou informations supplémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white shadow-card p-6 text-center">
            <p className="text-sm space-font text-gray mb-2">Statut</p>
            <p className="text-xl integral-font text-dark">
              {authState.status === "authenticated" ? "Actif" : "Inactif"}
            </p>
          </div>
          <div className="bg-white shadow-card p-6 text-center">
            <p className="text-sm space-font text-gray mb-2">Rôle</p>
            <p className="text-xl integral-font text-dark">{getRole()}</p>
          </div>
          <div className="bg-white shadow-card p-6 text-center">
            <p className="text-sm space-font text-gray mb-2">Membre depuis</p>
            <p className="text-xl integral-font text-dark">2024</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
