import React, {forwardRef} from 'react';
import {StyledPiece} from '../styles/piece';

export interface PieceProps extends React.HTMLAttributes<HTMLElement> {
   id: string;
   odd: boolean;
   clone?: boolean;
   position?: {x: number; y: number};
   disabled?: boolean;
}

export const Piece = forwardRef<HTMLElement, PieceProps>(function Piece(
   {clone, disabled, id, odd, position, ...props},
   ref
) {
   return (
      <StyledPiece
         ref={ref as any}
         layout-id={id}
         disabled={disabled}
         type={odd ? 'blue' : 'red'}
         data-position={JSON.stringify(position)}
         aria-describedby={`piece id ${id}`}
         aria-roledescription="You have selected a piece"
         {...props}
      />
   );
});
