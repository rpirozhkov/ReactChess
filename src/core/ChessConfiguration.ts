import { ChessPieceColorEnum } from "./enums/ChessPieceColorEnum";

// Конфигурация шахмат
export class ChessConfiguration {
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

}
