import React, { useState } from 'react';

import './main-page.scss';
import { FilesSection, ResultSection } from '../../components';

const MainPage = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    return (
        <div className="main-page">
            <FilesSection files={uploadedFiles} setFiles={setUploadedFiles} />
            <ResultSection files={uploadedFiles} />
        </div>
    );
};

export default MainPage
