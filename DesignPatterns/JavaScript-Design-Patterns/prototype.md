# Prototype

## 実装例
```js
var beget = (function () {
  function F() {}
  
  return function (proto) {
    F.prototype = proto;
    return new F();
  }  ;
})();
```
