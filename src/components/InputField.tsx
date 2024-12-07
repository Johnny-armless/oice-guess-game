import React from "react";

interface InputFieldProps {
    value: string; // Valor atual do input
    onChange: (value: string) => void; // Função para atualizar o estado do valor
    onSubmit: () => void; // Função chamada ao pressionar Enter
    placeholder?: string; // Placeholder personalizável (opcional)
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange, onSubmit, placeholder = "Who is speaking?" }) => {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Impede comportamento padrão
            onSubmit(); // Chama a função onSubmit
        }
    };

    // Estilização separada
    const inputStyle: React.CSSProperties = {
        padding: "10px",
        fontSize: "16px",
        width: "250px",
        textAlign: "center",
        border: "2px solid #ccc",
        borderRadius: "5px",
    };

    const containerStyle: React.CSSProperties = {
        marginTop: "20px",
    };

    return (
        <div style={containerStyle}>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyPress} // Adiciona a lógica do teclado
                placeholder={placeholder}
                style={inputStyle}
            />
        </div>
    );
};

export default InputField;