const fs = require('fs');
const path = require('path');

// Define the modular project directory
const projectDir = path.join(__dirname, 'my-modular-project'); // Change this to your modular project folder

// Define the output setup file
const outputFile = path.join(__dirname, 'setup.js');

// Function to read modules and append their code to the setup file
const gatherModules = () => {
  let setupContent = `'use strict';\n\n// Setup Script for Modular Project\n\n`;

  // Read the project directory
  fs.readdir(projectDir, (err, files) => {
    if (err) {
      console.error('Error reading project directory:', err);
      return;
    }

    // Iterate over each file in the directory
    files.forEach((file) => {
      const filePath = path.join(projectDir, file);

      // Only process .js files
      if (path.extname(file) === '.js') {
        // Read the file content
        const code = fs.readFileSync(filePath, 'utf-8');
        setupContent += `// Module: ${file}\n${code}\n\n`;
      }
    });

    // Write the gathered code to the setup file
    fs.writeFileSync(outputFile, setupContent, 'utf-8');
    console.log(`Setup script created at ${outputFile}`);
  });
};

// Run the gatherModules function
gatherModules();
