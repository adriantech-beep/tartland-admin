import { NavLink } from "react-router-dom";
import {
  Menu,
  Package,
  Truck,
  Settings,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/stock", label: "Stock", icon: Package },
  { to: "/production", label: "Production", icon: Menu },
  { to: "/delivery", label: "Delivery", icon: Truck },
  { to: "/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <aside
      className={`col-span-2 row-span-11 row-start-2 fixed top-0 left-0 h-full w-64 z-50
        bg-white dark:bg-[#0f0f1e] 
        border-r border-gray-200 dark:border-gray-800 
        p-6 flex flex-col gap-4
        transform transition-transform duration-300 ease-in-out
        md:static md:translate-x-0 md:h-auto`}
    >
      <nav className="space-y-4">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150
       hover:shadow-blue-500/30 hover:scale-[1.02]

            ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            }`
            }
          >
            <Icon size={20} />
            <span className="text-white">{label}</span>
          </NavLink>
        ))}

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
