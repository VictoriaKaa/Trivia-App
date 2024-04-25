import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./EndPage.scss";
import { RootState } from "../../store";
import { useAppDispatch } from "../../utils/hooks";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { setFinalScore } from "../../store/features/triviaData";
import { Button } from "@mui/material";

const EndPage = () => {
    const { questions, score, loading, error } = useSelector((state: RootState) => state.trivia);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const playAgain = (): void => {
        dispatch(setFinalScore(0));
        navigate('/game');
    }

    const changeMode = (): void => {
        dispatch(setFinalScore(0));
        navigate('/settings');
    }

    return (
        <>
            <div className="main-container endpage-container">
                <div className="endpage-title">
                    Your Result: <span className="endpage-result">{score}</span> correct answer(s) out of {questions.length}
                </div>
                <div className="endpage-btns">
                    <Button variant="contained" size='large' color="secondary" onClick={playAgain}>Play again</Button>
                    <Button variant="contained" size='large' color="secondary" onClick={changeMode}>Change mode</Button>
                </div>
            </div>
            {loading && <Loader />}
            {error && <div>
                Error: {error}
            </div>}
        </>
    );
};

export default EndPage;
