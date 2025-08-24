import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();
const port = 5174;
app.use(cors());
app.use(express.json());

const db = new Database("./data.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    notes TEXT,
    tokens TEXT
  );
`);

app.get("/api/cards", (req, res) => {
  const cards = db.prepare("SELECT * FROM cards ORDER BY id DESC").all();
  res.json(cards);
});

app.post("/api/cards", (req, res) => {
  const { front, back, notes, tokens } = req.body;
  const stmt = db.prepare(
    "INSERT INTO cards (front, back, notes, tokens) VALUES (?, ?, ?, ?)"
  );
  const result = stmt.run(front, back, notes, tokens);
  res.json({ id: result.lastInsertRowid });
});

app.delete("/api/cards/:id", (req, res) => {
  const id = req.params.id;
  db.prepare("DELETE FROM cards WHERE id = ?").run(id);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
