import { useState } from "react";
import { Info } from "lucide-react";

const flavors = [
  { name: "Pure White", info: "3 bags of flakes per mixture (no choco)" },
  { name: "Choco Crunch", info: "3 flakes + 2kg choco (4 choco bags)" },
  { name: "Peanut Flakes", info: "3 flakes + 2kg choco (4 choco bags)" },
  { name: "Ube Delight", info: "3 flakes + 2kg choco (4 choco bags)" },
];

// 🆕 Reusable Card Component
function InventoryCard({ label, icon, current, max, unit }) {
  const percent = (current / max) * 100;
  const isLow = current < max * 0.2;
  return (
    <div className="bg-gray-900 p-4 rounded-xl border border-blue-600 shadow space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-blue-400 font-semibold text-sm">
          {icon} {label}
        </span>
        <span className="text-xs text-gray-400">
          {current} {unit}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-700 rounded overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isLow ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      <p className="text-xs text-gray-500">{percent.toFixed(1)}% in stock</p>
    </div>
  );
}

export default function ProductionPage() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({ flavor: "", mixtures: 0, type: "jars" });

  const [stock, setStock] = useState({
    flakes: 630, // In bags
    choco: 300, // In bags
    jars: 2100, // In pieces
  });

  // Constants
  const JARS_PER_MIXTURE = 11.31;
  const JARS_PER_BAG = 85;
  const FLAKES_PER_MIXTURE = 3;
  const CHOCO_PER_MIXTURE = 4;
  const BAGS_PER_BOX = 14;

  const selectedFlavorInfo = flavors.find((f) => f.name === form.flavor)?.info;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLog = () => {
    const { flavor, mixtures, type } = form;
    const m = parseFloat(mixtures);
    if (!flavor || m <= 0) return;

    const isChoco =
      flavor.toLowerCase().includes("choco") ||
      flavor.toLowerCase().includes("ube") ||
      flavor.toLowerCase().includes("peanut");
    const usedFlakes = m * FLAKES_PER_MIXTURE;
    const usedChoco = isChoco ? m * CHOCO_PER_MIXTURE : 0;
    const outputJars = +(m * JARS_PER_MIXTURE).toFixed(2);
    const outputBundles = +(outputJars / JARS_PER_BAG).toFixed(2);
    const output = type === "bundles" ? outputBundles : outputJars;

    if (
      usedFlakes > stock.flakes ||
      usedChoco > stock.choco ||
      outputJars > stock.jars
    ) {
      alert("⚠️ Not enough stock to process this production.");
      return;
    }

    const leftover = {
      flakes: (usedFlakes % BAGS_PER_BOX).toFixed(2),
      choco: isChoco ? (usedChoco % BAGS_PER_BOX).toFixed(2) : "0.00",
      jars: (outputJars % JARS_PER_BAG).toFixed(2),
    };

    const shortfallToFullBag = JARS_PER_BAG - (outputJars % JARS_PER_BAG);
    const nextOutput = JARS_PER_MIXTURE;

    setStock((prev) => ({
      flakes: prev.flakes - usedFlakes,
      choco: prev.choco - usedChoco,
      jars: prev.jars - outputJars,
    }));

    setLogs((prev) => [
      ...prev,
      {
        ...form,
        output,
        used: { flakes: usedFlakes, choco: usedChoco, jars: outputJars },
        leftover,
        shortfallToFullBag: shortfallToFullBag.toFixed(2),
        simulatedExtraOutput: nextOutput.toFixed(2),
        simulatedExtraJars: (outputJars + nextOutput).toFixed(2),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      },
    ]);

    setForm({ flavor: "", mixtures: 0, type: "jars" });
  };

  console.log(logs.leftover);

  return (
    <div className="space-y-10">
      {/* 🧪 Production Input */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-4">
          🧪 Log Today's Production
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="col-span-2 relative">
            <select
              name="flavor"
              value={form.flavor}
              onChange={handleChange}
              className="p-2 w-full bg-gray-800 border border-blue-500 text-white rounded"
            >
              <option value="">-- Select Flavor --</option>
              {flavors.map((f, i) => (
                <option key={i} value={f.name}>
                  {f.name}
                </option>
              ))}
            </select>
            {form.flavor && (
              <p className="text-xs text-gray-400 mt-1">
                <Info size={12} className="inline mr-1" />
                {selectedFlavorInfo}
              </p>
            )}
          </div>

          <input
            type="number"
            name="mixtures"
            value={form.mixtures}
            onChange={handleChange}
            placeholder="e.g. 5"
            className="p-2 bg-gray-800 border border-blue-500 text-white rounded"
          />
          <p className="text-xs text-gray-400"># of mixtures</p>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="p-2 bg-gray-800 border border-blue-500 text-white rounded"
          >
            <option value="jars">Jars</option>
            <option value="bundles">Bundles</option>
          </select>

          <button
            onClick={handleAddLog}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ➕ Add Log
          </button>
        </div>
      </section>

      {/* 🧾 Inventory Summary - NEW UI */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-4">
          📦 Current Inventory
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InventoryCard
            label="Flakes"
            icon="🥣"
            current={stock.flakes}
            max={700}
            unit="bags"
          />
          <InventoryCard
            label="Choco"
            icon="🍫"
            current={stock.choco}
            max={400}
            unit="bags"
          />
          <InventoryCard
            label="Jars"
            icon="🫙"
            current={stock.jars}
            max={2500}
            unit="pcs"
          />
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-4">
          📦 Raw Material Tracker
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {/* Flakes */}
          <div className="bg-gray-900 p-4 rounded border border-blue-600 space-y-1">
            <h3 className="text-blue-400 font-medium">🥣 Flakes</h3>
            <p>Current: {stock.flakes.toFixed(2)} bags</p>
            <p>🔁 Can produce: {(stock.flakes / 3).toFixed(0)} mixtures</p>
          </div>

          {/* Choco */}
          <div className="bg-gray-900 p-4 rounded border border-blue-600 space-y-1">
            <h3 className="text-blue-400 font-medium">🍫 Choco</h3>
            <p>Current: {stock.choco.toFixed(2)} bags</p>
            <p>🔁 Can produce: {(stock.choco / 4).toFixed(0)} mixtures</p>
          </div>

          {/* Jars */}
          <div className="bg-gray-900 p-4 rounded border border-blue-600 space-y-1">
            <h3 className="text-blue-400 font-medium">🫙 Jars</h3>
            <p>Current: {stock.jars.toFixed(0)} pcs</p>
            <p>📦 Can fill: {(stock.jars / 85).toFixed(2)} bundles</p>
          </div>
        </div>

        {/* Excess Material Summary */}
        <div className="mt-6 bg-gray-800 p-4 rounded border border-blue-500">
          <h4 className="text-blue-300 font-medium mb-2">
            🧾 Leftovers from Today
          </h4>
          <p>
            🥣 Flakes:{" "}
            {logs
              .reduce((acc, log) => acc + Number(log.leftover.flakes), 0)
              .toFixed(2)}{" "}
            bags
            <br />
            🍫 Choco:{" "}
            {logs
              .reduce((acc, log) => acc + Number(log.leftover.choco), 0)
              .toFixed(2)}{" "}
            bags
            <br />
            🫙 Jars:{" "}
            {logs
              .reduce((acc, log) => acc + Number(log.leftover.jars), 0)
              .toFixed(2)}{" "}
            pcs
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-4">
          📊 Today's Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 p-4 rounded-xl border border-blue-600">
            <h4 className="text-blue-400 text-sm">Mixtures Logged</h4>
            <p className="text-xl font-bold text-white">
              {logs.reduce((acc, log) => acc + Number(log.mixtures), 0)}
            </p>
          </div>
          {/* <div className="bg-gray-900 p-4 rounded-xl border border-blue-600">
            <h4 className="text-blue-400 text-sm">Total Jars Produced</h4>
            <p className="text-xl font-bold text-white">
              {logs
                .reduce((acc, log) => acc + Number(log.used.jars), 0)
                .toFixed(0)}
            </p>
          </div> */}
          <div className="bg-gray-900 p-4 rounded-xl border border-blue-600 space-y-2">
            <h4 className="text-blue-400 text-sm">
              Total Jars & Bundles Produced
            </h4>

            {flavors.map((flavor, i) => {
              const flavorLogs = logs.filter(
                (log) => log.flavor === flavor.name
              );
              const totalJars = flavorLogs.reduce(
                (acc, log) => acc + Number(log.used.jars),
                0
              );
              const jarsPerBox = 18;
              const totalBundles = totalJars / jarsPerBox;
              const totalBagOfJar = totalJars / 85;

              const icon = flavor.name.toLowerCase().includes("choco")
                ? "🍫"
                : flavor.name.toLowerCase().includes("ube")
                ? "🟣"
                : flavor.name.toLowerCase().includes("peanut")
                ? "🥜"
                : "🥣";

              return (
                <div key={i} className="text-sm text-gray-300 leading-tight">
                  <p className="font-medium text-white">
                    {icon} {flavor.name}
                  </p>
                  <p className="ml-4">
                    🫙 {totalJars.toFixed(0)} jars
                    <br />
                    📦 {totalBagOfJar.toFixed(2)} Bag of jar used
                    <br />
                    {Math.round(totalBundles)} Bundles produced
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-blue-600">
            <h4 className="text-blue-400 text-sm">Flakes & Choco Used</h4>
            <p className="text-md font-medium text-gray-300">
              🥣 Flakes:{" "}
              {logs.reduce((acc, log) => acc + Number(log.used.flakes), 0)} bags
              <br />
              🍫 Choco:{" "}
              {logs.reduce((acc, log) => acc + Number(log.used.choco), 0)} bags
            </p>
          </div>
        </div>
      </section>

      {/* 📋 Logs Table */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-4">
          📋 Production Logs
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-blue-400 border-b border-blue-700">
              <tr>
                <th>Flavor</th>
                <th>Mixtures</th>
                <th>
                  Output
                  <br />
                  <span className="text-[10px] text-gray-400">
                    Total jars or bundles
                  </span>
                </th>
                <th>
                  Materials Used
                  <br />
                  <span className="text-[10px] text-gray-400">
                    flakes / choco / jars
                  </span>
                </th>
                <th>
                  Remaining Materials
                  <br />
                  <span className="text-[10px] text-gray-400">
                    leftovers from this run
                  </span>
                </th>
                <th>
                  Needed to Fill
                  <br />
                  <span className="text-[10px] text-gray-400">
                    next full jar bag
                  </span>
                </th>
                <th>
                  Simulate +1 Mixture
                  <br />
                  <span className="text-[10px] text-gray-400">
                    future output estimate
                  </span>
                </th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-700 hover:bg-gray-800 transition"
                >
                  <td>{log.flavor}</td>
                  <td>{log.mixtures}</td>
                  <td>
                    {log.output} {log.type === "bundles" ? "bundles" : "jars"}
                  </td>
                  <td>
                    🥣 Flakes: {log.used.flakes}
                    <br />
                    {log.used.choco > 0 && (
                      <>
                        🍫 Choco: {log.used.choco}
                        <br />
                      </>
                    )}
                    🫙 Jars: {log.used.jars}
                  </td>
                  <td>
                    🥣 Flakes: {log.leftover.flakes}
                    <br />
                    {log.used.choco > 0 && (
                      <>
                        🍫 Choco: {log.leftover.choco}
                        <br />
                      </>
                    )}
                    🫙 Jars: {log.leftover.jars}
                  </td>
                  <td>{log.shortfallToFullBag} jars</td>
                  <td>
                    +{log.simulatedExtraOutput} jars
                    <br />→ Total: {log.simulatedExtraJars}
                  </td>
                  <td>{log.date}</td>
                  <td>{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
