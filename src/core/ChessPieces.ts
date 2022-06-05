import { ChessPiece } from "./types/ChessPiece";
import { ChessPieceTypeEnum } from "./enums/ChessPieceTypeEnum";
import { ChessPosition } from "./types/ChessPosition";
import WhiteRook from "../images/wR.png";
import WhiteKnight from "../images/wN.png";
import WhiteBishop from "../images/wB.png";
import WhiteQueen from "../images/wQ.png";
import WhiteKing from "../images/wK.png";
import WhitePawn from "../images/wP.png";
import BlackRook from "../images/bR.png";
import BlackKnight from "../images/bN.png";
import BlackBishop from "../images/bB.png";
import BlackQueen from "../images/bQ.png";
import BlackKing from "../images/bK.png";
import BlackPawn from "../images/bP.png";
import { ChessConfiguration } from "./ChessConfiguration";
import { MoveDirection } from "./enums/MoveDirectionEnum";
import { ChessPieceColorEnum } from "./enums/ChessPieceColorEnum";

// Массив всех фигур, кроме пешек
const ChessPieces: {
	white: ChessPiece[];
	black: ChessPiece[];
} = {
	white: [
		{
			id: "white_rook_1",
			image: WhiteRook,
			pieceType: ChessPieceTypeEnum.Rook,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.White,
			onBoard: true
		},
		{
			id: "white_knight_1",
			image: WhiteKnight,
			pieceType: ChessPieceTypeEnum.Knight,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.White,
			onBoard: true
		},
		{
			id: "white_bishop_1",
			image: WhiteBishop,
			pieceType: ChessPieceTypeEnum.Bishop,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.White,
			onBoard: true
		},
		{
			id: "white_queen",
			image: WhiteQueen,
			pieceType: ChessPieceTypeEnum.Queen,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.White,
			onBoard: true
		},
		{
			id: "white_king",
			image: WhiteKing,
			pieceType: ChessPieceTypeEnum.King,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.White,
			onBoard: true
		},
		{
			id: "white_bishop_2",
			image: WhiteBishop,
			pieceType: ChessPieceTypeEnum.Bishop,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.White,
			onBoard: true
		},
		{
			id: "white_knight_2",
			image: WhiteKnight,
			pieceType: ChessPieceTypeEnum.Knight,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.White,
			onBoard: true
		},
		{
			id: "white_rook_2",
			image: WhiteRook,
			pieceType: ChessPieceTypeEnum.Rook,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.White,
			onBoard: true
		}
	],
	black: [
		{
			id: "black_rook_1",
			image: BlackRook,
			pieceType: ChessPieceTypeEnum.Rook,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.Black,
			onBoard: true
		},
		{
			id: "black_knight_1",
			image: BlackKnight,
			pieceType: ChessPieceTypeEnum.Knight,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.Black,
			onBoard: true
		},
		{
			id: "black_bishop_1",
			image: BlackBishop,
			pieceType: ChessPieceTypeEnum.Bishop,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.Black,
			onBoard: true
		},
		{
			id: "black_queen",
			image: BlackQueen,
			pieceType: ChessPieceTypeEnum.Queen,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.Black,
			onBoard: true
		},
		{
			id: "black_king",
			image: BlackKing,
			pieceType: ChessPieceTypeEnum.King,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.Black,
			onBoard: true
		},
		{
			id: "black_bishop_2",
			image: BlackBishop,
			pieceType: ChessPieceTypeEnum.Bishop,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.Black,
			onBoard: true
		},
		{
			id: "black_knight_2",
			image: BlackKnight,
			pieceType: ChessPieceTypeEnum.Knight,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.Black,
			onBoard: true
		},
		{
			id: "black_rook_2",
			image: BlackRook,
			pieceType: ChessPieceTypeEnum.Rook,
			position: { columnIndex: 0, rowIndex: 0 },
			direction: undefined,
			color: ChessPieceColorEnum.Black,
			onBoard: true
		}
	]
};

// Создание фигуры по координатам.
// topColor - цвет фигур сверху, [rowIndex, columntIndex] - координаты фигуры на доске
export function CreateChessPiece(position: ChessPosition): ChessPiece | null {
	if (position.rowIndex === 0) {
		const chessPiece =
			ChessConfiguration.TOP_COLOR === ChessPieceColorEnum.Black
				? ChessPieces.black[position.columnIndex]
				: ChessPieces.white[position.columnIndex];
		chessPiece.position = position;
		chessPiece.direction = MoveDirection.Down;
		return chessPiece;
	} else if (position.rowIndex === 1) {
		return ChessConfiguration.TOP_COLOR === ChessPieceColorEnum.Black
			? {
					id: `black_pawn_${position.columnIndex}`,
					image: BlackPawn,
					pieceType: ChessPieceTypeEnum.Pawn,
					position,
					direction: MoveDirection.Down,
					color: ChessPieceColorEnum.Black,
					onBoard: true
			  }
			: {
					id: `white_pawn_${position.columnIndex}`,
					image: WhitePawn,
					pieceType: ChessPieceTypeEnum.Pawn,
					position,
					direction: MoveDirection.Down,
					color: ChessPieceColorEnum.White,
					onBoard: true
			  };
	} else if (position.rowIndex === 6) {
		return ChessConfiguration.TOP_COLOR === ChessPieceColorEnum.Black
			? {
					id: `white_pawn_${position.columnIndex}`,
					image: WhitePawn,
					pieceType: ChessPieceTypeEnum.Pawn,
					position,
					direction: MoveDirection.Up,
					color: ChessPieceColorEnum.White,
					onBoard: true
			  }
			: {
					id: `black_pawn_${position.columnIndex}`,
					image: BlackPawn,
					pieceType: ChessPieceTypeEnum.Pawn,
					position,
					direction: MoveDirection.Up,
					color: ChessPieceColorEnum.Black,
					onBoard: true
			  };
	} else if (position.rowIndex === 7) {
		const chessPiece =
			ChessConfiguration.TOP_COLOR === ChessPieceColorEnum.Black
				? ChessPieces.white[position.columnIndex]
				: ChessPieces.black[position.columnIndex];
		chessPiece.position = position;
		chessPiece.direction = MoveDirection.Up;
		return chessPiece;
	}

	return null;
}
