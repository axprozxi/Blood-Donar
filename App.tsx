
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Donor, Page, BloodGroup, Gender, Religion } from './types';
import { MOCK_DONORS, DISTRICTS, BLOOD_GROUPS, UPAZILAS, RELIGIONS } from './constants';
import { LogoIcon, PhoneIcon, LocationIcon, CalendarIcon, HomeIcon, BloodDropIcon, EmailIcon, FacebookIcon, TwitterIcon, InstagramIcon, DonationIllustrationIcon, WhatsAppIcon, InfoIcon, UserCircleIcon } from './components/icons';
import { Background } from './components/Background';

const calculateAge = (dob: string) => {
    if (!dob) return 0;
    // Correctly parse YYYY-MM-DD to avoid timezone issues.
    const [year, month, day] = dob.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};


// --- Image Cropping Utilities ---
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');
  if (!croppedCtx) return null;

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x, pixelCrop.y,
    pixelCrop.width, pixelCrop.height,
    0, 0,
    pixelCrop.width, pixelCrop.height
  );

  return croppedCanvas.toDataURL('image/jpeg');
}


// --- Sub-Components ---

const primaryButtonClasses = "w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-br from-red-600 via-red-700 to-red-800 border border-red-900/50 dark:shadow-[0_5px_20px_rgba(185,28,28,0.4)] hover:dark:shadow-[0_8px_30px_rgba(185,28,28,0.6)] shadow-[0_5px_15px_rgba(185,28,28,0.3)] hover:shadow-[0_8px_25px_rgba(185,28,28,0.4)] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";
const secondaryButtonClasses = "w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-gray-800 dark:text-white bg-gray-200/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400";
const smallPrimaryButtonClasses = "flex items-center px-4 py-2 rounded-lg font-semibold text-sm text-white bg-gradient-to-br from-red-600 to-red-800 shadow-lg dark:shadow-red-500/20 shadow-red-500/30 hover:shadow-xl dark:hover:shadow-red-500/40 hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-red-500";
const smallGreenButtonClasses = "flex items-center px-3 py-1 text-xs rounded-lg font-semibold text-white bg-gradient-to-br from-green-500 to-green-700 shadow-lg dark:shadow-green-500/20 shadow-green-500/30 hover:shadow-xl dark:hover:shadow-green-500/40 hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-green-500";


interface NotificationProps {
  message: string;
  onClose: () => void;
}
const Notification: React.FC<NotificationProps> = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-2xl w-full max-w-sm relative text-gray-700 dark:text-gray-300">
            <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500/20 mb-4">
                    <InfoIcon className="h-6 w-6 text-red-500 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{message}</p>
            </div>
            <div className="mt-6 text-center">
                <button onClick={onClose} className={primaryButtonClasses}>
                    OK
                </button>
            </div>
        </div>
    </div>
);


const Header: React.FC<{ setPage: (page: Page) => void; }> = ({ setPage }) => {
    const navItems = [
        { label: 'Home', page: 'home' },
        { label: 'Find Donor', page: 'find' },
        { label: 'Register as Donor', page: 'register' },
        { label: 'Why Donate?', page: 'whyDonate' },
        { label: 'About', page: 'about' },
        { label: 'Privacy Policy', page: 'privacy' },
        { label: 'Contact', page: 'contact' },
    ];
    
    return (
        <header className="bg-white/70 dark:bg-gray-950/70 backdrop-blur-md sticky top-0 z-30 border-b border-gray-200 dark:border-gray-800">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
                    <LogoIcon className="h-9 w-auto" />
                    <span className="ml-3 text-2xl font-bold tracking-wide text-gray-900 dark:text-white">RoktoDin</span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map(item => (
                        <a 
                            key={item.label} 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); setPage(item.page as Page); }} 
                            className="text-base text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-300 font-medium"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
                <div className="flex items-center">
                     <button className="md:hidden text-gray-600 dark:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
};

const HomePageContent: React.FC<{ setPage: (page: Page) => void; }> = ({ setPage }) => (
    <div className="container mx-auto flex flex-col items-center justify-center text-center px-4 py-24 sm:py-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6 opacity-0 animate-fadeInUp shimmer-effect">
            Find Blood Donors Across<br />Bangladesh in Seconds
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 opacity-0 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            Join a community of lifesavers. Whether you need blood or want to donate, you're in the right place.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
            <button 
                onClick={() => setPage('find')}
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-gray-800 dark:text-white bg-gray-200/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
                Find a Donor
            </button>
            <button
                onClick={() => setPage('register')}
                className={primaryButtonClasses}
            >
                 Register as Donor
            </button>
        </div>
    </div>
);

interface DonorCardProps { donor: Donor; onSelect: (donor: Donor) => void; }
const DonorCard: React.FC<DonorCardProps> = ({ donor, onSelect }) => {
    return (
        <div onClick={() => onSelect(donor)} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-red-500/50 dark:hover:border-red-500/50 hover:shadow-lg dark:hover:shadow-red-500/20 hover:scale-[1.02] cursor-pointer">
            <div className="flex items-center space-x-4">
                <img src={donor.avatar} alt={donor.name} className="w-16 h-16 rounded-full border-2 border-red-500" />
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{donor.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{donor.age} years old, {donor.gender}</p>
                        </div>
                        <div className="text-2xl font-bold text-red-500">{donor.bloodGroup}</div>
                    </div>
                </div>
            </div>
            <div className="mt-5 space-y-2 text-sm">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <LocationIcon className="w-4 h-4 mr-3 text-red-500" />
                    <span>{donor.upazila}, {donor.district}</span>
                </div>
            </div>
            <div className="mt-5 flex justify-end items-center">
                 <button className={smallPrimaryButtonClasses} onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${donor.phone}`; }}>
                    <PhoneIcon className="w-4 h-4 mr-2"/>
                    Call Now
                </button>
            </div>
        </div>
    );
};

interface EmergencyModalProps {
    onClose: () => void;
    onSearch: (district: string, bloodGroup: BloodGroup, upazila: string) => void;
    setPage: (page: Page) => void;
}
const EmergencyModal: React.FC<EmergencyModalProps> = ({ onClose, onSearch, setPage }) => {
    const [district, setDistrict] = useState(DISTRICTS[0]);
    const [upazila, setUpazila] = useState('All');
    const [bloodGroup, setBloodGroup] = useState(BLOOD_GROUPS[0]);

    const availableUpazilas = useMemo(() => UPAZILAS[district] || [], [district]);

    useEffect(() => {
        setUpazila('All');
    }, [district]);
    
    const handleSearch = () => {
        onSearch(district, bloodGroup, upazila);
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-2xl w-full max-w-md relative text-gray-700 dark:text-gray-300" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white text-3xl leading-none" aria-label="Close modal">&times;</button>
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500/20 animate-pulse">
                        <svg className="h-6 w-6 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                    </div>
                    <h3 className="mt-3 text-2xl font-bold leading-6 text-gray-900 dark:text-white">Emergency Blood Request</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Quickly find available donors near you.</p>
                </div>
                <div className="mt-6 space-y-4">
                     <div>
                        <label htmlFor="district" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">District</label>
                        <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)} className="form-input">
                             {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="upazila" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upazila</label>
                        <select id="upazila" value={upazila} onChange={(e) => setUpazila(e.target.value)} className="form-input" disabled={availableUpazilas.length === 0}>
                             <option value="All">All Upazilas</option>
                             {availableUpazilas.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blood Group</label>
                        <select id="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value as BloodGroup)} className="form-input">
                             {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mt-8 text-center">
                     <button onClick={handleSearch} className={primaryButtonClasses}>
                        Find Donors
                    </button>
                </div>
            </div>
        </div>
    );
};


interface ImageCropModalProps {
    imageSrc: string;
    onClose: () => void;
    onSave: (croppedImage: string) => void;
}

const ImageCropModal: React.FC<ImageCropModalProps> = ({ imageSrc, onClose, onSave }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        if (croppedAreaPixels) {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            if (croppedImage) {
                onSave(croppedImage);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-2xl w-full max-w-lg relative text-gray-700 dark:text-gray-300" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white">Crop Your Image</h3>
                <div className="relative w-full h-80 bg-gray-200 dark:bg-gray-900 rounded-lg">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        cropShape="round"
                        showGrid={false}
                    />
                </div>
                <div className="mt-4">
                    <label className="form-label">Zoom</label>
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={onClose} className="px-6 py-2 rounded-lg font-semibold text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Cancel</button>
                    <button onClick={handleSave} className={smallPrimaryButtonClasses + " px-6 py-2"}>Save</button>
                </div>
            </div>
        </div>
    );
};

const RegistrationForm: React.FC<{ addDonor: (donor: Omit<Donor, 'id' | 'age'>) => void; setPage: (page: Page) => void }> = ({ addDonor, setPage }) => {
    const [formData, setFormData] = useState({
        name: '', gender: Gender.Male, dob: '', bloodGroup: BloodGroup.APositive,
        district: DISTRICTS[0], upazila: UPAZILAS[DISTRICTS[0]][0] || '', phone: '',
        religion: Religion.Islam,
        whatsapp: '',
        about: '',
    });
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    
    const [availableUpazilas, setAvailableUpazilas] = useState<string[]>(UPAZILAS[DISTRICTS[0]] || []);

    useEffect(() => {
        const upazilasForDistrict = UPAZILAS[formData.district] || [];
        setAvailableUpazilas(upazilasForDistrict);
        if (!upazilasForDistrict.includes(formData.upazila)) {
            setFormData(prev => ({ ...prev, upazila: upazilasForDistrict[0] || '' }));
        }
    }, [formData.district]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageToCrop(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.dob) {
            setNotification("Please select your Date of Birth.");
            return;
        }
        
        const isoDateString = formData.dob;
        
        // Correctly parse date to avoid timezone issues and validate it
        const [year, month, day] = isoDateString.split('-').map(Number);
        const birthDate = new Date(year, month - 1, day);

        // Check if the parsed date is a real date (e.g. not Feb 30)
        if (isNaN(birthDate.getTime()) || birthDate.getFullYear() !== year || birthDate.getMonth() !== month - 1 || birthDate.getDate() !== day) {
             setNotification('Please enter a valid Date of Birth.');
             return;
        }

        // Check if date is in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to compare dates only
        if (birthDate > today) {
            setNotification("Date of Birth cannot be in the future. Please select a valid date.");
            return;
        }
        
        // Now that we know it's a valid past date, calculate age
        const age = calculateAge(isoDateString);
        if(age < 18) {
            setNotification('You must be 18+ to register as a donor.');
            return;
        }
        
        if(!termsAccepted) {
            setNotification('You must accept the Terms and Conditions to register.');
            return;
        }

        const newDonorData: Omit<Donor, 'id' | 'age'> = {
            ...formData,
            dob: isoDateString,
            email: `${formData.phone}@placeholder.com`, // Dummy email
            avatar: croppedImage || `https://picsum.photos/seed/${formData.name.split(' ')[0]}/200`,
            donationCount: 0,
        };
        addDonor(newDonorData);
    };
    
    return (
        <>
            {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
            {imageToCrop && (
                <ImageCropModal 
                    imageSrc={imageToCrop}
                    onClose={() => setImageToCrop(null)}
                    onSave={(cropped) => {
                        setCroppedImage(cropped);
                        setImageToCrop(null);
                    }}
                />
            )}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg w-full max-w-4xl opacity-0 animate-scaleIn">
                <h2 className="text-3xl font-bold text-center mb-6 text-red-600 dark:text-red-500">Become a Lifesaver</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <fieldset>
                        <legend className="form-legend">Personal Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label className="form-label">Full Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="Enter your full name" /></div>
                            <div><label className="form-label">Date of Birth *</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="form-input" /></div>
                            <div><label className="form-label">Gender *</label><select name="gender" value={formData.gender} onChange={handleChange} className="form-input">{Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}</select></div>
                            <div><label className="form-label">Religion *</label><select name="religion" value={formData.religion} onChange={handleChange} className="form-input">{RELIGIONS.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
                            <div><label className="form-label">District *</label><select name="district" value={formData.district} onChange={handleChange} className="form-input">{DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
                            <div><label className="form-label">Upazila / Area *</label><select name="upazila" value={formData.upazila} onChange={handleChange} required className="form-input" disabled={availableUpazilas.length === 0}>{availableUpazilas.length > 0 ? availableUpazilas.map(u => <option key={u} value={u}>{u}</option>) : <option>Select District First</option>}</select></div>
                            <div><label className="form-label">Blood Group *</label><select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="form-input">{BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}</select></div>
                        </div>
                    </fieldset>
                    
                    <fieldset>
                        <legend className="form-legend">Contact Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label className="form-label">Phone *</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="form-input" placeholder="+8801..."/></div>
                            <div><label className="form-label">WhatsApp Number (Optional)</label><input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="form-input" placeholder="+8801..."/></div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className="form-legend">Additional Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div>
                                <label className="form-label">About Donor (Optional)</label>
                                <textarea name="about" value={formData.about} onChange={handleChange} rows={4} maxLength={200} className="form-input" placeholder="Tell us something about yourself..."></textarea>
                            </div>
                             <div>
                                <label className="form-label">Upload Image (Optional)</label>
                                <div className="flex items-center space-x-4">
                                    <img src={croppedImage || `https://picsum.photos/seed/placeholder/200`} alt="Avatar Preview" className="w-20 h-20 rounded-full border-2 border-red-500 object-cover" />
                                    <input type="file" name="avatar" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 dark:file:bg-red-900/50 file:text-red-700 dark:file:text-red-300 hover:file:bg-red-100 dark:hover:file:bg-red-900"/>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div className="text-center mt-6">
                        <div className="flex items-center justify-center mb-6">
                            <input id="terms" name="terms" type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="h-4 w-4 text-red-600 border-gray-300 dark:border-gray-500 dark:bg-gray-600 rounded focus:ring-red-500" />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                I agree to the <a href="#" onClick={(e) => { e.preventDefault(); setPage('terms')}} className="font-medium text-red-600 hover:underline">Terms and Conditions</a>.
                            </label>
                        </div>
                        <button type="submit" className={primaryButtonClasses} disabled={!termsAccepted}>Register Now</button>
                    </div>
                </form>
            </div>
        </>
    );
};

const WhyDonatePage = () => {
    const InfoCard: React.FC<{ title: string, children: React.ReactNode, icon: React.ReactNode, delay?: number }> = ({ title, children, icon, delay = 0 }) => (
        <div 
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-md opacity-0 animate-fadeInUp transition-all duration-300 hover:shadow-lg dark:hover:shadow-red-500/20 hover:scale-[1.02] cursor-pointer"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex items-center mb-3">
                <div className="w-10 h-10 flex items-center justify-center text-red-500 bg-red-500/10 rounded-full mr-4">{icon}</div>
                <h3 className="text-xl font-bold text-red-600 dark:text-red-500">{title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{children}</p>
        </div>
    );

    const benefits = [
        { title: "Saves Lives", icon: <BloodDropIcon className="w-6 h-6" />, content: "Blood is crucial for patients undergoing surgeries, cancer treatments, chronic illnesses, and traumatic injuries. Your donation is a lifeline in an emergency." },
        { title: "Improves Your Health", icon: <UserCircleIcon className="w-6 h-6" />, content: "Donating blood can reduce harmful iron stores, lower your risk of heart attacks and strokes, and may even reduce the risk of cancer. You also get a mini health check-up!" },
        { title: "A Noble Act", icon: <InfoIcon className="w-6 h-6" />, content: "The feeling of helping someone in their most critical time is unparalleled. It's a simple way to give back to your community and make a huge difference." },
        { title: "Constant Need", icon: <CalendarIcon className="w-6 h-6" />, content: "The need for blood is constant, but the supply is not. A new patient needs blood every few seconds, making regular donations from volunteers like you essential." },
        { title: "For All Communities", icon: <HomeIcon className="w-6 h-6" />, content: "From thalassemia patients to accident victims, people from all walks of life depend on donated blood. Your contribution supports the entire community's health." },
        { title: "It's Safe and Easy", icon: <PhoneIcon className="w-6 h-6" />, content: "The donation process is simple, safe, and typically takes less than an hour. Sterile equipment is used for each donor, so there's no risk of contracting a disease." },
    ];

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12 opacity-0 animate-fadeInUp">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">Why Donate Blood?</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4">
                    Your single donation can save up to three lives. Discover the incredible impact you can make.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                    <InfoCard key={benefit.title} title={benefit.title} icon={benefit.icon} delay={100 + index * 100}>
                        {benefit.content}
                    </InfoCard>
                ))}
            </div>
        </div>
    );
};

const AboutPage = () => (
    <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 opacity-0 animate-fadeInUp">
            <div className="inline-block relative">
                <LogoIcon className="h-24 w-auto mx-auto" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-4">About RoktoDin</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4">
                Saving lives, one drop at a time.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 opacity-0 animate-scaleIn" style={{ animationDelay: '200ms' }}>
            <div className="text-gray-700 dark:text-gray-300 space-y-4 text-lg">
                 <h2 className="text-3xl font-bold text-red-600 dark:text-red-500 mb-4">Our Mission</h2>
                 <p>RoktoDin is a digital platform dedicated to creating a seamless and efficient network between blood donors and recipients across Bangladesh. We believe that technology can bridge the gap in critical moments, making it easier than ever to find a life-saving match.</p>
                 <p>Our mission is to build a proactive community of voluntary blood donors, ensuring a safe and adequate supply of blood for all who need it. We aim to eliminate the frantic search for blood in emergencies through a simple, accessible, and reliable platform.</p>
            </div>
            <div className="flex items-center justify-center">
                 <DonationIllustrationIcon className="w-full max-w-sm h-auto" />
            </div>
        </div>
    </div>
);


const ContactPage = () => {
    const ContactInfoCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode, delay?: number }> = ({ icon, title, children, delay = 0 }) => (
        <div 
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300 hover:shadow-lg dark:hover:shadow-red-500/20 hover:dark:border-red-500/50 hover:border-red-400/50 flex items-start space-x-5 opacity-0 animate-fadeInRight"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full text-red-500 dark:text-red-400 relative">
                <div className="absolute inset-0 bg-red-500/10 dark:bg-red-500/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-1 bg-white dark:bg-gray-800 rounded-full"></div>
                <div className="relative z-10">{icon}</div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                <div className="text-gray-600 dark:text-gray-300 mt-1">{children}</div>
            </div>
        </div>
    );

    const contactMethods = [
        {
            icon: <PhoneIcon className="w-7 h-7"/>,
            title: "Phone",
            content: (
                <>
                    <p>For urgent queries, feel free to call us.</p>
                    <a href="tel:+1234567890" className="font-semibold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">(123) 456-7890</a>
                </>
            )
        },
        {
            icon: <EmailIcon className="w-7 h-7"/>,
            title: "Email",
            content: (
                <>
                    <p>Reach out to our support team via email.</p>
                    <a href="mailto:support@roktodin.com" className="font-semibold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">support@roktodin.com</a>
                </>
            )
        },
        {
            icon: <LocationIcon className="w-7 h-7"/>,
            title: "Location",
            content: (
                 <>
                    <p>123 ABC Street, Dhaka, Bangladesh.</p>
                    <a 
                       href="https://www.google.com/maps/search/?api=1&query=Dhaka+Bangladesh" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="font-semibold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                    >
                       View on Map
                    </a>
                </>
            )
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12 sm:py-16">
            <div className="text-center mb-12 opacity-0 animate-fadeInUp">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Get In Touch</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">We'd love to hear from you. Please fill out the form or use our contact details below.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg opacity-0 animate-fadeInLeft">
                     <h2 className="text-2xl font-bold text-red-600 dark:text-red-500 mb-2">Send us a Message</h2>
                     <p className="text-gray-600 dark:text-gray-300 mb-6">Have a question or feedback? Drop us a line!</p>
                     <form className="space-y-6">
                        <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label><input type="text" name="name" required className="form-input" placeholder="Your Name" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label><input type="email" name="email" required className="form-input" placeholder="you@example.com"/></div>
                        <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label><textarea name="message" rows={4} required className="form-input" placeholder="Your message..."></textarea></div>
                        <div className="text-center pt-2">
                            <button type="submit" className={primaryButtonClasses}>Send Message</button>
                        </div>
                     </form>
                </div>
                 <div className="space-y-6">
                    {contactMethods.map((method, index) => (
                        <ContactInfoCard key={method.title} icon={method.icon} title={method.title} delay={150 + index * 150}>
                            {method.content}
                        </ContactInfoCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

const PrivacyPage = () => (
    <div className="container mx-auto px-4 py-16 text-gray-800 dark:text-gray-200">
        <div className="max-w-4xl mx-auto bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 opacity-0 animate-fadeInUp">
            <h1 className="text-3xl font-bold mb-6 text-red-600 dark:text-red-500">Privacy Policy</h1>
            <div className="space-y-4 prose dark:prose-invert max-w-none">
                <p>Your privacy is important to us. It is RoktoDin's policy to respect your privacy regarding any information we may collect from you across our website.</p>
                <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
                <p>The primary purpose of collecting your data (such as name, phone number, location, and blood group) is to facilitate connections between blood donors and those in need. Your contact information will be made available to users searching for donors.</p>
                <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
                <p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
                <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
                <p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
                <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
                <p>This policy is effective as of 1 August 2024.</p>
            </div>
        </div>
    </div>
);

const TermsPage = () => (
    <div className="container mx-auto px-4 py-16 text-gray-800 dark:text-gray-200">
        <div className="max-w-4xl mx-auto bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 opacity-0 animate-fadeInUp">
            <h1 className="text-3xl font-bold mb-6 text-red-600 dark:text-red-500">Terms and Conditions</h1>
            <div className="space-y-4 prose dark:prose-invert max-w-none">
                <p>By registering as a donor on RoktoDin, you agree to the following terms and conditions:</p>
                <ol className="list-decimal pl-5 space-y-2">
                    <li>You are voluntarily providing your personal information, including your name, contact details, location, and blood group, for the purpose of being contacted by individuals in need of blood donations.</li>
                    <li>You confirm that you are at least 18 years old and meet the legal requirements for blood donation in Bangladesh.</li>
                    <li>You agree to provide accurate and truthful information. You are responsible for keeping your information, especially your availability and last donation date, up-to-date.</li>
                    <li>You understand that RoktoDin is a platform to connect donors and recipients, and is not responsible for any medical procedures, interactions, or outcomes. We do not screen donors beyond the information provided during registration.</li>
                    <li>You agree to use the platform responsibly and not for any commercial purposes, harassment, or misuse of personal information of other users.</li>
                    <li>RoktoDin reserves the right to remove any user profile from the platform at its discretion, without prior notice, for any violation of these terms or for any other reason deemed necessary to protect the integrity of the platform and its users.</li>
                </ol>
                <p>These terms may be updated from time to time. Your continued use of the service after any changes constitutes your acceptance of the new terms.</p>
            </div>
        </div>
    </div>
);


const Footer: React.FC<{ setPage: (page: Page) => void }> = ({ setPage }) => {
    const SocialIcon: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 flex items-center justify-center text-white bg-red-700 rounded-full transition-all duration-300 hover:bg-red-600 hover:shadow-[0_0_15px_rgba(239,68,68,0.6)] hover:scale-110"
        >
            {children}
        </a>
    );

    return (
        <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 w-full">
                    <div className="flex space-x-6 order-2 md:order-1 group">
                        <SocialIcon href="#"><FacebookIcon className="w-5 h-5"/></SocialIcon>
                        <SocialIcon href="#"><TwitterIcon className="w-5 h-5"/></SocialIcon>
                        <SocialIcon href="#"><InstagramIcon className="w-5 h-5"/></SocialIcon>
                    </div>
                    <div className="text-center order-1 md:order-2 flex-grow">
                        <p className="text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} RoktoDin. All Rights Reserved.</p>
                        <div className="text-sm text-gray-400 dark:text-gray-500 space-x-4">
                            <a href="#" onClick={(e) => { e.preventDefault(); setPage('terms'); }} className="hover:text-red-500">Terms & Conditions</a>
                            <span>&middot;</span>
                             <a href="#" onClick={(e) => { e.preventDefault(); setPage('privacy'); }} className="hover:text-red-500">Privacy Policy</a>
                        </div>
                    </div>
                     <div className="w-28 order-3 hidden md:block"></div>
                </div>
            </div>
        </footer>
    );
};

interface DonorDetailModalProps {
    donor: Donor;
    onClose: () => void;
}
const DonorDetailModal: React.FC<DonorDetailModalProps> = ({ donor, onClose }) => {
    const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value?: string | number | null; children?: React.ReactNode }> = ({ icon, label, value, children }) => (
        <div className="flex items-start">
            <div className="w-5 h-5 mr-3 mt-1 text-red-500 flex-shrink-0">{icon}</div>
            <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                {value ? <p className="font-semibold text-gray-800 dark:text-gray-200">{value}</p> : children}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8 shadow-2xl w-full max-w-lg relative text-gray-700 dark:text-gray-300" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white text-3xl leading-none" aria-label="Close modal">&times;</button>
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6">
                    <div className="flex-shrink-0 relative">
                        <img src={donor.avatar} alt={donor.name} className="w-28 h-28 rounded-full border-4 border-red-500 object-cover" />
                        <div className="absolute -bottom-1 -right-1 text-4xl font-bold text-red-500 bg-white dark:bg-gray-800 px-2 rounded-full shadow-md">{donor.bloodGroup}</div>
                    </div>
                    <div className="mt-4 sm:mt-0 text-center sm:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{donor.name}</h2>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                    <DetailItem icon={<BloodDropIcon />} label="Total Donations" value={donor.donationCount || 0} />
                    <DetailItem icon={<UserCircleIcon/>} label="Gender" value={donor.gender} />
                    <DetailItem icon={<CalendarIcon/>} label="Date of Birth" value={new Date(donor.dob).toLocaleDateString()} />
                    <DetailItem icon={<InfoIcon/>} label="Age" value={`${donor.age} years old`} />
                    {donor.religion && <DetailItem icon={<InfoIcon/>} label="Religion" value={donor.religion} />}
                    <DetailItem icon={<LocationIcon/>} label="District" value={donor.district} />
                    <DetailItem icon={<LocationIcon/>} label="Upazila" value={donor.upazila} />
                    
                    <div className="sm:col-span-2 pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
                         <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-500">Contact Details</h3>
                         <div className="space-y-4">
                            <DetailItem icon={<PhoneIcon/>} label="Phone">
                                <div className="flex items-center space-x-4">
                                    <a href={`tel:${donor.phone}`} className="font-semibold text-gray-800 dark:text-gray-200 hover:text-red-500 transition-colors">{donor.phone}</a>
                                    <button onClick={() => { window.location.href = `tel:${donor.phone}`; }} className={smallPrimaryButtonClasses + " px-3 py-1 text-xs"}>
                                        <PhoneIcon className="w-3 h-3 mr-1.5"/>
                                        Call
                                    </button>
                                </div>
                            </DetailItem>
                            {donor.whatsapp && (
                                <DetailItem icon={<WhatsAppIcon/>} label="WhatsApp">
                                    <div className="flex items-center space-x-4">
                                        <a href={`https://wa.me/${donor.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 dark:text-gray-200 hover:text-green-500 transition-colors">{donor.whatsapp}</a>
                                        <a href={`https://wa.me/${donor.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className={smallGreenButtonClasses}>
                                            <WhatsAppIcon className="w-3 h-3 mr-1.5"/>
                                            Chat
                                        </a>
                                    </div>
                                </DetailItem>
                            )}
                         </div>
                    </div>
                    {donor.about && <div className="sm:col-span-2"><DetailItem icon={<InfoIcon />} label="About Donor" value={donor.about} /></div>}
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');
    const [donors, setDonors] = useState<Donor[]>(MOCK_DONORS);
    const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('All');
    const [selectedUpazila, setSelectedUpazila] = useState('All');
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('All');
    const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
    
    const availableUpazilas = useMemo(() => {
        if (selectedDistrict === 'All') return [];
        return UPAZILAS[selectedDistrict] || [];
    }, [selectedDistrict]);

    useEffect(() => {
        setSelectedUpazila('All');
    }, [selectedDistrict]);

    const filteredDonors = useMemo(() => {
        return donors.filter(donor => {
            const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) || donor.upazila.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDistrict = selectedDistrict === 'All' || donor.district === selectedDistrict;
            const matchesUpazila = selectedUpazila === 'All' || donor.upazila === selectedUpazila;
            const matchesBloodGroup = selectedBloodGroup === 'All' || donor.bloodGroup === selectedBloodGroup;
            return matchesSearch && matchesDistrict && matchesBloodGroup && matchesUpazila;
        });
    }, [donors, searchTerm, selectedDistrict, selectedUpazila, selectedBloodGroup]);
    
    const handleEmergencySearch = (district: string, bloodGroup: BloodGroup, upazila: string) => {
        setSelectedDistrict(district);
        setSelectedBloodGroup(bloodGroup);
        setSelectedUpazila(upazila);
        setIsEmergencyModalOpen(false);
        setPage('find');
    };
    
    const addDonor = useCallback((newDonorData: Omit<Donor, 'id' | 'age'>) => {
        const age = calculateAge(newDonorData.dob);
        const newDonor: Donor = {
            id: donors.length + 1,
            age,
            ...newDonorData,
        };
        setDonors(prevDonors => [newDonor, ...prevDonors]);
        setPage('find');
        // A confirmation could be a notification too, but for now this is fine.
    }, [donors.length]);
    
    const renderPage = () => {
        switch (page) {
            case 'find':
                return (
                     <div className="container mx-auto px-4 py-8 sm:py-12">
                        <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white opacity-0 animate-fadeInUp">Find a Blood Donor</h1>
                        <div className="max-w-5xl mx-auto">
                            <div id="donor-list-section">
                                 <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-lg mb-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                                        <input type="text" placeholder="Search by name or area..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-input md:col-span-2 lg:col-span-1" />
                                        <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="form-input"><option value="All">All Districts</option>{DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}</select>
                                        <select value={selectedUpazila} onChange={(e) => setSelectedUpazila(e.target.value)} className="form-input" disabled={availableUpazilas.length === 0}><option value="All">All Upazilas</option>{availableUpazilas.map(u => <option key={u} value={u}>{u}</option>)}</select>
                                        <select value={selectedBloodGroup} onChange={(e) => setSelectedBloodGroup(e.target.value)} className="form-input"><option value="All">All Blood Groups</option>{BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}</select>
                                    </div>
                                </div>
                                 <div className="space-y-4">
                                     {filteredDonors.length > 0 ? filteredDonors.map((donor, index) => <div key={donor.id} className="opacity-0 animate-fadeInUp" style={{ animationDelay: `${200 + index * 75}ms`}}><DonorCard donor={donor} onSelect={setSelectedDonor} /></div>) : <div className="text-center py-10 text-gray-500 dark:text-gray-500 bg-gray-100/30 dark:bg-gray-800/30 rounded-lg"><p>No donors found matching your criteria.</p></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'register':
                return (
                     <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
                        <RegistrationForm addDonor={addDonor} setPage={setPage} />
                    </div>
                );
            case 'whyDonate':
                return <WhyDonatePage />;
            case 'about':
                return <AboutPage />;
            case 'contact':
                return <ContactPage />;
            case 'privacy':
                return <PrivacyPage />;
            case 'terms':
                return <TermsPage />;
            case 'home':
            default:
                return <HomePageContent setPage={setPage} />;
        }
    };

    return (
        <div className="min-h-screen font-sans relative bg-gray-100 dark:bg-transparent text-gray-800 dark:text-gray-200">
            <Background />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header setPage={setPage} />
                <main className="flex-grow">
                    {renderPage()}
                </main>
                <Footer setPage={setPage} />
                 <button
                    onClick={() => setIsEmergencyModalOpen(true)}
                    className="fixed bottom-6 right-6 bg-gradient-to-br from-red-500 to-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-40 animate-glow flex items-center justify-center"
                    aria-label="Emergency blood request"
                >
                     <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                </button>
                {isEmergencyModalOpen && <EmergencyModal onClose={() => setIsEmergencyModalOpen(false)} onSearch={handleEmergencySearch} setPage={setPage} />}
                {selectedDonor && <DonorDetailModal donor={selectedDonor} onClose={() => setSelectedDonor(null)} />}
                <style>{`
                  @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); filter: brightness(0.8); }
                    to { opacity: 1; transform: translateY(0); filter: brightness(1); }
                  }
                  .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
                  
                  @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); filter: brightness(0.8); }
                    to { opacity: 1; transform: scale(1); filter: brightness(1); }
                  }
                  .animate-scaleIn { animation: scaleIn 0.5s ease-out forwards; }

                  @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(-20px); filter: brightness(0.8); }
                    to { opacity: 1; transform: translateX(0); filter: brightness(1); }
                  }
                  .animate-fadeInLeft { animation: fadeInLeft 0.6s ease-out forwards; }

                  @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(20px); filter: brightness(0.8); }
                    to { opacity: 1; transform: translateX(0); filter: brightness(1); }
                  }
                  .animate-fadeInRight { animation: fadeInRight 0.6s ease-out forwards; }
                  
                  @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.4), 0 0 5px rgba(255, 255, 255, 0.5); }
                    50% { box-shadow: 0 0 35px rgba(239, 68, 68, 0.7), 0 0 10px rgba(255, 255, 255, 0.7); }
                  }
                  .animate-glow { animation: glow 2.5s infinite ease-in-out; }

                  .shimmer-effect {
                    position: relative;
                    overflow: hidden;
                    -webkit-mask-image: -webkit-radial-gradient(white, black);
                  }
                  .shimmer-effect::after {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: -150%;
                      width: 100%;
                      height: 100%;
                      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
                      transform: skewX(-25deg);
                      animation: shimmer-once 1.5s forwards;
                      animation-delay: 0.7s;
                  }
                  @keyframes shimmer-once {
                      to { left: 150%; }
                  }

                  .form-label {
                     display: block;
                     margin-bottom: 0.25rem;
                     font-size: 0.875rem;
                     font-weight: 500;
                     color: #374151;
                  }
                  .dark .form-label {
                     color: #D1D5DB;
                  }
                  .form-input { 
                    display: block; 
                    width: 100%; 
                    background-color: rgba(229, 231, 235, 0.7); 
                    border: 1px solid #D1D5DB; 
                    border-radius: 0.5rem; 
                    padding: 0.75rem 1rem; 
                    color: #1F2937; 
                    transition: all 0.3s; 
                  }
                  .dark .form-input {
                    background-color: rgba(31, 41, 55, 0.7);
                    border: 1px solid #4B5563;
                    color: #F3F4F6;
                  }
                  .form-input:focus { 
                    outline: none; 
                    border-color: #EF4444; 
                    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.4); 
                  } 
                  .form-input:disabled { 
                    background-color: rgba(209, 213, 219, 0.5); 
                    cursor: not-allowed; 
                    opacity: 0.7;
                  }
                  .dark .form-input:disabled {
                    background-color: rgba(55, 65, 81, 0.5);
                  }
                  .form-legend {
                     font-size: 1.25rem;
                     font-weight: 600;
                     margin-bottom: 1rem;
                     color: #111827;
                     width: 100%;
                     border-bottom: 1px solid #D1D5DB;
                     padding-bottom: 0.5rem;
                  }
                   .dark .form-legend {
                    color: #E5E7EB;
                    border-color: #4B5563;
                  }
                  /* Custom date picker icon color for dark mode */
                  .dark input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                  }
                `}</style>
            </div>
        </div>
    );
}

export default App;
