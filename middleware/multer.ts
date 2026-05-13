import multer from "multer";
const multerInstance = multer({ storage: multer.memoryStorage() });
export default multerInstance;
