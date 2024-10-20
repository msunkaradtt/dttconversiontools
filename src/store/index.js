import { proxy } from 'valtio'

const state = proxy({
    conversion_srv_res: {},
    isChecking: false,
    totalFiles: 0,
    isTotalUpdated: false
});

export default state;