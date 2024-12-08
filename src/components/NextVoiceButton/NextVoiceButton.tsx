import React from "react";
import './NextVoiceButton.scss';  // Importando o arquivo SCSS de estilização

interface NextVoiceButtonProps {
    show: boolean; // Determina se o botão deve ser exibido
    onNext: () => void; // Função chamada ao clicar no botão
    disabled?: boolean; // Prop opcional para desativar o botão
}

const NextVoiceButton: React.FC<NextVoiceButtonProps> = ({ show, onNext, disabled = false }) => {
    if (!show) return null; // Não renderiza nada se `show` for false
    return (
        <div className="next-voice-button-container">
            <button
                onClick={onNext}
                disabled={disabled}
                className="next-voice-button"
                aria-label="Próxima voz"
            >
                Próxima voz
            </button>
        </div>
    );
};

export default NextVoiceButton;