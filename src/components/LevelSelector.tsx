import React from "react";

interface LevelSelectorProps {
    onSelect: (level: "easy" | "medium" | "hard") => void; // Define o tipo da função
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ onSelect }) => {
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Voice Guess Game</h1>
            <h2>Choose a Level</h2>
            <button
                onClick={() => onSelect("easy")}
                style={{
                    margin: "10px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                }}
            >
                Easy
            </button>
            <button
                onClick={() => onSelect("medium")}
                style={{
                    margin: "10px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    backgroundColor: "#FFC107",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                }}
            >
                Medium
            </button>
            <button
                onClick={() => onSelect("hard")}
                style={{
                    margin: "10px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    backgroundColor: "#F44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                }}
            >
                Hard
            </button>
        </div>
    );
};

export default LevelSelector;