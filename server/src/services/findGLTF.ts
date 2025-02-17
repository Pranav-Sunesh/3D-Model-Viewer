import fs from "fs";
import path from "path";

export const findGLTFFile = (dir: string): string | null => {
  for (const file of fs.readdirSync(dir)) {
    if (path.extname(file).toLowerCase() === ".gltf") return file;
    const subDir = path.join(dir, file);
    if (fs.statSync(subDir).isDirectory()) {
      const found = findGLTFFile(subDir);
      if (found) return found;
    }
  }
  return null;
};
