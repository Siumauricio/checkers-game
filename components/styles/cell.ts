import {styled, VariantProps} from '@nextui-org/react';

export const StyledCell = styled('div', {
   $$size: 'calc(6vw)',
   $$minSize: '3rem',
   $$maxSize: 'calc(8.2vh)',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '$$size',
   maxWidth: '$$maxSize',
   minWidth: '$$minSize',
   height: '$$size',
   maxHeight: '$$maxSize',
   minHeight: '$$minSize',
   p: '8px',
   variants: {
      type: {
         even: {
            bg: '$accents2',
         },
         odd: {
            bg: '$accents0',
         },
      },
      validDropLocation: {
         true: {
            bg: '$success',
         },
      },
      isOver: {
         true: {},
      },
   },
   defaultVariants: {
      type: 'even',
   },
});

export type StyledCellVariants = VariantProps<typeof StyledCell>;
