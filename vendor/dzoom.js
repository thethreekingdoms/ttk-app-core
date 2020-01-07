var dzoom = {
    styleRule: {
        add: function (key, value) {
            var css = document.styleSheets[document.styleSheets.length - 1];
            css.cssRules ?
                (css.insertRule(key + "{" + value + "}", css.cssRules.length)) :
                (css.addRule(key, value));
        },
        remove: function (key) {
            for (var i = 0; i < document.styleSheets.length; i++) {
                var css = document.styleSheets[i];
                css.cssRules ?
                    (function () {
                        for (var j = 0; j < css.cssRules.length; j++) {
                            if (css.cssRules[j].selectorText == key) {
                                css.deleteRule(j);
                            }
                        }
                    })() : (css.removeRule(key));
            }
        }
    },
    reset: function () {
        dzoom.styleRule.remove(".dzoom");
    },
    // the entrance
    render: function (type) {

        //dzoom.reset();

        var actionDom;
        var scrollWidth;
        var widthType;
        var newStyle = "\
            -webkit-transform:scale({scale});\
            -moz-transform:scale({scale});\
            -moz-transform-origin: 0 0;\
            -webkit-transform-origin:0 0 0;\
            ";

        if (!document.querySelectorAll(".dzoom")[0]) {
            // If no dzoom DOM trees can be automatically action on body
            actionDom = "body";
        } else {
            actionDom = ".dzoom";
            newStyle = newStyle + "overflow:auto;"
        }

        var w = parseInt(document.defaultView.getComputedStyle(document.body).width);
        if (w <= 1024) {
            dzoom.scale = 0.9;
            //document.body.style.zoom = dzoom.scale;
            dzoom.styleRule.add(actionDom, newStyle.replace("{scale}", dzoom.scale));
        }

    },
    fixed: function () {
        try {
            $.each($(".dzoom"), function () {
                var dzoom = $(this).attr("dzoom");
                var el = $(this);
                switch (dzoom) {
                    case "fixed":
                        $(function () {
                            var height = el.children().height();
                            el.height(height);
                        });
                        break;
                }
            });
        } catch (e) {

        }

    },
    init: function () {
        var evt = "onorientationchange" in window ? "orientationchange" : "resize";
        dzoom.render();
        dzoom.fixed();
        window.addEventListener(evt, function (a) {
            setTimeout(function () {
                dzoom.render();
                dzoom.fixed();
            }, 10);
        }, false);
    }
};
dzoom.init();