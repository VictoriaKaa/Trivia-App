import { useSelector } from "react-redux";
import "./MainPage.scss";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { Button } from "@mui/material";

const MainPath = () => {
    const { loading, error } = useSelector((state: RootState) => state.trivia);
    const navigate = useNavigate();

    const navigateToGame = (): void => {
        navigate('/settings');
    }

    return (
        <div>
            <div className="main-container">
                <Button variant="contained" onClick={navigateToGame}>Start Trivia Quiz</Button>
                <div className="main-container-description">Select mode and answer questions to earn score</div>
            </div>
            {loading && <Loader />}
            {error && <div>
                Error: {error}
            </div>}
        </div>
    );
};

export default MainPath;
