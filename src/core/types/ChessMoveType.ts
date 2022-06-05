import { MoveTypeEnum } from "../enums/MoveTypeEnum";
import { ChessPosition } from "./ChessPosition";

// Тип Шахматный ходы
export type ChessMoveType = {
	position: ChessPosition;
	moveType: MoveTypeEnum;
};
