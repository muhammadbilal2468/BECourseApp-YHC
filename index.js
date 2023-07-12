import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Courses from "./routes/CoursesRoute.js";
import Materials from "./routes/MaterialsRoute.js";
import db from "./config/Database.js";
dotenv.config();

const app = express();

// await db.sync();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(Courses);
app.use(Materials);

app.listen(process.env.APP_PORT, () => {
  console.log("Server berjalan.......");
});
