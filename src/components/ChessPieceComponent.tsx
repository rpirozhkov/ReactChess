import styled from "styled-components";
import React, { MouseEvent } from "react";
import { ChessPieceState } from "../core/types/ChessPieceState";
import { ChessConfiguration } from "../core/ChessConfiguration";
import {
	ChessPosition,
	isEqualPositions,
	NullPosition
} from "../core/types/ChessPosition";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { ChessPieceProps } from "../core/types/ChessPieceProps";
import { Engine } from "../App";
import { ActionType } from "../redux/types/ActionType";
import { MoveTypeEnum } from "../core/enums/MoveTypeEnum";
import { ActionTypeEnum } from "../redux/enums/ActionTypeEnum";
import { ChessPieceColorEnum } from "../core/enums/ChessPieceColorEnum";

// Компонент - игровая фигура
class ChessPieceComponent extends React.Component<
	ChessPieceProps,
	ChessPieceState
> {
	//#region Variables

	// Отступ фигуры слева в момент начала перемещения
	dragItemLeft: number;

	// Отступ фигуры сверху в момент начала перемещения
	dragItemTop: number;

	// Положение курсора по шкале X в начала перемещения фигуры
	cursorX: number;

	// Положение курсора по шкале Y в начала перемещения фигуры
	cursorY: number;

	//#endregion

	// Конструктор
	constructor(props: ChessPieceProps) {
		super(props);

		this.state = {
			left: props.position.columnIndex * ChessConfiguration.CELL_WIDTH,
			top: props.position.rowIndex * ChessConfiguration.CELL_HEIGHT
		};

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.moveFigure = this.moveFigure.bind(this);
	}

	// Отрисовка компонента
	render() {
		const move = this.props.availableMoves.find(
			(move) =>
				isEqualPositions(move.position, this.props.position) &&
				move.moveType === MoveTypeEnum.Take
		);
		if (
			this.props.type === ActionTypeEnum.EndMove &&
			this.props.pieceId !== this.props.id &&
			move &&
			isEqualPositions(move.position, this.props.finish)
		) {
			Engine.updatePosition(this.props.id, NullPosition);
			return null;
		}

		const Piece = styled.img`
			width: ${ChessConfiguration.CELL_WIDTH}px;
			height: ${ChessConfiguration.CELL_HEIGHT}px;
			position: absolute;
			left: ${this.state.left}px;
			top: ${this.state.top}px;
			z-index: ${this.props.type === ActionTypeEnum.BeginMove &&
			this.props.id === this.props.pieceId
				? 1000
				: 500};
		`;

		if (this.props.image) {
			return (
				<Piece
					src={this.props.image}
					id={this.props.id}
					key={this.props.id}
					onMouseDown={this.handleMouseDown}
					onDragStart={this.handleDragStart}
					onMouseEnter={this.handleMouseEnter}
				/>
			);
		}
	}

	// Метод определяет, должен ли рендериться компонент
	shouldComponentUpdate(nextProps: ChessPieceProps) {
		// Если фигура не на доске, не рендерим её
		if (!Engine.onBoard(nextProps.id)) return false;

		// Рендерим только ту фигуру, которую хотим переместить
		if (nextProps.id === nextProps.pieceId) return true;

		// Если забрали фигуру
		if (isEqualPositions(nextProps.position, nextProps.finish)) return true;

		return false;
	}

	// После render компонента, проверим некоторые условия
	componentDidUpdate() {
		const chessPiece = Engine.getChessPieceById(this.props.id);
		if (
			chessPiece &&
			!chessPiece.onBoard &&
			!this.props.takedPieces.some((piece) => piece === chessPiece) &&
			this.props.take
		) {
			const takedPieces = [...this.props.takedPieces, chessPiece];
			const action: ActionType = {
				type: ActionTypeEnum.Take,
				pieceId: this.props.pieceId,
				start: this.props.start,
				finish: this.props.finish,
				availableMoves: this.props.availableMoves,
				takedPieces,
				nextMoveColor: this.props.nextMoveColor
			};
			this.props.take(action);
		}
	}

	// Обработаем событие MouseEnter для формирования курсора
	handleMouseEnter(event: MouseEvent) {
		const currentPoition: ChessPosition = {
			rowIndex: Math.round(
				this.state.top / ChessConfiguration.CELL_HEIGHT
			),
			columnIndex: Math.round(
				this.state.left / ChessConfiguration.CELL_WIDTH
			)
		};
		let cursor: string =
			this.props.color === this.props.nextMoveColor ? "grab" : "no-drop";
		if (this.props.type === ActionTypeEnum.BeginMove) {
			if (this.props.id === this.props.pieceId) {
				if (
					!isEqualPositions(this.props.start, currentPoition) &&
					!this.props.availableMoves.some((availableMove) =>
						isEqualPositions(availableMove.position, currentPoition)
					)
				)
					cursor = "no-drop";
			}
		}
		const target = event.target as HTMLImageElement;
		target.style.cursor = cursor;
	}

	//#region Перемещение фигуры по полю :: Начало кода

	// Обрабатываем MouseDown на фигуре
	handleMouseDown(event: MouseEvent<HTMLImageElement>): void {
		if (this.props.color !== this.props.nextMoveColor) return;

		const moves = Engine.getAvailableMoves(this.props);

		this.dragItemLeft = this.state.left;
		this.dragItemTop = this.state.top;

		this.cursorX = event.pageX;
		this.cursorY = event.pageY;

		document.addEventListener("mousemove", this.handleMouseMove);
		document.addEventListener("mouseup", this.handleMouseUp, { once: true });

		if (this.props.beginMove) {
			const action: ActionType = {
				type: ActionTypeEnum.BeginMove,
				pieceId: this.props.id,
				start: { ...this.props.position },
				finish: undefined,
				availableMoves: moves,
				takedPieces: this.props.takedPieces,
				nextMoveColor: this.props.nextMoveColor
			};
			this.props.beginMove(action);
		}
	}

	// Обрабатываем MouseUp на фигуре
	handleMouseUp(): void {
		document.removeEventListener("mousemove", this.handleMouseMove);

		const rowIndex = Math.round(
			this.state.top / ChessConfiguration.CELL_HEIGHT
		);
		const columnIndex = Math.round(
			this.state.left / ChessConfiguration.CELL_WIDTH
		);

		const needUpdatePosition = this.props.availableMoves.find((move) =>
			isEqualPositions(move.position, { rowIndex, columnIndex })
		);
		let nexMoveColor = this.props.nextMoveColor;
		if (needUpdatePosition) {
			Engine.updatePosition(this.props.id, {
				rowIndex: rowIndex,
				columnIndex: columnIndex
			});

			this.props.position.rowIndex = rowIndex;
			this.props.position.columnIndex = columnIndex;
			nexMoveColor =
				nexMoveColor === ChessPieceColorEnum.White
					? ChessPieceColorEnum.Black
					: ChessPieceColorEnum.White;
		}
		this.setState({
			...this.state,
			left: this.props.position.columnIndex * ChessConfiguration.CELL_WIDTH,
			top: this.props.position.rowIndex * ChessConfiguration.CELL_HEIGHT
		});

		if (this.props.endMove) {
			const action: ActionType = {
				type: ActionTypeEnum.EndMove,
				pieceId: this.props.pieceId,
				start: this.props.start,
				finish: { ...this.props.position },
				availableMoves: this.props.availableMoves,
				takedPieces: this.props.takedPieces,
				nextMoveColor: nexMoveColor
			};
			this.props.endMove(action);
		}
	}

	// Обрабатываем DragStart фигуры
	handleDragStart(event: MouseEvent<HTMLImageElement>): void {
		event.preventDefault();
	}

	// Обрабатываем MouseMove фигуры
	handleMouseMove(event: any): void {
		this.moveFigure(event.pageX, event.pageY);
	}

	// Перемещение фигуры по заданным координатам
	moveFigure(pageX: number, pageY: number): void {
		this.setState({
			...this.state,
			left: this.dragItemLeft + pageX - this.cursorX,
			top: this.dragItemTop + pageY - this.cursorY
		});
	}

	//#endregion
}

// Свяжем props компонента с dispatch
const mapDispatchToProps = (dispatch: any) => {
	return {
		beginMove: (props: ActionType) => dispatch(actions.beginMove(props)),
		endMove: (props: ActionType) => dispatch(actions.endMove(props)),
		take: (props: ActionType) => dispatch(actions.take(props))
	};
};

// Свяжем state компонента с props
const mapStateToProps = (state: ActionType) => {
	// console.log("ChessPieceComponent :: mapStateToProps >>", state);
	return state;
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChessPieceComponent);
