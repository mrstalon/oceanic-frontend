import React from 'react';
import cn from 'classnames';
import Spinner from 'react-loader-spinner';

import DropZone from '../dropzone';
import { OKIcon, CrossIcon } from '../icons';
import './files-section.module.scss';
import { useSelectorOfFiles } from '../../store/selectors';

const FilesSection = () => {
    const files = useSelectorOfFiles();

    return (
      <div className="files-section">
          <DropZone />

          <div className="uploaded-files">
              {files.map((file, index) => (
                <div
                  className={cn('uploaded-files__item', {
                      'uploaded-files__item--loading': !file.isLoaded,
                      'uploaded-files__item--success': file.isLoaded && !file.error,
                      'uploaded-files__item--error': file.isLoaded && file.error,
                  })}
                  key={index}
                >
                    <div className="uploaded-files__item-spinner">
                        {!file.isLoaded && (
                          <Spinner
                            type="Oval"
                            color="#FFFFFF"
                            height={24}
                            width={24}
                          />
                        )}
                        {file.isLoaded && !file.error && (
                          <OKIcon className="uploaded-files__item-icon" />
                        )}
                        {file.isLoaded && file.error && (
                          <CrossIcon className="uploaded-files__item-icon" />
                        )}
                    </div>

                    <span className="uploaded-files__item-text">{file.name}</span>
                </div>
              ))}
          </div>
      </div>
    );
};

export default FilesSection;
