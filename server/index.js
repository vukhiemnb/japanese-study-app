import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5174;
app.use(cors());
app.use(express.json());

app.listen(port, "0.0.0.0", () => {
  console.log(`✅ API running on ${process.env.DB_HOST}:${port}`);
});

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// ✅ Connect to MySQL (adjust user/password/db)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/api/cards", async (req, res) => {
  try {
    console.log("GET /api/cards");
    const [rows] = await pool.query("SELECT * FROM cards ORDER BY id DESC");
    res.json(rows); // ✅ This will return [] if no cards exist
  } catch (err) {
    console.error("GET /api/cards failed:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/cards", async (req, res) => {
  try {
    const { front, back, notes = "", tokens = "" } = req.body;
    const [result] = await pool.query(
      "INSERT INTO cards (front, back, notes, tokens) VALUES (?, ?, ?, ?)",
      [front, back, notes, tokens]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error("POST /api/cards failed:", err.message);
    res.status(500).json({ error: "Insert failed" });
  }
});

app.delete("/api/cards/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM cards WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/cards failed:", err.message);
    res.status(500).json({ error: "Delete failed" });
  }
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    console.log("✅ MySQL connection successful!");
    conn.release();
  } catch (err) {
    console.error("❌ Failed to connect to MySQL:", err.message);
    process.exit(1);
  }
}

testConnection(); // Run this once at startup
