import loadGithubRepo from "./github-loader.js";
import generateDocSummary from "./generateDocSummary.js";
import embedSummary from "./embedSummary.js";
import { getMongoCollection } from "./mongodb.js";
import getRepoId from "./repoId.js";

export default async function indexRepo(githubURL, githubToken) {
  const repoId = getRepoId(githubURL);
  console.log("Loading/fetching github repo...");
  const docsArray = await loadGithubRepo(githubURL, githubToken);
  console.log("Github repo fetched...", docsArray.length, "Files found");

  const documents = [];
  for (const doc of docsArray) {
    const summary = await generateDocSummary(doc);
    const embedding = await embedSummary(summary);

    documents.push({
      repoId,
      fileName: doc.metadata.source,
      summary,
      sourceCode: doc.pageContent,
      embedding,
      updatedAt: new Date(),
    });
  }

  const collection = await getMongoCollection();
  await collection.deleteMany({ repoId });

  if (documents.length > 0) {
    await collection.insertMany(documents);
  }
  console.log(`Indexed ${documents.length} files for ${repoId} in MongoDB Atlas`);
}
