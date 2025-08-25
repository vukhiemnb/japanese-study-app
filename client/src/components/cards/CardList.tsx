import React, { useEffect, useState } from "react";
import { fetchCards, deleteCard } from "@api/index";
import type { Card } from "@type/index";
import CardItem from "./CardItem";
import "./../../styles/card.css";

const CardList: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  const load = async () => setCards(await fetchCards());

  const handleDelete = async (id: number) => {
    await deleteCard(id);
    await load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="card-list">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default CardList;
