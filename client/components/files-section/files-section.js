import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-loader-spinner';

import DropZone from '../dropzone';
import { OKIcon } from '../icons';
import './files-section.module.scss';

const FilesSection = ({ files, setFiles }) => (
  <div className="files-section">
      <DropZone setFiles={setFiles} />

      <div className="uploaded-files">
          {files.map((file, index) => (
            <div className="uploaded-files__item" key={index}>
                <div className="uploaded-files__item-spinner">
                    {!file.isLoaded && (
                      <Spinner
                        type="Oval"
                        color="#FFFFFF"
                        height={24}
                        width={24}
                      />
                    )}
                    {file.isLoaded && (
                      <OKIcon className="uploaded-files__item-icon" />
                    )}
                </div>

                <span className="uploaded-files__item-text">{file.name}</span>
            </div>
          ))}
      </div>
  </div>
);

FilesSection.propTypes = {
    files: PropTypes.array,
    setFiles: PropTypes.func,
};

export default FilesSection;
