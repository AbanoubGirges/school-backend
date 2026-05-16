import multer from "multer";
const multerInstance = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/gif",
            "audio/mpeg",
            "audio/wav",
            "audio/ogg",
            "audio/m4a",
            "audio/mp3",
            "video/mp4",
            "video/avi",
            "video/mov",
            "video/wmv",
            "document/pdf",
            "document/doc",
            "document/docx",
            "document/rtf",
            "document/txt",
            "document/pptx",
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("INVALID_FILE_TYPE"));
        }
    },
});
export default multerInstance;
