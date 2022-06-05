import { ActionType } from "./types/ActionType";
import { ActionTypeEnum } from "./enums/ActionTypeEnum";
import { ChessPieceColorEnum } from "../core/enums/ChessPieceColorEnum";

// Начальное состояние
const intialState: ActionType = {
	type: ActionTypeEnum.None,
	pieceId: undefined,
	start: undefined,
	finish: undefined,
	availableMoves: [],
	takedPieces: [],
	nextMoveColor: ChessPieceColorEnum.White
};

// Редюсер
export const moveReducer = (state = intialState, action: ActionType) => {
	console.log("moveReducer >>", action);
	switch (action.type) {
		case ActionTypeEnum.BeginMove:
		case ActionTypeEnum.EndMove:
		case ActionTypeEnum.Take:
			return {
				...state,
				...action
			};

		default:
			return state;
	}
};
