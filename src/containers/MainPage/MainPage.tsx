import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./MainPage.scss";
import { RootState } from "../../store";
import { Data, getData, setData } from "../../store/features/data";
import { useAppDispatch } from "../../utils/hooks";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

const MainPath = () => {
    const { data, loading, error } = useSelector((state: RootState) => state.data);
    const [dataObj, setDataObj] = useState<Data>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getData());
    }, [dispatch])

    useEffect(() => {
        data && setDataObj(data);
    }, [data])

    const changeData = (isSum = true): void => {
        if (dataObj?.numberData) {
            const newNum = isSum ? dataObj.numberData + 1 : dataObj.numberData - 1;
            dispatch(setData({ ...dataObj, numberData: newNum }));
        }
    }

    return (
        <>
            <div className="main-container">
                <div>{dataObj?.stringData}</div>
                <div className="number-container">
                    <button className="basic-btn" onClick={() => changeData()}>+</button>
                    <div>{dataObj?.numberData}</div>
                    <button className="basic-btn" onClick={() => changeData(false)}>-</button>
                </div>
            </div>
            {loading && <Loader />}
            {error && <div>
                Error: {error}
            </div>}
        </>
    );
};

export default MainPath;
