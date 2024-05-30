"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Supprimer les données utilisateur du sessionStorage
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("userState");

    // Déclencher un événement de stockage pour informer d'autres onglets ou composants de la déconnexion
    window.dispatchEvent(new Event("storage"));

    // Rediriger l'utilisateur vers la page de login
    router.push("/login");
  }, [router]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
