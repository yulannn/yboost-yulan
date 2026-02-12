import Navbar from "../components/navigation/Navbar";
import { useState } from "react";
import Parametre from "../components/common/Parametre";
import Commande from "../components/common/Commande";
import IngredientsListe from "../components/common/IngredientsListe";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [display, setDisplay] = useState("commande");

  const tabs = [
    { id: "commande", label: "Commandes" },
    { id: "parametre", label: "Paramètres" },
    { id: "stock", label: "Stock" }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-light">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl integral-font text-dark mb-4 tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray space-font text-lg">
            Gérez vos commandes, stocks et paramètres
          </p>
        </motion.div>

        {/* Tabs - Design professionnel */}
        <div className="mb-12">
          <div className="flex gap-2 border-b border-light">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDisplay(tab.id)}
                className={`relative px-8 py-4 space-font text-sm tracking-wider transition-all duration-300 ${display === tab.id
                    ? "text-dark"
                    : "text-gray hover:text-dark"
                  }`}
              >
                {tab.label}
                {display === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-dark"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={display}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-card p-8 md:p-12"
        >
          {display === "commande" && <Commande />}
          {display === "parametre" && <Parametre />}
          {display === "stock" && <IngredientsListe />}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;