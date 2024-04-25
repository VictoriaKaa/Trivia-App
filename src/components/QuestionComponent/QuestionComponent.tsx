import { useEffect, useState } from "react";
import "./QuestionComponent.scss";
import { Button } from "@mui/material";
import { convChar } from "../../utils/charConvertation";


interface QuestionComponentProps {
    question: any;
    goToNextQuestion: (val: any) => void;
    addScore: () => void;
}

const QuestionComponent = ({ question, goToNextQuestion, addScore }: QuestionComponentProps) => {
    const [answers, setAnswers] = useState<any>([]);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [isAnswer, setIsAnswer] = useState<boolean>(false);


    useEffect(() => {
        setAnswers([...question.incorrect_answers, question.correct_answer]);
        setIsAnswer(false);
        setIsCorrect(false);
    }, [question])

    const getAnswer = (item: string): void => {
        const isCorrectAnswer = question.correct_answer === item;
        setIsCorrect(isCorrectAnswer);
        setIsAnswer(true);
        isCorrectAnswer && addScore();
    }

    return (
        <div className="question">
            <div className="question-title">{convChar(question.question)}</div>
            <div className="question-answers">
                {question.type === 'boolean' &&
                    <>
                        <Button variant="contained" size='large' color='warning' disabled={isAnswer} onClick={() => getAnswer('True')}>True</Button>
                        <Button variant="contained" size='large' color='warning' disabled={isAnswer} onClick={() => getAnswer('False')}>False</Button>
                    </>}
                {question.type === 'multiple' &&
                    <>
                        {answers.map((item: any) => <Button variant="contained" size='large' color='warning' disabled={isAnswer} key={item} onClick={() => getAnswer(item)}>{convChar(item)}</Button>)}
                    </>}
            </div>
            {isAnswer && <div className="question-next">
                <div>{isCorrect ? 'Correct!' : 'Incorrect!'}</div>
                <div><Button variant="contained" size='large' color={isCorrect ? 'success' : 'error'} onClick={goToNextQuestion}>Next</Button></div>
            </div>}
        </div>
    );
};

export default QuestionComponent;
