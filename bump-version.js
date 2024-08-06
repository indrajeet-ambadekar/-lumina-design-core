const fs = require("fs");

// Read the package.json file
fs.readFile("package.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading package.json:", err);
    return;
  }

  // Parse the JSON data
  const packageJson = JSON.parse(data);

  // Split the version into parts
  const versionParts = packageJson.version.split(".");

  // Increment the last part of the version
  versionParts[2] = parseInt(versionParts[2], 10) + 1;

  // Join the parts back together
  const newVersion = versionParts.join(".");

  // Update the version in the packageJson object
  packageJson.version = newVersion;

  // Write the updated package.json back to the file
  fs.writeFile(
    "package.json",
    JSON.stringify(packageJson, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing package.json:", err);
        return;
      }
      console.log(`Version bumped to ${newVersion}`);
    }
  );
});
