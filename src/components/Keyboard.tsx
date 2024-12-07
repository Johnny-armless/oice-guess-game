import React from "react";

interface KeyboardProps {
    onKeyPress: (key: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
    const keyboardRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

    // Estilizações
    const containerStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
    };

    const rowStyle: React.CSSProperties = {
        display: "flex",
        marginBottom: "10px",
    };

    const buttonStyle: React.CSSProperties = {
        margin: "5px",
        padding: "10px 15px",
        fontSize: "16px",
        cursor: "pointer",
        border: "1px solid #ccc",
        borderRadius: "5px",
    };

    const specialButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: "#f0f0f0",
    };

    return (
        <div style={containerStyle}>
            {/* Teclas principais */}
            {keyboardRows.map((row, rowIndex) => (
                <div key={rowIndex} style={rowStyle}>
                    {row.split("").map((key) => (
                        <button
                            key={key}
                            onClick={() => onKeyPress(key)}
                            style={buttonStyle}
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
                    style={specialButtonStyle}
                    aria-label="Key Backspace"
                >
                    Backspace
                </button>
                <button
                    onClick={() => onKeyPress("Enter")}
                    style={{ ...specialButtonStyle, backgroundColor: "#d4edda" }}
                    aria-label="Key Enter"
                >
                    Enter
                </button>
            </div>
        </div>
    );
};

export default Keyboard;