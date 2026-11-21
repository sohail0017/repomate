import { getMongoCollection } from "./mongodb.js";

export default async function searchCodebase(queryEmbedding, repoId, limit = 5) {
  const collection = await getMongoCollection();

  return collection
    .aggregate([
      {
        $vectorSearch: {
          index: "embedding_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit,
          filter: {
            repoId: { $eq: repoId },
          },
        },
      },
      {
        $project: {
          _id: 0,
          fileName: 1,
          sourceCode: 1,
          summary: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ])
    .toArray();
}