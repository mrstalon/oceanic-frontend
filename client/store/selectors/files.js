import get from 'lodash/get';
import { useSelector } from 'react-redux';

export const useSelectorOfFiles = () => useSelector(state => get(state, `files.files`));

export const useSelectorOfPendingFiles = () => useSelector(state => get(state, `files.pendingFiles`));
