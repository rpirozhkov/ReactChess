import { ActionTypeEnum } from "./enums/ActionTypeEnum";
import { ActionType } from "./types/ActionType";

export function beginMove(props: ActionType): ActionType {
	return {
		...props,
		type: ActionTypeEnum.BeginMove
	};
}

export function endMove(props: ActionType): ActionType {
	return {
		...props,
		type: ActionTypeEnum.EndMove
	};
}

export function take(props: ActionType): ActionType {
	return {
		...props,
		type: ActionTypeEnum.Take
	};
}
