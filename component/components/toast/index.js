import { message } from 'antd'

//message.destroy()
message.config({
    top: window.location && window.location.href.includes('xdz') ? 30 : 0,
    stack: false,
});

const messageComponent = message
export default messageComponent
