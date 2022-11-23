import{n as e}from"./element-plus.2f7be3b4.js";import{m as t}from"./markdown-transform-html.fc9308eb.js";import{V as a,_ as o}from"./vue-markdown-menu-bar.3f5c015f.js";import{B as n,r as C,e as s,o as B,c as r,Q as F,O as l,u as c,a as d}from"./@vue.430f041f.js";import"./@vueuse.beeee585.js";import"./@element-plus.6aa0c6b3.js";import"./lodash-es.b61273cf.js";import"./@ctrl.82a509e0.js";const i='# \u4ECB\u7ECD\n\u5982\u679C\u4F60\u60F3\u7F16\u5199\u4E00\u6B3E**\u6BD4\u8F83\u597D\u7684\u7B80\u5386\u6392\u7248**\uFF0C\u90A3\u4F60\u53EF\u4EE5\u5B66\u4E60\u4E00\u4E0B\u4E0B\u9762\u8FD9\u4E9B\u8BED\u6CD5\uFF0C\u653E\u5FC3\uFF0C\u4E0D\u4F1A\u82B1\u8D39\u591A\u5C11\u65F6\u95F4.\n## \u5F39\u6027\u5E03\u5C40\n\u5B83\u4F1A\u88AB\u6E32\u67D3\u4E3A\u5E26`flex-layout`\u7C7B\u540D\u7684\u5F39\u6027\u76D2\uFF0C\u800C\u5728`:::`\u4E2D\u95F4\u7684\u5185\u5BB9\u5C06\u4F1A\u88AB\u6E32\u67D3\u4E3A\u4E00\u4E2A\u5F39\u6027\u5143\u7D20, \u4F60\u53EF\u4EE5\u4F7F\u7528\u5B83\u6765\u6784\u9020\u591A\u5217\u5E03\u5C40\uFF0C\u5982\u4E0B.\n```html\n::: start\ncontent...\n:::\ncontent...\n:::\ncontent...\n::: end\n```\n\u4E0A\u9762\u7684 `Markdown` \u8BED\u6CD5\u5C06\u4F1A\u88AB\u8F6C\u5316\u4E3A\u4E0B\u9762\u7684 `HTML` \u4EE3\u7801.\n```html\n<div class="flex-layout">\n  <div class="flex-layout-item">content...</div>\n  <div class="flex-layout-item">content...</div>\n  <div class="flex-layout-item">content...</div>\n<div>\n```\n## \u4E2A\u4EBA\u4FE1\u606F\u5E03\u5C40\n\u5982\u679C\u4F60\u60F3\u5355\u72EC\u5BF9\u7B80\u5386\u5934\u90E8\u7684\u4E2A\u4EBA\u4FE1\u606F\u8FDB\u884C\u6392\u7248\uFF0C\u90A3\u4F60\u53EF\u4EE5\u8003\u8651\u4F7F\u7528 `Head` \u5E03\u5C40\uFF0C\u9488\u5BF9\u6027\u7684\u5BF9\u4E2A\u4EBA\u4FE1\u606F\u8FDB\u884C\u6837\u5F0F\u8BBE\u7F6E\uFF0C\u548C\u5F39\u6027\u5E03\u5C40\u5DEE\u4E0D\u591A\uFF0C\u4F60\u9700\u8981\u4F7F\u7528 `:::` \u8BED\u6CD5\u5BF9\u5176\u8FDB\u884C\u5206\u5272\uFF0C\u5E76\u7ED9\u51FA\u5F00\u59CB\u548C\u7ED3\u675F\u6807\u5FD7.\n```html\n::: headStart\ncontent....\n::: headStart\n```\n\u4E0A\u9762\u7684 `Markdown` \u8BED\u6CD5\u5C06\u4F1A\u88AB\u8F6C\u5316\u4E3A\u4E0B\u9762\u7684 `HTML` \u4EE3\u7801.\n```html\n<div class="head-layout">\n  content....\n<div>\n```\n## \u5185\u7F6E\u56FE\u6807\n\u6211\u4E5F\u5185\u7F6E\u4E86\u4E00\u4E9B\u56FE\u6807\uFF0C\u5982\u679C\u4F60\u60F3\u4F7F\u7528\u5B83\uFF0C\u4F60\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u8BED\u6CD5\u4F7F\u7528\uFF0C**\u5EFA\u8BAE\u4F7F\u7528\u7A7A\u683C\u7ED3\u5C3E**.\n```html\nicon:github \n```\n\u4E0A\u9762\u7684 `Markdown` \u8BED\u6CD5\u5C06\u4F1A\u88AB\u8F6C\u5316\u4E3A\u4E0B\u9762\u7684 `HTML` \u4EE3\u7801.\n```html\n<i class="iconfont icon-github"></i>\n```\n# over\n\u4EE5\u4E0A\u5C31\u662F\u8BE5\u7B80\u5386\u6240\u652F\u6301\u7684\u4E00\u4E9B\u7279\u6B8A\u8BED\u6CD5\uFF0C\u5176\u4ED6\u7684\u8BED\u6CD5\u4E0E \u539F\u751F`Markdown` \u540C\u6B65\uFF0C**\u5982\u679C\u4F60\u6709\u4E0D\u9519\u7684\u60F3\u6CD5**\uFF0C\u53EF\u4EE5\u5411\u6211\u63D0\u51FA\uFF0C`\u6B22\u8FCE\u7ED9\u8FD9\u4E2A\u9879\u76EE\u63D0\u4F9B\u4E0D\u540C\u7684\u7B80\u5386\u6A21\u677F`\uFF0C\u611F\u8C22. [\u4ED3\u5E93\u5730\u5740](https://github.com/acmenlei/markdown-resume-to-pdf)',D={id:"syntax",class:"flex","data-aos":"fade-right"},A=n({__name:"syntax",setup(m){const u=C();return s(()=>{u.value.innerHTML=t(i,{highlight:!0,lineNumber:!0})}),(_,p)=>{const E=e;return B(),r("div",D,[F(E,{shadow:"none"},{default:l(()=>[d("div",{class:"syntax-helper",ref_key:"helper",ref:u},null,512)]),_:1}),F(c(a),{class:"slider",body:".syntax-helper",width:"200px"})])}}});const g=o(A,[["__scopeId","data-v-2fea671c"]]);export{g as default};
