// Тип - позиция элемента на игровом поле
export type ChessPosition = {
	// Номер строки
	rowIndex: number;

	// Номер столбца
	columnIndex: number;
};

// Сравнение 2х позиций
export const isEqualPositions = (
	firstPosition?: ChessPosition,
	secondPosition?: ChessPosition
): boolean => {
	if (!firstPosition && !secondPosition) return true;
	else if (firstPosition && secondPosition)
		return (
			firstPosition.rowIndex === secondPosition.rowIndex &&
			firstPosition.columnIndex === secondPosition.columnIndex
		);
	return false;
};

// Нулевая позиция
export const NullPosition: ChessPosition = {
	rowIndex: -1,
	columnIndex: -1
};
