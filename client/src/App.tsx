import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardListPage from "@pages/CardListPage";
import CardCreatePage from "@pages/CardCreatePage";
import CardEditPage from "@pages/CardEditPage";
import FlipCardPage from "@pages/FlipCardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CardListPage />} />
        <Route path="/create" element={<CardCreatePage />} />
        <Route path="/edit/:id" element={<CardEditPage />} />
        <Route path="/flip" element={<FlipCardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
