# オブザーバー

![IMG_4FEDA17B8627-1](https://user-images.githubusercontent.com/4797793/222316585-d58df938-aa04-4a18-9452-b10df4743e3e.jpeg)

## 概要
オブザーバーパターンの実装方法には、プッシュとプルの2つがあります。 

- __プッシュメソッド__ - オブザーバーは監視対象オブジェクトをサブスクライブし、監視対象に注目すべき事象が発生した場合にオブザーバーに連絡して知らせます
  - DOMイベントの挙動
- __プルメソッド__ - 監視対象は、オブザーバーの持つサブスクリプションリスに追加されます。
定期的に、または指定された時に、オブザーバーは、監視対象内で変更が発生したかどうかをチェックし、変更があった場合はその変更に反応して何らかの処理を実行します。
  - デスクトップソフトウェアでのアップデート処理など

__よく使われるメソッド名__
|機能|メソッド名|
|:-|:-|
|subscribe|`subscribe` `on` `observe`|
|unsubscribe|`unsubscribe` `off` `remove` `unobserve`|
|publish|`publish` `broadcast` `emit` `fire`|

## 派生
- [発行/購読パターン](https://github.com/kesuiket/js-snippets/blob/master/codes/eventEmitter/pubsub.js)

### オブザーバーパターンと発行/購読パターンの違い
![IMG_B68C574D43D4-2](https://user-images.githubusercontent.com/4797793/222316299-f40a7b96-a05b-4e2d-9c69-57853aee89cd.jpeg)

## 実装例
- [Adobe Developer Connection](https://github.com/stage-clear/Learning-javascript/blob/master/DesignPatterns/Adobe-Developer-Connection/observer.md)
- [JavaScript Design Patterns](https://github.com/stage-clear/Learning-javascript/blob/master/DesignPatterns/JavaScript-Design-Patterns/observer.md)
- [JavaScript Patterns](https://github.com/stage-clear/Learning-javascript/blob/master/DesignPatterns/JavaScript-Patterns/observer.md)
- [DoFactory](https://github.com/stage-clear/Learning-javascript/blob/master/DesignPatterns/dofactory.com/observer.md)
- [Design Patterns Game](https://github.com/stage-clear/Learning-javascript/blob/master/DesignPatterns/designpatternsgame.com/observer.md)
- [sitepoint.com](https://github.com/stage-clear/Learning-javascript/blob/master/DesignPatterns/sitepoint.com/observer.md)
