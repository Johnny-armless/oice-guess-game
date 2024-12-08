import React, { useState } from "react";
import './App.scss';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from "./components/Header/Header";
import VoicePlayer from "./components/VoicePlayer/VoicePlayer";
import Keyboard from "./components/Keyboard/Keyboard";
import Hint from "./components/Hint/Hint";
import Score from "./components/Score/Score";
import InputField from "./components/InputField/InputField";
import NextVoiceButton from "./components/NextVoiceButton/NextVoiceButton";
import LevelSelector from "./components/LevelSelector/LevelSelector";
import PopupMessage from "./components/PopUpMessage/PopUpMessage";
import { levelsData } from './Data/levelsData'

const App: React.FC = () => {
    const [level, setLevel] = useState<"easy" | "medium" | "hard" | null>(null);
    const [currentVoiceIndex, setCurrentVoiceIndex] = useState(0);
    const [guess, setGuess] = useState("");
    const [result, setResult] = useState("");
    const [score, setScore] = useState(100);
    const [showNext, setShowNext] = useState(false);
    const [reloadAudio, setReloadAudio] = useState(false);
    const [levelCompleted, setLevelCompleted] = useState(false);
    const [attempts, setAttempts] = useState<string[]>([]);
    const [correctAnswered, setCorrectAnswered] = useState<boolean>(false);
    const [hintsUsed, setHintsUsed] = useState<number>(0);
    const [showPopup, setShowPopup] = useState(false); 
    const [popupMessage, setPopupMessage] = useState(""); 
    const [correctAnswerWord, setCorrectAnswerWord] = useState(""); 
    const [errorMessage, setErrorMessage] = useState<string>("");  
    const [gameOver, setGameOver] = useState(false); // Adicionado para controlar se o jogo acabou

    const maxHints = 5;
    const hintCost = 33;

    const resetState = () => {
        setGuess("");
        setResult("");
        setAttempts([]);
        setHintsUsed(0);
        setCorrectAnswered(false);
        setShowNext(false);
        setCorrectAnswerWord(""); 
    };

    const startLevel = (selectedLevel: "easy" | "medium" | "hard") => {
        setLevel(selectedLevel);
        setCurrentVoiceIndex(0);
        setScore(100);
        setLevelCompleted(false);
        setGameOver(false);  // Resetando gameOver
        resetState();
    };

    const nextVoice = () => {
        if (!level || gameOver) return; // Impede a mudança de voz após o jogo acabar

        const currentLevel = levelsData[level];
        if (currentVoiceIndex < currentLevel.length - 1) {
            setCurrentVoiceIndex((prev) => prev + 1);
            resetState();
            setReloadAudio((prev) => !prev);
        } else {
            setLevelCompleted(true);
        }
    };

    const checkAnswer = () => {
        if (!level || gameOver) return; // Impede de continuar se o jogo acabou
        const currentVoice = levelsData[level][currentVoiceIndex];

        if (correctAnswered) {
            setResult("Você já acertou essa!");
            return;
        }

        if (guess.toLowerCase() === currentVoice.correctAnswer.toLowerCase()) {
            setScore((prev) => prev + 50);
            setResult("🎉");
            setCorrectAnswered(true);
            setShowNext(true);
            setCorrectAnswerWord(currentVoice.correctAnswer);
        } else {
            setScore((prev) => Math.max(prev - 10, 0)); 
            setAttempts((prev) => [...prev, guess]);
            setErrorMessage("Errado, tente outra vez.");
        }

        setGuess(""); 

        // Verifica se a pontuação chegou a 0, se sim, termina o jogo
        if (score <= 0) {
            setGameOver(true); // Define que o jogo acabou
            setResult("Game Over! Você perdeu.");
        }
    };

    const revealHint = () => {
        if (hintsUsed >= maxHints || gameOver) {
            setResult("Sem mais dicas!");
            return;
        }
        if (score < hintCost) {
            setPopupMessage("Você precisa de 33 pontos por dica!");
            setShowPopup(true);
            return;
        }

        setHintsUsed((prev) => prev + 1);
        setScore((prev) => prev - hintCost);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    if (!level) {
        return <LevelSelector onSelect={startLevel} />;
    }

    const currentLevel = levelsData[level];
    const currentVoice = currentLevel[currentVoiceIndex];

    return (
        <div>
            <Header score={score} />
            <VoicePlayer key={`${reloadAudio}-${currentVoiceIndex}`} audioSrc={currentVoice.audioSrc} />
            <Hint hints={currentVoice.hints} hintsUsed={hintsUsed} revealHint={revealHint} />
            <InputField value={guess} onChange={setGuess} onSubmit={checkAnswer} />
            <Keyboard
                onKeyPress={(key) => {
                    if (key === "Enter") {
                        checkAnswer();
                    } else if (key === "Backspace") {
                        setGuess((prev) => prev.slice(0, -1));
                    } else {
                        setGuess((prev) => prev + key);
                    }
                }}
            />
            <NextVoiceButton show={showNext} onNext={nextVoice} />
            {levelCompleted && <p>Fim do Jogo! 🎉</p>}
            <p>{result}</p>

            {correctAnswerWord && (
                <div className="correct-answer">
                    <strong>Você acertou! </strong>
                </div>
            )}

            <PopupMessage open={showPopup} onClose={handleClosePopup} message={popupMessage} />
        </div>
    );
};

export default App;