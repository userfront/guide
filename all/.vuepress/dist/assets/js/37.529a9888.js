(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{600:function(t,e,n){"use strict";n.r(e);var s=n(15),u=(n(72),n(12),{data:function(){return{statusJson:{}}},computed:{page:function(){return this.statusJson.page||{}},updatedAt:function(){return this.page.updated_at},status:function(){return this.statusJson.status||{}}},mounted:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://6l1p2zsxpnvz.statuspage.io/api/v2/summary.json");case 2:return n=e.sent,e.next=5,n.json();case 5:t.statusJson=e.sent;case 6:case"end":return e.stop()}}),e)})))()}}),a=n(39),r=Object(a.a)(u,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p",[t._v(t._s(t.status.description))]),t._v(" "),n("pre",[n("code",[t._v(t._s(t.status))])]),t._v(" "),n("p",[t._v("Last updated "+t._s(t.updatedAt))])])}),[],!1,null,null,null);e.default=r.exports}}]);