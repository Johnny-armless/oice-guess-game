import React from "react";
import './InputField.scss';  // Importando a estilização SCSS

interface InputFieldProps {
    value: string; // Valor atual do input
    onChange: (value: string) => void; // Função para atualizar o estado do valor
    onSubmit: () => void; // Função chamada ao pressionar Enter
    placeholder?: string; // Placeholder personalizável (opcional)
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange, onSubmit, placeholder = "Quem está falando?" }) => {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Impede comportamento padrão
            onSubmit(); // Chama a função onSubmit
        }
    };

    return (
        <div className="input-container">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyPress} // Adiciona a lógica do teclado
                placeholder={placeholder}
                className="input-field"
            />
        </div>
    );
};

export default InputField;