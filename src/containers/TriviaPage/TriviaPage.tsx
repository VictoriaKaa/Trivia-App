import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./TriviaPage.scss";
import { RootState } from "../../store";
import { useAppDispatch } from "../../utils/hooks";
import { Loader } from "../../components/Loader/Loader";
import { getTriviaQuestions } from "../../store/features/triviaData";
import QuizComponent from "../../components/QuizComponent/QuizComponent";
import withToken from "../../components/TokenWrapper/TokenWrapper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TriviaPage = () => {
    const { token, questions, loading, error } = useSelector((state: RootState) => state.trivia);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            dispatch(getTriviaQuestions(''));
        }
    }, [dispatch, token]);

    return (
        <>
            <div className="trivia-container main-container">
                {!!questions.length && <QuizComponent questions={questions} />}
                {!questions.length && <div className="trivia-no-results">
                    <div>There are no questions in the selected mode.</div>
                    <Button variant="contained" color="info" onClick={() => navigate('/settings')}>
                        Change mode
                    </Button>
                </div>}
            </div>
            {loading && <Loader />}
            {error && <div>
                Error: {error}
            </div>}
        </>
    );
};

export default withToken(TriviaPage);
