import { body } from "express-validator";
const registerValidator = [
    body("userName").notEmpty(),
    body("password").notEmpty(),
    body("name").notEmpty(),
    body("gender").notEmpty(),
    body("birthdate").notEmpty(),
    body("address").notEmpty(),
    body("whatsapp").notEmpty(),
    body("phoneNumber").notEmpty(),
    body("homeNumber").notEmpty(),
    body("schoolName").notEmpty(),
    body("educationType").notEmpty(),
    body("educationYear").notEmpty(),
    body("confessionFather").notEmpty(),
    body("liturgyDate").notEmpty(),
    body("servantPrepYear").notEmpty(),
    body("serviceType").notEmpty(),
];
const loginValidator = [
    body("userName").notEmpty(),
    body("password").notEmpty(),
];
export { loginValidator };
export default registerValidator;
