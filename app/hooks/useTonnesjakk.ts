import { useState } from "react";

const enum Color {
  WHITE = "WHITE",
  BLACK = "BLACK",
}

const range = (n: number) => {
  return Array.from({ length: n }, (_, i) => i + 1);
};

class Cell {
  pos: string;
  piece: string;

  constructor(pos: string, piece: string) {
    this.pos = pos;
    this.piece = piece;
  }
}

const useTonnesjakk = () => {
  const [turn, setTurn] = useState(Color.WHITE);

  const createBoard = (fenString: string) => {
    const fen = fenString.split(" ")[0];

    const fenPieces = fen.split("/").join("");

    let pieces = Array.from(fenPieces);

    Array.from(fenPieces).forEach((item: any, index: number) => {
      if (isFinite(item)) {
        pieces.splice(index, 1, range(item).fill(""));
      }
    });

    pieces = pieces.flat();

    const rows = range(6)
      .map((n) => n.toString())
      .reverse();

    const columns = ["a", "b", "c", "d", "e", "f"];

    const cells = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let j = 0; j < columns.length; j++) {
        const col = columns[j];
        cells.push(col + row);
      }
    }
    const board = [];
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const piece = pieces[i];
      board.push(new Cell(cell, piece));
    }

    return board;
  };

  return {
    turn,
    createBoard,
  };
};

export default useTonnesjakk;
