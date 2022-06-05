import { VerticalScaleLocationEnum } from "../enums/VerticalScaleLocationEnum"
import { ChessPiece } from "./ChessPiece";

// Пропсы для компонента TakedPieceListComponent
export type TakedPieceListProps = {
    location: VerticalScaleLocationEnum.Left | VerticalScaleLocationEnum.Right;
    takedPieces?: ChessPiece[]
}