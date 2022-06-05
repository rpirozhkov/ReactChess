import { ActionTypeEnum } from "../enums/ActionTypeEnum";
import { ChessMoveType } from "../../core/types/ChessMoveType";
import { ChessPosition } from "../../core/types/ChessPosition";
import { ChessPiece } from "../../core/types/ChessPiece";
import { ChessPieceColorEnum } from "../../core/enums/ChessPieceColorEnum";

// Тип - действие, совераемое с фигурой
export type ActionType = {
    // Тип действия
    type: ActionTypeEnum;

    // ИД фигуры
    pieceId: string | undefined;

    // Начальная позиция
    start: ChessPosition | undefined;

    // Финальная позиция
    finish: ChessPosition | undefined;

    // Возможные ходы
    availableMoves: ChessMoveType[];

    // Фигуры, которые забрали
    takedPieces: ChessPiece[];

    // Цвет фигур, которые ходят сл.
    nextMoveColor: ChessPieceColorEnum;
};