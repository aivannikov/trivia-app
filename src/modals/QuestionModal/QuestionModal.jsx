import React, { useState } from 'react';
import { Button, Header, Icon, Loader, Modal, Label, Dimmer, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const QuestionModal = ( props ) => {
    const [open, setOpen] = useState(false);

    const handleButtonClick = (value) => {
        props.onAnswer(value);
        if (props.number === props.totalQuestions) {
            setOpen(false);
            props.onFinish();
        }
    }
    const handleClose = () => {
        setOpen(false);
        props.onClose();
    }



    // Need this button wrappers to avoid the button clicked ui effects.
    const ButtonTrueComponent = () =>
        <Button color='green' inverted onClick={() => handleButtonClick('true')}>
            <Icon name='checkmark' /> True
        </Button>
    const ButtonFalseComponent = () =>
        <Button color='red' inverted onClick={() => handleButtonClick('false')}>
            <Icon name='remove' /> False
        </Button>


    return (
        props.isDataLoaded ?

            <Modal
                closeIcon
                open={open}
                trigger={<Button onClick={() => props.onTrigger()} >Begin</Button>}
                onClose={() => handleClose()}
                onOpen={() => setOpen(true)}
            >
                <Header textAlign='center' content={props.category} />
                <Modal.Content>
                    <p>
                        {props.question}
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <ButtonTrueComponent />
                    <ButtonFalseComponent />
                    <Container textAlign='center'>
                        <Label>{props.number} of {props.totalQuestions}</Label>
                    </Container>
                </Modal.Actions>
            </Modal> :

            <Dimmer active inverted>
                <Loader inverted content='Loading' />
            </Dimmer>
    )
}

export default QuestionModal;

QuestionModal.propTypes = {
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    isDataLoaded: PropTypes.bool.isRequired,
    onAnswer: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onTrigger: PropTypes.func.isRequired 
};