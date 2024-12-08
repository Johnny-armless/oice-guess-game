import React from "react";
import './VoicePlayer.scss';  // Importando o arquivo SCSS de estilização

interface VoicePlayerProps {
    audioSrc: string; // O caminho do arquivo de áudio
    onEnded?: () => void; // Callback opcional quando o áudio termina
}

const VoicePlayer: React.FC<VoicePlayerProps> = ({ audioSrc, onEnded }) => {
    return (
        <div className="voice-player-container">
            <audio controls onEnded={onEnded}>
                <source src={audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default VoicePlayer;