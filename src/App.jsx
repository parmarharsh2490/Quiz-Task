import React, { useState } from 'react';
import { CiDark, CiLight } from "react-icons/ci";

const App = () => {
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quiz, setQuiz] = useState([
    {
      id: 1,
      question: "What is the square root of 64?",
      answers: [
        { id: 'a', text: "6", right: false },
        { id: 'b', text: "7", right: false },
        { id: 'c', text: "8", right: true },
        { id: 'd', text: "9", right: false }
      ]
    },
    {
      id: 2,
      question: "What is the capital of France?",
      answers: [
        { id: 'a', text: "Berlin", right: false },
        { id: 'b', text: "Madrid", right: false },
        { id: 'c', text: "Paris", right: true },
        { id: 'd', text: "Rome", right: false }
      ]
    },
    {
      id: 3,
      question: "What is the largest planet in our solar system?",
      answers: [
        { id: 'a', text: "Earth", right: false },
        { id: 'b', text: "Mars", right: false },
        { id: 'c', text: "Jupiter", right: true },
        { id: 'd', text: "Saturn", right: false }
      ]
    },
    {
      id: 4,
      question: "What is the value of π (pi) to two decimal places?",
      answers: [
        { id: 'a', text: "2.14", right: false },
        { id: 'b', text: "3.14", right: true },
        { id: 'c', text: "4.14", right: false },
        { id: 'd', text: "5.14", right: false }
      ]
    },
    {
      id: 5,
      question: "Which country is known as the Land of the Rising Sun?",
      answers: [
        { id: 'a', text: "China", right: false },
        { id: 'b', text: "Japan", right: true },
        { id: 'c', text: "Thailand", right: false },
        { id: 'd', text: "South Korea", right: false }
      ]
    }
  ]);
  const [formData, setFormData] = useState({});
  const [theme, setTheme] = useState('dark');

  // Handle radio button change
  const handleRadioChange = (questionId, answerId) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  // Calculate and show the result
  const onSubmit = () => {
    let calculatedScore = 0;
    let allAnswered = true;

    quiz.forEach(question => {
      const selectedAnswerId = formData[question.id];
      const correctAnswer = question.answers.find(answer => answer.right);

      // Check if all questions are answered
      if (selectedAnswerId === undefined) {
        allAnswered = false;
        return;
      }

      // Update score if answer is correct
      if (selectedAnswerId === correctAnswer.id) {
        calculatedScore += 1;
      }
    });

    if (!allAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setScore(calculatedScore);
    setShowResult(true);
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      {showResult ? (
        <div className={`${theme === 'dark' ? 'bg-[#2b3945] text-white' : 'bg-white text-black'} min-h-screen font-sans p-4 flex items-center justify-center`}>
          <h1 className="text-3xl">Congratulations! Your Score is {score}</h1>
        </div>
      ) : (
        <div className={`${theme === 'dark' ? 'bg-[#2b3945] text-white' : 'bg-white text-black'} min-h-screen font-sans p-4`}>
          <div className="max-w-[600px] mx-auto my-8">
            <div className={`text-center float-right my-3 mx-2`}>
              {theme === 'dark' ? (
                <CiLight
                  onClick={toggleTheme}
                  className="w-8 h-8 sm:w-8 sm:h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 cursor-pointer"
                  aria-label="Switch to light theme"
                />
              ) : (
                <CiDark
                  onClick={toggleTheme}
                  className="w-8 h-8 sm:w-8 sm:h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 cursor-pointer"
                  aria-label="Switch to dark theme"
                />
              )}
            </div>
            <div className={`${theme === 'dark' ? 'bg-[#3e4c5a]' : 'bg-gray-200'} p-6 rounded-lg mb-4`}>
              <label htmlFor="name" className="block mb-2 text-xl">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`${theme === 'dark' ? 'bg-[#2b3945] text-white' : 'bg-white text-black'} w-full p-2 text-base rounded focus:outline-none focus:ring-2 focus:ring-[#1E90FF]`}
              />
            </div>
            <div className={`${theme === 'dark' ? 'bg-[#3e4c5a]' : 'bg-gray-200'} p-6 rounded-lg`}>
              <h1 className="text-2xl mb-2">Welcome to the Quiz!</h1>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm mb-6`}>Answer the following questions:</p>
              {quiz.map((q) => (
                <div key={q.id} className={`${theme === 'dark' ? 'bg-[#2b3945]' : 'bg-gray-100'} rounded-lg p-4 mb-4`}>
                  <h2 className="text-xl mb-4">Question {q.id}: {q.question}</h2>
                  <div className="space-y-2">
                    {q.answers.map((answer) => (
                      <label key={answer.id} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          onChange={() => handleRadioChange(q.id, answer.id)}
                          checked={formData[q.id] === answer.id}
                          className="mr-2"
                          aria-checked={formData[q.id] === answer.id}
                        />
                        <span className="text-lg">{answer.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={onSubmit} className="w-full bg-[#1E90FF] text-white py-3 px-6 text-base rounded mt-4 cursor-pointer transition-colors duration-300 hover:bg-[#187bcd]">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
