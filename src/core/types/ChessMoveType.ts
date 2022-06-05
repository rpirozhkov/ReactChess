import { MoveTypeEnum } from "../enums/MoveTypeEnum";
import { ChessPosition } from "./ChessPosition";

// Тип Шахматный ход
export type ChessMoveType = {
	position: ChessPosition;
	moveType: MoveTypeEnum;
};
