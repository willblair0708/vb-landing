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
    width={size || '35'}
    height={size ? (size * 96) / 341 : '21'}
    viewBox='0 0 341 96'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M190.524 93.0033V3.07334H210.934V21.5533C216.754 5.54334 227.304 -0.446659 242.974 0.433341V20.4933C236.634 19.9633 231.364 20.3133 226.964 21.9033C216.054 25.7733 211.474 36.3333 211.474 52.3433V92.9933H190.534L190.524 93.0033ZM174.944 71.3533V28.7733C174.944 10.6433 163.334 0.433341 138.514 0.433341C113.694 0.433341 100.854 11.8733 97.8642 26.3033H120.564C122.144 20.3233 128.134 15.7433 138.164 15.7433C148.194 15.7433 154.354 20.3233 154.354 27.8833C154.354 36.5033 148.544 38.4433 136.224 40.0233L129.534 40.9033C115.104 42.6633 93.9842 46.3633 93.9842 68.1833C93.9842 86.6633 108.944 95.4633 125.834 95.4633C140.794 95.4633 150.644 88.2433 155.224 81.2133C155.564 85.4333 156.384 89.8133 156.914 92.6433L156.984 93.0033H177.754C176.174 87.0233 174.934 78.7533 174.934 71.3533H174.944ZM154.354 56.0433C154.354 69.4133 145.024 79.4533 131.654 79.4533C122.854 79.4533 115.994 75.4033 115.994 67.4833C115.994 57.9833 123.914 55.8733 136.054 53.9333C146.434 52.3533 151.014 50.4133 154.354 46.1933V56.0433ZM81.7742 71.3533V28.7633C81.7742 10.6433 70.1642 0.433341 45.3442 0.433341C20.5242 0.433341 7.68422 11.8733 4.69422 26.3033H27.3942C28.9742 20.3233 34.9642 15.7433 44.9942 15.7433C55.0242 15.7433 61.1842 20.3233 61.1842 27.8833C61.1842 36.5033 55.3742 38.4433 43.0542 40.0233L36.3642 40.9033C21.9442 42.6733 0.824219 46.3633 0.824219 68.1833C0.824219 86.6633 15.7842 95.4633 32.6742 95.4633C47.6342 95.4633 57.4842 88.2433 62.0642 81.2133C62.4042 85.4333 63.2242 89.8133 63.7542 92.6433L63.8242 93.0033H84.5942C83.0142 87.0233 81.7742 78.7533 81.7742 71.3533ZM61.1842 56.0433C61.1842 69.4133 51.8542 79.4533 38.4842 79.4533C29.6842 79.4533 22.8242 75.4033 22.8242 67.4833C22.8242 57.9833 30.7442 55.8733 42.8842 53.9333C53.2642 52.3533 57.8442 50.4133 61.1842 46.1933V56.0433ZM319.734 3.07334V35.8133H309.264V52.8733C309.264 71.0033 299.764 78.3933 290.434 78.3933C279.874 78.3933 275.294 71.3533 275.294 59.3833V3.07334H254.354V62.5533C254.354 84.3733 266.674 95.6333 284.274 95.6333C296.064 95.6333 304.684 90.8833 309.614 81.9033V92.9933H330.204V35.8133H340.674V3.07334H319.734Z'
      fill={color}
    />
  </svg>
);

export default AaruIcon;
