export interface IUser {
  id: string;
  name: string;
  role: string;
  gender: string;
  servantPrepYear: number;
  status?: string;
  pfpUrl?: string;
}
export interface IUserDetails {
  id: string;
  name: string;
  password: string;
  gender: string;
  servantPrepYear: number;
  userName: string;
  birthdate: string;
  address: string;
  whatsapp: string;
  phoneNumber: string;
  homeNumber: string;
  schoolName: string;
  eductaionType: string;
  educationYear: number;
  confessionFather: string;
  litrugyDate: Date;
  serviceType: string;
  pfpUrl?: string;
}
