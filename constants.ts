
import { BloodGroup, Donor, Gender, Religion } from './types';
import { UPAZILAS } from './data/upazilas';

export const BLOOD_GROUPS: BloodGroup[] = Object.values(BloodGroup);
export const RELIGIONS: Religion[] = Object.values(Religion);

export const DISTRICTS: string[] = [
  'Bagerhat', 'Bandarban', 'Barguna', 'Barisal', 'Bhola', 'Bogra',
  'Brahmanbaria', 'Chandpur', 'Chapai Nawabganj', 'Chattogram', 'Chuadanga',
  'Comilla', 'Cox\'s Bazar', 'Dhaka', 'Dinajpur', 'Faridpur', 'Feni',
  'Gaibandha', 'Gazipur', 'Gopalganj', 'Habiganj', 'Jamalpur', 'Jashore',
  'Jhalokati', 'Jhenaidah', 'Joypurhat', 'Khagrachhari', 'Khulna', 'Kishoreganj',
  'Kurigram', 'Kushtia', 'Lakshmipur', 'Lalmonirhat', 'Madaripur', 'Magura',
  'Manikganj', 'Meherpur', 'Moulvibazar', 'Munshigganj', 'Mymensingh',
  'Naogaon', 'Narail', 'Narayanganj', 'Narsingdi', 'Natore', 'Netrokona',
  'Nilphamari', 'Noakhali', 'Pabna', 'Panchagarh', 'Patuakhali', 'Pirojpur',
  'Rajbari', 'Rajshahi', 'Rangamati', 'Rangpur', 'Satkhira', 'Shariatpur',
  'Sherpur', 'Sirajganj', 'Sunamganj', 'Sylhet', 'Tangail', 'Thakurgaon'
].sort();

export { UPAZILAS };

export const MOCK_DONORS: Donor[] = [
  { id: 1, name: 'Rahim Khan', bloodGroup: BloodGroup.OPositive, age: 28, dob: '1996-03-15', gender: Gender.Male, district: 'Dhaka', upazila: 'Savar', phone: '01711111111', whatsapp: '01911111111', email: 'rahim.khan@example.com', donationCount: 5, religion: Religion.Islam, avatar: 'https://picsum.photos/seed/rahim/200', about: 'Regular donor, available on weekends. Feel free to contact me via WhatsApp.' },
  { id: 2, name: 'Fatima Ahmed', bloodGroup: BloodGroup.APositive, age: 24, dob: '2000-05-20', gender: Gender.Female, district: 'Chattogram', upazila: 'Anwara', phone: '01822222222', email: 'fatima.ahmed@example.com', donationCount: 2, avatar: 'https://picsum.photos/seed/fatima/200' },
  { id: 3, name: 'Jamal Uddin', bloodGroup: BloodGroup.BNegative, age: 35, dob: '1989-01-25', gender: Gender.Male, district: 'Sylhet', upazila: 'Sylhet Sadar', phone: '01933333333', email: 'jamal.uddin@example.com', donationCount: 10, avatar: 'https://picsum.photos/seed/jamal/200' },
  { id: 4, name: 'Sadia Islam', bloodGroup: BloodGroup.ABPositive, age: 22, dob: '2002-08-12', gender: Gender.Female, district: 'Khulna', upazila: 'Batiaghata', phone: '01644444444', email: 'sadia.islam@example.com', donationCount: 1, avatar: 'https://picsum.photos/seed/sadia/200' },
  { id: 5, name: 'Kamal Hossain', bloodGroup: BloodGroup.OPositive, age: 40, dob: '1984-11-02', gender: Gender.Male, district: 'Dhaka', upazila: 'Keraniganj', phone: '01555555555', email: 'kamal.hossain@example.com', donationCount: 15, avatar: 'https://picsum.photos/seed/kamal/200' },
  { id: 6, name: 'Nadia Chowdhury', bloodGroup: BloodGroup.BPositive, age: 31, dob: '1993-04-30', gender: Gender.Female, district: 'Rajshahi', upazila: 'Bagha', phone: '01366666666', email: 'nadia.chowdhury@example.com', donationCount: 7, avatar: 'https://picsum.photos/seed/nadia/200' },
  { id: 7, name: 'Anwar Parvez', bloodGroup: BloodGroup.ONegative, age: 29, dob: '1995-07-19', gender: Gender.Male, district: 'Dhaka', upazila: 'Dhamrai', phone: '01777777777', email: 'anwar.parvez@example.com', donationCount: 3, avatar: 'https://picsum.photos/seed/anwar/200' },
  { id: 8, name: 'Sultana Begum', bloodGroup: BloodGroup.APositive, age: 26, dob: '1998-02-09', gender: Gender.Female, district: 'Barisal', upazila: 'Barisal Sadar', phone: '01888888888', email: 'sultana.begum@example.com', donationCount: 4, avatar: 'https://picsum.photos/seed/sultana/200' },
  { id: 9, name: 'Firoz Mahmud', bloodGroup: BloodGroup.BPositive, age: 33, dob: '1991-09-01', gender: Gender.Male, district: 'Chattogram', upazila: 'Boalkhali', phone: '01999999999', email: 'firoz.mahmud@example.com', donationCount: 8, avatar: 'https://picsum.photos/seed/firoz/200' },
  { id: 10, name: 'Ayesha Siddika', bloodGroup: BloodGroup.OPositive, age: 27, dob: '1997-06-22', gender: Gender.Female, district: 'Dhaka', upazila: 'Nawabganj', phone: '01712345678', email: 'ayesha.siddika@example.com', donationCount: 6, avatar: 'https://picsum.photos/seed/ayesha/200' }
];