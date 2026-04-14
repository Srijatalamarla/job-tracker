export default function StatusBadge({ status }) {
    const statusStyles = {
        Applied: "bg-blue-100 text-blue-700",
        Interview: "bg-yellow-100 text-yellow-700",
        Rejected: "bg-red-100 text-red-700",
        Selected: "bg-green-100 text-green-700",
        Offered: "bg-purple-100 text-purple-700",
    };

    const currentColor = statusStyles[status] || "bg-gray-100 text-gray-700"
    return (
        <span className={`px-2 py-1 rounded-full text-sm font-semibold transition-colors transition-duration-300 ease-in-out ${currentColor}`}>
            {status}
        </span>
        
    )
}