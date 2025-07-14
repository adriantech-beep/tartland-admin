import { useState } from "react";
import { Package, FlaskConical, PillBottle } from "lucide-react";
import StockTable from "../components/StockTable";

export default function StockPage() {
  const [flavors, setFlavors] = useState([
    { name: "Choco Crunch", bundles: 12 },
    { name: "Peanut Flakes", bundles: 8 },
  ]);

  return (
    <div className="space-y-8">
      {/* Inbound Stock Form */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-4">
          📦 Inbound Stock Delivery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Flakes (Boxes)</label>
            <input
              type="number"
              placeholder="e.g., 2"
              className="w-full p-2 rounded bg-gray-800 text-white border border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Choco (kg)</label>
            <input
              type="number"
              placeholder="e.g., 5"
              className="w-full p-2 rounded bg-gray-800 text-white border border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Jars (pcs)</label>
            <input
              type="number"
              placeholder="e.g., 100"
              className="w-full p-2 rounded bg-gray-800 text-white border border-blue-500"
            />
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          ➕ Add Stock
        </button>
      </section>

      {/* Current Stock Summary */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-4">
          📊 Current Stock Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StockCard label="Flake Bags" value="84" icon={Package} />
          <StockCard label="Choco (kg)" value="20" icon={FlaskConical} />
          <StockCard label="Jars" value="240" icon={PillBottle} />
        </div>
      </section>

      {/* Bundled Flavors Made */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-4">
          🍫 Bundled Flavors Made Today
        </h2>
        <div className="overflow-x-auto bg-[#0f172a] p-4 rounded-xl border border-blue-700">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase text-blue-400 border-b border-blue-700">
              <tr>
                <th className="py-2">Flavor</th>
                <th className="py-2">Bundles</th>
                <th className="py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {flavors.map((flavor, i) => (
                <tr key={i} className="border-b border-gray-700">
                  <td className="py-2">{flavor.name}</td>
                  <td className="py-2">{flavor.bundles}</td>
                  <td className="py-2">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <StockTable />
    </div>
  );
}

function StockCard({ label, value, icon: Icon }) {
  return (
    <div className="bg-[#0f172a] p-4 rounded-xl border border-blue-700 flex items-center gap-4">
      <Icon size={28} className="text-blue-400" />
      <div>
        <h4 className="text-sm text-gray-400">{label}</h4>
        <p className="text-2xl font-bold text-blue-300">{value}</p>
      </div>
    </div>
  );
}
