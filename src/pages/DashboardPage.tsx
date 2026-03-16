import { useState, useCallback } from "react";
import Banner from "../components/Banner";
import Sidebar from "../components/Sidebar";
import PongCanvas from "../components/PongCanvas";

export default function DashboardPage() {
  const [score, setScore] = useState({ p1: 0, p2: 0 });

  const handleScore = useCallback((p1: number, p2: number) => {
    setScore({ p1, p2 });
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Top banner */}
      <Banner />

      {/* Body: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Live Match</h1>
              <p className="text-sm text-gray-500 mt-1">Match in progress…</p>
            </div>

            {/* Score */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Player 1
                </p>
                <span className="text-4xl font-bold text-gray-900 tabular-nums">
                  {score.p1}
                </span>
              </div>

              <span className="text-2xl font-light text-gray-300">vs</span>

              <div className="text-center">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Player 2
                </p>
                <span className="text-4xl font-bold text-gray-900 tabular-nums">
                  {score.p2}
                </span>
              </div>
            </div>

            {/* Canvas */}
            <PongCanvas onScore={handleScore} />

            <p className="mt-4 text-xs text-gray-400 text-center">
              Simulation mode — AI vs AI
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
