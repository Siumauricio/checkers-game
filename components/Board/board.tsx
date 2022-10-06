import {useCallback, useEffect, useState} from 'react';
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

   // useEffect(() => {
   //    const x = 0;
   //    const y = 3;
   //    const odd = false;
   //    const findPiece: PieceProps = {
   //       id: x + '-' + y,
   //       odd: odd,
   //       position: {x: x, y: y},
   //       disabled: false,
   //    };
   //    const newPosition = [(pieces[x][y] = findPiece)];
   //    setPieces([...pieces, newPosition]);
   // }, []);

   const checkCanMove = (
      isOddTurn: boolean,
      isOddPiece: boolean,
      movingPiece: PieceProps,
      moveToX: number,
      moveToY: number
   ) => {
      if (isOddTurn && isOddPiece && movingPiece.position) {
         const {x: moveFromX, y: moveFromY} = movingPiece.position;

         if (moveFromX - 1 >= 0 && moveFromX <= 6) {
            const piece = board[moveFromX + 1][moveFromY - 1];
            if (!piece.odd) {
               console.log('A comer 1');
            }
            if (piece && moveToX === piece.x && moveToY === piece.y) {
               return {canMove: true};
            }
         }

         // 3 4
         // 4 5
         if (moveFromY + 1 <= 7 && moveFromX <= 6) {
            const piece = board[moveFromX + 1][moveFromY + 1];
            const piece2 = pieces[moveFromX + 1][moveFromY + 1];

            if (piece2 && !piece2.odd) {
               const pieceToGo = pieces[moveFromX + 2][moveFromY + 2];
               if (
                  pieceToGo === undefined &&
                  moveToX === moveFromX + 2 &&
                  moveToY === moveFromY + 2
               ) {
                  console.log('hola');
                  return {canMove: true};
               }
               // return {canMove: false};
               // debugger;
            }
            // 4 5
            // 5 6

            // const pieceToGo = board[moveFromX + 2][moveFromY + 2];
            // console.log(pieceToGo);
            // // if(piece)
            // // console.log('A comer 2');
            // console.log('piece', piece);
            // console.log(movingPiece);
            if (piece && moveToX === piece.x && moveToY === piece.y) {
               return {canMove: true};
            }
         }
         if (moveFromX === 0) {
            let piece = board[moveFromX + 1][moveFromY - 1];

            if (piece && moveToX === piece.x && moveToY === piece.y) {
               return {canMove: true};
            }
         }

         // For remove
      } else if (!isOddTurn && !isOddPiece && movingPiece.position) {
         const {x: moveFromX, y: moveFromY} = movingPiece.position;

         if (moveFromX - 1 >= 0) {
            const piece = board[moveFromX - 1][moveFromY - 1];
            if (piece && moveToX === piece.x && moveToY === piece.y) {
               return {canMove: true};
            }
         }

         if (moveFromY + 1 <= 7 && moveFromX - 1 >= 0) {
            const piece = board[moveFromX - 1][moveFromY + 1];

            if (piece && moveToX === piece.x && moveToY === piece.y) {
               return {canMove: true};
            }
         }
      }
      return {canMove: false};
   };

   const checkCanRemove = (
      isOddTurn: boolean,
      isOddPiece: boolean,
      movingPiece: PieceProps,
      moveToX: number,
      moveToY: number
   ) => {
      if (isOddTurn && isOddPiece && movingPiece.position) {
         const {x: moveFromX, y: moveFromY} = movingPiece.position;

         if (moveFromX - 2 >= 0 && moveFromX <= 6) {
            const piece = board[moveFromX + 2][moveFromY - 2];
            if (piece && moveToX === piece.x && moveToY === piece.y) {
               return {canRemove: true};
            }
         }

         if (moveFromY + 2 <= 7 && moveFromX <= 6) {
            const piece = board[moveFromX + 2][moveFromY + 2];
            if (piece && moveToX === piece.x && moveToY === piece.y) {
               return {canRemove: true};
            }
         }
         if (moveFromX === 0) {
            let piece = board[moveFromX + 2][moveFromY - 2];
            if (piece && moveToX === piece.x && moveToY === piece.y) {
               return {canRemove: true};
            }
         }
      }
      return {canRemove: false};
   };

   const handleDragEnd = (event: DragEndEvent) => {
      if (!movingPiece?.position || !event.over?.id) {
         return;
      }

      const {x: movingPieceX, y: movingPieceY} = movingPiece.position;
      const [moveToX, moveToY] = event.over.id
         .toString()
         .split('-')
         .map(Number);

      const canMove = checkCanMove(
         isOddTurn,
         movingPiece.odd,
         movingPiece,
         moveToX,
         moveToY
      ).canMove;

      if (canMove) {
         // Verify if the position that we want to move is empty
         if (pieces[moveToX][moveToY]) {
            return;
         }
         const findPiece: PieceProps = {
            id: moveToX + '-' + moveToY,
            odd: movingPiece.odd,
            position: {x: moveToX, y: moveToY},
            disabled: false,
         };

         const newPosition = [(pieces[moveToX][moveToY] = findPiece)];
         const cleanOriginalPosition = [
            (pieces[movingPieceX][movingPieceY] = undefined),
         ];

         const updatedPieces = [...pieces, newPosition, cleanOriginalPosition];
         // clear unused positions
         updatedPieces.splice(8, 2);

         setIsOddTurn(!isOddTurn);
         setMovingPiece(null);

         setPieces(updatedPieces);
      }
      const canRemove = checkCanRemove(
         isOddTurn,
         movingPiece.odd,
         movingPiece,
         moveToX,
         moveToY
      ).canRemove;
      if (canRemove) {
         console.log('can remove');
      }
   };
   // console.log(pieces);
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
            {board.map((row, x) => {
               return row.map((rowCase, y) => {
                  const piece = pieces[x][y];
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
                     if (x == 5 && y == 6) {
                        console.log('canDrop', canDrop);
                     }
                     return (
                        <Cell
                           key={rowCase.id}
                           validDropLocation={canDrop}
                           {...rowCase}
                        >
                           {x} - {y}
                        </Cell>
                     );
                  }
                  const pieceMarkup = disabled ? (
                     <Piece {...piece} disabled />
                  ) : (
                     <DraggablePiece {...piece} />
                  );

                  return (
                     <Cell key={rowCase.id} {...rowCase}>
                        {x} - {y}
                        {/* {x} - {y} */}
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
// if (moveFromY + 1 <= 7 && moveFromX <= 6) {
//    const piece = pieces[moveFromX + 1][moveFromY + 1];
//    const piece2 = pieces[moveFromX + 1][moveFromY + 1];
//    console.log('piece', piece);

//    if (piece2 && !piece2.odd) {
//       const pieceToGo = pieces[moveFromX + 2][moveFromY + 2];
//       if (
//          pieceToGo === undefined &&
//          moveToX === moveFromX + 2 &&
//          moveToY === moveFromY + 2
//       ) {
//          console.log('hola');
//          return {canMove: true};
//       }
//       // return {canMove: false};
//       // debugger;
//    }
//    // 4 5
//    // 5 6

//    // const pieceToGo = board[moveFromX + 2][moveFromY + 2];
//    // console.log(pieceToGo);
//    // // if(piece)
//    // // console.log('A comer 2');
//    // console.log('piece', piece);
//    // console.log(movingPiece);
//    if (
//       piece === undefined &&
//       moveFromX + 1 === moveToX &&
//       moveFromY + 1 === moveToY
//       // piece &&
//       // moveToX === piece.position?.x &&
//       // moveToY === piece.position?.y
//    ) {
//       return {canMove: true};
//    }
