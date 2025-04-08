
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeProvider";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      title: "Catalog",
      icon: Package,
      path: "/catalog",
    },
    {
      title: "Users",
      icon: Users,
      path: "/users",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <div
      className={cn(
        "h-screen border-r transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
        isDarkMode 
          ? "bg-gray-800 border-gray-700 text-gray-200" 
          : "bg-white border-gray-200"
      )}
    >
      <div className={cn(
        "flex items-center justify-between p-4 border-b",
        isDarkMode ? "border-gray-700" : "border-gray-200"
      )}>
        {!collapsed && (
          <h1 className={cn(
            "text-xl font-bold",
            isDarkMode ? "text-blue-400" : "text-blue-600"
          )}>Catalog Admin</h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1 rounded-md",
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          )}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center p-2 rounded-md transition-colors",
                  location.pathname === item.path
                    ? isDarkMode 
                      ? "bg-blue-900/50 text-blue-400" 
                      : "bg-blue-50 text-blue-600"
                    : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={cn(
        "p-4 border-t", 
        isDarkMode ? "border-gray-700" : "border-gray-200"
      )}>
        <div className={cn("flex items-center", collapsed ? "justify-center" : "")}>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
            A
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-gray-200" : "text-gray-700"
              )}>Admin User</p>
              <p className={cn(
                "text-xs", 
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>admin@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
