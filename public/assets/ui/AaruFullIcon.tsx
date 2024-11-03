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
    width={size || '62'}
    height={size ? (size * 205) / 585 : '21'}
    viewBox='0 0 585 205'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M203.734 43.3713L168.32 35.546L160.494 0.130875L150.383 0.130859L142.558 35.5457L107.143 43.3709L107.143 53.4817L142.558 61.3069L150.383 96.7218H160.494L168.319 61.3075L203.734 53.4821V43.3713ZM83.7171 96.7257H93.6797V0.134766L83.7168 0.134781L75.8914 35.5499L40.4766 43.3752V53.486L75.8919 61.3114L83.7171 96.7257ZM203.734 110.694V120.657L168.32 128.482L160.495 163.898H150.384L142.559 128.483L107.143 120.657L107.143 110.694L203.734 110.694ZM93.8306 163.898L93.8438 163.838V110.694H40.4794L40.4794 120.657L75.8945 128.483L83.7198 163.898H93.8306ZM27.3906 59.483L0.25 53.486V43.3752L27.3906 37.3782V59.483ZM160.495 204.132L166.492 176.991H144.387L150.384 204.132H160.495Z'
      fill={color}
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M444.252 92.7817V2.85629H464.665V21.3341C470.473 5.32 481.031 -0.663294 496.693 0.216601V20.2782C490.358 19.7503 485.079 20.1023 480.679 21.6861C469.769 25.5576 465.193 36.1164 465.193 52.1305V92.7817H444.252ZM379.571 95.2454C362.677 95.2454 347.719 86.4465 347.719 67.9686C347.719 46.1472 368.836 42.4516 383.267 40.6918L389.954 39.8119C402.272 38.2281 408.08 36.2924 408.08 27.6694C408.08 20.1023 402.096 15.5268 391.89 15.5268C381.859 15.5268 375.875 20.1023 374.292 26.0856H351.59C354.582 11.6552 368.132 0.216601 392.242 0.216601C417.055 0.216601 428.669 10.4234 428.669 28.5493V71.1363C428.669 78.5274 429.901 86.7984 431.485 92.7817H410.719L410.652 92.4222C410.119 89.5866 409.297 85.208 408.96 80.9911C404.384 88.0303 394.529 95.2454 379.571 95.2454ZM369.716 67.2647C369.716 75.1838 376.579 79.2313 385.378 79.2313C398.753 79.2313 408.08 69.2005 408.08 55.8261V45.9712C404.736 50.1947 400.161 52.1305 389.778 53.7143C377.635 55.6501 369.716 57.7618 369.716 67.2647ZM508.079 62.3373C508.079 84.1587 520.397 95.4214 537.995 95.4214C549.786 95.4214 558.409 90.67 563.336 81.695V92.7817H583.926V2.85629H562.984V52.6584C562.984 70.7843 553.481 78.1754 544.154 78.1754C533.596 78.1754 529.02 71.1363 529.02 59.1697V2.85629H508.079V62.3373ZM254.547 67.9669C254.547 86.4447 269.505 95.2437 286.399 95.2437C301.357 95.2437 311.212 88.0285 315.788 80.9893C316.125 85.2063 316.947 89.5849 317.48 92.4205C317.503 92.5433 317.526 92.6631 317.547 92.78H338.313C336.729 86.7967 335.497 78.5256 335.497 71.1345V28.5475C335.497 10.4216 323.883 0.214844 299.07 0.214844C274.96 0.214844 261.41 11.6535 258.418 26.0838H281.12C282.704 20.1005 288.687 15.525 298.718 15.525C308.924 15.525 314.908 20.1005 314.908 27.6676C314.908 36.2906 309.1 38.2264 296.782 39.8102L290.095 40.6901C275.664 42.4499 254.547 46.1454 254.547 67.9669ZM292.206 79.2296C283.407 79.2296 276.544 75.182 276.544 67.263C276.544 57.7601 284.463 55.6483 296.606 53.7126C306.989 52.1287 311.564 50.193 314.908 45.9695V55.8243C314.908 69.1987 305.581 79.2296 292.206 79.2296Z'
      fill={color}
    />
  </svg>
);

export default AaruIcon;