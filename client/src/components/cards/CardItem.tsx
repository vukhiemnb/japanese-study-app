import React from "react";
import type { Card } from "@type/index";

interface Props {
  card: Card;
  onDelete: (id: number) => void;
}

const CardItem: React.FC<Props> = ({ card, onDelete }) => (
  <div className="card-item">
    <div className="front">{card.front}</div>
    <div className="back">{card.back}</div>
    {card.notes && <div className="notes">{card.notes}</div>}
    <button className="button ghost" onClick={() => onDelete(card.id)}>
      Delete
    </button>
  </div>
);

export default CardItem;
