
import searchCodebase from "./loadCodebaseEmbeddings.js";
import embedQuery from "./embedQuery.js";

export default async function queryCodebase(userQuery, repoId) {

  // Step 1: Generate question embedding
  const queryEmbedding = await embedQuery(userQuery);

  // Step 2: Search MongoDB
  const codebaseResults = await searchCodebase(
    queryEmbedding,
    repoId
  );

  // Step 3: Map results
  const resultArr = codebaseResults.map((fileObj) => ({
    fileName: fileObj.fileName,
    sourceCode: fileObj.sourceCode,
    fileSummary: fileObj.summary,
    similarityScore: fileObj.score,
  }));

  return resultArr;
}
