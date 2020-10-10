import * as types from '../types';

export const addFile = (file) => ({
    type: types.ADD_FILE,
    payload: file,
});

export const updateFile = (file) => ({
    type: types.UPDATE_FILE,
    payload: file,
});

export const addPendingFile = (file) => ({
    type: types.ADD_PENDING_FILE,
    payload: file,
});

export const updatePendingFile = (file) => ({
    type: types.UPDATE_PENDING_FILE,
    payload: file,
});
