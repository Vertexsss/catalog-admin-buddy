
import { BellIcon, SearchIcon } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { cn } from "@/lib/utils";

const Header = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <header className={cn(
      "h-16 flex items-center px-6 border-b",
      isDarkMode 
        ? "bg-gray-800 border-gray-700" 
        : "bg-white border-gray-200"
    )}>
      <div className="flex-1">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className={cn(
              "w-full pl-10 pr-4 py-2 rounded-md border",
              isDarkMode 
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            )}
          />
          <div className={cn(
            "absolute left-3 top-2.5",
            isDarkMode ? "text-gray-400" : "text-gray-400"
          )}>
            <SearchIcon size={18} />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className={cn(
          "hover:text-gray-700",
          isDarkMode ? "text-gray-300 hover:text-gray-100" : "text-gray-500"
        )}>
          <BellIcon size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
