import styled from "styled-components";
import ChessSquare from "./ChessSquareComponent";
import ChessPieceComponent from "./ChessPieceComponent";
import React from "react";
import { ChessPosition } from "../core/types/ChessPosition";
import { CreateChessPiece } from "../core/ChessPieces";
import { ChessPiece } from "../core/types/ChessPiece";
import { ChessSquareProps } from "../core/types/ChessSquareProps";
import { Engine } from "../App";
import { ChessPieceProps } from "../core/types/ChessPieceProps";
import { ActionTypeEnum } from "../redux/enums/ActionTypeEnum";
import VerticalScaleComponent from "./VerticalScaleComponent";
import { VerticalScaleLocationEnum } from "../core/enums/VerticalScaleLocationEnum";
import HorizontalScaleComponent from "./HorizontalScaleComponent";
import { HorizontalScaleLocationEnum } from "../core/enums/HorizontalScaleLocationEnum";
import uniqid from "uniqid";
import TakedPieceListComponent from "./TakedPieceListComponent";
import { ChessPieceColorEnum } from "../core/enums/ChessPieceColorEnum";
import { ChessConfiguration } from "../core/ChessConfiguration";

// Основной div, включает: div с фишками, которые забрали; шкала; игровое поле
const GameBoard = styled.div`
	width: ${ChessConfiguration.TAKED_BLOCK_WIDTH * 2 + ChessConfiguration.V_SCALE_WIDTH * 2 + ChessConfiguration.CELL_WIDTH * 8}px;
	height: ${ChessConfiguration.H_SCALE_HEIGHT * 2 + ChessConfiguration.CELL_HEIGHT * 8}px;
	background-color: transparent;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);	
	line-height: 1px;
`;

// Игровое поле с фишками
const Square = styled.div`
	width: ${ChessConfiguration.CELL_WIDTH * 8}px;
	height: ${ChessConfiguration.CELL_HEIGHT * 8}px;
	position: absolute;
	left: ${ChessConfiguration.TAKED_BLOCK_WIDTH + ChessConfiguration.V_SCALE_WIDTH}px;
	top: ${ChessConfiguration.H_SCALE_HEIGHT}px;
	box-shadow: 0 0 40px 2px black;
`;

// Компонент - игровое поле
const ChessBoardComponent = () => {
	// Строим поле и фигуры
	const cellList: JSX.Element[][] = [];
	const pieces: ChessPiece[] = [];
	for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
		const columnList: JSX.Element[] = [];
		for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
			const position: ChessPosition = {
				rowIndex,
				columnIndex
			};
			const squareProps: ChessSquareProps = {
				...position,
				type: ActionTypeEnum.None,
				start: undefined,
				availableMoves: []
			};
			if (
				rowIndex === 0 ||
				rowIndex === 1 ||
				rowIndex === 6 ||
				rowIndex === 7
			) {
				// Создадим фигурку по координатам
				const chessPiece: ChessPiece | null = CreateChessPiece(position);
				if (!chessPiece) continue;

				pieces.push(chessPiece);

				const pieceProps: ChessPieceProps = {
					...chessPiece,
					type: ActionTypeEnum.None,
					pieceId: undefined,
					start: undefined,
					finish: undefined,
					availableMoves: [],
					takedPieces: [],
					nextMoveColor: ChessPieceColorEnum.White	
				};

				columnList.push(<ChessSquare {...squareProps} key={uniqid()}/>);
				columnList.push(<ChessPieceComponent {...pieceProps} key={uniqid()}/>);			
			} else columnList.push(<ChessSquare {...squareProps} key={uniqid()}/>);
		}
		cellList.push(columnList);
	}

	Engine.init(pieces);

	return (
		<GameBoard>
			<TakedPieceListComponent location={VerticalScaleLocationEnum.Left}/>
			<VerticalScaleComponent location={VerticalScaleLocationEnum.Both}/>
			<HorizontalScaleComponent location={HorizontalScaleLocationEnum.Both}/>
			<Square key={uniqid()} id="game_field">
				{cellList}
			</Square>
			<TakedPieceListComponent location={VerticalScaleLocationEnum.Right}/>
		</GameBoard>
	);
};

export default ChessBoardComponent;
