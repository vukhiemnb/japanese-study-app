import React, { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import "./../../styles/flipcard.css";

type Props = {
  front: string;
  back: string;
};

const FlipCardItem: React.FC<Props> = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(front);
    utterance.lang = "ja-JP";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={`flip-card ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="flip-corner" />
          <div className="flip-card-content">
            <button
              className="tts-button"
              onClick={(e) => {
                e.stopPropagation();
                speak();
              }}
            >
              <FaVolumeUp />
            </button>
            <br />
            <span>{front}</span>
          </div>
        </div>
        <div className="flip-card-back">
          {/* <div className="flip-corner" /> */}
          <span>{back}</span>
        </div>
      </div>
    </div>
  );
};

export default FlipCardItem;
