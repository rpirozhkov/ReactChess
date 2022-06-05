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

const GameBoard = styled.div`
	width: 1300px;
	height: 900px;
	background-color: transparent;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);	
	line-height: 1px;
`;

const Square = styled.div`
	width: 800px;
	height: 800px;
	position: absolute;
	left: 250px;
	top: 50px;
	box-shadow: 0 0 40px 2px black;
`;

// Компонент - игровое поле
const ChessBoardComponent = () => {
	// console.log("render ChessBoardComponent");
	// Строим поле и
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
