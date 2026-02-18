export default function StatCard({ title, value, color }) {
  const colorMap = {
    green: "text-green-600",
    red: "text-red-600",
    blue: "text-blue-600",
    yellow: "text-yellow-500"
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${colorMap[color]}`}>
        {value}
      </p>
    </div>
  );
}
