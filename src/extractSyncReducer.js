import isObjectLike from 'lodash/isObjectLike';
import { isSyncReducer } from './common';

const extractSyncReducer = (omodule, syncReducer = {}) => {
    let {
        reducer,
        route,
        childOmodules
    } = omodule || {};

    if (isSyncReducer(reducer)) {
        syncReducer = { ...syncReducer, ...reducer };
    }

    childOmodules = childOmodules || [];

    syncReducer = childOmodules.reduce(
        (syncReducer, omodule) => {
            return {
                ...syncReducer,
                ...extractSyncReducer(omodule, syncReducer)
            };
        },
        syncReducer
    );

    return syncReducer;
};

export default extractSyncReducer;