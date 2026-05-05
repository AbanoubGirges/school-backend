import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
const password= await bcrypt.hash("4444", 10);
console.log(password);
console.log(process.env.JWT_SECRET);
const users = {
  "user1": {
    "id": "uuid-1",
    "userName": "admin_user",
    "password": "$2b$10$R87O0vTViUPfWEspDmu8cux.ohuACxf6SRzf.n/IkILNN2oUCD3Ui",
    "name": "Ahmed Admin",
    "gender": "MALE",
    "birthdate": "1990-05-15",
    "address": "Cairo, Egypt",
    "role": "ADMIN",
    "whatsapp": 201012345678,
    "phoneNumber": 201012345670,
    "homeNumber": 201234567890,
    "schoolName": "Cairo University",
    "eductaionType": "Bachelor",
    "educationYear": 2010,
    "confessionFather": "Fr. Mina",
    "litrugyDate": "2023-01-01T10:00:00Z",
    "servantPrepYear": 2012,
    "serviceType": "LITURGY",
    "profilePicturePath": "/uploads/admin_user.jpg",
    "status": "APPROVED",
    "registerDate": "2025-01-15T09:30:00Z"
  },
  "user2": {
    "id": "uuid-2",
    "userName": "sarah_user",
    "password": "$2b$10$abcdefghijklmnopqrstuvwxyz1234567890abcdef",
    "name": "Sarah Mohammed",
    "gender": "FEMALE",
    "birthdate": "2005-03-22",
    "address": "Alexandria, Egypt",
    "role": "USER",
    "whatsapp": 201098765432,
    "phoneNumber": 201098765400,
    "homeNumber": 201567890123,
    "schoolName": "Alexandria High School",
    "eductaionType": "High School",
    "educationYear": 2023,
    "confessionFather": "Fr. Kamal",
    "litrugyDate": "2024-06-15T14:30:00Z",
    "servantPrepYear": 2024,
    "serviceType": "CHOIR",
    "profilePicturePath": "/uploads/sarah_user.jpg",
    "status": "PENDING",
    "registerDate": "2026-01-10T11:20:00Z"
  }
}