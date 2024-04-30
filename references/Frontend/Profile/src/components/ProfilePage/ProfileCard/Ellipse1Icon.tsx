import { memo, SVGProps } from 'react';

const Ellipse1Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 415 455' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <ellipse cx={207.5} cy={227.5} rx={207.5} ry={227.5} fill='white' />
  </svg>
);

const Memo = memo(Ellipse1Icon);
export { Memo as Ellipse1Icon };
