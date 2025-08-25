import React from "react";
import CardList from "@components/cards/CardList";
import Header from "@components/common/Header";

const CardListPage = () => (
  <div className="container">
    <Header />
    <h1>Card List</h1>
    <CardList />
  </div>
);

export default CardListPage;
