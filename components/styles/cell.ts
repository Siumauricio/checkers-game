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
            bg: '$accents0',
         },
         odd: {
            bg: '$accents2',
         },
      },
   },
   defaultVariants: {
      type: 'even',
   },
});

export type StyledCellVariants = VariantProps<typeof StyledCell>;
