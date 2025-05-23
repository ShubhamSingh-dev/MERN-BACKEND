import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload"; //during file upload makes a temporary file in the system
import bodyParser from "body-parser";

import ConnectDB from "./config/db.config.js";
import userRoutes from "./routes/user.routes.js";
import videoRoutes from "./routes/video.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
ConnectDB();

app.use(bodyParser.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/video", videoRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
