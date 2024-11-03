import * as React from 'react';
import type { SVGProps } from 'react';

interface YoutubeIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  color?: string;
}

const YoutubeIcon: React.FC<YoutubeIconProps> = ({
  size,
  className,
  color = '#000',
  ...props
}) => (
  <svg
    width={size || '24'}
    height={size || '25'}
    viewBox='0 0 24 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...props}
  >
    <path
      d='M20.624 8.4658C20.417 7.7278 19.807 7.1468 19.032 6.9498C17.63 6.5918 12 6.5918 12 6.5918C12 6.5918 6.371 6.5918 4.968 6.9498C4.193 7.1468 3.583 7.7278 3.376 8.4658C3 9.8018 3 12.5918 3 12.5918C3 12.5918 3 15.3818 3.376 16.7178C3.583 17.4558 4.193 18.0368 4.968 18.2338C6.37 18.5918 12 18.5918 12 18.5918C12 18.5918 17.629 18.5918 19.032 18.2338C19.807 18.0368 20.417 17.4558 20.624 16.7178C21 15.3818 21 12.5918 21 12.5918C21 12.5918 21 9.8018 20.624 8.4658ZM10 9.5918L16 12.5918L10 15.5918V9.5918Z'
      fill={color}
    />
  </svg>
);

export default YoutubeIcon;
