
import React from 'react';

export const LogoIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="glossyBlood" cx="50%" cy="40%" r="60%" fx="50%" fy="30%">
                <stop offset="0%" style={{ stopColor: '#F87171' }} />
                <stop offset="40%" style={{ stopColor: '#DC2626' }} />
                <stop offset="100%" style={{ stopColor: '#7F1D1D' }} />
            </radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <path
            fill="url(#glossyBlood)"
            filter="url(#glow)"
            d="M50 125C50 125 100 95 100 50C100 22.38 77.61 0 50 0S0 22.38 0 50C0 95 50 125 50 125Z"
        />
        {/* Specular highlight for glossy effect */}
        <path
            fill="white"
            fillOpacity="0.4"
            d="M50 15 C 65 20, 75 40, 70 55 Q 60 70, 40 60 C 30 50, 35 25, 50 15 Z"
            transform="rotate(-15 50 50)"
            style={{ filter: 'blur(3px)' }}
        />
    </svg>
);


export const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.29-.073.43A15.05 15.05 0 0018.5 18.5a.75.75 0 00.43-.072l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C6.55 22.5 1.5 17.45 1.5 9.75V7.5a3 3 0 013-3H6" clipRule="evenodd" />
  </svg>
);

export const LocationIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 005.16-4.053l-1.85-1.85a15.486 15.486 0 01-3.41 3.41l-1.85 1.852zM12 14.75a2.75 2.75 0 100-5.5 2.75 2.75 0 000 5.5z" clipRule="evenodd" />
    <path d="M12 2.25a8.25 8.25 0 018.25 8.25c0 1.921-.734 3.688-2.062 5.034l-1.85-1.85a.75.75 0 00-1.06 0l-1.85 1.85a.75.75 0 01-1.06 0l-1.85-1.85a.75.75 0 00-1.06 0l-1.85 1.85A8.22 8.22 0 013.75 10.5 8.25 8.25 0 0112 2.25z" />
  </svg>
);

export const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    <path fillRule="evenodd" d="M1.5 5.25a3 3 0 013-3h15a3 3 0 013 3v13.5a3 3 0 01-3 3h-15a3 3 0 01-3-3V5.25zm3-1.5a1.5 1.5 0 00-1.5 1.5v1.5h18V5.25a1.5 1.5 0 00-1.5-1.5h-15zM4.5 9.75a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zM12.75 16.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5h1.5z" clipRule="evenodd" />
  </svg>
);

export const HomeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75-.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
    </svg>
);

export const BloodDropIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12.53 3.47a.75.75 0 00-1.06 0l-7.5 7.5A7.5 7.5 0 0012 22.5a7.5 7.5 0 008.03-11.53l-7.5-7.5z" clipRule="evenodd" />
  </svg>
);

export const EmailIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    </svg>
);

export const FacebookIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.039c-5.517 0-9.994 4.47-9.994 9.983 0 4.97 3.636 9.147 8.433 9.87v-7.013H8.036V12h2.403V9.782c0-2.38 1.42-3.69 3.582-3.69 1.023 0 2.062.18 2.062.18v2.18h-1.12c-1.178 0-1.543.722-1.543 1.488V12h2.47l-.398 2.85h-2.072v7.013c4.797-.722 8.433-4.9 8.433-9.87 0-5.512-4.477-9.983-9.995-9.983z"/>
    </svg>
);

export const TwitterIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);

export const InstagramIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/>
    </svg>
);

export const DonationIllustrationIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="illustrationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#F87171" />
            </linearGradient>
        </defs>
        <path fill="url(#illustrationGrad)" d="M62.6,-64.1C79.1,-52.1,89.2,-29.9,89.5,-7.9C89.9,14.2,80.6,36.2,65.8,51.1C51,65.9,30.8,73.5,10.1,76.5C-10.6,79.5,-31.8,77.9,-48.9,67.6C-66.1,57.3,-79.1,38.3,-84.3,16.8C-89.5,-4.7,-86.8,-28.7,-75.4,-44C-64,-59.4,-43.8,-66.2,-25.9,-70.5C-7.9,-74.8,8,-76.6,24.9,-76.9C41.8,-77.2,50.8,-76.2,62.6,-64.1Z" transform="translate(100 100)" />
        <path fill="white" d="M125,98 C125,98 140,88 140,78 C140,70 135,65 125,65 C115,65 110,70 110,78 C110,88 125,98 125,98 Z" />
        <path fill="white" d="M100,120 L100,95 L90,100 L90,80 L110,70 L110,100 L100,95 Z M100,120 L118,128 L112,145 L95,145 Z" />
        <path fill="white" d="M75,98 C75,98 60,88 60,78 C60,70 65,65 75,65 C85,65 90,70 90,78 C90,88 75,98 75,98 Z" />
        <path fill="white" d="M100,50 C110,50 115,40 110,30 Q100,20 90,30 C85,40 90,50 100,50 Z" />
    </svg>
);

export const SunIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.06l1.59-1.59a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.803 17.803a.75.75 0 01-1.06 0l-1.59-1.591a.75.75 0 111.06-1.06l1.59 1.59a.75.75 0 010 1.06zM12 21.75a.75.75 0 01-.75-.75v-2.25a.75.75 0 011.5 0V21a.75.75 0 01-.75.75zM5.106 18.894a.75.75 0 010-1.06l1.59-1.591a.75.75 0 111.06 1.06l-1.59 1.59a.75.75 0 01-1.06 0zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM6.106 5.106a.75.75 0 011.06 0l1.591 1.59a.75.75 0 01-1.06 1.06l-1.59-1.59a.75.75 0 010-1.06z" />
    </svg>
);

export const MoonIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-3.833 2.067-7.171 5.231-9.016a.75.75 0 01.819.162z" clipRule="evenodd" />
    </svg>
);

export const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.604 13.442c-.279-.14-1.644-.811-1.9-.903-.256-.092-.442-.14-.628.14-.186.279-.718.903-.881 1.089-.163.186-.326.208-.605.069-.279-.14-1.179-.434-2.246-1.385-1.067-.951-1.785-2.128-2.093-2.497-.308-.369-.033-.554.107-.728.128-.163.279-.419.419-.628.14-.208.186-.348.279-.579.093-.232.047-.442-.023-.582-.07-.14-.628-1.512-.861-2.069-.22-.534-.452-.464-.628-.47-.163-.007-.349-.007-.535-.007-.186 0-.489.07-.733.348-.244.279-.948.926-.948 2.251 0 1.326.971 2.607 1.101 2.793.13.186 1.884 2.894 4.575 4.032.645.279 1.151.442 1.543.562.628.186 1.196.163 1.644.093.5-.07 1.644-.674 1.884-1.325.244-.651.244-1.21.163-1.326-.081-.116-.302-.186-.581-.325zM12.001 2.001a9.963 9.963 0 0 0-9.942 9.942c0 1.761.464 3.42 1.309 4.843l-1.344 4.907 5.021-1.316a9.926 9.926 0 0 0 4.956 1.266h.001c5.49 0 9.942-4.452 9.942-9.941 0-5.49-4.452-9.942-9.942-9.942zm0 18.258a8.283 8.283 0 0 1-4.239-1.201l-.3-.18-3.141.821.836-3.07a8.332 8.332 0 0 1-1.29-4.468c0-4.582 3.725-8.308 8.308-8.308 4.582 0 8.308 3.725 8.308 8.308 0 4.583-3.726 8.308-8.308 8.308z"/>
    </svg>
);

export const InfoIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c-.226-.226-.334-.537-.334-.849 0-.312.108-.623.334-.849.451-.451 1.246-.451 1.697 0 .226.226.334.537.334.849 0 .312-.108.623-.334.849a1.2 1.2 0 01-1.697 0zM10.5 15.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
    </svg>
);

export const UserCircleIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
);
