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

   // const {x: moveToX, y: moveToY} = movingPiece.position;
   // const {canMove} = checkCanMove(
   //    isOddTurn,
   //    movingPiece.odd,
   //    movingPiece,
   //    moveToX,
   //    moveToY
   // );
   // console.log(canMove);
   // if (canMove) {
   //    const newPieces = pieces.map((piece) => {
   //       if (piece.id === movingPiece.id) {
   //          return {
   //             ...piece,
   //             position: {
   //                x: movingPiece.position.x,
   //                y: movingPiece.position.y,
   //             },
   //          };
   //       }
   //       return piece;
   //    });
   //    setPieces(newPieces);
   //    setIsOddTurn(!isOddTurn);
   // }

   // console.log(moveToX, moveToY);
   // const movingPieceX = movingPiece?.data?.current?.position.y as number;
   // const movingPieceY = movingPiece?.data?.current?.position.x as number;
   // const pieceBoard = board[movingPieceX][movingPieceY];
   // console.log(pieceBoard);
   // // board[movingPieceX][movingPieceY] = {
   // //    ...pieceBoard,
   // //    position: {},
   // // };
   // // console.log(movingPiece?.data.current.position);
   // // board[movingPiece?.data.current.position.y][
   // //    movingPiece?.data.current.position.x
   // // ] = null;
   // // board[over.id.y][over.id.x] = movingPiece?.data.id;
   // console.log('Piece dropped', movingPiece?.id, ' to ', over.id);

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
