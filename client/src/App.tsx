import { useEffect, useState } from "react";
import { fetchCards, addCard, deleteCard } from "./api";
import type { Card } from "./types";

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await fetchCards();
    setCards(data);
  }

  async function handleAdd() {
    await addCard({ front, back });
    setFront("");
    setBack("");
    load();
  }

  async function handleDelete(id: number) {
    await deleteCard(id);
    load();
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🇯🇵 Japanese Learning App</h1>
      <div>
        <input
          value={front}
          onChange={(e) => setFront(e.target.value)}
          placeholder="Japanese"
        />
        <input
          value={back}
          onChange={(e) => setBack(e.target.value)}
          placeholder="Meaning"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <strong>{card.front}</strong> - {card.back}
            <button onClick={() => handleDelete(card.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
