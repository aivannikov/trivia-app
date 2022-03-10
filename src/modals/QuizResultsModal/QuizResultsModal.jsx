import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, List, Header, Icon, Modal } from 'semantic-ui-react'
import { listItemStyle, modalActionStyle } from './inlineStyles';
import PropTypes from 'prop-types';

const QuizResultsModal = (props) => {

    return (
        <Modal
            closeIcon
            open={props.isOpenned}
            onClose={() => props.onClose()}
        >
            <Header textAlign='center' content={`You scored ${props.numberCorrectAnswers}/${props.totalQuestions}`} />
            <Modal.Content>
                <List>
                    {props.answers.map((answer) =>

                        <List.Item style={listItemStyle} key={uuidv4()}>
                            {
                                answer.isCorrectAnswer
                                    ?
                                    <List.Icon name='plus' color='green' />
                                    :
                                    <List.Icon name='minus' color='red' />
                            }
                            <List.Content>{answer.question}</List.Content>
                        </List.Item>
                    )}
                </List>
            </Modal.Content>
            <Modal.Actions style={modalActionStyle}>
                <Button color='green' inverted onClick={() => props.onClose()}>
                    <Icon name='sync' /> PLAY AGAIN?
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
export default QuizResultsModal;

QuizResultsModal.propTypes = {
    totalQuestions: PropTypes.number.isRequired,
    numberCorrectAnswers: PropTypes.number.isRequired,
    isOpenned: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired 
};
