import { useEffect } from 'react';
import { getTriviaToken, setTriviaToken } from '../../store/features/triviaData';
import { useAppDispatch } from '../../utils/hooks';
import { getValidTokens } from '../../utils/cookies';


const withToken = (WrappedComponent: any) => {
    const WithToken = (props: any) => {
        const dispatch = useAppDispatch();

        const { token } = getValidTokens();

        useEffect(() => {
            if (!token) {
                dispatch(getTriviaToken());
            } else {
                dispatch(setTriviaToken(token));
            }
        }, [token]);


        return <WrappedComponent {...props} />;
    };

    return WithToken;
};

export default withToken;