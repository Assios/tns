import { useRef } from "react";

const OFFSET_X = 610; // 645
const OFFSET_Y = 930; // 270

const getPieceImage = (piece: string): string => {
  const pieces: any = {
    t: "./pieces/bP.png",
    T: "./pieces/wP.png",
    m: "./pieces/bQ.png",
    M: "./pieces/wQ.png",
  };

  return pieces[piece];
};

const rows = ["1", "2", "3", "4", "5", "6"];
const cols = ["a", "b", "c", "d", "e", "f"];

const getBoardColor = (pos: string) => {
  const [col, row] = pos.split("");

  const num = rows.indexOf(row) + cols.indexOf(col);

  return num;
};

const Board = ({ cells }: any) => {
  const tonneBoardRef = useRef<HTMLDivElement>(null);
  if (!cells.length) return <h1>nope</h1>;

  let activePiece: HTMLElement | null = null;

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;

    if (element.classList.contains("brikke")) {
      const x = e.pageX - OFFSET_X;
      const y = e.pageY - OFFSET_Y;

      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      activePiece = element;
    }
  }

  function movePiece(e: React.MouseEvent) {
    const tonneboard = tonneBoardRef.current;

    if (activePiece && tonneboard) {
      const minX = tonneboard.offsetLeft; // calculate min
      const minY = tonneboard.offsetTop - OFFSET_Y / 2 + 100; // calculate min

      const maxX =
        tonneboard.offsetLeft + tonneboard.clientWidth - OFFSET_X / 2 - 50; // calculate max
      const maxY =
        tonneboard.offsetTop + tonneboard.clientHeight - OFFSET_Y / 2 + 100; // calculate max

      const x = e.pageX - OFFSET_X;
      const y = e.pageY - OFFSET_Y;

      activePiece.style.position = "absolute";

      activePiece.style.left = `${x}px`;
      activePiece.style.top = `${y}px`;
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const tonneboard = tonneBoardRef.current;

    if (activePiece && tonneboard) {
      const x = e.clientX - tonneboard.offsetLeft;
      const y = e.clientY - tonneboard.offsetTop;

      activePiece = null;
    }
  }

  return (
    <div className="relative">
      <div
        onMouseDown={(e) => grabPiece(e)}
        onMouseMove={(e) => movePiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        ref={tonneBoardRef}
        className="relative mt-14 mx-auto w-[600px] h-[600px] bg-blue-600 grid grid-rows-new4 grid-cols-new4"
      >
        {cells.map((cell: any, index: number) => {
          return (
            <div
              className={
                getBoardColor(cell.pos) % 2 === 0
                  ? "bg-[#B58864]"
                  : "bg-[#F0D9B5]"
              }
              key={cell.pos}
            >
              {cell.piece && (
                <div
                  className="brikke bg-no-repeat bg-center w-[100px] h-[100px] hover:cursor-grab active:cursor-grabbing"
                  style={{
                    backgroundImage: `url(${getPieceImage(cell.piece)})`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
