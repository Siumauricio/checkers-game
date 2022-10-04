import {styled} from '@nextui-org/react';

export const GridBoard = styled('div', {
   'display': 'grid',
   'boxSizing': 'border-box',
   'boxShadow': '$lg',
   'borderRadius': '$md',
   'border': '8px solid $border',
   'width': '100%',
   'maxWidth': '620px',
   'bg': '$accents6',
   '& div:last-child': {
      borderBottomRightRadius: '$lg',
   },
   '& div:first-child': {
      borderTopLeftRadius: '$lg',
   },
   '& div:nth-child(8)': {
      borderTopRightRadius: '$lg',
   },
   '& div:nth-child(57)': {
      borderBottomLeftRadius: '$lg',
   },
   'gridTemplateColumns': 'repeat(8, 1fr)',
});
