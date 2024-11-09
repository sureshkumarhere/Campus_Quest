import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import QuestionDisplay from './QuestionDisplay';
import HuntTimer from './HuntTimer';

function CurrentHunt() {
    const location = useLocation();
    const { hunt } = location.state || {};
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const [isHuntComplete, setIsHuntComplete] = useState(false);

    const handleAnswerSubmit = (userAnswer) => {
        if (userAnswer.toLowerCase() === hunt.questions[currentQuestionIndex].answer.toLowerCase()) {
            alert("Correct answer!");
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to next question
            setWrongAttempts(0); // Reset wrong attempts
            
            // Check if hunt is complete
            if (currentQuestionIndex + 1 === hunt.questions.length) {
                setIsHuntComplete(true);
            }
        } else {
            alert("Try again!");
            setWrongAttempts((prevAttempts) => prevAttempts + 1); // Increment wrong attempts
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            {hunt ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">{hunt.title}!</h1>
                    <p className="text-gray-700 mb-4">Difficulty: {hunt.difficulty}</p>

                    {/* Display the HuntTimer component */}
                    <HuntTimer isActive={!isHuntComplete} />

                    {currentQuestionIndex < hunt.questions.length ? (
                        <QuestionDisplay 
                            questionData={hunt.questions[currentQuestionIndex]} 
                            onSubmit={handleAnswerSubmit} 
                            wrongAttempts={wrongAttempts}
                        />
                    ) : (
                        <div>
                            <p className="text-green-500">Congratulations! You've completed the hunt!</p>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-red-500">Hunt not found.</p>
            )}
        </div>
    );
}

export default CurrentHunt;