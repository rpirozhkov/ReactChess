import { ActionType } from "../../redux/types/ActionType";
import { ChessPiece } from "./ChessPiece";

export type ChessPieceProps = ChessPiece &
	ActionType & {
		beginMove?: (props: ActionType) => void;
		endMove?: (props: ActionType) => void;
		take?: (props: ActionType) => void;
	};
