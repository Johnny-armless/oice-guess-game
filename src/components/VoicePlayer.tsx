import React from "react";

interface VoicePlayerProps {
    audioSrc: string; // O caminho do arquivo de áudio
    onEnded?: () => void; // Callback opcional quando o áudio termina
}

const VoicePlayer: React.FC<VoicePlayerProps> = ({ audioSrc, onEnded }) => {
    // Estilização opcional
    const playerStyle: React.CSSProperties = {
        marginTop: "20px",
        textAlign: "center",
    };

    return (
        <div style={playerStyle}>
            <audio controls onEnded={onEnded}>
                <source src={audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default VoicePlayer;