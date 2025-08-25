import React, { useEffect, useState } from "react";
import { fetchCards } from "@api/index";
import type { Card } from "@type/index";
import FlipCardItem from "@components/flipcards/FlipCardItem";
import Header from "@components/common/Header";

const FlipCardPage: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCards()
      .then((data) => {
        console.log("Fetched cards:", data);
        setCards(data);
      })
      .catch((err) => {
        console.error("Failed to fetch cards:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const validCards = cards.filter(
    (card) => card.front?.trim() && card.back?.trim()
  );

  return (
    <div className="container">
      <Header />
      <h1>Study Mode</h1>

      {loading ? (
        <p>Loading cards...</p>
      ) : validCards.length === 0 ? (
        <p>No valid cards to study. Please add some cards first.</p>
      ) : (
        <div className="flipcard-grid">
          {validCards.map((card) => (
            <FlipCardItem key={card.id} front={card.front} back={card.back} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FlipCardPage;
