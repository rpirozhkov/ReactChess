import { ActionTypeEnum } from "../../redux/enums/ActionTypeEnum";
import { ChessMoveType } from "./ChessMoveType";
import { ChessPosition } from "./ChessPosition";

// Тип props для компонента ChessSquare
export type ChessSquareProps = ChessPosition & {
    // Тип действия
    type: ActionTypeEnum;

    // Начальная позиция
    start: ChessPosition | undefined;
    
    // Возможные ходы
    availableMoves: ChessMoveType[];
};
