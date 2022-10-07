import {useDraggable} from '@dnd-kit/core';
import {Piece, PieceProps} from './piece';

export const DraggablePiece = (props: PieceProps) => {
   const {attributes, isDragging, listeners, setNodeRef} = useDraggable({
      id: props.id,
   });
   return (
      <Piece
         ref={setNodeRef}
         style={{
            opacity: isDragging ? 0.5 : undefined,
         }}
         {...props}
         {...attributes}
         {...listeners}
      />
   );
};
