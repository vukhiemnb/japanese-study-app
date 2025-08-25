import React, { useState } from "react";
import { addCard } from "@api/index";
import { useNavigate } from "react-router-dom";

const CardCreate: React.FC = () => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCard({ front, back, notes });
    navigate("/");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
      />
      <button type="submit" className="button primary">
        Create
      </button>
    </form>
  );
};

export default CardCreate;
