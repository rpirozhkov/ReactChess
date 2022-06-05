import React from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import { ChessConfiguration } from "../core/ChessConfiguration";
import { HorizontalScaleLocationEnum } from "../core/enums/HorizontalScaleLocationEnum";

// Горизонтальная шкала
class HorizontalScaleComponent extends React.Component<{
	location: HorizontalScaleLocationEnum;
}> {
	//Конструктор
	constructor(props: { location: HorizontalScaleLocationEnum }) {
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
		const chars: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
		const scaleTextSize = getTextSize("A") ?? {
			width: ChessConfiguration.H_SCALE_WIDTH / 2,
			height: ChessConfiguration.H_SCALE_HEIGHT / 2
		};

		const ScaleValue = styled.span`
			position: absolute;
			color: black;
			font-weight: bold;
			font-size: ${ChessConfiguration.SCALE_TEXT_FONT_SIZE}px;			
			top: ${ChessConfiguration.H_SCALE_HEIGHT / 2}px;
			right: ${this.props.location === HorizontalScaleLocationEnum.Top
				? ChessConfiguration.H_SCALE_WIDTH / 2 - scaleTextSize.width / 2
				: 0}px;
			left: ${this.props.location === HorizontalScaleLocationEnum.Top
				? 0
				: ChessConfiguration.H_SCALE_WIDTH / 2 - scaleTextSize.width / 2}px;
		`;
		for (let i = 0; i <= 7; i++) {
			const TopDiv = styled.div`
				width: ${ChessConfiguration.H_SCALE_WIDTH}px;
				height: ${ChessConfiguration.H_SCALE_HEIGHT}px;
				position: absolute;
				background-color: transparent;
				display: inline-block;
				left: ${i * ChessConfiguration.H_SCALE_WIDTH + ChessConfiguration.TAKED_BLOCK_WIDTH + ChessConfiguration.V_SCALE_WIDTH}px;
				top: 0px;
			`;
					
			const BottomDiv = styled.div`
				width: ${ChessConfiguration.H_SCALE_WIDTH}px;
				height: ${ChessConfiguration.H_SCALE_HEIGHT}px;
				position: absolute;
				background-color: transparent;
				display: inline-block;
				left: ${i * ChessConfiguration.H_SCALE_WIDTH + ChessConfiguration.TAKED_BLOCK_WIDTH + ChessConfiguration.V_SCALE_WIDTH}px;
				top: ${ChessConfiguration.H_SCALE_HEIGHT + ChessConfiguration.CELL_HEIGHT * 8}px;
			`;

			if (this.props.location === HorizontalScaleLocationEnum.Top) {
				blocks.push(
					<TopDiv key={uniqid()}>
						<ScaleValue>{chars[i]}</ScaleValue>
					</TopDiv>
				);
			} else if (
				this.props.location === HorizontalScaleLocationEnum.Bottom
			) {
				blocks.push(
					<BottomDiv key={uniqid()}>
						<ScaleValue>{chars[i]}</ScaleValue>
					</BottomDiv>
				);
			} else {
				blocks.push(
					<TopDiv key={uniqid()}>
						<ScaleValue>{chars[i]}</ScaleValue>
					</TopDiv>
				);
				blocks.push(
					<BottomDiv key={uniqid()}>
						<ScaleValue>{chars[i]}</ScaleValue>
					</BottomDiv>
				);
			}
		}
		return <>{blocks}</>;
	}
}

export default HorizontalScaleComponent;
