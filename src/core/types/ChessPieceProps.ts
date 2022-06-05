import { ActionType } from "../../redux/types/ActionType";
import { ChessPiece } from "./ChessPiece";

// Тип porps для компонента ChessPiece
export type ChessPieceProps = ChessPiece &
	ActionType & {
		// Метод Начать ход
		beginMove?: (props: ActionType) => void;

		// Метод Завершить ход
		endMove?: (props: ActionType) => void;

		// Метод Забрать фигуру
		take?: (props: ActionType) => void;
	};
