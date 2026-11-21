export default function getRepoId(githubURL) {
  if (typeof githubURL !== "string" || !githubURL.trim()) {
    throw new Error("A GitHub repository URL is required");
  }

  const [owner, rawRepo] = new URL(githubURL).pathname
    .split("/")
    .filter(Boolean);

  if (!owner || !rawRepo) {
    throw new Error("Invalid GitHub repository URL");
  }

  return `${owner}/${rawRepo.replace(/\.git$/i, "")}`;
}