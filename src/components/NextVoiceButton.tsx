import React from "react";

interface NextVoiceButtonProps {
    show: boolean; // Determina se o botão deve ser exibido
    onNext: () => void; // Função chamada ao clicar no botão
    disabled?: boolean; // Prop opcional para desativar o botão
}

const NextVoiceButton: React.FC<NextVoiceButtonProps> = ({ show, onNext, disabled = false }) => {
    if (!show) return null; // Não renderiza nada se `show` for false

    // Estilizações
    const buttonStyle: React.CSSProperties = {
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor: disabled ? "#ccc" : "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    };

    return (
        <button
            onClick={onNext}
            style={buttonStyle}
            disabled={disabled}
            aria-label="Next Voice"
        >
            Next Voice
        </button>
    );
};

export default NextVoiceButton;