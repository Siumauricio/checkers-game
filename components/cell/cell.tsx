import React from 'react';
import {StyledCell, StyledCellVariants} from '../styles/cell';
import {useDroppable} from '@dnd-kit/core';

interface Props extends StyledCellVariants {
   children?: React.ReactNode;
   id: string;
   odd: boolean;
   size?: number;
   validDropLocation?: boolean;
   x: number;
   y: number;
}

export const Cell = ({
   children,
   validDropLocation = false,
   id,
   odd,
   x,
   y,
   ...props
}: Props) => {
   const {isOver, setNodeRef} = useDroppable({
      id: id,
   });
   return (
      <StyledCell
         ref={setNodeRef}
         type={odd ? 'odd' : 'even'}
         validDropLocation={validDropLocation}
         isOver={isOver}
         data-x={x}
         data-y={y}
         // {...props}
      >
         {children}
      </StyledCell>
   );
};
