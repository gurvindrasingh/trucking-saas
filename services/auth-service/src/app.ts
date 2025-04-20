import express from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api", authRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;