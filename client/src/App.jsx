import { useState } from "react";
import ProfileViewer from "./components/ProfileViewer";
import NavButton from "./components/NavButton";

function App() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <nav className="bg-[#161b22] border-b border-[#30363d] sticky top-0 z-50 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              🐙 GitHub Explorer
            </h1>

            <NavButton
              onClick={() => setActiveTab("profile")}
              isActive={activeTab === "profile"}
            >
              Profile Viewer
            </NavButton>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto">
        {activeTab === "profile" && <ProfileViewer />}
      </main>
    </div>
  );
}

export default App;