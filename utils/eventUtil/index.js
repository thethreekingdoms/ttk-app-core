const EventUtil = {

    addHandler: function (element, type, handler) {
        if (element.addEventListener) {        //DOM2级
            element.addEventListener(type, handler, false);

        } else if (element.attachEvent) {      //DOM1级
            element.attachEvent("on" + type, handler);

        } else {
            element["on" + type] = handler;    //DOM0级
        }
    },

    removeHandler: function (element, type, handler) {   //类似addHandler

        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);

        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);

        } else {
            element["on" + type] = null;

        }
    }
}

export default EventUtil