{"source":"webpackJsonp([40],{684:function(e,t,r){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0}),t.default=void 0;var a,n=l(r(0)),u=l(r(9)),s=l(r(7)),c=l(r(8)),i=l(r(10)),o=l(r(11)),f=r(1),d=(l(f),r(54)),p=l(r(230));function l(e){return e&&e.__esModule?e:{default:e}}var h=(0,d.wrapper)(p.default)(a=function(e){function t(){return(0,s.default)(this,t),(0,i.default)(this,(t.__proto__||(0,u.default)(t)).apply(this,arguments))}return(0,o.default)(t,e),(0,c.default)(t,[{key:\"render\",value:function(){return this.props.monkeyKing((0,n.default)({},this.props,{path:\"root\"}))}}]),t}(f.Component))||a;t.default=h,e.exports=t.default},685:function(e,t,r){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var l=a(r(0)),h=a(r(16)),m=a(r(55)),s=a(r(56)),c=a(r(7));t.default=function(e){var t=new n.action(e),r=new u((0,l.default)({},e,{metaAction:t})),a=(0,l.default)({},t,r);return t.config({metaHandlers:a}),a};a(r(1));var n=r(54),i=r(13),o=(a(r(15)),a(r(169)));function a(e){return e&&e.__esModule?e:{default:e}}var u=function e(t){var r,a,n,u,p=this;(0,c.default)(this,e),this.onInit=function(e){var t=e.component,r=e.injections;p.component=t,p.injections=r,p.component.props.setOkListener&&p.component.props.setOkListener(p.onOk),p.component.props.id?(r.reduce(\"init\"),p.load()):r.reduce(\"init\",{typeId:p.component.props.typeId})},this.load=(0,s.default)(m.default.mark(function e(){var t;return m.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.webapi.columnDetail.findById(p.component.props.id);case 2:t=e.sent,p.injections.reduce(\"load\",t);case 4:case\"end\":return e.stop()}},e,p)})),this.onOk=(0,s.default)(m.default.mark(function e(){return m.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.save();case 2:return e.abrupt(\"return\",e.sent);case 3:case\"end\":return e.stop()}},e,p)})),this.save=(0,s.default)(m.default.mark(function e(){var t,r,a;return m.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=p.metaAction.gf(\"data.form\").toJS(),e.next=3,p.check([{path:\"data.form.caption\",value:t.caption},{path:\"data.form.fieldName\",value:t.fieldName}]);case 3:if(e.sent){e.next=6;break}return e.abrupt(\"return\",!1);case 6:if(t.isFixed=1==t.isFixed?1:0,t.isVisible=1==t.isVisible?1:0,t.isMustSelect=1==t.isMustSelect?1:0,t.isSystem=1==t.isSystem?1:0,t.id)return e.next=13,p.webapi.columnDetail.update(t);e.next=18;break;case 13:return r=e.sent,p.metaAction.toast(\"success\",\"修改成功\"),e.abrupt(\"return\",r);case 18:return e.next=20,p.webapi.columnDetail.create({form:t,typeId:p.component.props.typeId});case 20:return a=e.sent,p.metaAction.toast(\"success\",\"新增成功\"),e.abrupt(\"return\",a);case 23:case\"end\":return e.stop()}},e,p)})),this.fieldChange=(r=(0,s.default)(m.default.mark(function e(t,r){return m.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.check([{path:t,value:r}]);case 2:case\"end\":return e.stop()}},e,p)})),function(e,t){return r.apply(this,arguments)}),this.check=(a=(0,s.default)(m.default.mark(function e(t){var r,a,n,u,s,c,i,o,f,d;return m.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt(\"return\");case 2:r=[],n=!(a=!0),u=void 0,e.prev=6,s=(0,h.default)(t);case 8:if(a=(c=s.next()).done){e.next=31;break}if(i=c.value,o=(0,l.default)({},i),\"data.form.caption\"==i.path)return e.t0=l.default,e.t1=o,e.next=16,p.checkName(i.value);e.next=20;break;case 16:e.t2=e.sent,(0,e.t0)(e.t1,e.t2),e.next=27;break;case 20:if(\"data.form.fieldName\"==i.path)return e.t3=l.default,e.t4=o,e.next=25,p.checkCode(i.value);e.next=27;break;case 25:e.t5=e.sent,(0,e.t3)(e.t4,e.t5);case 27:r.push(o);case 28:a=!0,e.next=8;break;case 31:e.next=37;break;case 33:e.prev=33,e.t6=e.catch(6),n=!0,u=e.t6;case 37:e.prev=37,e.prev=38,!a&&s.return&&s.return();case 40:if(e.prev=40,n)throw u;e.next=43;break;case 43:return e.finish(40);case 44:return e.finish(37);case 45:return f={},d=!0,r.forEach(function(e){f[e.path]=e.value,f[e.errorPath]=e.message,e.message&&(d=!1)}),p.metaAction.sfs(f),e.abrupt(\"return\",d);case 50:case\"end\":return e.stop()}},e,p,[[6,33,37,45],[38,,40,44]])})),function(e){return a.apply(this,arguments)}),this.checkCode=(n=(0,s.default)(m.default.mark(function e(t){var r;return m.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t||(r=\"请录入编码\"),e.abrupt(\"return\",{errorPath:\"data.other.error.fieldName\",message:r});case 2:case\"end\":return e.stop()}},e,p)})),function(e){return n.apply(this,arguments)}),this.checkName=(u=(0,s.default)(m.default.mark(function e(t){var r;return m.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t||(r=\"请录入名称\"),e.abrupt(\"return\",{errorPath:\"data.other.error.caption\",message:r});case 2:case\"end\":return e.stop()}},e,p)})),function(e){return u.apply(this,arguments)}),this.fieldTypeFocus=(0,s.default)(m.default.mark(function e(){var t;return m.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.webapi.enum.query({enumId:\"3336424919598080\"});case 2:t=e.sent,p.metaAction.sf(\"data.other.fieldTypes\",(0,i.fromJS)(t));case 4:case\"end\":return e.stop()}},e,p)})),this.alignTypeFocus=(0,s.default)(m.default.mark(function e(){var t;return m.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.webapi.enum.query({enumId:\"3336429580387328\"});case 2:t=e.sent,p.metaAction.sf(\"data.other.alignTypes\",(0,i.fromJS)(t));case 4:case\"end\":return e.stop()}},e,p)})),this.orderModeFocus=(0,s.default)(m.default.mark(function e(){var t;return m.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.webapi.enum.query({enumId:\"3336433541776384\"});case 2:t=e.sent,p.metaAction.sf(\"data.other.orderModes\",(0,i.fromJS)(t));case 4:case\"end\":return e.stop()}},e,p)})),this.metaAction=t.metaAction,this.config=o.default.current,this.webapi=this.config.webapi};e.exports=t.default},686:function(e,t,r){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var a,n,u=f(r(0)),s=f(r(7));t.default=function(e){var t=new i.reducer(e),r=new d((0,u.default)({},e,{metaReducer:t}));return(0,u.default)({},t,r)};var c=r(13),i=r(54),o=(f(r(169)),f(r(15)),r(231));function f(e){return e&&e.__esModule?e:{default:e}}var d=(a=function e(t){(0,s.default)(this,e),n.call(this),this.metaReducer=t.metaReducer},n=function(){var a=this;this.init=function(e,t){var r=(0,o.getInitState)();return t&&t.typeId&&(r.data.form.columnId=t.typeId),a.metaReducer.init(e,r)},this.load=function(e,t){return a.metaReducer.sf(e,\"data.form\",(0,c.fromJS)(t))}},a);e.exports=t.default}});"}