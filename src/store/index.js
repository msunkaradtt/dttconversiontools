import { proxy } from 'valtio'

const state = proxy({
    conversion_srv_res: {},
    isChecking: false,
    isPending: false,
});

export default state;