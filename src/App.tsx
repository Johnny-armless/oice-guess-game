import React, { useState } from "react";
import VoicePlayer from "./components/VoicePlayer";
import Keyboard from "./components/Keyboard";
import Hint from "./components/Hint";
import Score from "./components/Score";
import InputField from "./components/InputField";
import NextVoiceButton from "./components/NextVoiceButton";
import LevelSelector from "./components/LevelSelector";

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

    const maxHints = 5;
    const hintCost = 33;

    const levels = {
        easy: [
            {
                audioSrc: "/audio/easy1.mp3",
                correctAnswer: "facila",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
            {
                audioSrc: "/audio/easy2.mp3",
                correctAnswer: "facilb",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
            {
                audioSrc: "/audio/easy3.mp3",
                correctAnswer: "facilc",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
            {
                audioSrc: "/audio/easy4.mp3",
                correctAnswer: "facild",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
            {
                audioSrc: "/audio/easy5.mp3",
                correctAnswer: "facile",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
        ],
        medium: [
            {
                audioSrc: "/audio/medium1.mp3",
                correctAnswer: "medioa",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
            {
                audioSrc: "/audio/medium2.mp3",
                correctAnswer: "mediob",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
            {
                audioSrc: "/audio/medium3.mp3",
                correctAnswer: "medioc",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
            {
                audioSrc: "/audio/medium4.mp3",
                correctAnswer: "mediod",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
            {
                audioSrc: "/audio/medium5.mp3",
                correctAnswer: "medioe",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
        ],
        hard: [
            {
                audioSrc: "/audio/hard1.mp3",
                correctAnswer: "dificila",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
            {
                audioSrc: "/audio/hard2.mp3",
                correctAnswer: "dificilb",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
            {
                audioSrc: "/audio/hard3.mp3",
                correctAnswer: "dificilc",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
            {
                audioSrc: "/audio/hard4.mp3",
                correctAnswer: "dificild",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
            {
                audioSrc: "/audio/hard5.mp3",
                correctAnswer: "dificile",
                hints: ["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"],
            },
        ],
    };

    const resetState = () => {
        setGuess("");
        setResult("");
        setAttempts([]);
        setHintsUsed(0);
        setCorrectAnswered(false);
        setShowNext(false);
    };

    const startLevel = (selectedLevel: "easy" | "medium" | "hard") => {
        setLevel(selectedLevel);
        setCurrentVoiceIndex(0);
        setScore(100);
        setLevelCompleted(false);
        resetState();
    };

    const nextVoice = () => {
        if (!level) {
            console.error("Level is not defined!");
            return;
        }
    
        const currentLevel = levels[level]; // Obtém o nível atual
        if (currentVoiceIndex < currentLevel.length - 1) {
            // Incrementa o índice para a próxima voz
            setCurrentVoiceIndex((prev) => prev + 1);
            resetState(); // Reseta estados relevantes
            setReloadAudio((prev) => !prev); // Recarrega o áudio
            console.log(`Next voice: ${currentVoiceIndex + 1}`);
        } else {
            // Finaliza o nível se todas as vozes foram processadas(ver se o commit ta sendo feito corretamente.)
            setLevelCompleted(true);
            console.log("Level completed!");
        }
    };

    const checkAnswer = () => {
        if (!level) return;
        const currentVoice = levels[level][currentVoiceIndex];

        if (correctAnswered) {
            setResult("You already answered correctly! Move to the next voice.");
            return;
        }

        if (guess.toLowerCase() === currentVoice.correctAnswer.toLowerCase()) {
            setScore((prev) => prev + 50);
            setResult("Correct! 🎉");
            setCorrectAnswered(true);
            setShowNext(true);
        } else {
            setScore((prev) => Math.max(prev - 10, 0));
            setAttempts((prev) => [...prev, guess]);
            setResult("Wrong! Try again.");
        }

        setGuess("");
    };

    const revealHint = () => {
        if (hintsUsed >= maxHints) {
            setResult("No more hints available!");
            return;
        }
        if (score < hintCost) {
            setResult("Not enough points to get a hint!");
            return;
        }
        setHintsUsed((prev) => prev + 1);
        setScore((prev) => prev - hintCost);
    };

    if (!level) {
        return <LevelSelector onSelect={startLevel} />;
    }

    const currentLevel = levels[level];
    const currentVoice = currentLevel[currentVoiceIndex];

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Voice Guess Game</h1>
            <Score score={score} />
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
            {levelCompleted && <p>Level Completed! 🎉</p>}
            <p style={{ marginTop: "20px", fontSize: "18px" }}>{result}</p>
        </div>
    );
};

export default App;