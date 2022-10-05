import {useCallback, useState} from 'react';
import {Cell} from '../cell/cell';
import {Piece, PieceProps} from '../piece/piece';
import {GridBoard} from '../styles/grid-board';
import {generateBoard, generatePieces} from '../utils/board';
import {
   Active,
   DndContext,
   DragEndEvent,
   DragOverlay,
   DragStartEvent,
   UniqueIdentifier,
   useDraggable,
} from '@dnd-kit/core';

export const Board = () => {
   const [movingPiece, setMovingPiece] = useState<PieceProps | null>(null);
   const [isOddTurn, setIsOddTurn] = useState(true);
   const [board] = useState(generateBoard());
   const [pieces, setPieces] = useState(() => generatePieces(board));

   const checkCanMove = (
      isOddTurn: boolean,
      isOddPiece: boolean,
      movingPiece: PieceProps,
      moveToX: number,
      moveToY: number
   ) => {
      if (isOddTurn && isOddPiece && movingPiece.position) {
         const {x: moveFromX, y: moveFromY} = movingPiece.position;
         if (moveFromX - 1 >= 0) {
            const piece = board[moveFromX - 1][moveFromY + 1];
            if (moveToX === piece.y && moveToY === piece.x) {
               return {canMove: true};
            }
         }

         if (moveFromX + 1 <= 7) {
            const piece = board[moveFromX + 1][moveFromY + 1];
            if (moveToX === piece.y && moveToY === piece.x) {
               return {canMove: true};
            }
         }
      } else if (!isOddTurn && !isOddPiece && movingPiece.position) {
         const {x: moveFromX, y: moveFromY} = movingPiece.position;
         if (moveFromX - 1 >= 0) {
            const piece = board[moveFromX - 1][moveFromY - 1];
            if (moveToX === piece.y && moveToY === piece.x) {
               return {canMove: true};
            }
         }

         if (moveFromX + 1 <= 7) {
            const piece = board[moveFromX + 1][moveFromY - 1];
            if (moveToX === piece.y && moveToY === piece.x) {
               return {canMove: true};
            }
         }
      }
      return {canMove: false};
   };

   // [isOddTurn]
   // );

   // console.log(isOddTurn);

   // console.log(isOddPiece);

   const handleDragEnd = (event: DragEndEvent) => {
      if (!movingPiece?.position || !event.over?.id) {
         return;
      }

      const {x: movingPieceX, y: movingPieceY} = movingPiece.position;
   };

   const handleDragStart = ({active}: DragStartEvent) => {
      const piece = pieces.reduce<PieceProps | undefined>((acc, row) => {
         return acc ?? row.find((cell) => cell?.id === active.id);
      }, undefined);
      // console.log('Piece picked', active);
      if (piece) {
         setMovingPiece(piece);
      }
      // console.log(active);
   };

   const handleDragCancel = () => {
      setMovingPiece(null);
   };

   return (
      <DndContext
         id="board"
         onDragEnd={handleDragEnd}
         onDragStart={handleDragStart}
         onDragCancel={handleDragCancel}
      >
         <GridBoard>
            {board.map((row, y) => {
               return row.map((rowCase, x) => {
                  const piece = pieces[y][x];
                  const disabled =
                     (piece?.odd && !isOddTurn) || (!piece?.odd && isOddTurn);

                  if (!piece) {
                     const canDrop = movingPiece
                        ? checkCanMove(
                             isOddTurn,
                             movingPiece.odd,
                             movingPiece,
                             x,
                             y
                          ).canMove
                        : false;

                     return (
                        <Cell
                           key={rowCase.id}
                           validDropLocation={canDrop}
                           {...rowCase}
                        />
                     );
                  }
                  const pieceMarkup = disabled ? (
                     <Piece {...piece} disabled />
                  ) : (
                     <DraggablePiece {...piece} />
                  );

                  return (
                     <Cell key={rowCase.id} {...rowCase}>
                        {pieceMarkup}
                     </Cell>
                  );
               });
            })}
         </GridBoard>
         <DragOverlay dropAnimation={null}>
            {movingPiece == null ? null : (
               <Piece odd={movingPiece.odd} clone id={movingPiece.id} />
            )}
         </DragOverlay>
      </DndContext>
   );
};
function DraggablePiece(props: PieceProps) {
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
}
