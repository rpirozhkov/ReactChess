// Типы действий для Redux
export enum ActionTypeEnum {
	// Отсутствие действия
	None = "NONE",

	// Начало перемещения
	BeginMove = "BEGIN_MOVE",

	// Окончание перемещения
	EndMove = "END_MOVE",

	// Забрали фигуру
	Take = "TAKE"
}
