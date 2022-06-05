import React from "react";
import styled from "styled-components";
import { VerticalScaleLocationEnum } from "../core/enums/VerticalScaleLocationEnum";
import uniqid from "uniqid";
import { ChessConfiguration } from "../core/ChessConfiguration";

// Веритикальная шкала
class VerticalScaleComponent extends React.Component<{
	location: VerticalScaleLocationEnum;
}> {
	// Конструктор
	constructor(props: { location: VerticalScaleLocationEnum }) {
		super(props);
	}

	// Прорисовка компонента
	render(): React.ReactNode {
		const getTextSize = (txt: string) => {
			const element = document.createElement("canvas");
			const context = element.getContext("2d");
			if (context) {
				const indexOf = context.font.indexOf("px");
				context.font = `${
					ChessConfiguration.SCALE_TEXT_FONT_SIZE
				}${context.font.substring(indexOf)}`;

				const tSize = {
					width: context.measureText(txt).width,
					height: parseInt(context.font)
				};
				return tSize;
			}
			return undefined;
		};

		const blocks: JSX.Element[] = [];
		const scaleTextSize = getTextSize("8") ?? {
			width: ChessConfiguration.V_SCALE_WIDTH / 2,
			height: ChessConfiguration.V_SCALE_HEIGHT / 2
		};
		const ScaleValue = styled.span`
			color: black;
			font-weight: bold;
			font-size: ${ChessConfiguration.SCALE_TEXT_FONT_SIZE}px;
			position: absolute;
			top: ${ChessConfiguration.V_SCALE_HEIGHT / 2}px;
			right: ${this.props.location === VerticalScaleLocationEnum.Left
				? ChessConfiguration.V_SCALE_WIDTH / 2 - scaleTextSize.width / 2
				: 0}px;
			left: ${this.props.location === VerticalScaleLocationEnum.Left
				? 0
				: ChessConfiguration.V_SCALE_WIDTH / 2 - scaleTextSize.width / 2}px;
		`;
		for (let i = 7; i >= 0; i--) {
			const LeftDiv = styled.div`
				width: ${ChessConfiguration.V_SCALE_WIDTH}px;
				height: ${ChessConfiguration.V_SCALE_HEIGHT}px;
				position: absolute;
				background-color: transparent;
				display: inline-block;
				left: ${ChessConfiguration.TAKED_BLOCK_WIDTH}px;
				top: ${(7 - i) * ChessConfiguration.V_SCALE_HEIGHT +
					ChessConfiguration.H_SCALE_HEIGHT}px;
			`;
			const RightDiv = styled.div`
				width: ${ChessConfiguration.V_SCALE_WIDTH}px;
				height: ${ChessConfiguration.V_SCALE_HEIGHT}px;
				position: absolute;
				background-color: transparent;
				display: inline-block;
				left: ${ChessConfiguration.TAKED_BLOCK_WIDTH +
					ChessConfiguration.V_SCALE_WIDTH +
					ChessConfiguration.CELL_WIDTH * 8}px;
				top: ${(7 - i) * ChessConfiguration.V_SCALE_HEIGHT +
					ChessConfiguration.H_SCALE_HEIGHT}px;
			`;

			if (this.props.location === VerticalScaleLocationEnum.Left) {
				blocks.push(
					<LeftDiv key={uniqid()}>
						<ScaleValue>{i + 1}</ScaleValue>
					</LeftDiv>
				);
			} else if (this.props.location === VerticalScaleLocationEnum.Right) {
				blocks.push(
					<RightDiv key={uniqid()} id={uniqid()}>
						<ScaleValue>{i + 1}</ScaleValue>
					</RightDiv>
				);
			} else {
				blocks.push(
					<LeftDiv key={uniqid()}>
						<ScaleValue>{i + 1}</ScaleValue>
					</LeftDiv>
				);
				blocks.push(
					<RightDiv key={uniqid()} id={uniqid()}>
						<ScaleValue>{i + 1}</ScaleValue>
					</RightDiv>
				);
			}
		}
		return <>{blocks}</>;
	}
}

export default VerticalScaleComponent;
