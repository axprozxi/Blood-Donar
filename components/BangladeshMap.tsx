import React from 'react';

interface BangladeshMapProps {
  onDistrictClick: (districtName: string) => void;
  selectedDistrict: string | null;
  highlightedDistrict: string | null;
  onDistrictHover: (districtName: string | null) => void;
}

// FIX: Refactored to use a data array for districts to resolve rendering and typing errors.
// This avoids duplicate rendering, unsupported styled-jsx, and complex cloning logic.
const districtData = [
    // Dhaka Division
    { name: "Dhaka", d: "M410 450 L450 450 L450 500 L410 500 Z" },
    { name: "Gazipur", d: "M455 460 L495 460 L495 510 L455 510 Z" },
    { name: "Tangail", d: "M360 440 L400 440 L400 490 L360 490 Z" },
    // Chattogram Division
    { name: "Chattogram", d: "M480 550 L530 550 L530 600 L480 600 Z" },
    { name: "Cox's Bazar", d: "M535 560 L585 560 L585 610 L535 610 Z" },
    { name: "Feni", d: "M470 610 L520 610 L520 650 L470 650 Z" },
     // Khulna Division
    { name: "Khulna", d: "M300 600 L350 600 L350 650 L300 650 Z" },
    { name: "Jashore", d: "M355 610 L405 610 L405 660 L355 660 Z" },
    { name: "Satkhira", d: "M290 655 L340 655 L340 705 L290 705 Z" },
     // Sylhet Division
    { name: "Sylhet", d: "M490 380 L540 380 L540 430 L490 430 Z" },
    { name: "Moulvibazar", d: "M545 390 L595 390 L595 440 L545 440 Z" },
     // Barisal Division
    { name: "Barisal", d: "M390 670 L440 670 L440 720 L390 720 Z" },
    { name: "Bhola", d: "M445 680 L495 680 L495 730 L445 730 Z" },
     // Rajshahi Division
    { name: "Rajshahi", d: "M280 450 L330 450 L330 500 L280 500 Z" },
    { name: "Pabna", d: "M335 460 L385 460 L385 510 L335 510 Z" },
     // Rangpur Division
    { name: "Rangpur", d: "M290 350 L340 350 L340 400 L290 400 Z" },
    { name: "Dinajpur", d: "M345 360 L395 360 L395 410 L345 410 Z" },
     // Mymensingh Division
    { name: "Mymensingh", d: "M400 390 L450 390 L450 440 L400 440 Z" },
];

export const BangladeshMap: React.FC<BangladeshMapProps> = ({ onDistrictClick, selectedDistrict, highlightedDistrict, onDistrictHover }) => {
  // A simplified SVG map for demonstration
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 600 800"
      xmlSpace="preserve"
      className="w-full h-auto"
    >
      <g>
        {districtData.map(({ name, d }) => {
          const isSelected = selectedDistrict === name;
          const isHighlighted = highlightedDistrict === name;
          return (
            <path
              key={name}
              d={d}
              data-name={name}
              onClick={() => onDistrictClick(name)}
              onMouseEnter={() => onDistrictHover(name)}
              onMouseLeave={() => onDistrictHover(null)}
              style={{
                fill: isSelected ? '#D90429' : (isHighlighted ? 'rgba(217, 4, 41, 0.5)' : 'rgba(255, 255, 255, 0.2)'),
                stroke: '#A30015',
                strokeWidth: 1.5,
                transition: 'fill 0.3s ease',
                cursor: 'pointer',
              }}
            />
          );
        })}
      </g>
    </svg>
  );
};
