(this["webpackJsonpreact-memory-game"]=this["webpackJsonpreact-memory-game"]||[]).push([[0],{100:function(e,t,n){},101:function(e,t,n){},102:function(e,t,n){},103:function(e,t,n){},114:function(e,t,n){},115:function(e,t,n){},116:function(e,t,n){},117:function(e,t,n){},118:function(e,t,n){},119:function(e,t,n){},120:function(e,t,n){},121:function(e,t,n){},125:function(e,t,n){},126:function(e,t,n){},127:function(e,t,n){},128:function(e,t,n){},129:function(e,t,n){},130:function(e,t,n){},131:function(e,t,n){"use strict";n.r(t);var a=n(6),c=n.n(a),i=(n(63),n(8)),r=n(4),o=n(3),s=n(0),l=n(49),d=n.n(l),u=n(28),m=n.n(u),j=n(50),b=n.n(j),f={small:[{cells:8,rows:2},{cells:12,rows:3}],medium:[{cells:16,rows:4},{cells:20,rows:4}],large:[{cells:24,rows:4}]},p=f.medium[0],h=n.p+"static/media/a2.7fe6cf42.png",O=n.p+"static/media/a20.b1075517.png",g=[{name:"pikachu",imagePath:h,selected:!0},{name:"bulba",imagePath:n.p+"static/media/a21.ed0a4cc0.png",selected:!0},{name:"ivy",imagePath:n.p+"static/media/a22.5323f618.png",selected:!0},{name:"venus",imagePath:O,selected:!0},{name:"charmander",imagePath:n.p+"static/media/a18.24c3ea0f.png",selected:!0},{name:"charmeleon",imagePath:n.p+"static/media/a19.4269b522.png",selected:!0},{name:"charizard",imagePath:n.p+"static/media/a17.0cd17cde.png",selected:!0},{name:"squirtle",imagePath:n.p+"static/media/a15.6c9011c3.png",selected:!0},{name:"wartoitle",imagePath:n.p+"static/media/a16.aeffa13c.png",selected:!0},{name:"blastoise",imagePath:n.p+"static/media/a14.0c0bdebe.png",selected:!0},{name:"weedle",imagePath:n.p+"static/media/a11.d8b23e9b.png",selected:!0},{name:"butterfree",imagePath:n.p+"static/media/a12.05a2d713.png",selected:!0}],v={boardSize:p.cells,boardRows:p.rows,cardItems:g,stepsLimit:0,randomizeCells:!1},x=n(2),k=n.n(x),w=(n(98),n(1)),N=function(e){var t=e.cell,n=e.onCellClick;return t?Object(w.jsxs)("div",{className:k()("board-cell",{opened:t.opened,guessed:t.guessed}),onClick:function(){return t.opened?null:n(t)},children:[Object(w.jsx)("div",{className:"cell-preview cell-preview-front"}),Object(w.jsx)("div",{className:"cell-preview cell-preview-back",children:Object(w.jsx)("img",{className:"cell-image",src:t.imagePath,alt:t.name})})]},t.id):null},y=(n(100),function(e){var t=e.board,n=e.rows,a=e.onCellClick,c=function(e,t){if(!e||!e.length)return[];for(var n=Object(i.a)(e),a=[],c=t;c>0;c--)a.push(n.splice(0,Math.ceil(n.length/c)));return a}(t,n);return Object(w.jsx)("div",{className:"board-grid",children:c.map((function(e,t){return Object(w.jsx)("div",{className:"board-row",children:e.map((function(e){return Object(w.jsx)(N,{cell:e,onCellClick:a},e.id)}))},t)}))})}),C=Object(s.memo)(y),S=(n(101),function(e){var t=e.type,n=e.children;return Object(w.jsx)("p",{className:"message ".concat(t),children:n})}),T=(n(102),function(e){var t=e.attempts,n=e.options,a=e.guessedCount,c=n.stepsLimit,i=n.randomizeCells,r=n.boardSize-a;return Object(w.jsxs)("div",{className:"points-board",children:[Object(w.jsxs)("p",{className:"board-row",children:["Attempts: ",t]}),Object(w.jsxs)("p",{className:"board-row",children:["Cells left: ",r]}),!!c&&Object(w.jsxs)("p",{className:"board-row",children:["Steps limit: ",Object(w.jsx)("span",{className:"highlight",children:c-t})," attempt(s) left"]}),i&&Object(w.jsxs)("p",{className:"board-row",children:["Randomize cells: ",Object(w.jsx)("span",{className:"highlight",children:"on"})]})]})}),E=(n(103),function(e){var t=e.winner,n=e.onNewGame;return Object(w.jsxs)("div",{className:"game-over",children:[Object(w.jsxs)("p",{children:["You ",t?"won":"lost"," the game."]}),Object(w.jsx)("button",{className:"btn game-over-btn",onClick:n,children:"New Game"})]})}),z=n.p+"static/media/Dion_Theme.7cb4e7b6.mp3",L=n.p+"static/media/Hunter_Village_Theme.d0b77f68.mp3",P=n.p+"static/media/After_The_Storm.dc412311.mp3",_=n.p+"static/media/Battle_Theme_3.c29088cf.mp3",R=n.p+"static/media/Crossroad_At_Dawn.6d0a3ea3.mp3",V=n.p+"static/media/Elven_Village_Theme.b4e64d64.mp3",M=n.p+"static/media/Floran_Theme.ad0c6ff4.mp3",U=n.p+"static/media/Giran_Theme.6eec5e60.mp3",A=n.p+"static/media/The_Enemy_Warlord_Appears.a83ebf82.mp3",D=n.p+"static/media/Tragic_Love.1c3020d0.mp3",I=n.p+"static/media/logo.edf3c368.png",F=[{id:1,name:"Dion Theme",key:"dion-theme",src:z,icon:I},{id:2,name:"Hunter Village Theme",key:"hunter-village-theme",src:L,icon:I},{id:3,name:"After The Storm",key:"after-the-storm",src:P,icon:I},{id:4,name:"Battle Theme 3",key:"battle-theme-3",src:_,icon:I},{id:5,name:"Crossroad At Dawn",key:"crossroad-at-dawn",src:R,icon:I},{id:6,name:"Elven Village Theme",key:"elven-village-theme",src:V,icon:I},{id:7,name:"Floran Theme",key:"floran-theme",src:M,icon:I},{id:8,name:"Giran Theme",key:"giran-theme",src:U,icon:I},{id:9,name:"The Enemy Warlord Appears",key:"the-enemy-warlord-appears",src:A,icon:I},{id:10,name:"Tragic Love",key:"tragic-love",src:D,icon:I}],B={duration:0,played:0,seeking:!1,playing:!1,looping:!1,muted:!1,volume:10},W=n(51),G=n.n(W),H=n(52),Y=n.n(H),J=Object(s.forwardRef)((function(e,t){var n=e.playbackState,a=e.activeTrack,c=e.onDuration,i=e.onProgress,r=e.onEnded;if(!a||!n)return null;var o=n.playing,s=n.looping,l=n.muted,d=n.volume;return Object(w.jsx)(Y.a,{ref:t,playing:o,loop:s,volume:l?0:d/100,url:a.src,muted:l,onDuration:c,onProgress:i,onEnded:r,width:"100%",height:"0px"})})),q=n(11),$=n(18),K=n(57),Q=n.n(K);n(114);Q()($);var X=q.a.createSliderWithTooltip(q.a),Z=function(e){return $.duration(e,"seconds").format("m:ss",{trim:!1})},ee=function(e){var t=e.playbackState,n=e.onSeekMouseDown,a=e.onSeekChange,c=e.onSeekMouseUp,i=t.duration,r=t.played;return Object(w.jsxs)("div",{className:"track-progress",children:[Object(w.jsxs)("div",{className:"track-progress-time",children:[Object(w.jsx)("time",{children:Z(i*r)}),Object(w.jsx)("time",{children:!!i&&Z(i)})]}),Object(w.jsx)(X,{className:"track-progress-seek",min:0,max:100,value:Math.round(100*r),tipFormatter:function(){return Z(i*r)},onBeforeChange:n,onChange:a,onAfterChange:c})]})},te=(n(115),function(e){var t=e.playbackState,n=e.onVolumeChange,a=e.onVolumeToggle,c=t.muted,i=t.volume;return Object(w.jsxs)("div",{className:"volume-control",children:[Object(w.jsx)("div",{className:"volume-control-slider",children:Object(w.jsx)(q.a,{vertical:!0,min:0,max:100,value:c?0:i,onChange:n})}),Object(w.jsx)("i",{className:"icon fa-fw fa fa-volume-".concat(c?"off":"up"),onClick:a,"aria-hidden":"true"})]})}),ne=(n(116),function(e){var t=e.playbackState,n=e.randomize,a=e.onRandomizeToggle,c=e.onLoopingToggle,i=e.onVolumeChange,r=e.onVolumeToggle,o=t.looping;return Object(w.jsxs)("div",{className:"track-controls",children:[Object(w.jsx)("i",{className:k()("icon fa fa-random",{active:n}),onClick:a,"aria-hidden":"true"}),Object(w.jsx)("i",{className:k()("icon fa fa-repeat",{active:o}),onClick:c,"aria-hidden":"true"}),Object(w.jsx)(te,{playbackState:t,onVolumeChange:i,onVolumeToggle:r})]})}),ae=(n(117),function(e){var t=e.playbackState,n=e.activeTrack,a=e.onToggleTrack,c=e.onTrackMove,i=e.children;if(!n)return null;var r=t.playing,o=n.name,s=n.icon;return Object(w.jsxs)("div",{className:"track-preview",children:[Object(w.jsx)("img",{className:"track-preview-icon",src:s,alt:"track preview icon"}),Object(w.jsxs)("div",{className:"track-preview-controls",children:[Object(w.jsx)("i",{className:"icon fa fa-fw fa-".concat(r?"pause":"play"),onClick:function(){return a(n)},"aria-hidden":"true"}),Object(w.jsx)("i",{className:"icon fa fa-step-backward",onClick:function(){return c()},"aria-hidden":"true"}),Object(w.jsx)("i",{className:"icon fa fa-step-forward",onClick:function(){return c(!0)},"aria-hidden":"true"})]}),Object(w.jsx)("div",{className:"track-title ellipsis",children:o}),i]})}),ce=function(e){var t=e.tracks,n=e.activeTrack,a=e.playbackState,c=e.updatePlaybackState,i=e.onChangeTrack,r=Object(s.useRef)(null),l=Object(s.useState)(!1),d=Object(o.a)(l,2),u=d[0],m=d[1],j=function(e){var a=t.findIndex((function(e){return e.id===n.id})),r=0;r=e?a<t.length-1?a+1:0:0!==a?a-1:t.length-1,i(t[r]),c({duration:0,played:0})};return Object(w.jsxs)("div",{className:"playlist-player",children:[Object(w.jsx)(ae,{playbackState:a,activeTrack:n,onToggleTrack:function(e){n.id===e.id&&c({playing:!a.playing})},onTrackMove:j,children:Object(w.jsx)(ne,{playbackState:a,randomize:u,onRandomizeToggle:function(){m((function(e){return!e})),c({looping:!1})},onLoopingToggle:function(){m(!1),c({looping:!a.looping})},onVolumeChange:function(e){c({volume:e,muted:0===e})},onVolumeToggle:function(){c({muted:!a.muted})}})}),Object(w.jsx)(ee,{playbackState:a,onSeekMouseDown:function(){c({seeking:!0})},onSeekChange:function(e){c({played:e/100})},onSeekMouseUp:function(e){var t;null===r||void 0===r||null===(t=r.current)||void 0===t||t.seekTo(e/100),c({seeking:!1})}}),Object(w.jsx)(J,{ref:r,playbackState:a,activeTrack:n,onDuration:function(e){c({duration:e})},onProgress:function(e){var t=e.played;a.seeking||c({played:t})},onEnded:function(){var e=a.looping;if(u){var c=t.filter((function(e){return e.id!==n.id})),r=G()(c);i(r)}else e||j(!0)}})]})},ie=(n(118),function(e){var t=e.tracks,n=e.activeTrack,a=e.playbackState,c=e.onChangeTrack,i=function(e){return a.playing&&n.id===e.id};return Object(w.jsx)("ul",{className:"tracks-list",children:t.map((function(e){return Object(w.jsxs)("li",{className:k()("track pointer",{active:n.id===e.id}),onClick:function(){return c(e)},children:[Object(w.jsx)("i",{className:k()("icon fa fa-fw","fa-".concat(i(e)?"pause":"play")),"aria-hidden":"true"}),Object(w.jsx)("span",{className:"track-name",children:e.name})]},e.id)}))})}),re=n(10);var oe=function(e,t){Object(s.useEffect)((function(){var n=function(n){var a=null===e||void 0===e?void 0:e.current;a&&!a.contains(n.target)&&t(n)};return document.addEventListener("mousedown",n),document.addEventListener("touchstart",n),function(){document.removeEventListener("mousedown",n),document.removeEventListener("touchstart",n)}}),[e,t])},se=(n(119),function(e){var t=e.targetRef,n=e.callback;return oe(t,n),null}),le=function(e){var t,n=e.opened,a=e.position,c=e.blackout,i=e.children,r=e.onClose,o=e.preventClose,l=e.closeOutside,d=Object(s.useRef)(null);return Object(w.jsxs)("div",{className:k()("drawer",(t={opened:n,blackout:c},Object(re.a)(t,a,!0),Object(re.a)(t,"prevent-close",o),t)),children:[Object(w.jsx)("div",{className:"drawer-blackout"}),l&&!o&&Object(w.jsx)(se,{targetRef:d,callback:r}),Object(w.jsxs)("div",{className:"drawer-content",ref:d,children:[Object(w.jsx)("button",{className:"btn shadow drawer-close",onClick:function(){!o&&r()},children:Object(w.jsx)("i",{className:"fa fa-close","aria-hidden":"true"})}),i]})]})},de=(n(120),function(){var e=Object(s.useState)(F[0]),t=Object(o.a)(e,2),n=t[0],a=t[1],c=function(){var e=Object(s.useState)(B),t=Object(o.a)(e,2),n=t[0],a=t[1];return[n,Object(s.useCallback)((function(e){a((function(t){return Object(r.a)(Object(r.a)({},t),e)}))}),[])]}(),i=Object(o.a)(c,2),l=i[0],d=i[1],u=Object(s.useState)(!1),m=Object(o.a)(u,2),j=m[0],b=m[1],f=function(e){var t=l.playing;n&&n.id===e.id?d({playing:!t}):(a(e),d({playing:!0,duration:0,played:0}))};return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("button",{className:"btn shadow open-playlist",onClick:function(){return b(!0)},children:Object(w.jsx)("i",{className:k()("fa fa-music",{playing:l.playing}),"aria-hidden":"true"})}),Object(w.jsxs)(le,{opened:j,position:"right",onClose:function(){return b(!1)},closeOutside:!0,children:[n&&Object(w.jsx)(ce,{tracks:F,activeTrack:n,playbackState:l,onChangeTrack:f,updatePlaybackState:d}),Object(w.jsx)(ie,{tracks:F,activeTrack:n,playbackState:l,onChangeTrack:f})]})]})}),ue=Object(s.memo)(de),me=(n(121),function(e){var t=e.header,n=e.children;return Object(w.jsxs)("div",{className:"menu-section",children:[Object(w.jsx)("h6",{className:"menu-section-title",children:t}),Object(w.jsx)("div",{className:"menu-section-content",children:n})]})}),je=n(58),be=n.n(je),fe=(n(125),function(e){var t=e/2;return t+Math.floor(t/1.74)}),pe=function(e){var t=e.options,n=e.onOptionsUpdate,a=t.stepsLimit,c=t.boardSize,i=fe(c);Object(s.useEffect)((function(){if(a){var e=fe(c);n({stepsLimit:e})}}),[c,n,a]);return Object(w.jsx)("div",{className:"hardmode-section",children:Object(w.jsxs)("div",{className:"section-row",children:[Object(w.jsxs)("label",{className:"toggle-label pointer",children:[Object(w.jsx)(be.a,{defaultChecked:!!a,onChange:function(){n({stepsLimit:a?0:i})}}),Object(w.jsx)("span",{className:k()("label-header",{active:a}),children:"Limited steps"})]}),Object(w.jsx)("p",{className:"section-description",children:"If this option is enabled - you will have limited steps to finish the game."}),!!t.stepsLimit&&Object(w.jsxs)("p",{className:"section-description",children:["You have only ",Object(w.jsx)("span",{className:"highlight",children:i})," attempts to finish the game"]})]})})},he=(n(126),function(e){var t=e.options,n=e.onOptionsUpdate,a=t.boardSize,c=Object.entries(f);return Object(w.jsx)("ul",{className:"board-selection",children:c.map((function(e){var t=Object(o.a)(e,2),c=t[0],i=t[1];return Object(w.jsxs)("li",{className:"size-row ".concat(c),children:[Object(w.jsxs)("div",{className:"size-title",children:[c," board:"]}),i.map((function(e){var t=e.cells,c=e.rows;return Object(w.jsx)("div",{onClick:function(){return n({boardSize:t,boardRows:c})},className:k()("size-item pointer",{active:t===a}),children:t},t)}))]},c)}))})}),Oe=(n(127),function(e,t){var n=e.filter((function(e){return!!e.selected}));return Math.max(0,t/2-n.length)}),ge=function(e){var t=e.options,n=e.onOptionsUpdate,a=e.onError,c=Object(s.useState)(0),i=Object(o.a)(c,2),l=i[0],d=i[1],u=t.cardItems,m=t.boardSize;Object(s.useEffect)((function(){var e=u.filter((function(e){return!!e.selected})),t=Oe(e,m);if(t>0){var c=m/2,i=u.map((function(e){return Object(r.a)(Object(r.a)({},e),{},{selected:!!(c-- >0)})}));n({cardItems:i})}d(t>0?0:t),null===a||void 0===a||a(!1)}),[m,n]);return Object(w.jsxs)("div",{className:"card-selection",children:[Object(w.jsx)("div",{className:"section-description",children:"Selected cards will be randomly reflected on your board."}),Object(w.jsx)("ul",{className:"card-list",children:u.map((function(e){return Object(w.jsxs)("li",{onClick:function(){return function(e){var t=e.name,c=u.map((function(e){return e.name===t?Object(r.a)(Object(r.a)({},e),{},{selected:!e.selected}):e})),i=Oe(c,m);d(i),null===a||void 0===a||a(!!i),n({cardItems:c})}(e)},className:k()("card pointer",{selected:e.selected}),children:[Object(w.jsx)("i",{className:"fa fa-check-circle-o","aria-hidden":"true"}),Object(w.jsx)("img",{className:"card-image",src:e.imagePath,alt:"card preview"})]},e.name)}))}),!!l&&Object(w.jsxs)(S,{type:"error",children:["You should choose at least ",l," card(s) for this board size."]})]})},ve=(n(128),function(e){var t=e.options,n=e.onOptionsUpdate,a=Object(s.useState)(!0),c=Object(o.a)(a,2),i=c[0],r=c[1],l=Object(s.useState)(!1),d=Object(o.a)(l,2),u=d[0],m=d[1];return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("button",{className:"btn shadow open-settings",onClick:function(){return r(!0)},children:Object(w.jsx)("i",{className:"fa fa-sliders","aria-hidden":"true"})}),Object(w.jsxs)(le,{opened:i,position:"left",onClose:function(){return r(!1)},blackout:!0,closeOutside:!0,preventClose:u,children:[Object(w.jsx)(me,{header:Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("i",{className:"fa fa-th-large","aria-hidden":"true"}),"Board size:"]}),children:Object(w.jsx)(he,{options:t,onOptionsUpdate:n})}),Object(w.jsx)(me,{header:Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("i",{className:"fa fa-picture-o","aria-hidden":"true"}),"Board cards:"]}),children:Object(w.jsx)(ge,{options:t,onOptionsUpdate:n,onError:function(e){m(!!e)}})}),Object(w.jsx)(me,{header:Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("i",{className:"fa fa-step-forward","aria-hidden":"true"}),"Hardmode options:"]}),children:Object(w.jsx)(pe,{options:t,onOptionsUpdate:n})})]})]})}),xe=(n(129),function(){var e=Object(s.useState)([]),t=Object(o.a)(e,2),n=t[0],a=t[1],c=Object(s.useState)([]),l=Object(o.a)(c,2),u=l[0],j=l[1],f=Object(s.useState)(null),p=Object(o.a)(f,2),h=p[0],O=p[1],g=Object(s.useState)(0),x=Object(o.a)(g,2),k=x[0],N=x[1],y=Object(s.useState)(0),z=Object(o.a)(y,2),L=z[0],P=z[1],_=Object(s.useState)(v),R=Object(o.a)(_,2),V=R[0],M=R[1],U=Object(s.useCallback)((function(){D();try{var e=function(e,t){if(!e)throw new Error("Missing size format");if(e%2!==0)throw new Error("Incorrect size amount");if(t.length<e/2)throw new Error("insufficient number of card items");var n=t.filter((function(e){return!!e.selected})),a=b()(n,e/2);return m()([].concat(Object(i.a)(a),Object(i.a)(a))).map((function(e){return Object(r.a)({id:d()()},e)}))}(V.boardSize,V.cardItems);a(e)}catch(t){O(t.message)}}),[V]);Object(s.useEffect)((function(){U()}),[]),Object(s.useEffect)((function(){U()}),[V.boardSize,U]),Object(s.useEffect)((function(){if(u.length&&2===u.length){var e=u[0],t=u[u.length-1];N((function(e){return e+1})),e.name===t.name?(j([]),P((function(e){return e+2})),a((function(t){return function(e,t){return e.map((function(e){return e.name===t?Object(r.a)(Object(r.a)({},e),{},{guessed:!0}):e}))}(t,e.name)}))):setTimeout((function(){j([]),a((function(e){return function(e){return e.map((function(e){return e.opened&&!e.guessed?Object(r.a)(Object(r.a)({},e),{},{opened:!1}):e}))}(e)}))}),1e3)}}),[u]),Object(s.useEffect)((function(){n.length-L===2&&(a((function(e){return function(e){return e.map((function(e){return e.guessed||e.opened?e:Object(r.a)(Object(r.a)({},e),{},{guessed:!0,opened:!0})}))}(e)})),P(n.length))}),[n.length,L]);var A=Object(s.useCallback)((function(e){M((function(t){return Object(r.a)(Object(r.a)({},t),e)}))}),[]),D=function(){N(0),P(0)},I=Object(s.useCallback)((function(e){u.length<2&&(j((function(t){return[].concat(Object(i.a)(t),[e])})),a((function(t){return function(e,t){return e.map((function(e){return e.id!==t||e.opened?e:Object(r.a)(Object(r.a)({},e),{},{opened:!0})}))}(t,e.id)})))}),[u.length]),F=function(){var e,t,a=(e=n.length,t=L,e>0&&e===t);return V.stepsLimit?V.stepsLimit-k<=0?{gameOver:!0,winner:!1}:{gameOver:a,winner:!0}:{gameOver:a,winner:a}}();return Object(w.jsxs)("div",{className:"game-container",children:[F.gameOver&&Object(w.jsx)(E,{winner:F.winner,onNewGame:U}),Object(w.jsx)("h5",{className:"game-header",children:"React memory game"}),Object(w.jsx)(T,{attempts:k,guessedCount:L,options:V}),h?Object(w.jsx)(S,{type:"error",children:h}):Object(w.jsx)(C,{board:n,rows:V.boardRows,onCellClick:I}),Object(w.jsx)(ve,{options:V,onOptionsUpdate:A}),Object(w.jsx)(ue,{})]})}),ke=(n(130),function(){return Object(w.jsx)("div",{className:"app",children:Object(w.jsx)(xe,{})})}),we=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Ne(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(Object(w.jsx)(ke,{}),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/react-memory-game",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/react-memory-game","/service-worker.js");we?function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Ne(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e):Ne(e)}))}}()},63:function(e,t,n){},98:function(e,t,n){}},[[131,1,2]]]);
//# sourceMappingURL=main.2389564d.chunk.js.map