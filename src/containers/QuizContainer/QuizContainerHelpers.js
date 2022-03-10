const mapResponseToState = (responseObject) => {
    return {
        category: responseObject.category,
        question: responseObject.question,
        correct_answer: responseObject.correct_answer.toLowerCase()
    }
}

export { mapResponseToState } 