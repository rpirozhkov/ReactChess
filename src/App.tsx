import React from "react";
import ChessBoardComponent from "./components/ChessBoardComponent";
import GameEngine from "./core/GameEngine";

// Игровой движок
export const Engine = new GameEngine();

function App() {
	return <ChessBoardComponent />;
}

export default App;