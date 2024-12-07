import React from "react";

interface HintProps {
    hints: string[]; // Lista de dicas para a voz atual
    hintsUsed: number; // Número de dicas já usadas
    revealHint: () => void; // Função para revelar uma nova dica
}

const Hint: React.FC<HintProps> = ({ hints, hintsUsed, revealHint }) => {
    // Estilizações separadas para clareza
    const buttonStyle: React.CSSProperties = {
        padding: "10px",
        fontSize: "16px",
        cursor: hintsUsed < hints.length ? "pointer" : "not-allowed",
        backgroundColor: hintsUsed < hints.length ? "#4CAF50" : "#ccc",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
    };

    const hintContainerStyle: React.CSSProperties = {
        marginTop: "10px",
        color: "#555",
        fontSize: "14px",
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <button
                onClick={revealHint}
                style={buttonStyle}
                disabled={hintsUsed >= hints.length} // Desativa o botão se todas as dicas já foram usadas
            >
                {hintsUsed < hints.length ? "Get a Hint" : "No Hints Left"}
            </button>
            <div style={hintContainerStyle}>
                {hintsUsed > 0 && (
                    <p>
                        <strong>Hints: </strong>
                        {hints.slice(0, hintsUsed).join(" | ")}
                    </p>
                )}
                {hintsUsed >= hints.length && <p>No more hints available!</p>}
            </div>
        </div>
    );
};

export default Hint;