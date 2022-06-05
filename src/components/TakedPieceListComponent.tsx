import React, { ReactNode } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { MoveDirection } from "../core/enums/MoveDirectionEnum";
import { VerticalScaleLocationEnum } from "../core/enums/VerticalScaleLocationEnum";
import { TakedPieceListProps } from "../core/types/TakedPieceListProps";
import uniqid from "uniqid";
import { ChessConfiguration } from "../core/ChessConfiguration";

// Поле с фигурами, которые забрали
class TakedPieceListComponent extends React.Component<TakedPieceListProps> {
	// Конструктор
	constructor(props: TakedPieceListProps) {
		super(props);
	}

	// Прорисовка компонента
	render(): ReactNode {
		// console.log("render TakedPieceListComponent>>", this.props);
		const TakedPieces = styled.div`
			width: ${ChessConfiguration.TAKED_BLOCK_WIDTH}px;
			height: ${ChessConfiguration.CELL_HEIGHT * 8}px;
			background-color: transparent;
			position: absolute;
			display: inline-block;
			top: ${ChessConfiguration.H_SCALE_HEIGHT}px;
			left: ${this.props.location === VerticalScaleLocationEnum.Left
				? 0
				: ChessConfiguration.TAKED_BLOCK_WIDTH +
				  ChessConfiguration.CELL_WIDTH * 8 +
				  ChessConfiguration.V_SCALE_WIDTH * 2}px;
		`;

		const takedPieces: JSX.Element[] = [];
		if (this.props.takedPieces) {
			let left =
				this.props.location === VerticalScaleLocationEnum.Left
					? ChessConfiguration.TAKED_BLOCK_WIDTH - 50
					: 0;
			let top =
				this.props.location === VerticalScaleLocationEnum.Left ? 0 : 750;
			const offsetY =
				this.props.location === VerticalScaleLocationEnum.Left ? 50 : -50;
			const offsetX =
				this.props.location === VerticalScaleLocationEnum.Left ? -50 : 50;
			for (let i = 0; i < this.props.takedPieces.length; i++) {
				const takedPiece = this.props.takedPieces[i];
				if (this.props.location === VerticalScaleLocationEnum.Left) {
					if (takedPiece.direction === MoveDirection.Down) continue;
				} else {
					if (takedPiece.direction === MoveDirection.Up) continue;
				}

				const PieceImage = styled.img`
					width: 50px;
					height: 50px;
					position: absolute;
					left: ${left}px;
					top: ${top}px;
				`;
				takedPieces.push(
					<PieceImage src={takedPiece.image} key={uniqid()} />
				);
				left += offsetX;
				if (left === ChessConfiguration.TAKED_BLOCK_WIDTH ||
					left < 0) {
					left = this.props.location === VerticalScaleLocationEnum.Left
					? ChessConfiguration.TAKED_BLOCK_WIDTH - 50
					: 0;
					top += offsetY;
				}
			}
		}
		return <TakedPieces>{takedPieces}</TakedPieces>;
	}
}

// Свяжем state компонента с props
const mapStateToProps = (state: any) => {
	const { takedPieces } = state;
	return { takedPieces };
};

export default connect(mapStateToProps, null)(TakedPieceListComponent);
