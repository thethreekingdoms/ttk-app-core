import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'


class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }


    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')
        this.onLoad(component, injections)
    }


    onLoad = (component, injections) => {
        //客服组编号（由在线客服提供）
        let groupNo = component.props.groupNo || "10341037";
        //易号码，如果是匿名则使用anyone，如果是实名则改成自己实名的易号码
        let eno = component.props.eno || "anyone";
        let thirdPartySession = component.props.thirdPartySession || "123";
        //控制只能打开一个在线客服的咨询窗口
        let openIndex = 0;
        //关闭页面索引
        let closeIndex;
        let eventListener;
        //页面初始化函数	
        $(function () {
            if (window.addEventListener) {
                $('#starConversation').html('点我咨询')
                $('#starConversation').attr('class', 'ttk-edf-app-im-chat')
                $('#starConversation').click(function () {
                    onclickZxkf()
                })
                window.addEventListener('message', eventListener = function (e) {
                    let user = JSON.parse(e.data);
                    let openUrl = user.url;
                    switch (user.method) {
                        case "closeLayer":
                            layer.closeAll();
                            break;
                        case "closeAllLayer":
                            layer.closeAll();
                            break;
                        case "openNav":
                            layer.closeAll();
                            onclickZxkf();
                            break;
                        case "layerMessageAction":
                            layerMessageAction(openUrl);
                            break;
                        case "closeLayerByIndex":
                            layer.close(closeIndex);
                            break;
                    }
                }, false);
            } else if (window.attachEvent) {
                window.attachEvent("onmessage", eventListener = function (e) {
                    let user = JSON.parse(e.data);
                });
            }
        })
        this.eventListener = eventListener;

        //在线客服弹窗方法
        function onclickZxkf() {
            openIndex = openIndex + 1;

            if (openIndex > 1) {
                layer.msg("只能发起一个会话");
                openIndex--;
            } else {
                //聊天界面url——测试环境地址
                let url = 'http://119.29.162.83:8082/Web/Im/Gz/Index.html?groupNo=' + groupNo + '&eno=' + eno + '&thirdPartySession=' + thirdPartySession;
                //生产环境地址
                //let url = 'http://ecm.esv.com.cn/custom/web/Index.html?groupNo='+groupNo+'&eno='+eno+'&thirdPartySession='+thirdPartySession;
                layer.open({
                    type: 2,
                    title: ' ',
                    shadeClose: true,
                    shade: false,
                    maxmin: false, //开启最大化最小化按钮
                    area: ['600px', '556px'],
                    offset: 'rb',
                    content: [url, 'no'],//传入要调用的url
                    end: function () {           //关闭弹出层触发
                        openIndex--;
                    }
                });
            }
        }

        //留言和查看留言回复弹窗方法
        function layerMessageAction(url) {
            let title = "";
            if (url.indexOf("msgManage.do") != -1) {
                title = "请您留言";
            } else if (url.indexOf("msgReply.do") != -1) {
                title = "查看留言回复";
            } else if (url.indexOf("eval.do") != -1) {
                title = "评价";
            }
            closeIndex = layer.open({
                type: 2,
                title: title,
                shadeClose: true,
                shade: false,
                maxmin: false, //开启最大化最小化按钮
                area: ['600px', '556px'],
                offset: 'r',
                move: false,
                content: [url] //传入要调用的url
            });
        }

    }

    componentWillUnmount = () => {
        if (window.removeEventListener) {
            $('#starConversation').unbind();
            window.removeEventListener('message', this.eventListener);
        } else if (window.detachEvent) {
            window.detachEvent("onmessage", this.eventListener);
        }
    }

    render = () => {

    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}

