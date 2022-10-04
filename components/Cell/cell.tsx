import React from 'react';
import {StyledCell, StyledCellVariants} from '../styles/cell';
import {useDroppable} from '@dnd-kit/core';

interface Props extends StyledCellVariants {
   children?: React.ReactNode;
   id: string;
}

export const Cell = ({children, id, ...props}: Props) => {
   const {isOver, setNodeRef} = useDroppable({
      id: id,
   });

   const style = {
      backgroundColor: isOver ? 'green' : undefined,
   };

   return (
      <StyledCell ref={setNodeRef} {...props} style={style}>
         {children}
      </StyledCell>
   );
};
