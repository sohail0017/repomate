### Indexing repo by taking github URL
- POST: http://localhost:8080//add-repo
- Body: {
    "githubURL": "https://github.com/ZayeemMohd/small-test", 
    "githubToken: "" 
}
- Response: {
    "message":
      "Repo Indexed successfully, ✅ Embeddings generated and saved to embeddings.json"
  }


### Ask-Question after indexing the codebase

- POST: http://localhost:8080/ask-question
- Body: {
  "userQuery": "what does README.md file have? and what does it says?"
  }
- Response: {
  "message": "query answer generated successfully",
  "AI_Summary": "Hello there! Welcome to the team! I am so excited to help you get familiar with our codebase. As an intern, asking questions about the structure and documentation is a fantastic way to start!\n\nLet's break down exactly what is inside the `README.md` file based on our repository context.\n\n---\n\n### What does the `README.md` file have?\n\nCurrently, the `README.md` file is a minimal repository placeholder. It contains only a single line of Markdown code, which serves as a top-level header. \n\nHere is the exact content of the file:\n\n`markdown\n# small-test\n`\n\n---\n\n### What does it say?\n\nLiterally, the file says:\n* **`# small-test`**\n\nIn terms of what that means for the project right now:\n* It simply states the header title: **small-test**.\n\* Beyond this title, the file currently does **not** contain any operational details, build commands, dependencies, architecture explanations, or usage instructions. \n\nIn standard software development, a `README.md` serves as the primary entry point to explain a project's purpose and setup guidelines. As our project evolves, this file will eventually be expanded to include all the essential onboarding context you and other developers will need!\n\nIf you have any more questions about the repository, feel free to ask. I'm always happy to help!",
  "relaventFiles": [
  {
  "similarityScore": 0.6897979178326228,
  "fileName": "README.md",
  "sourceCode": "# small-test",
  "fileSummary": "This `README.md` file serves as a minimal repository placeholder containing only the top-level header `# small-test`. In software development, a `README.md` acts as the primary entry point for a project, intended to explain its purpose, setup instructions, dependencies, architecture, and usage guidelines to developers. \n\nCurrently, this specific file contains no operational details, build commands, or project documentation beyond the title. Its ultimate purpose in this project will be to house essential context and onboarding information once fully populated."
  }
  ]
  }
