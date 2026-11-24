const fs = require("fs/promises");
const path = require("path");

const UPLOAD_DIR = path.join(__dirname, "public", "uploads");
const DEFAULT_FILE = "default.jpg";

/** Save an express-fileupload file under public/uploads and return the stored file name. */
async function saveUpload(file) {
    const safeName = path.basename(file.name).replace(/[^\w.-]/g, "_");
    const fileName = `${Date.now()}_${safeName}`;
    await file.mv(path.join(UPLOAD_DIR, fileName));
    return fileName;
}

/** Delete a previously uploaded file; missing files and the default image are ignored. */
async function removeUpload(fileName) {
    if (!fileName || fileName === DEFAULT_FILE) return;
    await fs.rm(path.join(UPLOAD_DIR, path.basename(fileName)), { force: true });
}

module.exports = { saveUpload, removeUpload };
