import multer from "multer";
const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/webp",
    "audio/mpeg",
    "audio/mp4",
    "audio/x-m4a",
    "audio/wav",
    "audio/ogg",
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-ms-wmv",
    "video/webm",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/rtf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];
const multerInstance = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        console.log("Uploading:", file.originalname, "| MIME:", file.mimetype);
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            console.log("Rejected:", file.mimetype);
            cb(new Error(`INVALID_FILE_TYPE: ${file.mimetype}`));
        }
    },
});
export default multerInstance;
