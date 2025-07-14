const rawMaterials = [
  {
    name: "Flakes",
    image: "/assets/flakes.png",
    available: 84,
    used: 9,
    unit: "bags",
  },
  {
    name: "Choco",
    image: "/assets/choco.png",
    available: 22,
    used: 5,
    unit: "kg",
  },
  {
    name: "Jars",
    image: "/assets/jars.png",
    available: 200,
    used: 150,
    unit: "pcs",
  },
];

const StockTable = () => {
  return (
    <div className="overflow-x-auto bg-[#0f172a] p-4 rounded-xl border border-blue-700 text-white">
      <h2 className="text-xl font-semibold text-blue-300 mb-4">
        📦 Raw Materials Overview
      </h2>
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-blue-400 text-xs border-b border-blue-600">
          <tr>
            <th className="py-2">Image</th>
            <th>Material</th>
            <th>Available</th>
            <th>Used Today</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {rawMaterials.map((item, i) => (
            <tr key={i} className="border-b border-gray-700">
              <td className="py-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.available}</td>
              <td>{item.used}</td>
              <td>{item.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
