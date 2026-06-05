import { FaGithub } from "react-icons/fa";
import ProfileViewer from "./components/ProfileViewer";

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0d1117] text-[#c9d1d9]">
      <nav className="bg-[#010409] border-b border-[#30363d] sticky top-0 z-50 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <FaGithub className="text-4xl text-white" />
              GitHub Explorer
            </h1>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto">
        <ProfileViewer />
      </main>
    </div>
  );
}

export default App;