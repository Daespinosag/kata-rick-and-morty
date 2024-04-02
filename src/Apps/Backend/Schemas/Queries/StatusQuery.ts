import { default as statusType } from '../Types/status';

const StatusQuery = {
    type: statusType,
    resolve: () => {
        return { code: 'success', name: "the server is working properly",  timesmap: new Date()};
    },
};

export default StatusQuery;