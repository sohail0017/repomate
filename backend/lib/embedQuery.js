import { getGeminiClient } from "./geminiClient.js";

export default async function embedQuery(userQuery) {
  console.log("Generating Embeddings for query...");
  const response = await getGeminiClient().models.embedContent({
    model: "gemini-embedding-2",
    contents: [userQuery],
  });

  return response.embeddings[0].values;
}

// let queryEmbed = await embedQuery("PDF related code?")
// console.log(queryEmbed)
