// SVG Icons Collection - Using external SVG files
import React from 'react';

// Import SVG files as URLs
import svg1 from './1.svg';
import svg2 from './2.svg';
import svg3 from './3.svg';
import svg4 from './4.svg';
import svg5 from './5.svg';
import svg6 from './6.svg';

interface SVGProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

export const SVGIcon01: React.FC<SVGProps> = ({ width = 321, height = 298, className = "" }) => (
  <img
    src={svg1}
    alt="SVG Icon 1"
    width={width}
    height={height}
    className={className}
    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
  />
);

export const SVGIcon02: React.FC<SVGProps> = ({ width = 305, height = 348, className = "" }) => (
  <img
    src={svg2}
    alt="SVG Icon 2"
    width={width}
    height={height}
    className={className}
    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
  />
);

export const SVGIcon03: React.FC<SVGProps> = ({ width = 284, height = 291, className = "" }) => (
  <img
    src={svg3}
    alt="SVG Icon 3"
    width={width}
    height={height}
    className={className}
    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
  />
);

export const SVGIcon04: React.FC<SVGProps> = ({ width = 302, height = 349, className = "" }) => (
  <img
    src={svg4}
    alt="SVG Icon 4"
    width={width}
    height={height}
    className={className}
    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
  />
);

export const SVGIcon05: React.FC<SVGProps> = ({ width = 320, height = 299, className = "" }) => (
  <img
    src={svg5}
    alt="SVG Icon 5"
    width={width}
    height={height}
    className={className}
    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
  />
);

export const SVGIcon06: React.FC<SVGProps> = ({ width = 407, height = 348, className = "" }) => (
  <img
    src={svg6}
    alt="SVG Icon 6"
    width={width}
    height={height}
    className={className}
    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
  />
);

export const SecuritySVG: React.FC<SVGProps> = ({ width = 32, height = 32, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10.1V11.1C15.4,11.4 16,12 16,12.8V16.2C16,17.1 15.1,18 14.2,18H9.8C8.9,18 8,17.1 8,16.2V12.8C8,12 8.6,11.4 9.2,11.1V10.1C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10.1V11.1H13.5V10.1C13.5,8.7 12.8,8.2 12,8.2Z"
          fill="currentColor"
    />
  </svg>
);

export const PerformanceSVG: React.FC<SVGProps> = ({ width = 32, height = 32, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"
          fill="currentColor"
    />
  </svg>
);

export const InnovationSVG: React.FC<SVGProps> = ({ width = 32, height = 32, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path d="M9,21C9,22.1 9.9,23 11,23H13C14.1,23 15,22.1 15,21V20H9V21M12,2C8.14,2 5,5.14 5,9C5,11.38 6.19,13.47 8,14.74V17C8,17.55 8.45,18 9,18H15C15.55,18 16,17.55 16,17V14.74C17.81,13.47 19,11.38 19,9C19,5.14 15.86,2 12,2Z"
          fill="currentColor"
    />
  </svg>
);