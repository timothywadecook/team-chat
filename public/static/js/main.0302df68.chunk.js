(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{161:function(e,t,a){e.exports=a(304)},220:function(e,t){},3:function(e,t,a){var n=a(176),r=a(190),s=a(195),o=a(223),c=s("https://teamchat-tepa.herokuapp.com:80"),i=n();i.configure(r(c)),i.configure(o({storage:window.localStorage})),e.exports={fc:i}},302:function(e,t,a){},304:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(30),o=a.n(s),c=a(6),i=a.n(c),l=a(12),u=a(22),m=a(13),p=a(14),d=a(16),v=a(15),f=a(17),h=a(29),g=a(37);var b=function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"Index"),r.a.createElement(h.b,{to:"/login"},"Login"),r.a.createElement("br",null),r.a.createElement(h.b,{to:"/register"},"Register"))},E=a(3),C=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(d.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",error:null},a.handleInput=function(e){var t;a.setState((t={},Object(u.a)(t,e.target.name,e.target.value),Object(u.a)(t,"error",null),t))},a.handleSubmit=function(e){e.preventDefault(),E.fc.authenticate({strategy:"local",email:a.state.email,password:a.state.password}).catch(function(e){a.setState({error:e})})},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return this.props.token?r.a.createElement(g.a,{to:"/home"}):r.a.createElement("div",{className:"formContainer"},r.a.createElement("h1",null,"Login"),this.state.error?r.a.createElement("p",null,this.state.error.message):"",r.a.createElement("form",null,r.a.createElement("div",{className:"formRow"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{className:"formInput",id:"email",name:"email",type:"text",placeholder:"email",required:!0,onChange:this.handleInput})),r.a.createElement("br",null),r.a.createElement("div",{className:"formRow"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{className:"formInput",id:"password",type:"password",name:"password",placeholder:"password",required:!0,onChange:this.handleInput})),r.a.createElement("br",null),r.a.createElement("div",{className:"formRow"},r.a.createElement("button",{className:"formBtn",onClick:this.handleSubmit},"Login"))),r.a.createElement(h.b,{to:"/register"},"new here? Register"))}}]),t}(r.a.Component),y=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(d.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",name:"",loading:!1,error:null},a.handleInput=function(e){a.setState(Object(u.a)({},e.target.name,e.target.value))},a.login=function(){E.fc.authenticate({strategy:"local",email:a.state.email,password:a.state.password}).catch(function(e){return a.setState({error:e})})},a.handleSubmit=function(){var e=Object(l.a)(i.a.mark(function e(t){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),E.fc.service("users").create({name:a.state.name,email:a.state.email,password:a.state.password}).then(function(e){a.login()}).catch(function(e){a.setState({error:e})});case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return this.props.token?r.a.createElement(g.a,{to:"/home"}):r.a.createElement("div",{className:"formContainer"},r.a.createElement("h1",null,"Register"),r.a.createElement("form",null,r.a.createElement("div",{className:"formRow"},r.a.createElement("label",{htmlFor:"name"},"Full Name"),r.a.createElement("input",{className:"formInput",id:"name",name:"name",type:"text",placeholder:"name",autoFocus:!0,required:!0,onChange:this.handleInput})),r.a.createElement("br",null),r.a.createElement("div",{className:"formRow"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{className:"formInput",id:"email",name:"email",type:"text",placeholder:"email",required:!0,onChange:this.handleInput})),r.a.createElement("br",null),r.a.createElement("div",{className:"formRow"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{className:"formInput",id:"password",type:"password",name:"password",placeholder:"password",required:!0,onChange:this.handleInput})),r.a.createElement("br",null),r.a.createElement("div",{className:"formRow"},r.a.createElement("button",{className:"formBtn",onClick:this.handleSubmit},"Register"))),r.a.createElement(h.b,{to:"/login"},"already member? Login"))}}]),t}(r.a.Component),x=a(305),w=a(158),N=a(314),I=a(306),k=a(307),O=a(308),j=a(309),_=a(310),M=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(d.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={modal:!1},a.toggle=function(){a.setState({modal:!a.state.modal})},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement(x.a,null,r.a.createElement("h1",null,"Please feel free to create a team or wait until someone else adds you to their team!"),r.a.createElement(w.a,{color:"info",onClick:this.toggle},"Create Team"),r.a.createElement(N.a,{isOpen:this.state.modal,toggle:this.toggle},r.a.createElement(I.a,{toggle:this.toggle},"Please Enter a Team Name"),r.a.createElement(k.a,null,r.a.createElement(O.a,null,r.a.createElement(j.a,{value:this.props.teamName,onChange:this.props.teamNameInput,name:"teamInput",type:"text",label:"Team Name"}))),r.a.createElement(_.a,null,r.a.createElement(w.a,{color:"primary",onClick:this.props.teamCreate},"Create Team"),r.a.createElement(w.a,{color:"secondary",onClick:this.toggle},"Cancel"))))}}]),t}(n.Component),T=a(160),U=a(315),S=a(311),G=a(312),D=a(313),F=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(d.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={teamName:""},a.changeHandler=function(e){a.setState({teamName:e.target.value})},a.createTeam=function(e){E.fc.service("teams").create({name:a.state.teamName,ownerId:a.props.activeUser._id}).then(function(e){E.fc.service("users").patch(a.props.activeUser._id,{$push:{teamIds:e._id}}).then(function(){E.fc.service("conversations").create({teamId:e._id,type:"group",name:"General",userIds:a.props.activeUser._id}),E.fc.service("conversations").create({teamId:e._id,type:"member",name:"".concat(a.props.activeUser.name," (you)"),userIds:a.props.activeUser._id})}).then(function(t){console.log(e),a.props.toggle()})})},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(N.a,{isOpen:this.props.modalState,toggle:this.props.toggle,className:this.props.className},r.a.createElement(I.a,{toggle:this.props.toggle},"Create a New Team"),r.a.createElement(k.a,null,r.a.createElement(O.a,null,r.a.createElement(j.a,{placeholder:"Enter New Team Name",value:this.state.teamName,onChange:this.changeHandler}))),r.a.createElement(_.a,null,r.a.createElement(w.a,{color:"primary",onClick:this.createTeam},"Create Team"),r.a.createElement(w.a,{color:"secondary",onClick:this.props.toggle},"Cancel"))))}}]),t}(r.a.Component),q=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(d.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={dropdownOpen:!1,modal:!1,teams:[]},a.toggle=function(){a.setState({dropdownOpen:!a.state.dropdownOpen})},a.toggleModal=function(){a.setState({modal:!a.state.modal})},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.getTeams()}},{key:"componentDidUpdate",value:function(e,t){t.teams&&this.state.teams.length!==t.teams.length&&(console.log("update is running"),this.getTeams())}},{key:"getTeams",value:function(){for(var e=this,t=[],a=function(a){E.fc.service("teams").find(e.props.activeUser.teamIds[a]).then(function(e){console.log("teams this user is on",e),t.push(e.data[a])})},n=0;n<this.props.activeUser.teamIds.length;n++)a(n);this.setState({teams:t})}},{key:"render",value:function(){var e=this,t=this.state.dropdownOpen,a=this.props.teamName;return r.a.createElement("div",{className:"d-flex justify-content-center mb-4"},r.a.createElement(U.a,{color:"bg-white",isOpen:t,toggle:this.toggle},r.a.createElement(S.a,{caret:!0},a),r.a.createElement(G.a,null,this.state.teams&&this.state.teams.map(function(t,a){return r.a.createElement(D.a,{key:a,onClick:e.props.teamChange,value:t._id},t.name)}),r.a.createElement(D.a,{onClick:this.toggleModal},"Create Team"))),r.a.createElement(F,{activeUser:this.props.activeUser,modalState:this.state.modal,toggle:this.toggleModal}))}}]),t}(r.a.Component),A=function(e){return r.a.createElement("div",null,r.a.createElement(N.a,{isOpen:e.modalStatus,toggle:e.toggle,className:e.className},r.a.createElement(I.a,{toggle:e.toggle},"Create a New Group"),r.a.createElement(k.a,null,r.a.createElement(O.a,null,r.a.createElement(j.a,{placeholder:"Enter New Group Name",value:e.value,onChange:e.groupNameHandler}))),r.a.createElement(_.a,null,r.a.createElement(w.a,{color:"primary",onClick:e.addGroup},"Create Group"),r.a.createElement(w.a,{color:"secondary",onClick:e.toggle},"Cancel"))))},H=function(e){function t(){return Object(m.a)(this,t),Object(d.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"px-2 d-flex justify-content-between align-items-center"},r.a.createElement("h6",{className:"text-muted"},"Groups"),r.a.createElement("button",{onClick:this.props.toggleModal,className:"addBtn"},r.a.createElement("i",{className:"material-icons",style:{fontSize:"20px",color:"grey"}}," add_circle_outline "))),r.a.createElement(A,Object.assign({toggle:this.props.toggleModal},this.props)))}}]),t}(r.a.Component),R=function(e){function t(){return Object(m.a)(this,t),Object(d.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(N.a,{isOpen:this.props.modalStatus,toggle:this.props.toggle,className:this.props.className},r.a.createElement(I.a,{toggle:this.props.toggle},"Invite a New User"),r.a.createElement(k.a,null,r.a.createElement(O.a,null,r.a.createElement(j.a,{placeholder:"Enter their email address",value:this.props.userEmail,onChange:this.props.emailChange}))),r.a.createElement(_.a,null,r.a.createElement(w.a,{color:"primary",onClick:this.props.addMember},"Invite User"),r.a.createElement(w.a,{color:"secondary",onClick:this.props.toggle},"Cancel"))))}}]),t}(r.a.Component);var z=function(e){return r.a.createElement("div",null,r.a.createElement("div",{className:"px-2 d-flex justify-content-between align-items-center"},r.a.createElement("h6",{className:"text-muted"},"Members"),r.a.createElement("button",{onClick:e.toggleModal,className:"addBtn"},r.a.createElement("i",{className:"material-icons",style:{fontSize:"20px",color:"grey"}},"add_circle_outline"))),r.a.createElement(R,Object.assign({toggle:e.toggleModal},e)))},J=function(e){return r.a.createElement("div",{className:"px-2 d-flex justify-content-between align-items-center"},r.a.createElement("h6",{className:"text-muted"},"Customers"),r.a.createElement("button",{onClick:e.addGroup,className:"addBtn"},r.a.createElement("i",{className:"material-icons",style:{fontSize:"20px",color:"grey"}},"add_circle_outline")))},B=function(e){return r.a.createElement("form",{className:"form-inline"},r.a.createElement("input",{className:"",onChange:e.changeHandler,value:e.value}),r.a.createElement("button",{className:"",onClick:e.clickHandler},"Send"))},P=(a(240),function(e){return r.a.createElement("div",{className:e.justify},r.a.createElement("div",{className:"card messageBubble text-white "+e.format},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},e.name),r.a.createElement("p",{className:"card-text"},e.body))))}),L=function(e){return"incoming"===e.convoType?e.id?r.a.createElement(P,Object.assign({},e,{justify:"row justify-content-end",format:"myMessage bg-primary"})):r.a.createElement(P,Object.assign({},e,{justify:"",format:"theirMessage bg-success"})):e.id===e.activeUser._id?r.a.createElement(P,Object.assign({},e,{justify:"row justify-content-end",format:"myMessage bg-primary"})):r.a.createElement(P,Object.assign({},e,{justify:"",format:"theirMessage bg-success"}))},$=function(e){return r.a.createElement("div",{className:"conversation-body"},e.messages&&e.messages.map(function(t){return r.a.createElement(L,{key:t._id,convoType:e.convoType,name:t.senderName,body:t.body,activeUser:e.activeUser,id:t.senderId})}))},W=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(d.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={messageInput:""},a.changeHandler=function(e){a.setState({messageInput:e.target.value})},a.clickHandler=function(e){e.preventDefault(),console.log("this should be only once. in MessagePage"),E.fc.service("messages").create({body:a.state.messageInput,senderId:a.props.activeUser._id,senderName:a.props.activeUser.name,conversationId:a.props.convoId}).then(function(e){a.setState({messageInput:""})})},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement($,{convoType:this.props.convoType,messages:this.props.messages,activeUser:this.props.activeUser}),r.a.createElement("div",{className:"px-4 border-top d-flex pb-4 bg-light conversation-view-footer fixed-bottom"},r.a.createElement(B,{changeHandler:this.changeHandler,clickHandler:this.clickHandler,value:this.state.messageInput})))}}]),t}(r.a.Component),V=function(e){function t(){return Object(m.a)(this,t),Object(d.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props.conversation;return e?r.a.createElement("div",{className:"col-8 pl-0",id:"conversation-view"},r.a.createElement("nav",{className:"navbar navbar-light bg-light d-flex justify-content-center sticky-top"},r.a.createElement("span",{className:"navbar-brand",href:"#"},e.name)),r.a.createElement(W,{convoType:e.type,getMessages:this.props.getMessages,convoId:this.props.conversationId,activeUser:this.props.activeUser,messages:this.props.messages})):r.a.createElement("div",null,"Click on a convo to view")}}]),t}(r.a.Component),K=function(e){return r.a.createElement("div",{className:"border border-right-0",id:e._id,onClick:e.openConversation},r.a.createElement("i",{className:e.status[e.activeUserId]+" material-icons notifyDot",style:{fontSize:"20px"}},"fiber_manual_record"),r.a.createElement("h5",{className:"listName"},e.name),r.a.createElement("div",{className:"previewText"},e.preview),r.a.createElement("div",{className:"elapsedTime"},e.timestamps))},Q=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(d.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={messages:[],teamMembers:[],teamName:"",groupConvos:[],memberConvos:[],customerConvos:[],messageView:!1,activeConversation:{},activeConvoId:"",groupName:"",groupModal:!1,userEmail:"",userModal:!1},a.unreadToUnreplied=Object(l.a)(i.a.mark(function e(){var t,n,r,s,o,c,l,m;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=a.state.activeTeamId,n=a.props.activeUser._id,r="status.".concat(n),console.log("status path check should be status.sdlfawoiecwpo",r),console.log("activeConvo status",a.state.activeConversation.status),"unread"!==a.state.activeConversation.status[n]){e.next=34;break}return e.next=8,E.fc.service("conversations").patch(a.state.activeConvoId,Object(u.a)({},r,"unreplied"));case 8:if(s=e.sent,console.log("updatedconvo status",s.status),"member"!==(o=s.type)){e.next=19;break}return e.next=14,a.getMemberConvos(t,a.props.activeUser);case 14:return c=e.sent,e.next=17,a.setState({memberConvos:c});case 17:e.next=34;break;case 19:if("group"!==o){e.next=28;break}return e.next=22,a.getGroupConvos(t,a.props.activeUser);case 22:return l=e.sent,console.log("group conversations",l),e.next=26,a.setState({groupConvos:l});case 26:e.next=34;break;case 28:if("incoming"!==o){e.next=34;break}return e.next=31,a.getCustomerConvos(t,a.props.activeUser);case 31:return m=e.sent,e.next=34,a.setState({customerConvos:m});case 34:case"end":return e.stop()}},e)})),a.getMemberConvos=function(){var e=Object(l.a)(i.a.mark(function e(t,n){var r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.fc.service("conversations").find({query:{teamId:t,userIds:n._id,type:"member"}});case 2:return r=e.sent,r=a.removeMyNameFromDisplayedMemberConvoName(r,n),e.abrupt("return",r.data);case 5:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.getGroupConvos=function(){var e=Object(l.a)(i.a.mark(function e(t,a){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.fc.service("conversations").find({query:{teamId:t,userIds:a._id,type:"group"}});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.getCustomerConvos=function(){var e=Object(l.a)(i.a.mark(function e(t,a){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.fc.service("conversations").find({query:{teamId:t,userIds:a._id,type:"incoming"}});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.getTeamMembers=function(){var e=Object(l.a)(i.a.mark(function e(t){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.fc.service("users").find({query:{teamIds:t}});case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.getTeamName=function(){var e=Object(l.a)(i.a.mark(function e(t){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.fc.service("teams").get(t);case 2:return a=e.sent,e.abrupt("return",a.name);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.removeMyNameFromDisplayedMemberConvoName=function(e,t){for(var a=1;a<e.length;a++)e[a].name=e[a].name.replace(t.name,"");return e},a.createNewPersonalConversation_OnJoinTeam=function(){var e=Object(l.a)(i.a.mark(function e(t,a){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.fc.service("conversations").create({teamId:t,type:"member",name:a.name+" (you)",userIds:a._id});case 2:e.sent;case 3:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.createNewMember2MemberConversations_OnJoinTeam=function(){var e=Object(l.a)(i.a.mark(function e(t,a,n){var r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=0;case 1:if(!(r<t.length)){e.next=9;break}if(n._id===t[r]._id){e.next=6;break}return e.next=5,E.fc.service("conversations").create({name:n.name+" "+t[r].name,userIds:[n._id,t[r]._id],type:"member",teamId:a});case 5:e.sent;case 6:r++,e.next=1;break;case 9:case"end":return e.stop()}},e)}));return function(t,a,n){return e.apply(this,arguments)}}(),a.addNewMemberToAllGroupConversations_OnJoinTeam=function(){var e=Object(l.a)(i.a.mark(function e(t,a){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.fc.service("conversations").patch(null,{$push:{userIds:a._id}},{query:{teamId:t,type:"group"}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.initializeGroupConvoStatus_IfNeeded=function(){var e=Object(l.a)(i.a.mark(function e(t,a){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=0;case 1:if(!(n<t.length)){e.next=11;break}if(t[n].status||(t[n].status={}),t[n].status[a._id]){e.next=8;break}return t[n].status[a._id]="replied",e.next=7,E.fc.service("conversations").patch(t[n]._id,{status:Object(u.a)({},a._id,"replied")});case 7:e.sent;case 8:n++,e.next=1;break;case 11:return e.abrupt("return",t);case 12:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.intializeMemberConvoStatus_IfNeeded=function(){var e=Object(l.a)(i.a.mark(function e(t,a){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=0;case 1:if(!(n<t.length)){e.next=10;break}if(t[n].status||(t[n].status={}),t[n].status[a._id]){e.next=7;break}return t[n].status[a._id]="replied",e.next=7,E.fc.service("conversations").patch(t[n]._id,{status:Object(u.a)({},a._id,"replied")});case 7:n++,e.next=1;break;case 10:return e.abrupt("return",t);case 11:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.initializeCustomerConvoStatus_IfNeeded=function(){var e=Object(l.a)(i.a.mark(function e(t,a){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=0;case 1:if(!(n<t.length)){e.next=10;break}if(t[n].status||(t[n].status={}),t[n].status[a._id]){e.next=7;break}return t[n].status[a._id]="replied",e.next=7,E.fc.service("conversations").patch(t[n]._id,{status:Object(u.a)({},a._id,"replied")});case 7:n++,e.next=1;break;case 10:return e.abrupt("return",t);case 11:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.getData=function(){var e=Object(l.a)(i.a.mark(function e(t,n){var r,s,o,c,l;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.getTeamName(t);case 2:return r=e.sent,e.next=5,a.getTeamMembers(t);case 5:return s=e.sent,e.next=8,a.getGroupConvos(t,n);case 8:return o=e.sent,e.next=11,a.getMemberConvos(t,n);case 11:return c=e.sent,e.next=14,a.getCustomerConvos(t,n);case 14:if(l=e.sent,0!==c.length){e.next=23;break}return e.next=18,a.createNewPersonalConversation_OnJoinTeam(t,n);case 18:return e.next=20,a.createNewMember2MemberConversations_OnJoinTeam(s,t,n);case 20:return e.next=22,a.getMemberConvos(t,n._id);case 22:c=e.sent;case 23:if(0!==o.length){e.next=27;break}return e.next=26,a.addNewMemberToAllGroupConversations_OnJoinTeam(t,n);case 26:o=e.sent;case 27:return e.next=29,a.initializeGroupConvoStatus_IfNeeded(o,n);case 29:return o=e.sent,e.next=32,a.intializeMemberConvoStatus_IfNeeded(c,n);case 32:return c=e.sent,e.next=35,a.initializeCustomerConvoStatus_IfNeeded(l,n);case 35:l=e.sent,a.setState({teamMembers:s,teamName:r,groupConvos:o,memberConvos:c,customerConvos:l.data||[]});case 37:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.updateStateForNewMessage=function(){var e=Object(l.a)(i.a.mark(function e(t){var n,r,s,o,c;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.fc.service("conversations").get(t.conversationId);case 2:if(n=e.sent,"member"!==(r=n.type)){e.next=11;break}return e.next=7,a.getMemberConvos(a.props.activeTeamId,a.props.activeUser);case 7:s=e.sent,a.setState({memberConvos:s}),e.next=23;break;case 11:if("group"!==r){e.next=18;break}return e.next=14,a.getGroupConvos(a.props.activeTeamId,a.props.activeUser);case 14:o=e.sent,a.setState({groupConvos:o}),e.next=23;break;case 18:if("incoming"!==r){e.next=23;break}return e.next=21,a.getCustomerConvos(a.props.activeTeamId,a.props.activeUser);case 21:c=e.sent,a.setState({customerConvos:c});case 23:if(a.state.activeConvoId!==t.conversationId){e.next=26;break}return e.next=26,a.setState({messages:[].concat(Object(T.a)(a.state.messages),[t])});case 26:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.updateStateForNewConvo=function(){var e=Object(l.a)(i.a.mark(function e(t){var n,r,s,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("member"!==(n=t.type)){e.next=8;break}return e.next=4,a.getMemberConvos(a.props.activeTeamId,a.props.activeUser);case 4:r=e.sent,a.setState({memberConvos:r}),e.next=20;break;case 8:if("group"!==n){e.next=15;break}return e.next=11,a.getGroupConvos(a.props.activeTeamId,a.props.activeUser);case 11:s=e.sent,a.setState({groupConvos:s}),e.next=20;break;case 15:if("incoming"!==n){e.next=20;break}return e.next=18,a.getCustomerConvos(a.props.activeTeamId,a.props.activeUser);case 18:o=e.sent,a.setState({customerConvos:o});case 20:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.updateMessagesForActiveConversation=Object(l.a)(i.a.mark(function e(){var t;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.fc.service("messages").find({query:{conversationId:a.state.activeConvoId}});case 2:return t=e.sent,e.next=5,a.setState({messages:t.data});case 5:case"end":return e.stop()}},e)})),a.groupNameChange=function(e){a.setState({groupName:e.target.value})},a.addGroup=function(e){e.preventDefault(),E.fc.service("conversations").create({name:a.state.groupName,type:"group",teamId:a.props.activeTeamId,status:Object(u.a)({},a.props.activeUser._id,"replied"),userIds:a.state.teamMembers.map(function(e){return e._id})}).then(function(){var e=Object(l.a)(i.a.mark(function e(t){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.fc.service("conversations").find({query:{teamId:a.props.activeTeamId,userId:a.props.activeUser._id,type:"group"}});case 2:n=e.sent,a.setState({groupConvos:n.data,groupModal:!1});case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())},a.toggleGroupModal=function(e){e.preventDefault(),a.setState({groupModal:!a.state.groupModal})},a.addMember=function(e){e.preventDefault(),E.fc.service("teams").patch(a.props.activeTeamId,{$push:{invitedEmails:a.state.userEmail}}),a.setState({userModal:!1})},a.emailChange=function(e){a.setState({userEmail:e.target.value})},a.toggleEmail=function(e){e.preventDefault(),a.setState({userModal:!a.state.userModal})},a.openConversation=function(){var e=Object(l.a)(i.a.mark(function e(t){var n,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=t.currentTarget.id,e.next=4,E.fc.service("conversations").get(n);case 4:r=e.sent,a.setState({activeConvoId:n,activeConversation:r});case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.getData(this.props.activeTeamId,this.props.activeUser),E.fc.service("conversations").on("created",this.updateStateForNewConvo),E.fc.service("messages").on("created",this.updateStateForNewMessage)}},{key:"componentDidUpdate",value:function(e,t){e.activeUser===this.props.activeUser&&e.activeTeamId===this.props.activeTeamId&&t.teamMembers.length===this.state.teamMembers.length||this.getData(this.props.activeTeamId,this.props.activeUser),this.state.activeConvoId!==t.activeConvoId&&(this.updateMessagesForActiveConversation(),this.unreadToUnreplied())}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"row",id:"team-page"},r.a.createElement("div",{className:"col-4 flex-column justify-content-center pt-5 pr-0 border-right"},r.a.createElement(q,{teamName:this.state.teamName,activeUser:this.props.activeUser,teamChange:this.props.teamChange}),r.a.createElement(H,Object.assign({addGroup:this.addGroup,value:this.state.groupName,modalStatus:this.state.groupModal,groupNameHandler:this.groupNameChange,toggleModal:this.toggleGroupModal},this.props)),this.state.groupConvos.length>0?this.state.groupConvos.map(function(t){return r.a.createElement(K,Object.assign({key:t._id,activeUserId:e.props.activeUser._id,openConversation:e.openConversation,status:t.status},t))}):r.a.createElement("h6",{className:"listItem"},"No Group Conversations Exist"),r.a.createElement(z,Object.assign({addMember:this.addMember,modalStatus:this.state.userModal,emailChange:this.emailChange,value:this.state.userEmail},this.props,{toggleModal:this.toggleEmail})),this.state.memberConvos.length>0?this.state.memberConvos.map(function(t){return r.a.createElement(K,Object.assign({key:t._id,activeUserId:e.props.activeUser._id,openConversation:e.openConversation,status:t.status},t))}):r.a.createElement("h3",{className:"listItem"},"No Member Conversations Exist"),r.a.createElement(J,Object.assign({addMember:this.addMember},this.props)),this.state.customerConvos.length>0?this.state.customerConvos.map(function(t){return r.a.createElement(K,Object.assign({key:t._id,activeUserId:e.props.activeUser._id,openConversation:e.openConversation,status:t.status},t))}):r.a.createElement("h6",{className:"listItem"},"No Customer Conversations Exist")),r.a.createElement(V,{getMessages:this.updateMessagesForActiveConversation,messages:this.state.messages,activeUser:this.props.activeUser,conversationId:this.state.activeConvoId,conversation:this.state.activeConversation}))}}]),t}(r.a.Component);var X=function(e){return r.a.createElement("div",null,e.activeTeamId?r.a.createElement(Q,e):r.a.createElement(M,{teamCreate:e.teamCreate,teamNameInput:e.teamNameInput}))},Y=a(159);var Z=function(e){var t=e.component,a=e.token,n=e.activeTeamId,s=e.activeUser,o=e.teamNameInput,c=e.teamCreate,i=e.teamChange,l=e.teamName,u=Object(Y.a)(e,["component","token","activeTeamId","activeUser","teamNameInput","teamCreate","teamChange","teamName"]);return r.a.createElement(g.b,Object.assign({},u,{render:function(e){return a?r.a.createElement(t,Object.assign({activeTeamId:n,activeUser:s,teamCreate:c,teamNameInput:o,teamChange:i,teamName:l},e)):r.a.createElement(g.a,{to:{pathname:"/register",state:{from:e.location}}})}}))},ee=(a(302),function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(d.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={token:!1,activeUser:{},activeTeamId:"",teamInput:""},a.teamChange=function(e){e.preventDefault(),E.fc.service("users").patch(a.state.activeUser,{activeTeamId:e.target.value}),a.setState({activeTeamId:e.target.value})},a.teamNameInput=function(e){var t;a.setState((t={},Object(u.a)(t,e.target.name,e.target.value),Object(u.a)(t,"error",null),t))},a.teamCreate=function(e){E.fc.service("teams").create({name:a.state.teamInput,ownerId:a.state.activeUser._id}).then(function(e){E.fc.service("users").patch(a.state.activeUser._id,{teamIds:e._id,activeTeamId:e._id}).then(function(){E.fc.service("conversations").create({teamId:e._id,type:"group",name:"General",userIds:a.state.activeUser._id}),E.fc.service("conversations").create({teamId:e._id,type:"member",name:"".concat(a.state.activeUser.name," (you)"),userIds:a.state.activeUser._id})}).then(function(t){a.setState({activeTeamId:e._id})})})},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this;E.fc.authenticate().catch(function(){}),E.fc.on("authenticated",function(t){(function(){var t=Object(l.a)(i.a.mark(function t(a){var n,r,s,o,c;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E.fc.passport.verifyJWT(a);case 2:return n=t.sent,t.next=5,E.fc.service("users").get(n.userId);case 5:return r=t.sent,t.next=8,E.fc.service("teams").find({query:{invitedEmails:r.email}});case 8:if(1!==(s=t.sent).data.length){t.next=15;break}return o=s.data[0]._id,c=o,t.next=14,E.fc.service("users").patch(r,{teamIds:o,activeTeamId:c});case 14:r=t.sent;case 15:e.setState({token:a,activeUser:r,activeTeamId:r.activeTeamId});case 16:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}})()(t.accessToken)}),E.fc.on("logout",function(t){e.setState({token:null})})}},{key:"render",value:function(){var e=this;return r.a.createElement(h.a,null,r.a.createElement(g.b,{path:"/",exact:!0,component:b}),r.a.createElement(g.b,{path:"/login",exact:!0,render:function(t){return r.a.createElement(C,Object.assign({token:e.state.token},t))}}),r.a.createElement(g.b,{path:"/register",exact:!0,render:function(t){return r.a.createElement(y,Object.assign({token:e.state.token},t))}}),r.a.createElement(Z,{path:"/home",exact:!0,token:this.state.token,activeTeamId:this.state.activeTeamId,activeUser:this.state.activeUser,teamNameInput:this.teamNameInput,teamCreate:this.teamCreate,teamName:this.state.teamInput,teamChange:this.teamChange,component:X}))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(303);o.a.render(r.a.createElement(ee,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[161,1,2]]]);
//# sourceMappingURL=main.0302df68.chunk.js.map