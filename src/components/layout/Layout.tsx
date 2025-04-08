
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "@/context/ThemeProvider";

const Layout = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar />
      <div className={`flex flex-col flex-1 overflow-hidden ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
