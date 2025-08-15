// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EnterNumbers from "./pages/EnterNumbers";
import PreviousTrees from "./pages/PreviousTrees";
import ProcessNumbers from "./pages/ProcessNumbers";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enter" element={<EnterNumbers />} />
          <Route path="/previous-trees" element={<PreviousTrees />} />
          <Route path="/process-numbers" element={<ProcessNumbers />} />
        </Routes>
      </main>
    </div>
  );
}
