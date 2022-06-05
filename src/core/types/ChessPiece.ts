import { ChessPieceColorEnum } from "../enums/ChessPieceColorEnum";
import { ChessPieceTypeEnum } from "../enums/ChessPieceTypeEnum";
import { MoveDirection } from "../enums/MoveDirectionEnum";
import { ChessPosition } from "./ChessPosition";

// Тип - шахматная фигура
export type ChessPiece = {
	// ИД
	id: string;

	// Позиция
	position: ChessPosition;

	// Тип
	pieceType: ChessPieceTypeEnum;

	// Изображение
	image: string;

	// Направление хода
	direction: MoveDirection | undefined;

	// Цвет фигуры
	color: ChessPieceColorEnum;

	// Признак того, что фигура на доске
	onBoard: boolean;
};
