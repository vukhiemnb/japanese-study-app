import React from "react";
import CardCreate from "@components/cards/CardCreate";
import Header from "@components/common/Header";

const CardCreatePage = () => (
  <div className="container">
    <Header />
    <h1>Create Card</h1>
    <CardCreate />
  </div>
);

export default CardCreatePage;
