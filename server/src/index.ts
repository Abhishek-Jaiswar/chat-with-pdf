import express, { type Request, type Response } from "express";
import cors from "cors";
import { upload } from "./middleware/multer.middleware.js";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  return res.json({
    message: "All good",
  });
});

app.post("/upload/pdf", upload.single("file"), (req: Request, res: Response) => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  return res.json({
    file: {
      name: uploadedFile.originalname,
      size: uploadedFile.size,
      path: uploadedFile.path,
    },
  });
});

app.listen(8080, () => {
  console.log(`Server is listening on port http://localhost:8080`);
});
