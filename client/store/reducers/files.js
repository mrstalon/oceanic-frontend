import { createReducer } from '../../utils';
import * as types from '../types';

const initialState = {
    files: [],
    pendingFiles: [],
};


const filesReducer = createReducer(initialState, {
    [types.ADD_FILE]: (state, action) => ({
        ...state,
        files: [...state.files, action.payload],
    }),
    [types.ADD_PENDING_FILE]: (state, action) => ({
        ...state,
        pendingFiles: [...state.pendingFiles, action.payload],
    }),
    [types.UPDATE_FILE]: (state, action) => {
        const { files } = state;

        const newFiles = [...files];
        const targetFileIndex = newFiles.findIndex((x) => x.id === action.payload.id);

        if (targetFileIndex === -1) {
            return state;
        }

        newFiles[targetFileIndex] = Object.assign(newFiles[targetFileIndex], {
            ...action.payload
        });

        return {
            ...state,
            files: newFiles
        };
    },
    [types.UPDATE_PENDING_FILE]: (state, action) => {
        const { pendingFiles } = state;

        const newPendingFiles = [...pendingFiles];
        const targetFileIndex = newPendingFiles.findIndex((x) => x.id === action.payload.id);

        if (!targetFileIndex) {
            return state;
        }

        newPendingFiles[targetFileIndex] = Object.assign(newPendingFiles[targetFileIndex], {
            ...action.payload,
        });

        return {
            ...state,
            pendingFiles: newPendingFiles
        };
    },
});

export default filesReducer;
