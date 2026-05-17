export interface IUser {
  id: string;
  name: string;
  role: string;
  gender: string;
  servantPrepYear: string;
  status?: string;
  pfpUrl?: string;
}
export interface IUserDetails {
  id: string;
  name: string;
  password: string;
  gender: string;
  servantPrepYear: string;
  userName: string;
  birthdate: Date;
  address: string;
  whatsapp: string;
  phoneNumber: string;
  homeNumber: string| null;
  schoolName: string;
  educationType: string;
  educationYear: string;
  confessionFather: string;
  liturgyDate: Date;
  serviceType: string;
  pfpUrl?: string;
}
