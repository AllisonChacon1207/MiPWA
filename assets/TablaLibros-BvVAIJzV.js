import{Q as a}from"./QTable-DTE26vtu.js";import{Q as l}from"./QPage-BjjP-tFT.js";import{a as n}from"./index-C88pvD_q.js";import{_ as i}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{E as c,F as u,G as m,r as f,x as p,I as b}from"./index-EkXgyMGK.js";import"./QBtn-B3dqwFVL.js";import"./render-DC9L9grX.js";import"./use-prevent-scroll-B6FPtlij.js";const d={setup(){const t=f([]),r=[{name:"author",label:"Autor",field:"author",align:"left"},{name:"title",label:"Título",field:"title",align:"left"},{name:"subjects",label:"Subjects",field:"subjects",align:"left"}];return p(async()=>{try{const o=await n.get("https://openlibrary.org/authors/OL1394244A/works.json?limit=5");t.value=o.data.entries.map(e=>({author:"Cory Doctorow",title:e.title,subjects:e.subjects?e.subjects.join(", "):"No disponible"}))}catch(o){console.error("Error al obtener los datos:",o)}}),{books:t,columns:r}}};function k(t,r,s,o,e,h){return u(),c(l,{padding:""},{default:m(()=>[b(a,{flat:"",bordered:"",title:"Libros del Autor",rows:o.books,columns:o.columns,"row-key":"key",onRowClick:t.onRowClick},null,8,["rows","columns","onRowClick"])]),_:1})}const Q=i(d,[["render",k]]);export{Q as default};
