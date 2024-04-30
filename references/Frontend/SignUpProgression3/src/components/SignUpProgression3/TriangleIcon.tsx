import { memo, SVGProps } from 'react';

const TriangleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 51 51' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M25.5 51L3.41635 12.75H47.5836L25.5 51Z' fill='black' fillOpacity={0.6} />
  </svg>
);

const Memo = memo(TriangleIcon);
export { Memo as TriangleIcon };
