// Add these new icon components
export const DNA: React.FC<IconProps> = ({ className = '' }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2L4 7v10l8 5 8-5V7l-8-5zM8 15V9l4-2.5L16 9v6l-4 2.5L8 15z' />
  </svg>
);

export const Database: React.FC<IconProps> = ({ className = '' }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2C6.48 2 2 4.48 2 7.5v9C2 19.52 6.48 22 12 22s10-2.48 10-5.5v-9C22 4.48 17.52 2 12 2zm0 18c-4.42 0-8-1.79-8-4v-1.17C5.67 16.12 8.67 17 12 17s6.33-.88 8-2.17V16c0 2.21-3.58 4-8 4z' />
  </svg>
);

export const Cells: React.FC<IconProps> = ({ className = '' }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M3 3h7v7H3V3zm11 0h7v7h-7V3zm0 11h7v7h-7v-7zm-11 0h7v7H3v-7z' />
  </svg>
);

export const Gene: React.FC<IconProps> = ({ className = '' }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h16V4H4zm2 3h12v2H6V7zm0 4h12v2H6v-2zm0 4h8v2H6v-2z' />
  </svg>
);

export const Network: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
  >
    <circle cx='12' cy='12' r='3' />
    <circle cx='4' cy='8' r='2' />
    <circle cx='20' cy='8' r='2' />
    <circle cx='4' cy='16' r='2' />
    <circle cx='20' cy='16' r='2' />
    <path d='M12 9L4 8M12 9L20 8M12 15L4 16M12 15L20 16' />
  </svg>
);

export const Graph: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
  >
    <path d='M4 19L19 19' strokeLinecap='round' />
    <path d='M4 5L19 5' strokeLinecap='round' />
    <path d='M4 12L19 12' strokeLinecap='round' />
    <circle cx='9' cy='12' r='2' fill='currentColor' />
    <circle cx='15' cy='5' r='2' fill='currentColor' />
    <circle cx='7' cy='19' r='2' fill='currentColor' />
  </svg>
);
