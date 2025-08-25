import React from "react";
import CardEdit from "@components/cards/CardEdit";
import Header from "@components/common/Header";

const CardEditPage = () => (
  <div className="container">
    <Header />
    <h1>Edit Card</h1>
    <CardEdit />
  </div>
);

export default CardEditPage;
