import {styled} from '@nextui-org/react';

export const GridBoard = styled('div', {
   'display': 'inline-grid',
   'boxSizing': 'border-box',
   'boxShadow': `0 0 0 10px $colors$accents3, 0 0 0 20px  $colors$accents5,
   0 30px 60px -12px rgba(50, 50, 92, 0.3),
   0 18px 36px -18px rgba(0, 0, 0, 0.3);`,
   'borderRadius': '$md',
   'width': '100%',
   'maxWidth': 'fit-content',
   'bg': '$accents6',
   '& div:last-child': {
      borderBottomRightRadius: '$md',
   },
   '& div:first-child': {
      borderTopLeftRadius: '$md',
   },
   '& div:nth-child(8)': {
      borderTopRightRadius: '$md',
   },
   '& div:nth-child(57)': {
      borderBottomLeftRadius: '$md',
   },
   'gridTemplateColumns': 'repeat(8, max-content)',
});
