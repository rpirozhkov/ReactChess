import { ChessPieceColorEnum } from "./enums/ChessPieceColorEnum";
import { ChessPieceTypeEnum } from "./enums/ChessPieceTypeEnum";
import { MoveDirection } from "./enums/MoveDirectionEnum";
import { MoveTypeEnum } from "./enums/MoveTypeEnum";
import { ChessMoveType } from "./types/ChessMoveType";
import { ChessPiece } from "./types/ChessPiece";
import { ChessPosition, isEqualPositions } from "./types/ChessPosition";
import { NullPosition } from "./types/ChessPosition";

// Движок игры
class GameEngine {
	// Фигуры
	private chessPieces: ChessPiece[] = [];

	// Инициализация списка фигур
	init(chessPieces: ChessPiece[]) {
		this.chessPieces = chessPieces;
	}

	// Обновим позицию фигуры после совершения хода
	updatePosition(id: string, newPosition: ChessPosition) {
		const chessPiece = this.chessPieces.find((piece) => piece.id === id);
		if (chessPiece) {
			if (isEqualPositions(newPosition, NullPosition)) {
				chessPiece.onBoard = false;
			} else {
				chessPiece.position = { ...newPosition };
			}
		}
	}

	// Проверим, находится ли фигура на доске
	onBoard(id: string): boolean | undefined {
		const chessPiece = this.chessPieces.find((piece) => piece.id === id);
		return chessPiece?.onBoard;
	}

	getChessPieceById(id: string): ChessPiece | undefined {
		return this.chessPieces.find(piece => piece.id === id);
	}

	// Расчет возможных ходов
	getAvailableMoves(chessPiece: ChessPiece): ChessMoveType[] {
		switch (chessPiece.pieceType) {
			case ChessPieceTypeEnum.Rook:
				return this.getRookMoves(chessPiece);
			case ChessPieceTypeEnum.Knight:
				return this.getKnightMoves(chessPiece);
			case ChessPieceTypeEnum.Bishop:
				return this.getBishopMoves(chessPiece);
			case ChessPieceTypeEnum.Queen:
				return this.getQueenMoves(chessPiece);
			case ChessPieceTypeEnum.King:
				return this.getKingMoves(chessPiece);
			case ChessPieceTypeEnum.Pawn:
				return this.getPawnMoves(chessPiece);
		}
		return [];
	}

	// Получить ход по координатам
	private getMove(
		position: ChessPosition,
		pieceColor: ChessPieceColorEnum
	): ChessMoveType | undefined {
		if (position.rowIndex < 0 || position.rowIndex > 7) return undefined;
		if (position.columnIndex < 0 || position.columnIndex > 7)
			return undefined;

		const chessObject: ChessPiece | undefined = this.chessPieces.find(
			(piece) => isEqualPositions(position, piece.position) && piece.onBoard
		);
		if (chessObject) {
			if (chessObject.color !== pieceColor)
				return {
					position,
					moveType: MoveTypeEnum.Take
				};
		} else {
			return {
				position,
				moveType: MoveTypeEnum.Free
			};
		}
		return undefined;
	}

	// Расчет хода для пешки
	private getPawnMoves(chessPawn: ChessPiece): ChessMoveType[] {
		const availableMoves: ChessMoveType[] = [];
		const offSetX = chessPawn.direction === MoveDirection.Down ? 1 : -1;

		const moveDirect = this.getMove(
			{
				columnIndex: chessPawn.position.columnIndex,
				rowIndex: chessPawn.position.rowIndex + offSetX
			},
			chessPawn.color
		);
		if (moveDirect && moveDirect.moveType === MoveTypeEnum.Free)
			availableMoves.push(moveDirect);

		if (
			(chessPawn.direction === MoveDirection.Down &&
				chessPawn.position.rowIndex === 1) ||
			(chessPawn.direction === MoveDirection.Up &&
				chessPawn.position.rowIndex === 6)
		) {
			const move = this.getMove(
				{
					columnIndex: chessPawn.position.columnIndex,
					rowIndex: chessPawn.position.rowIndex + offSetX * 2
				},
				chessPawn.color
			);
			if (move && move.moveType === MoveTypeEnum.Free)
				availableMoves.push(move);
		}

		// Проверим ход по диагонали налево
		const moveLeftDiagonal = this.getMove(
			{
				rowIndex: chessPawn.position.rowIndex + offSetX,
				columnIndex: chessPawn.position.columnIndex - 1
			},
			chessPawn.color
		);
		if (moveLeftDiagonal && moveLeftDiagonal.moveType === MoveTypeEnum.Take)
			availableMoves.push(moveLeftDiagonal);

		// Проверим ход по диагонали направо
		const moveRightDiagonal = this.getMove(
			{
				rowIndex: chessPawn.position.rowIndex + offSetX,
				columnIndex: chessPawn.position.columnIndex + 1
			},
			chessPawn.color
		);
		if (moveRightDiagonal && moveRightDiagonal.moveType === MoveTypeEnum.Take)
			availableMoves.push(moveRightDiagonal);

		return availableMoves;
	}

	// Расчет хода для ладьи
	private getRookMoves(chessRook: ChessPiece): ChessMoveType[] {
		const availableMoves: ChessMoveType[] = [];

		// Проверим все ходы вниз
		for (
			let rowIndex = chessRook.position.rowIndex + 1;
			rowIndex <= 7;
			rowIndex++
		) {
			const move = this.getMove(
				{
					rowIndex,
					columnIndex: chessRook.position.columnIndex
				},
				chessRook.color
			);
			if (move) {
				availableMoves.push(move);
				if (move.moveType === MoveTypeEnum.Take) break;
			} else break;
		}

		// Проверим все ходы вверх
		for (
			let rowIndex = chessRook.position.rowIndex - 1;
			rowIndex >= 0;
			rowIndex--
		) {
			const move = this.getMove(
				{
					rowIndex,
					columnIndex: chessRook.position.columnIndex
				},
				chessRook.color
			);
			if (move) {
				availableMoves.push(move);
				if (move.moveType === MoveTypeEnum.Take) break;
			} else break;
		}

		// Проверим все ходы вправо
		for (
			let columnIndex = chessRook.position.columnIndex + 1;
			columnIndex <= 7;
			columnIndex++
		) {
			const move = this.getMove(
				{
					rowIndex: chessRook.position.rowIndex,
					columnIndex
				},
				chessRook.color
			);
			if (move) {
				availableMoves.push(move);
				if (move.moveType === MoveTypeEnum.Take) break;
			} else break;
		}

		// Проверим все ходы влево
		for (
			let columnIndex = chessRook.position.columnIndex - 1;
			columnIndex >= 0;
			columnIndex--
		) {
			const move = this.getMove(
				{
					rowIndex: chessRook.position.rowIndex,
					columnIndex
				},
				chessRook.color
			);
			if (move) {
				availableMoves.push(move);
				if (move.moveType === MoveTypeEnum.Take) break;
			} else break;
		}

		return availableMoves;
	}

	// Расчет хода для коня
	private getKnightMoves(chessKnight: ChessPiece): ChessMoveType[] {
		const availableMoves: ChessMoveType[] = [];
		const availablePositions: ChessPosition[] = [
			{
				rowIndex: chessKnight.position.rowIndex - 2,
				columnIndex: chessKnight.position.columnIndex + 1
			},
			{
				rowIndex: chessKnight.position.rowIndex - 1,
				columnIndex: chessKnight.position.columnIndex + 2
			},
			{
				rowIndex: chessKnight.position.rowIndex + 1,
				columnIndex: chessKnight.position.columnIndex + 2
			},
			{
				rowIndex: chessKnight.position.rowIndex + 2,
				columnIndex: chessKnight.position.columnIndex + 1
			},
			{
				rowIndex: chessKnight.position.rowIndex + 2,
				columnIndex: chessKnight.position.columnIndex - 1
			},
			{
				rowIndex: chessKnight.position.rowIndex + 1,
				columnIndex: chessKnight.position.columnIndex - 2
			},
			{
				rowIndex: chessKnight.position.rowIndex - 1,
				columnIndex: chessKnight.position.columnIndex - 2
			},
			{
				rowIndex: chessKnight.position.rowIndex - 2,
				columnIndex: chessKnight.position.columnIndex - 1
			}
		];
		availablePositions.forEach((position) => {
			const move = this.getMove(position, chessKnight.color);
			if (move) availableMoves.push(move);
		});

		return availableMoves;
	}

	// Расчет хода для слона
	private getBishopMoves(chessBishop: ChessPiece): ChessMoveType[] {
		const availableMoves: ChessMoveType[] = [];

		// Проверим ходы по диагонали вправо и вверх
		let rowIndex: number = chessBishop.position.rowIndex - 1;
		let columnIndex: number = chessBishop.position.columnIndex + 1;
		while (rowIndex >= 0 && columnIndex <= 7) {
			const move = this.getMove(
				{
					rowIndex,
					columnIndex
				},
				chessBishop.color
			);
			if (move) {
				availableMoves.push(move);
				if (move.moveType === MoveTypeEnum.Take) break;
			} else break;
			rowIndex--;
			columnIndex++;
		}

		// Проверим ходы по диагонали вправо и вниз
		rowIndex = chessBishop.position.rowIndex + 1;
		columnIndex = chessBishop.position.columnIndex + 1;
		while (rowIndex <= 7 && columnIndex <= 7) {
			const move = this.getMove(
				{
					rowIndex,
					columnIndex
				},
				chessBishop.color
			);
			if (move) {
				availableMoves.push(move);
				if (move.moveType === MoveTypeEnum.Take) break;
			} else break;
			rowIndex++;
			columnIndex++;
		}

		// Проверим ходы по диагонали влево и вниз
		rowIndex = chessBishop.position.rowIndex + 1;
		columnIndex = chessBishop.position.columnIndex - 1;
		while (rowIndex <= 7 && columnIndex >= 0) {
			const move = this.getMove(
				{
					rowIndex,
					columnIndex
				},
				chessBishop.color
			);
			if (move) {
				availableMoves.push(move);
				if (move.moveType === MoveTypeEnum.Take) break;
			} else break;
			rowIndex++;
			columnIndex--;
		}

		// Проверим ходы по диагонали влево и вверх
		rowIndex = chessBishop.position.rowIndex - 1;
		columnIndex = chessBishop.position.columnIndex - 1;
		while (rowIndex >= 0 && columnIndex >= 0) {
			const move = this.getMove(
				{
					rowIndex,
					columnIndex
				},
				chessBishop.color
			);
			if (move) {
				availableMoves.push(move);
				if (move.moveType === MoveTypeEnum.Take) break;
			} else break;
			rowIndex--;
			columnIndex--;
		}

		return availableMoves;
	}

	// Расчет хода для ферзя
	private getQueenMoves(chessQueen: ChessPiece): ChessMoveType[] {
		const availableMoves: ChessMoveType[] = [];

		const rookMoves = this.getRookMoves(chessQueen);
		rookMoves.forEach((move) => availableMoves.push(move));

		const bishopMoves = this.getBishopMoves(chessQueen);
		bishopMoves.forEach((move) => availableMoves.push(move));

		return availableMoves;
	}

	// Расчет хода для короля
	private getKingMoves(chessKing: ChessPiece): ChessMoveType[] {
		const availableMoves: ChessMoveType[] = [];
		const availablePositions: ChessPosition[] = [
			{
				rowIndex: chessKing.position.rowIndex - 1,
				columnIndex: chessKing.position.columnIndex
			},
			{
				rowIndex: chessKing.position.rowIndex - 1,
				columnIndex: chessKing.position.columnIndex + 1
			},
			{
				rowIndex: chessKing.position.rowIndex,
				columnIndex: chessKing.position.columnIndex + 1
			},
			{
				rowIndex: chessKing.position.rowIndex + 1,
				columnIndex: chessKing.position.columnIndex + 1
			},
			{
				rowIndex: chessKing.position.rowIndex + 1,
				columnIndex: chessKing.position.columnIndex
			},
			{
				rowIndex: chessKing.position.rowIndex + 1,
				columnIndex: chessKing.position.columnIndex - 1
			},
			{
				rowIndex: chessKing.position.rowIndex,
				columnIndex: chessKing.position.columnIndex - 1
			},
			{
				rowIndex: chessKing.position.rowIndex - 1,
				columnIndex: chessKing.position.columnIndex - 1
			}
		];

		availablePositions.forEach((position) => {
			const move = this.getMove(position, chessKing.color);
			if (move) availableMoves.push(move);
		});

		return availableMoves;
	}
}

export default GameEngine;
