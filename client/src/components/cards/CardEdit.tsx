import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCards, addCard, deleteCard } from "@api/index";
import type { Card } from "@type/index";

const CardEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    fetchCards().then((cards) => {
      const found = cards.find((c) => c.id === Number(id));
      if (found) setCard(found);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!card) return;
    await deleteCard(card.id);
    await addCard(card);
    navigate("/");
  };

  return card ? (
    <form className="form" onSubmit={handleSubmit}>
      <input
        value={card.front}
        onChange={(e) => setCard({ ...card, front: e.target.value })}
      />
      <input
        value={card.back}
        onChange={(e) => setCard({ ...card, back: e.target.value })}
      />
      <textarea
        value={card.notes}
        onChange={(e) => setCard({ ...card, notes: e.target.value })}
      />
      <button type="submit" className="button primary">
        Save
      </button>
    </form>
  ) : (
    <p>Loading...</p>
  );
};

export default CardEdit;
