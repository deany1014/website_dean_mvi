// Made by Google AI
// This script dynamically generates a configuration file for Chrome DevTools to map the workspace to the current project directory. It ensures that the workspace identity remains consistent across different machines by using a persistent UUID.

const fs = require('fs');
const path = require('path');

// 1. Detect current absolute path and convert backslashes to forward slashes for Windows compatibility
const projectRoot = process.cwd().replace(/\\/g, '/');
const targetDir = path.join(__dirname, '.well-known', 'appspecific');

// 2. Ensure the nested directories exist
fs.mkdirSync(targetDir, { recursive: true });

// 3. Construct the dynamic config payload with a persistent UUID
const config = {
  workspace: {
    root: projectRoot,
    uuid: "4f9d2b1a-8c3e-4d5b-9a7c-6e8f0a1b2c3d" // Keeps the same workspace identity across your PCs
  }
};

// 4. Write out the clean JSON file
fs.writeFileSync(path.join(targetDir, 'com.chrome.devtools.json'), JSON.stringify(config, null, 2));
console.log(`✅ DevTools path mapped dynamically to: ${projectRoot}`);
