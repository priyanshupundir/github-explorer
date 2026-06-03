import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");

  return (
    <div>
      <h1>GitHub Explorer</h1>

      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button>Search</button>
    </div>
  );
}

export default App;