import React from 'react';
import {StyledPiece, StyledPieceVariants} from '../styles/piece';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

interface Props extends StyledPieceVariants {
   id: string;
}

export const Piece = ({id, ...props}: Props) => {
   const {attributes, listeners, setNodeRef, transform} = useDraggable({
      id: id,
   });
   const style = {
      transform: CSS.Translate.toString(transform),
   };

   return (
      <StyledPiece
         style={style}
         {...props}
         ref={setNodeRef}
         {...listeners}
         {...attributes}
      />
   );
};
