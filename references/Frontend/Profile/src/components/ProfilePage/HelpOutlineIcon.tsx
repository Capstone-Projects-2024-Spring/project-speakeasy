import { memo, SVGProps } from 'react';

const HelpOutlineIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <g clipPath='url(#clip0_131_33)'>
      <path
        d='M44 72H52V64H44V72ZM48 8C25.92 8 8 25.92 8 48C8 70.08 25.92 88 48 88C70.08 88 88 70.08 88 48C88 25.92 70.08 8 48 8ZM48 80C30.36 80 16 65.64 16 48C16 30.36 30.36 16 48 16C65.64 16 80 30.36 80 48C80 65.64 65.64 80 48 80ZM48 24C39.16 24 32 31.16 32 40H40C40 35.6 43.6 32 48 32C52.4 32 56 35.6 56 40C56 48 44 47 44 60H52C52 51 64 50 64 40C64 31.16 56.84 24 48 24Z'
        fill='black'
      />
    </g>
    <defs>
      <clipPath id='clip0_131_33'>
        <rect width={96} height={96} fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const Memo = memo(HelpOutlineIcon);
export { Memo as HelpOutlineIcon };
