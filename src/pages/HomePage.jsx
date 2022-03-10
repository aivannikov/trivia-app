import React from 'react';
import { Container, Header } from "semantic-ui-react";
import QuizContainer from '../containers/QuizContainer/QuizContainer';


const HomePage = () => {
    return (
        <Container text textAlign="center">
            <Header size="huge">Welcome to the Trivia Challenge!</Header>
            <p className="lead">
                You will be presented with 10 True or False questions.
            </p>
            <p className="lead">
                Can you score 100%?
            </p>
            <QuizContainer />
        </Container>
    )
}

export default HomePage;