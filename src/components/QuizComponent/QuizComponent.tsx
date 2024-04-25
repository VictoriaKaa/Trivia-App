import { useEffect, useState } from "react";
import { useAppDispatch } from "../../utils/hooks";
import { useNavigate } from "react-router-dom";
import QuestionComponent from "../QuestionComponent/QuestionComponent";
import { setFinalScore } from "../../store/features/triviaData";


interface QuizComponentProps {
    questions: any[];
}

const QuizComponent = ({ questions }: QuizComponentProps) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentIndex(0);
    }, [questions])

    const goToNextQuestion = (): void => {
        if (currentIndex !== questions.length - 1) {
            setCurrentIndex(currentIndex => currentIndex + 1);
        } else {
            dispatch(setFinalScore(score));
            navigate('/end');
        }
    }

    const addScore = (): void => {
        setScore(score => score + 1);
    }

    return (
        <>
            <QuestionComponent question={questions[currentIndex]} goToNextQuestion={goToNextQuestion} addScore={addScore} />
        </>
    );
};

export default QuizComponent;
