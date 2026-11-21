import "dotenv/config";
import express from "express";
import cors from "cors";
import indexRepo from "./lib/indexRepo.js";
import askQuestion from "./lib/askQuestion.js";


const app = express();
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json());

app.post("/add-repo", async (req, res) => {
  try {
    const { githubURL, githubToken } = req.body;
    await indexRepo(githubURL, githubToken);

    res.json({
      message:
        "Repo Indexed successfully, ✅ Embeddings generated and saved to embeddings.json",
    });
  } catch (error) {
    console.error("Repository indexing failed:", error);
    res.status(500).json({ message: "Repository indexing failed" });
  }
});

app.post("/ask-question", async (req, res) => {
  try {
    const { userQuery } = req.body;

    console.log("request recieved");
    const { AI_Summary, relaventFiles } = await askQuestion(userQuery);

    res.json({
      message: "query answer generated successfully",
      AI_Summary,
      relaventFiles,
    });
  } catch (error) {
    console.error("Question answering failed:", error);
    res.status(500).json({ message: "Question answering failed" });
  }
});

app.listen("8080", () => {
  console.log("Server is listening on port 8080");
});
