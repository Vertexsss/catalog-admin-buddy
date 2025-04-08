
import { Navigate } from "react-router-dom";

// Redirect the Index page to the Dashboard
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
