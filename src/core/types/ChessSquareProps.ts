import { ActionTypeEnum } from "../../redux/enums/ActionTypeEnum";
import { ChessMoveType } from "./ChessMoveType";
import { ChessPosition } from "./ChessPosition";

export type ChessSquareProps = ChessPosition & {
    // Тип действия
    type: ActionTypeEnum;

    // Начальная позиция
    start: ChessPosition | undefined;
    
    // Возможные ходы
    availableMoves: ChessMoveType[];
};
