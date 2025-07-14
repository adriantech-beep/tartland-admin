const DashboardCard = ({
  title,
  value,
  icon: Icon,
  color = "blue",
  variant = "default",
}) => {
  const cardStyles = {
    default: `p-4 rounded-xl shadow-lg bg-[#0f172a] border-l-4 ${
      color === "blue" && "border-blue-500 text-blue-300"
    } ${color === "green" && "border-green-500 text-green-300"} 
       ${color === "yellow" && "border-yellow-500 text-yellow-300"}
       ${color === "red" && "border-red-500 text-red-300"}`,
  };

  return (
    <div className={cardStyles[variant]}>
      <div className="flex items-center gap-3">
        <Icon size={30} className="opacity-90" />
        <div>
          <h2 className="text-sm tracking-wide font-semibold">{title}</h2>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
