import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20">
      <div className="text-center space-y-4 p-8">
        <h1 className="text-6xl font-bold text-danger">404</h1>
        <p className="text-xl text-muted-foreground">Página no encontrada</p>
        <p className="text-sm text-muted-foreground">
          La página que buscas no existe en Omni Trade Dash
        </p>
        <a 
          href="/" 
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Volver al Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
