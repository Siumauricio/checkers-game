import {useCallback, useEffect, useState} from 'react';
import {Cell} from '../cell/cell';
import {Piece, PieceProps} from '../piece/piece';
import {GridBoard} from '../styles/grid-board';
import {generateBoard, generatePieces} from '../utils/board';
import {
   DndContext,
   DragEndEvent,
   DragOverlay,
   DragStartEvent,
   useDraggable,
} from '@dnd-kit/core';
import {Score} from '../score/score';

export const Board = () => {
   const [movingPiece, setMovingPiece] = useState<PieceProps | null>(null);
   const [isOddTurn, setIsOddTurn] = useState(true);
   const [board] = useState(generateBoard());
   const [pieces, setPieces] = useState(() => generatePieces(board));
   const [blueScore, setBlueScore] = useState(0);
   const [redScore, setRedScore] = useState(0);

   const checkCanMove = (
      isOddTurn: boolean,
      isOddPiece: boolean,
      movingPiece: PieceProps,
      moveToX: number,
      moveToY: number
   ) => {
      if (isOddTurn && isOddPiece && movingPiece.position) {
         const {x: moveFromX, y: moveFromY} = movingPiece.position;

         // Blue / Left
         if (moveFromX - 1 >= 0 && moveFromX <= 6) {
            const piece = pieces[moveFromX + 1][moveFromY - 1];

            if (piece && !piece.odd) {
               const pieceToGo = pieces[moveFromX + 2][moveFromY - 2];
               if (
                  pieceToGo === undefined &&
                  moveToX === moveFromX + 2 &&
                  moveToY === moveFromY - 2
               ) {
                  return {canMove: true, canRemove: true, isLeft: true};
               }
            }

            if (
               !piece &&
               moveToX === moveFromX + 1 &&
               moveToY === moveFromY - 1
            ) {
               return {canMove: true};
            }
         }

         // Blue / Right
         if (moveFromY + 1 <= 7 && moveFromX <= 6) {
            const piece = pieces[moveFromX + 1][moveFromY + 1];

            if (piece && !piece.odd) {
               const pieceToGo = pieces[moveFromX + 2][moveFromY + 2];
               if (
                  pieceToGo === undefined &&
                  moveToX === moveFromX + 2 &&
                  moveToY === moveFromY + 2
               ) {
                  return {canMove: true, canRemove: true, isRight: true};
               }
            }

            if (
               piece === undefined &&
               moveToX === moveFromX + 1 &&
               moveToY === moveFromY + 1
            ) {
               return {canMove: true};
            }
         }
         if (moveFromX === 0) {
            let piece = pieces[moveFromX + 1][moveFromY - 1];

            if (piece && !piece.odd) {
               const pieceToGo = pieces[moveFromX + 2][moveFromY - 2];

               if (
                  pieceToGo === undefined &&
                  moveToX === moveFromX + 2 &&
                  moveToY === moveFromY - 2
               ) {
                  return {canMove: true, canRemove: true, isLeft: true};
               }
            }

            if (
               !piece &&
               moveToX === moveFromX + 1 &&
               moveToY === moveFromY - 1
            ) {
               return {canMove: true};
            }
         }
      } else if (!isOddTurn && !isOddPiece && movingPiece.position) {
         const {x: moveFromX, y: moveFromY} = movingPiece.position;

         // Blue / Left
         if (moveFromX - 1 >= 0) {
            const piece = pieces[moveFromX - 1][moveFromY - 1];

            if (piece && piece.odd && moveFromX - 2 >= 0) {
               console.log(moveFromX - 2, moveFromY - 2);
               const pieceToGo = pieces[moveFromX - 2][moveFromY - 2];
               if (
                  pieceToGo === undefined &&
                  moveToX === moveFromX - 2 &&
                  moveToY === moveFromY - 2
               ) {
                  return {canMove: true, canRemove: true, isLeft: true};
               }
            }

            if (
               !piece &&
               moveToX === moveFromX - 1 &&
               moveToY === moveFromY - 1
            ) {
               return {canMove: true};
            }
         }

         // Blue / Right
         if (moveFromY + 1 <= 7 && moveFromX - 1 >= 0) {
            const piece = pieces[moveFromX - 1][moveFromY + 1];

            if (piece && piece.odd && moveFromX - 2 >= 0) {
               const pieceToGo = pieces[moveFromX - 2][moveFromY + 2];
               if (
                  pieceToGo === undefined &&
                  moveToX === moveFromX - 2 &&
                  moveToY === moveFromY + 2
               ) {
                  return {canMove: true, canRemove: true, isRight: true};
               }
            }

            if (
               !piece &&
               moveToX === moveFromX - 1 &&
               moveToY === moveFromY + 1
            ) {
               return {canMove: true};
            }
         }
      }
      return {canMove: false};
   };

   const movePiece = (
      moveToX: number,
      moveToY: number,
      movingPieceX: number,
      movingPieceY: number,
      movingPiece: PieceProps
   ) => {
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
      return updatedPieces;
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

      const {canMove, canRemove, isLeft, isRight} = checkCanMove(
         isOddTurn,
         movingPiece.odd,
         movingPiece,
         moveToX,
         moveToY
      );

      if (canMove && !canRemove) {
         if (pieces[moveToX][moveToY]) {
            return;
         }

         const newPieces = movePiece(
            moveToX,
            moveToY,
            movingPieceX,
            movingPieceY,
            movingPiece
         );

         setIsOddTurn(!isOddTurn);
         setPieces(newPieces);
      }

      if (canMove && canRemove) {
         let cleanOriginalPosition: undefined[] = [];

         if (isRight && movingPiece.odd) {
            cleanOriginalPosition = [
               (pieces[movingPieceX + 1][movingPieceY + 1] = undefined),
            ];
            setBlueScore(blueScore + 1);
         }
         if (isLeft && movingPiece.odd) {
            cleanOriginalPosition = [
               (pieces[movingPieceX + 1][movingPieceY - 1] = undefined),
            ];
            setBlueScore(blueScore + 1);
         }

         if (isRight && !movingPiece.odd) {
            cleanOriginalPosition = [
               (pieces[movingPieceX - 1][movingPieceY + 1] = undefined),
            ];

            setRedScore(redScore + 1);
         }

         if (isLeft && !movingPiece.odd) {
            cleanOriginalPosition = [
               (pieces[movingPieceX - 1][movingPieceY - 1] = undefined),
            ];
            setRedScore(redScore + 1);
         }
         const newPieces = movePiece(
            moveToX,
            moveToY,
            movingPieceX,
            movingPieceY,
            movingPiece
         );

         setPieces([...newPieces, cleanOriginalPosition]);
         setIsOddTurn(!isOddTurn);
      }

      setMovingPiece(null);
   };

   const handleDragStart = ({active}: DragStartEvent) => {
      const piece = pieces.reduce<PieceProps | undefined>((acc, row) => {
         return acc ?? row.find((cell) => cell?.id === active.id);
      }, undefined);
      if (piece) {
         setMovingPiece(piece);
      }
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
         <Score blueScore={blueScore} redScore={redScore} />
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
                        {/* {x} - {y}
                        {x} - {y} */}
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
