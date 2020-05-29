import ReactDom from 'react-dom';
import ttkUtils from '@ttk/utils';
import {
    Toast,
    Message
} from '@ttk/component'
/**--------------------项目工具类--------------------start--------------------**/
import MyUtil from './myUtil';

/**--------------------项目工具类--------------------end--------------------**/

// 增加初始化函数，将antd组件、ReactDom作为参数，减少ttk-utils对上述包的依赖
ttkUtils.form.init(Message);
ttkUtils.dom.init(ReactDom)
ttkUtils.fetchCors.init(Toast);
ttkUtils.fetch.init(Message);
export default {
    ...ttkUtils,
    MyUtil
}
