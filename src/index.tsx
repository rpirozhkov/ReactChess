import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { moveReducer } from "./redux/moveReducer";
import App from "./App";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const store = configureStore({ reducer: moveReducer });

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

// window.onresize = (event) =>{
	/*
	
	// Ширина ячейки
	static CELL_WIDTH: number = 100;

	// Высота ячейки
	static CELL_HEIGHT: number = 100;

	// Цвет светлого поля
	static readonly WHITE_CELL_COLOR: string = "whitesmoke";

	// Цвет темного поля
	static readonly BLACK_CELL_COLOR: string = "gray";

	// Цвет фигур сверху
	static readonly TOP_COLOR: ChessPieceColorEnum = ChessPieceColorEnum.Black;

	// Ширина вертикальной шкалы
	static V_SCALE_WIDTH = 50;

	// Высота блока вертикальной шкалы (всего 8 блоков, по 1 на каждую цифру)
	static V_SCALE_HEIGHT = 100;

	// Ширина блока с фигурками, которые забрали
	static TAKED_BLOCK_WIDTH = 200;

	// Ширина блока горизонтальной шкалы (всего 8 блоков, по 1 на каждую цифру)
	static H_SCALE_WIDTH = 100;

	// Высот горизонтального блока
	static H_SCALE_HEIGHT = 50;

	// Размер шрифта в шкале
	static SCALE_TEXT_FONT_SIZE = 24;
	
	
	*/
	// const totalWidth = ChessConfiguration.V_SCALE_HEIGHT * 2 + ChessConfiguration.TAKED_BLOCK_WIDTH * 2 + ChessConfiguration.CELL_WIDTH * 8;
	// if (totalWidth > window.innerWidth){
	// 	const diff = window.innerWidth / totalWidth;
	// 	ChessConfiguration.CELL_WIDTH = ChessConfiguration.CELL_WIDTH * diff - 5;
	// 	ChessConfiguration.CELL_HEIGHT = ChessConfiguration.CELL_HEIGHT * diff - 5;
	// 	ChessConfiguration.V_SCALE_WIDTH = ChessConfiguration.V_SCALE_WIDTH * diff - 5;
	// 	ChessConfiguration.V_SCALE_HEIGHT = ChessConfiguration.V_SCALE_HEIGHT * diff - 5;
	// 	ChessConfiguration.TAKED_BLOCK_WIDTH = ChessConfiguration.TAKED_BLOCK_WIDTH * diff - 5;
	// 	ChessConfiguration.H_SCALE_WIDTH = ChessConfiguration.H_SCALE_WIDTH * diff - 5;
	// 	ChessConfiguration.H_SCALE_HEIGHT = ChessConfiguration.H_SCALE_HEIGHT * diff - 5;
	// 	ChessConfiguration.SCALE_TEXT_FONT_SIZE = ChessConfiguration.SCALE_TEXT_FONT_SIZE * diff;
	// } 
// };