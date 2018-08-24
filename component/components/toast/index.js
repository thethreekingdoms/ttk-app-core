import { message } from 'antd'

//message.destroy()
message.config({
    top: 0,
    stack: false,
});

const messageComponent = message
export default messageComponent