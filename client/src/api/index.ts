import axios from "axios";
import type { Card } from "@type/index";

export async function fetchCards(): Promise<Card[]> {
  const { data } = await axios.get("/api/cards");
  return data;
}

export async function addCard(card: Partial<Card>) {
  return axios.post("/api/cards", card);
}

export async function deleteCard(id: number) {
  return axios.delete(`/api/cards/${id}`);
}
