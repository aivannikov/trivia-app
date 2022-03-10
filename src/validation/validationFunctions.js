import Ajv from "ajv";
import questionSchema from './schemas/questionSchema.json';

// Returns true or false
const isValidQuestionsArray = (questionsJsonData) => {
    const ajv = new Ajv();
    const arraySchema = {
        type: "array",
        items: questionSchema
    };
    const validate = ajv.compile(arraySchema);
    return validate(questionsJsonData);
}

export { isValidQuestionsArray }