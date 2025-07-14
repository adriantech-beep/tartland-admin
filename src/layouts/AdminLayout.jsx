import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="grid grid-cols-12 grid-rows-12 gap-4 min-h-screen bg-gray-50 dark:bg-[#0f0f1e] text-gray-800 dark:text-white">
      <Header />
      <Sidebar />

      <main className="w-full col-span-10 row-span-11 col-start-3 row-start-2 overflow-auto p-2">
        <Outlet />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="z-50"
      />
    </div>
  );
};

export default AdminLayout;
