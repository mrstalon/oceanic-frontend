import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';

import './dropzone.scss';
import { addFile, addPendingFile, updateFile, updatePendingFile } from '../../store/actions';
import { httpRequest } from '../../utils';
import { BASE_API_URL } from '../../constants';

const DropZone = () => {
    const dispatch = useDispatch();

    const onDrop = useCallback((acceptedFiles) => {
        const files = acceptedFiles.map((file, index) => {
            const id = Date.now() + index;

            return Object.assign(file, {
                id,
                isLoaded: false,
            });
        });

        files.forEach((file) => {
            dispatch(addFile(file));

            httpRequest(BASE_API_URL, 'POST', file)
                .then((data) => {
                    if (data && data.length) {
                        const id = data[0][1];

                        dispatch(addPendingFile({ fileId: file.id, id }));
                    }
                })
                .catch((err) => {
                    dispatch(updateFile({ id: file.id, error: true, isLoaded: true }));
                    console.error(err);
                })
        });
    }, [dispatch]);

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

export default DropZone;
