import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./dataAPI";

export interface Data {
    stringData: string;
    numberData: number;
    booleanData: boolean;
}

export interface DataState {
    data: Data;
    loading: boolean;
    error: string;
}

const initialDataState: DataState = {
    data: {} as Data,
    loading: false,
    error: ''
}

const dataSlice = createSlice({
    initialState: initialDataState,
    name: "questions",
    reducers: {
        setData: (state: DataState, action) => {
            state.data = {...action.payload};
        },
        setLoading: (state: DataState, action) => {
            state.loading = action.payload;
        },
        setError: (state: DataState, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.data = {...action.payload};
                state.loading = false;
            })
            .addCase(getData.rejected, (state, action) => {
                setError(action.error);
                state.loading = false;
            })
    },
});

export const { setData, setLoading, setError } = dataSlice.actions;

export const getData = createAsyncThunk(
    'data/fetchData',
    async () => {
        const response = await fetchData();
        return response.data;
    }
)

export default dataSlice.reducer;
