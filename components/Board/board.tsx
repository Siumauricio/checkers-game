import {useState} from 'react';
import {Cell} from '../cell/cell';
import {Piece} from '../piece/piece';
import {GridBoard} from '../styles/grid-board';
import {board} from '../utils/board';
import {DndContext} from '@dnd-kit/core';

export const Board = () => {
   const containers = ['A', 'B', 'C'];
   const [parent, setParent] = useState(null);
   const draggableMarkup = <Piece id="sadasdasdasd" />;

   const isPairCell = (cellValue: number, cellIndex: number) =>
      cellIndex % cellValue === 0;

   const isBlueCell = (x: number, y: number) => {
      const hasValidRangeX = x >= 0 && x <= 7;
      const hasValidRangeY = y >= 0 && y <= 2;
      return hasValidRangeX && hasValidRangeY;
   };
   const isRedCell = (x: number, y: number) => {
      const hasValidRangeX = x >= 0 && x <= 7;
      const hasValidRangeY = y >= 5 && y <= 7;
      return hasValidRangeX && hasValidRangeY;
   };

   return (
      <DndContext onDragEnd={handleDragEnd}>
         {/* {parent === null ? draggableMarkup : null} */}

         <GridBoard>
            {board.map((row, rowIndex) => {
               return row.map((cellValue, cellIndex) => {
                  const isPair = isPairCell(cellValue, cellIndex);
                  const isBlue = isBlueCell(cellIndex, rowIndex);
                  const isRed = isRedCell(cellIndex, rowIndex);
                  return (
                     <Cell
                        key={`cell-${rowIndex}-${cellIndex}`}
                        type={isPair ? 'even' : 'odd'}
                        data-x={cellIndex}
                        data-y={rowIndex}
                        id={`cell-${rowIndex}-${cellIndex}`}
                     >
                        {isPairCell(cellValue, cellIndex)
                           ? isBlueCell(cellIndex, rowIndex) && (
                                <Piece id={`cell-${rowIndex}-${cellIndex}`} />
                             )
                           : isRedCell(cellIndex, rowIndex) && (
                                <Piece
                                   type={'red'}
                                   id={`cell-${rowIndex}-${cellIndex}`}
                                />
                             )}

                        {/* Droppable container id: ${id} */}
                     </Cell>
                  );
               });
            })}
         </GridBoard>
      </DndContext>
   );
   function handleDragEnd(event) {
      const {over} = event;

      // If the item is dropped over a container, set it as the parent
      // otherwise reset the parent to `null`
      setParent(over ? over.id : null);
   }
};
// {
//    isPairCell(cellValue, cellIndex)
//       ? isBlueCell(cellIndex, rowIndex) && (
//            <Piece id={`cell-${rowIndex}-${cellIndex}`} />
//         )
//       : isRedCell(cellIndex, rowIndex) && (
//            <Piece type={'red'} id={`cell-${rowIndex}-${cellIndex}`} />
//         );
// }
