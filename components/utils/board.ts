import {PieceProps} from '../piece/piece';

interface IBoard {
   id: string;
   x: number;
   y: number;
   odd: boolean;
}
const BOARD_SIZE = 8;
export const generateBoard = () => {
   const board: IBoard[][] = Array.from(
      Array(BOARD_SIZE),
      () => new Array(BOARD_SIZE)
   );
   let odd = false;
   for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
         if (y % BOARD_SIZE !== 0) {
            odd = !odd;
         }
         board[x][y] = {odd, id: `${x}-${y}`, x, y};
      }
   }
   return board;
};

export function generatePieces(board: IBoard[][]) {
   const pieces: (PieceProps | undefined)[][] = Array.from(
      Array(BOARD_SIZE),
      () => new Array(BOARD_SIZE)
   );

   const piecesRows = [0, 1, 2, BOARD_SIZE - 3, BOARD_SIZE - 2, BOARD_SIZE - 1];
   for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
         const boardCase = board[y][x];
         if (boardCase.odd && piecesRows.includes(x)) {
            const odd = x <= BOARD_SIZE / 2;
            pieces[x][y] = {
               odd,
               id: `${x}-${y}`,
               position: {x, y},
               disabled: false,
            };
         }
      }
   }

   return pieces;
}
