import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import './dropzone.scss';
import { httpRequest } from '../../utils';
import { BASE_API_URL } from '../../constants';

const containsError = (data) => {
    if (data.files && data.files[0] && data.files[0].sentences && data.files[0].sentences[0] && data.files[0].sentences[0].text  === 'Unknown error occurred. Try again.') {
        return true;
    }

    return false;
};

const DropZone = ({ setFiles }) => {
    const fetchAPI = useCallback((file) => {
        setFiles((state) => [...state, file]);

        httpRequest(BASE_API_URL, 'POST', file)
            .then((data) => {
                if (data && data.files && data.files.length) {
                    setFiles((state) => {
                        const newState = [...state];
                        const targetId = newState.findIndex((x) => x.id === file.id);

                        newState[targetId].data = data.files[0];

                        if (!data.files[0] || data.files[0] && data.files[0].sentences && !data.files[0].sentences.length || containsError(data)) {
                            newState[targetId].error = true;
                        }

                        return newState;
                    });
                }
            })
            .catch(() => {
                setFiles((state) => {
                    const newState = [...state];
                    const targetId = newState.findIndex((x) => x.id === file.id);

                    newState[targetId].error = true;

                    return newState;
                });
            })
            .finally(() => {
                setFiles((state) => {
                    const newState = [...state];
                    const targetId = newState.findIndex((x) => x.id === file.id);

                    newState[targetId].isLoaded = true;

                    return newState;
                });
            });
    }, [setFiles]);

    const onDrop = useCallback((acceptedFiles) => {
        const files = acceptedFiles.map((file, index) => {
            const id = Date.now() + index;

            return Object.assign(file, {
                id,
                isLoaded: false,
            });
        });

        files.forEach((file) => {
            fetchAPI(file);
        });
    }, [setFiles, fetchAPI]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
      <div className="dropzone-wrap">
          <h3 className="dropzone-wrap__title">Upload Audio file</h3>
          <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              {
                  isDragActive ?
                    <p className="dropzone__text">Drop the files here ...</p> :
                    <p className="dropzone__text">Drag 'n' drop some files here, or click to select files</p>
              }
          </div>
      </div>
    );
};

DropZone.propTypes = {
    setFiles: PropTypes.func,
};

export default DropZone;
