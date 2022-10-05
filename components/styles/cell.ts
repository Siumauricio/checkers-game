import {styled, VariantProps} from '@nextui-org/react';

export const StyledCell = styled('div', {
   width: '100%',
   maxWidth: '83px',
   height: '83px',
   maxHeight: '83px',
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
         true: {
            // backgroundColor: '#7ef3af',
         },
      },
   },
   defaultVariants: {
      type: 'even',
   },
});

export type StyledCellVariants = VariantProps<typeof StyledCell>;
