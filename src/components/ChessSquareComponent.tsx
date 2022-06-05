import React from "react";
import styled from "styled-components";
import { ChessConfiguration } from "../core/ChessConfiguration";
import { connect } from "react-redux";
import { ChessSquareProps } from "../core/types/ChessSquareProps";
import { ActionTypeEnum } from "../redux/enums/ActionTypeEnum";
import { ChessPosition, isEqualPositions } from "../core/types/ChessPosition";
import { ActionType } from "../redux/types/ActionType";

// Компонент - Шахматное поле
class ChessSquareComponent extends React.Component<ChessSquareProps> {
	constructor(props: ChessSquareProps) {
		super(props);
	}

	// Прорисовка компонента
	render() {		
		const position: ChessPosition = {
			rowIndex: this.props.rowIndex,
			columnIndex: this.props.columnIndex
		};

		const Cell = styled.div`
			display: inline-block;
			width: ${ChessConfiguration.CELL_WIDTH}px;
			height: ${ChessConfiguration.CELL_HEIGHT}px;
			background-color: ${(this.props.rowIndex + this.props.columnIndex) %
				2 === 0
				? ChessConfiguration.WHITE_CELL_COLOR
				: ChessConfiguration.BLACK_CELL_COLOR};
			position: absolute;
			left: ${this.props.columnIndex * 100}px;
			top: ${this.props.rowIndex * 100}px;
			${this.props.type !== ActionTypeEnum.BeginMove
				? ""
				: `box-shadow: inset 0 0 10px 10px ${
						isEqualPositions(this.props.start, position)
							? "lightblue"
							: "lightgreen"
				  };`}
		`;

		const id = `square_${this.props.rowIndex}_${this.props.columnIndex}`;
		return <Cell id={id} />;
	}

	// Метод определяет нужна ли прорисовка компонента
	shouldComponentUpdate(nextProps: ChessSquareProps) {
		const position: ChessPosition = {
			rowIndex: nextProps.rowIndex,
			columnIndex: nextProps.columnIndex
		};
		const needRender =
			nextProps.availableMoves.some((move) =>
				isEqualPositions(move.position, position)
			) || isEqualPositions(nextProps.start, position);
		return needRender;
	}
}

// Свяжем state компонента с props
const mapStateToProps = (state: ActionType) => {
	return {
		type: state.type,
		start: state.start,
		availableMoves: state.availableMoves
	};
};

export default connect(mapStateToProps, null)(ChessSquareComponent);
