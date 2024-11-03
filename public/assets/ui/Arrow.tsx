import * as React from 'react';
import type { SVGProps } from 'react';

interface ArrowIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
  size,
  className,
  color = '#fff',
  opacity = 1,
  ...props
}) => (
  <svg
    width={size || '11'}
    height={size ? (size * 12) / 11 : '12'}
    viewBox='0 0 11 12'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...props}
  >
    <path
      d='M10.2891 0.628906L4.61719 0.628906L4.61719 6.75391'
      stroke={color}
      strokeOpacity={opacity}
    />
    <path
      d='M0.128906 6.75391L9.10547 6.75391L4.83792 11.047L0.128906 6.75391Z'
      fill={color}
      fillOpacity={opacity}
    />
  </svg>
);

export default ArrowIcon;
