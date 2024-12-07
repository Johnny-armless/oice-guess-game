import React from "react";

interface ScoreProps {
    score: number; // Pontuação atual do jogador
}

const Score: React.FC<ScoreProps> = ({ score }) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
                Score: {score}
            </h2>
        </div>
    );
};

export default Score;