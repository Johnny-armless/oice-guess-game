import React from "react";
import './Keyboard.scss';  // Importando a estilização SCSS

interface KeyboardProps {
    onKeyPress: (key: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
    const keyboardRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

    return (
        <div className="keyboard-container">
            {/* Teclas principais */}
            {keyboardRows.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.split("").map((key) => (
                        <button
                            key={key}
                            onClick={() => onKeyPress(key)}
                            className="keyboard-button"
                            aria-label={`Key ${key}`}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
            {/* Backspace e Enter */}
            <div>
                <button
                    onClick={() => onKeyPress("Backspace")}
                    className="keyboard-special-button"
                    aria-label="Key Backspace"
                >
                    Backspace
                </button>
                <button
                    onClick={() => onKeyPress("Enter")}
                    className="keyboard-special-button enter-button"
                    aria-label="Key Enter"
                >
                    Enter
                </button>
            </div>
        </div>
    );
};

export default Keyboard;