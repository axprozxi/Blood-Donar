
export enum BloodGroup {
  APositive = 'A+',
  ANegative = 'A-',
  BPositive = 'B+',
  BNegative = 'B-',
  ABPositive = 'AB+',
  ABNegative = 'AB-',
  OPositive = 'O+',
  ONegative = 'O-',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum Religion {
  Islam = 'Islam',
  Hinduism = 'Hinduism',
  Christianity = 'Christianity',
  Buddhism = 'Buddhism',
  Other = 'Other',
}


export interface Donor {
  id: number;
  name: string;
  bloodGroup: BloodGroup;
  age: number;
  gender: Gender;
  district: string;
  upazila: string;
  phone: string;
  avatar: string;
  dob: string; // YYYY-MM-DD
  email: string;
  donationCount?: number;
  religion?: Religion;
  facebook?: string;
  whatsapp?: string;
  otherSocial?: string;
  about?: string;
}

export type Page = 'home' | 'find' | 'register' | 'about' | 'contact' | 'terms' | 'privacy' | 'whyDonate';