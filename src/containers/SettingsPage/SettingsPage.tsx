import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./SettingsPage.scss";
import { RootState } from "../../store";
import { useAppDispatch } from "../../utils/hooks";
import { Loader } from "../../components/Loader/Loader";
import SettingsComponent from "../../components/SettingsComponent/SettingsComponent";
import { getCategories, setMode } from "../../store/features/triviaData";

const SettingsPage = () => {
    const { categories, mode, loading, error } = useSelector((state: RootState) => state.trivia);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const dispatchMode = (modeName: string, item: string | number): void => {
        const newMode = { ...mode };
        (newMode as any)[modeName] = item;
        dispatch(setMode(newMode));
    }

    return (
        <>
            <div className="main-container settings-container">
                <div className="settings-container-title">Choose mode:</div>
                <SettingsComponent categories={categories} dispatchMode={dispatchMode} mode={mode} />
            </div>
            {loading && <Loader />}
            {error && <div>
                Error: {error}
            </div>}
        </>
    );
};

export default SettingsPage;
