import { ComponentType, useEffect } from 'react';
import { getTriviaToken, setTriviaToken } from '../../store/features/triviaData';
import { useAppDispatch } from '../../utils/hooks';
import { getValidTokens } from '../../utils/cookies';


function withToken<TProps extends object> (WrappedComponent: ComponentType<TProps>) {
    const WithToken = (props: TProps) => {
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