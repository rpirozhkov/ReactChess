import { ActionTypeEnum } from "./enums/ActionTypeEnum";
import { ActionType } from "./types/ActionType";

// Начать ход
export function beginMove(props: ActionType): ActionType {
	return {
		...props,
		type: ActionTypeEnum.BeginMove
	};
}

// Завершить ход
export function endMove(props: ActionType): ActionType {
	return {
		...props,
		type: ActionTypeEnum.EndMove
	};
}

// Забрать фигуру
export function take(props: ActionType): ActionType {
	return {
		...props,
		type: ActionTypeEnum.Take
	};
}
