import {styled, VariantProps} from '@nextui-org/react';

export const StyledPiece = styled('button', {
   apparence: 'none',
   outline: 'none',
   width: '100%',
   height: '100%',

   opacity: '1',
   borderRadius: '50%',
   touchAction: 'none',
   cursor: 'grab',
   padding: '8px 10px',
   variants: {
      type: {
         blue: {
            backgroundColor: '$primary',
            border: '1px solid $blue100',
            boxShadow:
               'inset 0 0 0 4px rgba(255, 255, 255, 0.2), inset 0 0 0 10px $colors$primary, inset 0 0 0 30px rgba(0, 0, 0, 0.1)',
         },
         red: {
            backgroundColor: '$red600',
            border: '1px solid $red100',
            boxShadow:
               'inset 0 0 0 4px rgba(255, 255, 255, 0.2), inset 0 0 0 10px $colors$error, inset 0 0 0 30px rgba(0, 0, 0, 0.1)',
         },
      },
      disabled: {
         true: {
            opacity: '0.6',
            pointerEvents: 'none',
         },
      },
   },
   defaultVariants: {
      type: 'blue',
   },
});

export type StyledPieceVariants = VariantProps<typeof StyledPiece>;
