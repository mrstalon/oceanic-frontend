import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './main-page.scss';
import httpRequest from '../../utils/promisifed-http';
import { BASE_API_URL } from '../../constants';
import { FilesSection, ResultSection } from '../../components';
import {updateFile, updatePendingFile} from '../../store/actions';
import { useSelectorOfPendingFiles } from '../../store/selectors';

const STATUS_LOADING = 'LOADING';
const STATUS_SUCCESS = 'SUCCESS';
const STATUS_ERROR = 'ERROR';

const containsError = (data) => {
    if (data.files && data.files[0] && data.files[0].sentences && data.files[0].sentences[0] && data.files[0].sentences[0].text  === 'Unknown error occurred. Try again.') {
        return true;
    }

    return false;
};

const MainPage = () => {
    const dispatch = useDispatch();

    const pendingFiles = useSelectorOfPendingFiles();

    useEffect(() => {
        pendingFiles.forEach((file) => {
            if (file.isLoaded || file.intervalId) {
                return;
            }

            const intervalId = setInterval(() => {
                httpRequest(`${BASE_API_URL}?id=${file.id}`, 'GET', null)
                    .then(({ status, text }) => {
                        if (status === STATUS_LOADING) {
                            return;
                        } else if (status === STATUS_SUCCESS && text && text.data && text.data) {
                            const data = text.data.files[0];

                            if (data && !data.sentences.length || containsError(data)) {
                                dispatch(updateFile({ id: file.fileId, isLoaded: true, error: true }));
                                clearInterval(intervalId);
                                return;
                            }

                            dispatch(updateFile({
                                id: file.fileId,
                                isLoaded: true,
                                data,
                            }));
                            clearInterval(intervalId);
                        } else if (status === STATUS_ERROR) {
                            dispatch(updateFile({ id: file.id, isLoaded: true, error: true }));
                            clearInterval(intervalId);
                        }
                    })
                    .catch((err) => {
                        dispatch(updateFile({ id: file.id, isLoaded: true, error: true }));
                        console.error(err);
                    });
            }, 1000);

            dispatch(updatePendingFile({ ...file, intervalId }));
        });
    }, [pendingFiles]);

    return (
        <div className="main-page">
            <FilesSection />
            <ResultSection />
        </div>
    );
};

export default MainPage
