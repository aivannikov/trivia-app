import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";
import { Button } from 'semantic-ui-react';
import QuestionModal from "../../modals/QuestionModal/QuestionModal";
import QuizResultsModal from "../../modals/QuizResultsModal/QuizResultsModal";
import { mapResponseToState } from "./QuizContainerHelpers";
import { errorMessages } from "./QuizContainerErrors";
import { logAjaxError } from "../../helpers/ajaxHelpers";
import { isValidQuestionsArray } from "../../validation/validationFunctions";
import { QUIZ_API_URL } from "../../config/apiURls";


const QuizContainer = () => {
    // useState hooks
    const [shouldDataLoad, setShouldDataLoad] = useState(false);
    const [quizData, setQuizData] = useState([{ category: "", question: "" }]);
    const answersInitialValue = { numCorrectAnswers: 0, answerList: [] };
    const [answers, setAnswers] = useState(answersInitialValue);
    const [index, setIndex] = useState(0);
    const [errorState, setErrorState] = useState({ isErrorOccured: false, msg: null })

    // event handlers
    const handleAnswer = (answer) => {
        const isCorrectAnswer = (answer === quizData[index].correct_answer);
        let answersCounter = answers.numCorrectAnswers;
        if (isCorrectAnswer)
            answersCounter++;
        const newAnswerList = [...answers.answerList];
        newAnswerList.push({ isCorrectAnswer: isCorrectAnswer, question: he.decode(quizData[index].question) });
        setAnswers({ numCorrectAnswers: answersCounter, answerList: newAnswerList });
        setIndex(index + 1);
    }
    const handleQuizTriggered = () => {
        setShouldDataLoad(true);
    }
    const handleQuizClosed = () => {
        setIndex(0);
        setAnswers(answersInitialValue);
    }
    const handleQuizFinished = () => {
        setIndex(0);
    }
    const handleResultsClosed = () => {
        setAnswers(answersInitialValue);
    }


    // useEffect hooks
    useEffect(() => {
        if (shouldDataLoad)
            axios.get(QUIZ_API_URL).then(
                response => {
                    if (isValidQuestionsArray(response.data.results)) {
                        const responseApiData = [];
                        response.data.results.forEach(item => {
                            responseApiData.push(mapResponseToState(item))
                        });
                        setQuizData(responseApiData);
                        setShouldDataLoad(false);
                    }
                    else {
                        setErrorState({ isErrorOccured: true, msg: errorMessages.parseResponse });
                    }
                })
                .catch((error) => {
                    setErrorState({ isErrorOccured: true, msg: errorMessages.ajaxErrorMsg });
                    logAjaxError(error);
                });
    }, [shouldDataLoad]);


    return (

        <>
            {!errorState.isErrorOccured ?
                <>
                    <QuestionModal
                        category={he.decode(quizData[index].category)}
                        question={he.decode(quizData[index].question)}
                        number={index + 1}
                        totalQuestions={quizData.length}
                        isDataLoaded={!shouldDataLoad}
                        onAnswer={handleAnswer}
                        onFinish={handleQuizFinished}
                        onClose={handleQuizClosed}
                        onTrigger={handleQuizTriggered}

                    />
                    <QuizResultsModal
                        totalQuestions={quizData.length}
                        numberCorrectAnswers={answers.numCorrectAnswers}
                        answers={answers.answerList}
                        isOpenned={answers.answerList.length === quizData.length}
                        onClose={handleResultsClosed}
                    />
                </> :
                <>
                    <p style={{ color: 'red' }}>{errorState.msg}</p>
                    <Button onClick={() => window.location.reload()}>Refresh</Button>
                </>
            }
        </>


    )

}

export default QuizContainer;