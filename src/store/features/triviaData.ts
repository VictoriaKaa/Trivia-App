import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTriviaCategories, fetchTriviaQuestions, fetchTriviaToken } from "./triviaDataAPI";
import { setTriviaCookie } from "../../utils/cookies";


export interface Category {
    id: number;
    name: string;
}

export interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface TriviaMode {
    category: number;
    type: string;
    difficulty: string;
}

export interface TriviaDataState {
    token: string;
    questions: Question[];
    mode: TriviaMode;
    categories: Category[];
    score: number;
    loading: boolean;
    error: string;
}

const initialDataState: TriviaDataState = {
    token: '',
    questions: [] as Question[],
    mode: { category: 0, type: 'boolean', difficulty: 'easy' },
    categories: [],
    score: 0,
    loading: false,
    error: ''
}

const triviaSlice = createSlice({
    initialState: initialDataState,
    name: "trivia",
    reducers: {
        setQuestions: (state: TriviaDataState, action) => {
            state.questions = [...action.payload];
        },
        setCategories: (state: TriviaDataState, action) => {
            state.categories = [...action.payload];
        },
        setMode: (state: TriviaDataState, action) => {
            state.mode = { ...action.payload };
        },
        setFinalScore: (state: TriviaDataState, action) => {
            state.score = action.payload;
        },
        setTriviaToken: (state: TriviaDataState, action) => {
            state.token = action.payload;
        },
        setLoading: (state: TriviaDataState, action) => {
            state.loading = action.payload;
        },
        setError: (state: TriviaDataState, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTriviaQuestions.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getTriviaQuestions.fulfilled, (state, action) => {
                state.questions = [...action.payload.results];
                state.loading = false;
            })
            .addCase(getTriviaQuestions.rejected, (state, action) => {
                setError(action.error);
                state.loading = false;
            })
            .addCase(getCategories.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = [...action.payload.trivia_categories];
                state.loading = false;
            })
            .addCase(getCategories.rejected, (state, action) => {
                setError(action.error);
                state.loading = false;
            })
            .addCase(getTriviaToken.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getTriviaToken.fulfilled, (state, action) => {
                state.token = action.payload.token;
                setTriviaCookie(action.payload.token, 'trivia_token');
                state.loading = false;
            })
            .addCase(getTriviaToken.rejected, (state, action) => {
                setError(action.error);
                state.loading = false;
            })
    },
});

export const { setQuestions, setCategories, setMode, setFinalScore, setTriviaToken, setLoading, setError } = triviaSlice.actions;

export const getCategories = createAsyncThunk(
    'data/fetchTriviaCategories',
    async () => {
        const response = await fetchTriviaCategories();
        return response.data;
    }
)

export const getTriviaToken = createAsyncThunk(
    'data/fetchTriviaToken',
    async () => {
        const response = await fetchTriviaToken();
        return response.data;
    }
)

export const getTriviaQuestions = createAsyncThunk(
    'data/fetchTriviaQuestions',
    async (val: string, { getState }) => {
        const mode = (getState() as any).trivia.mode;
        const token = (getState() as any).trivia.token;
        const response = await fetchTriviaQuestions(mode, token);
        return response.data;
    }
)

export default triviaSlice.reducer;
