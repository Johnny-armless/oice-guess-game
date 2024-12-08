import React from "react";
import './Score.scss';  // Importando o arquivo SCSS de estilização

interface ScoreProps {
    score: number; // Pontuação atual do jogador
}

const Score: React.FC<ScoreProps> = ({ score }) => {
    return (
        <div className="score-container">
            <h2 className="score-text">
                Pontos: {score}
            </h2>
        </div>
    );
};

export default Score;