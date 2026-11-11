import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// GET /health - Sunucu sağlık kontrolü
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501803"
  });
});

// /events rotaları
app.use("/events", eventRoutes);

// Tanımsız rota (404)
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;