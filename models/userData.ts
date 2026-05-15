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
  educationType: string;
  educationYear: number;
  confessionFather: string;
  liturgyDate: Date;
  serviceType: string;
  pfpUrl?: string;
}
