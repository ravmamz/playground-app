import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { label: "Dashboard", icon: "▦" },
  { label: "Profile", icon: "◉" },
  { label: "Leaderboard", icon: "◈" },
  { label: "Game History", icon: "◎" },
  { label: "Settings", icon: "⚙" },
  { label: "Account", icon: "◷" },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-56 shrink-0 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-gray-100">
        <span className="font-bold text-gray-900 tracking-widest text-lg">
          PONG
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item.label}
            onClick={() => {}}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition cursor-pointer
              ${
                i === 0
                  ? "bg-gray-900 text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            title={i !== 0 ? "Coming soon" : undefined}
          >
            <span className="text-base leading-none">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
        >
          <span className="text-base leading-none">⎋</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
