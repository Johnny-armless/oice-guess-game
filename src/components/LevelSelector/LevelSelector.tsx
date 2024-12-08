import React from "react";
import { Button } from "@mui/material"; // Importa o componente Button do MUI
import './LevelSelector.scss';  // Importando o arquivo SCSS de estilização

interface LevelSelectorProps {
    onSelect: (level: "easy" | "medium" | "hard") => void; // Define o tipo da função
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ onSelect }) => {
    return (
        <div className="level-selector-container">
            <h1>Adivinha de quem é essa voz.</h1>
            <h2>Escolha um nível</h2>
            <Button
                onClick={() => onSelect("easy")}
                className="level-button easy-button"
                variant="contained" // Usando o estilo "contained" que tem um fundo sólido
                color="success" // Cor do botão
            >
                Easy
            </Button>
            <Button
                onClick={() => onSelect("medium")}
                className="level-button medium-button"
                variant="contained"
                color="warning"
            >
                Medium
            </Button>
            <Button
                onClick={() => onSelect("hard")}
                className="level-button hard-button"
                variant="contained"
                color="error"
            >
                Hard
            </Button>
        </div>
    );
};

export default LevelSelector;