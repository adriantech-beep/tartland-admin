import DashboardCard from "../components/DashboardCard";

import {
  Package,
  FlaskConical,
  PillBottle,
  FlaskRound,
  AlertTriangle,
  PackageCheck,
} from "lucide-react";
import ProductionChart from "../components/ProductionChart";

export default function Dashboard() {
  return (
    <div className="flex flex-col justify-between">
      <div className="mb-4">
        <h1 className="text-3xl font-bold font-audiowide text-blue-400">
          👋 Hello, Admin
        </h1>
        <p className="text-sm text-gray-400">
          Today is {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Inventory Cards Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-blue-300">
          📦 Inventory Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Use DashboardCard component */}

          <DashboardCard
            title="Flake Bags Remaining"
            value="85 bags"
            icon={Package}
            color="blue"
          />
          <DashboardCard
            title="Choco Remaining"
            value="20 kg"
            icon={FlaskConical}
            color="green"
          />
          <DashboardCard
            title="Empty Jars Remaining"
            value="140 jars"
            icon={PillBottle}
            color="blue"
          />
          <DashboardCard
            title="Mixtures Left"
            value="28 mixtures"
            icon={FlaskRound}
            color="yellow"
          />
          <DashboardCard
            title="Estimated Output"
            value="560 jars"
            icon={PackageCheck}
            color="green"
          />
          <DashboardCard
            title="Stock Alert"
            value="LOW: Jars"
            icon={AlertTriangle}
            color="red"
          />
        </div>
      </div>

      <section>
        <ProductionChart />
      </section>

      <div>
        <h2 className="text-lg font-semibold mb-2 text-red-400">🚨 Alerts</h2>
        <div className="p-4 bg-red-100 text-red-800 rounded-md border border-red-300">
          Jars stock is critically low. Consider restocking.
        </div>
      </div>
    </div>
  );
}
