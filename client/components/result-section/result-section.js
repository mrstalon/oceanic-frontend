import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import './result-section.scss';

const ResultSection = ({ files }) => {
    const displayFiles = useMemo(() => files.filter((x) => x.data), [files]);

    return (
        <div className="result-section">
            <h2 className="result-section__title">Files result</h2>

            <div className="result-list">
                {displayFiles.filter((x) => x.data).map(({ data }) => {
                    if (!data || !data.name || !data.sentences) {
                        return <div/>;
                    }

                    const { name, sentences } = data;

                    return (
                      <div className="result-list__item">
                          <h4 className="result-list__item-title">{name}</h4>
                          <div className="sentences">
                              {sentences && sentences.length && sentences.map((sentence) => (
                                <div className="sentences__item">
                                    <span className="sentences__item-text">
                                        {sentence.text}
                                    </span>
                                    <span className="sentences__item-number">({sentence.confidence})</span>
                                </div>
                              ))}
                          </div>
                      </div>
                    )
                })}
            </div>
        </div>
    );
};

ResultSection.propTypes = {
    files: PropTypes.array,
};

export default ResultSection;
