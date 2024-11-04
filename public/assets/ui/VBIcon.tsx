import * as React from 'react';
import type { SVGProps } from 'react';

interface SvgKpProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  color?: string;
}

const AaruIcon: React.FC<SvgKpProps> = ({
  size,
  className,
  color = '#fff',
  ...props
}) => (
  <svg
    width={size || '800'}
    height={size ? (size * 600) / 800 : '600'}
    viewBox='0 0 800 600'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...props}
  >
    {/* Cell-like circular structure */}
    <circle cx="200" cy="300" r="120" stroke={color} strokeWidth="16" fill="none" />
    <circle cx="200" cy="300" r="75" stroke={color} strokeWidth="12" fill="none" />
    
    {/* Small organelle-like circles */}
    <circle cx="155" cy="255" r="24" fill={color} />
    <circle cx="245" cy="345" r="18" fill={color} />
    <circle cx="185" cy="360" r="15" fill={color} />
    <circle cx="230" cy="270" r="20" fill={color} />
    
    {/* Text */}
    <text
      x="380"
      y="280"
      fill={color}
      style={{ fontFamily: 'Arial', fontSize: '96px', fontWeight: 'bold' }}
    >
      Virtual
    </text>
    <text
      x="380"
      y="400"
      fill={color}
      style={{ fontFamily: 'Arial', fontSize: '96px', fontWeight: 'bold' }}
    >
      Biology
    </text>
  </svg>
);

export default AaruIcon;
