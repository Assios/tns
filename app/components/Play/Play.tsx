import React, { useState } from "react";
import useTonnesjakk from "~/hooks/useTonnesjakk";
import Board from "../Game/Board";

export const Play = () => {
  const [chosenPiece, setChosenPiece] = useState("");
  const { turn, createBoard } = useTonnesjakk();

  const FEN = "1t4/2t3/6/4Mm/T5/2T3";

  const [fen, setFen] = useState(FEN);

  const [board, setBoard] = useState(createBoard(fen));

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <Board cells={board} />
      </div>
    </div>
  );
};
