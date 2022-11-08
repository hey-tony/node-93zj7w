var jsonTree=function(){function e(t,n,s){var o=d.getType(n)
    if(o in e.CONSTRUCTORS)return new e.CONSTRUCTORS[o](t,n,s)
    throw Error("Bad type: "+d.getClass(n))}function t(e,n,s){if(this.constructor===t)throw Error("This is abstract class")
    var o,r=this,i=document.createElement("li"),a=function(e,t){var n='                    <span class="jsontree_label-wrapper">                        <span class="jsontree_label">"'+e+'"</span> :                     </span>                    <span class="jsontree_value-wrapper">                        <span class="jsontree_value jsontree_value_'+r.type+'">'+t+"</span>"+(s?"":",")+"</span>"
    return n}
    r.label=e,r.isComplex=!1,i.classList.add("jsontree_node"),i.innerHTML=a(e,n),r.el=i,o=i.querySelector(".jsontree_label"),o.addEventListener("click",function(e){return e.altKey?void r.toggleMarked():e.shiftKey?(document.getSelection().removeAllRanges(),void alert(r.getJSONPath())):void 0},!1)}function n(e,n,s){this.type="boolean",t.call(this,e,n,s)}function s(e,n,s){this.type="number",t.call(this,e,n,s)}function o(e,n,s){this.type="string",t.call(this,e,'"'+n+'"',s)}function r(e,n,s){this.type="null",t.call(this,e,n,s)}function i(t,n,s){if(this.constructor===i)throw Error("This is abstract class")
    var o,r,a,l=this,c=document.createElement("li"),h=function(e,t){var n=s?"":",",o='                        <div class="jsontree_value-wrapper">                            <div class="jsontree_value jsontree_value_'+l.type+'">                                <b>'+t[0]+'</b>                                <span class="jsontree_show-more">&hellip;</span>                                <ul class="jsontree_child-nodes"></ul>                                <b>'+t[1]+"</b></div>"+n+"</div>"
    return null!==e&&(o='                        <span class="jsontree_label-wrapper">                            <span class="jsontree_label"><span class="jsontree_expand-button"></span>"'+e+'"</span> :                         </span>'+o),o},p=[]
    l.label=t,l.isComplex=!0,c.classList.add("jsontree_node"),c.classList.add("jsontree_node_complex"),c.innerHTML=h(t,l.sym),o=c.querySelector(".jsontree_child-nodes"),null!==t?(r=c.querySelector(".jsontree_label"),a=c.querySelector(".jsontree_show-more"),r.addEventListener("click",function(e){return e.altKey?void l.toggleMarked():e.shiftKey?(document.getSelection().removeAllRanges(),void alert(l.getJSONPath())):void l.toggle(e.ctrlKey||e.metaKey)},!1),a.addEventListener("click",function(e){l.toggle(e.ctrlKey||e.metaKey)},!1),l.isRoot=!1):(l.isRoot=!0,l.parent=null,c.classList.add("jsontree_node_expanded")),l.el=c,l.childNodes=p,l.childNodesUl=o,d.forEachNode(n,function(t,n,s){l.addChild(new e(t,n,s))}),l.isEmpty=!!!p.length,l.isEmpty&&c.classList.add("jsontree_node_empty")}function a(e,t,n){this.sym=["{","}"],this.type="object",i.call(this,e,t,n)}function l(e,t,n){this.sym=["[","]"],this.type="array",i.call(this,e,t,n)}function c(e,t){this.wrapper=document.createElement("ul"),this.wrapper.className="jsontree_tree clearfix",this.rootNode=null,this.sourceJSONObj=e,this.loadData(e),this.appendTo(t)}var d={getClass:function(e){return Object.prototype.toString.call(e)},getType:function(e){if(null===e)return"null"
    switch(typeof e){case"number":return"number"
    case"string":return"string"
    case"boolean":return"boolean"}switch(d.getClass(e)){case"[object Array]":return"array"
    case"[object Object]":return"object"}throw Error("Bad type: "+d.getClass(e))},forEachNode:function(e,t){var n,s=d.getType(e)
    switch(s){case"array":n=e.length-1,e.forEach(function(e,s){t(s,e,s===n)})
    break
    case"object":var o=Object.keys(e).sort()
    n=o.length-1,o.forEach(function(s,o){t(s,e[s],o===n)})}},inherits:function(){var e=function(){}
    return function(t,n){e.prototype=n.prototype,t.prototype=new e,t.prototype.constructor=t}}(),isValidRoot:function(e){switch(d.getType(e)){case"object":case"array":return!0
    default:return!1}},extend:function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}}
    return e.CONSTRUCTORS={"boolean":n,number:s,string:o,"null":r,object:a,array:l},t.prototype={constructor:t,mark:function(){this.el.classList.add("jsontree_node_marked")},unmark:function(){this.el.classList.remove("jsontree_node_marked")},toggleMarked:function(){this.el.classList.toggle("jsontree_node_marked")},expandParent:function(e){this.parent&&(this.parent.expand(),this.parent.expandParent(e))},getJSONPath:function(e){if(this.isRoot)return"$"
    var t
    return t="array"===this.parent.type?"["+this.label+"]":e?"."+this.label:"['"+this.label+"']",this.parent.getJSONPath(e)+t}},d.inherits(n,t),d.inherits(s,t),d.inherits(o,t),d.inherits(r,t),d.inherits(i,t),d.extend(i.prototype,{constructor:i,addChild:function(e){this.childNodes.push(e),this.childNodesUl.appendChild(e.el),e.parent=this},expand:function(e){this.isEmpty||(this.isRoot||this.el.classList.add("jsontree_node_expanded"),e&&this.childNodes.forEach(function(t,n){t.isComplex&&t.expand(e)}))},collapse:function(e){this.isEmpty||(this.isRoot||this.el.classList.remove("jsontree_node_expanded"),e&&this.childNodes.forEach(function(t,n){t.isComplex&&t.collapse(e)}))},toggle:function(e){if(!this.isEmpty&&(this.el.classList.toggle("jsontree_node_expanded"),e)){var t=this.el.classList.contains("jsontree_node_expanded")
    this.childNodes.forEach(function(n,s){n.isComplex&&n[t?"expand":"collapse"](e)})}},findChildren:function(e,t,n){this.isEmpty||this.childNodes.forEach(function(s,o){e(s)&&t(s),s.isComplex&&n&&s.findChildren(e,t,n)})}}),d.inherits(a,i),d.inherits(l,i),c.prototype={constructor:c,loadData:function(t){return d.isValidRoot(t)?(this.sourceJSONObj=t,this.rootNode=new e(null,t,"last"),this.wrapper.innerHTML="",void this.wrapper.appendChild(this.rootNode.el)):void alert("The root should be an object or an array")},appendTo:function(e){e.appendChild(this.wrapper)},expand:function(e){this.rootNode.isComplex&&("function"==typeof e?this.rootNode.childNodes.forEach(function(t,n){t.isComplex&&e(t)&&t.expand()}):this.rootNode.expand("recursive"))},collapse:function(){"function"==typeof this.rootNode.collapse&&this.rootNode.collapse("recursive")},toSourceJSON:function(e){if(!e)return JSON.stringify(this.sourceJSONObj)
    var t="[%^$#$%^%]",n=JSON.stringify(this.sourceJSONObj,null,t)
    return n=n.split("\n").join("<br />"),n=n.split(t).join("&nbsp;&nbsp;&nbsp;&nbsp;")},findAndHandle:function(e,t){this.rootNode.findChildren(e,t,"isRecursive")},unmarkAll:function(){this.rootNode.findChildren(function(e){return!0},function(e){e.unmark()},"isRecursive")}},{create:function(e,t){return new c(e,t)}}}()
    