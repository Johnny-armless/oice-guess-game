import React, { useState } from "react";
import './Hint.scss';  // Importando a estilização SCSS
import PopupMessage from "../PopUpMessage/PopUpMessage"; // Importando o PopupMessage

interface HintProps {
    hints: string[]; // Lista de dicas para a voz atual
    hintsUsed: number; // Número de dicas já usadas
    revealHint: () => void; // Função para revelar uma nova dica
}

const Hint: React.FC<HintProps> = ({ hints, hintsUsed, revealHint }) => {
    const [showPopup, setShowPopup] = useState(false); // Controle para o pop-up
    const [popupMessage, setPopupMessage] = useState(""); // Mensagem do pop-up

    const handlePopupOpen = () => {
        // Quando o botão "Quer uma dica" for clicado, abrir o pop-up
        const hintMessage = hints.slice(0, hintsUsed + 1).join(" | ");
        setPopupMessage(hintMessage);
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    return (
        <div className="hint-container">
            <button
                onClick={() => {
                    revealHint();
                    handlePopupOpen();
                }}
                className="hint-button"
                disabled={hintsUsed >= hints.length} // Desativa o botão se todas as dicas já foram usadas
                title="Cada dica custa 33 pontos"
            >
                {hintsUsed < hints.length ? "Quer uma dica" : "Sem dicas"}
            </button>

            {/* Pop-up para exibir as dicas */}
            <PopupMessage open={showPopup} onClose={handlePopupClose} message={popupMessage} />
        </div>
    );
};

export default Hint;