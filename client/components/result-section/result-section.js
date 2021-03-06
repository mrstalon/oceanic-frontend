import React, { useMemo } from 'react';

import './result-section.scss';
import Table from '../table';
import { useSelectorOfFiles } from '../../store/selectors';

const ResultSection = () => {
    const files = useSelectorOfFiles();

    const displayFiles = useMemo(() => files.filter((x) => x.data), [files]);

    return (
        <div className="result-section">
            <h2 className="result-section__title">Files result</h2>

            <div className="result-list">
                {displayFiles.filter((x) => x.data).map(({ data, error }) => {
                    if (!data || !data.name || !data.sentences || error) {
                        return <div/>;
                    }

                    const { name, sentences } = data;

                    return (
                      <div className="result-list__item">
                          <h4 className="result-list__item-title">{name}</h4>
                          <div className="sentences">
                              {!!(sentences && sentences.length) && <Table data={sentences} />}
                          </div>
                      </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ResultSection;
