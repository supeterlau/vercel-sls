https://koajs.com/
yarn add koa

npm install @koa/cors --save

fetch('http://localhost:3000', {
  mode: 'cors'
}).then(response => response.json())
.then(data => console.log(data));