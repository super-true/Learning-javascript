# 6章 再帰 


再帰を使ったソリューションをうまく実装するためのヒントは, 「値は, 大きな問題に内包された小さな問題によって組み立てられるものである」ということを認識することです. `156`  

再帰関数は与えられた引数を論理的には消費するかもしれませんが, 決して実際に消費するべきではありません. `157`  

自己再帰関数を記述する際に考慮すべき条件は次のとおりです `161`  
- 終了条件を知る
- どのように1ステップを行うかを決める
- 問題を, その1ステップもしくはより小さい問題に分解する


#### 6.1.2.1 末尾再帰(自己末尾再帰)

関数内で起こる（終了条件を満たす場合を除いた）最後のアクションが再帰呼び出しであるということです.  `166`

現在は末尾再帰関数を最適化してメモリ消費量を抑えるJavaScriptエンジンは存在しませんが, いつか現れるかもしれません. 
それまでは, 深い再帰呼び出しのたびにコールスタックに大打撃をあたえることになります. 
しかし, 本章でのちほどみることができるように関数の末尾はとてもおもしろい場所です. `166`


## 6.2 再帰多すぎ！（トランポリンとジェネレータ）

現在のJavaScriptエンジンは, たとえ最適化を行えるような状況であっても, 再帰呼び出しの最適化は行いません. `176`

`evenSteven(1000000)`  

evenSteven と oddJohnのように, 0に到達するまで何万回もの相互再帰を繰り返すという性質から発生する問題です.ほとんどのJavaScriptエンジンは再帰の回数に制限を儲けており, このような関数はとても簡単「突然キレる」ことになります. `177`  


__トランポリン (trampoline)__ 

深くネストされた再帰呼び出しの代わりに, トランポリンが呼び出しを「平坦化」します. `177`


### 6.2.1 ジェネレータ (generators)

配列は最初の要素と,それ以降のすべての要素によって構成されるものである、という観点が存在します. `Underscore` が `_.first` と `_.rest` という関数を提供していることもヒントになります. 無限の要素を持つ配列も同様に最初（頭）と残り（尾）の組み合わせとして認識できます. `180`  

「尾を計算する関数」が尾自身になります. そしてこの尾は通常の関数ではなく, 再帰関数です.`180`  
頭/尾のオブジェクトのメンテナンスには, 次の2つの関数が必要です.  

1. 現在の要素の値を計算する関数
2. 次の要素の「シード」となる値を計算する関数

> 言い換えると、**任意の時点での要求に対して「続きの値を」返す関数**です。
> これらを全て念頭に置いて、generator関数を以下のように実装します。

```js
function generator (seed, current, step) {
  return {
    head: current(seed),
    tail: function () {
      console.log('forced') // デモ用の出力で、ロジックには関係ありません
      return generator(step(seed), current, step)
    }
  }
}
```

```js
// アクセサ関数
function genHead (gen) { return gen.head }
function genTail (gen) { return gen.tail() }
```

```
// 使用例
var ints = generator(0, _.identity, function (n) { return n+1 })

genHead(ints) //=> 0
genTail(ints) //=> { head: 1, tail: function }
```

```js
function genTake (n, gen) {
  var doTake = function (x, g, ret) {
    if (x === 0) {
      return ret
    } else {
      return partial(doTake, x-1, genTail(g), cat(ret, getHead(g)))
    }
  }
  return  trampoline(doTake, n, gen, [])
}
```

当然ながら, たとえトランポリンを利用してコールスタックの破綻を防ぐことはできたとしても, タダで防ぐことができたわけではありません. その問題をヒープ領域に押し付けたに過ぎません. 幸運なことにJavaScriptのヒープ領域のサイズはコールスタックよりも数行多いため, トランポリン使用時にメモリ消費量による問題が起こる可能性は著しく低くなります. `184`

- [ヒープ領域についての参考](https://www.ibm.com/developerworks/jp/web/library/wa-jsmemory/)


### 6.2.2 トランポリンの原則とコールバック

`setTImeou` や `XHMLHttpRequest` のような非同期API (略)
この即時なんらかの値を返すことについて本当に興味深いことは,  `JavaScript` はイベントループのそれぞれの新しい `tick` （イベントループ内でタイミングを刻むステップの単位）のたびにコールスタックを白紙に戻すということです.   
非同期コールバックは常にイベントループの新しい `tick` で呼ばれるため, 再帰関数でさえ白紙の状態のコールスタックで実行されます. `185`

```js
function asyncGetAny (interval, urls, onsuccess, onfailure) {
  var n = urls.length
  var looper = function () {
    setTimeout(function () {
      if (i >= n) {
        onfailure('failed')
        return 
      }
      $.get(urls[i], onsuccess)
        .always(function () { console.log('try: ' + urls[i] })
        .fail(function () {
          looper(i + 1)
        })
    }, interval)
  }
  looper(0)
  return 'go'
}
```

```js
// 使用例
var urls = ['http://dsfgfgs.com', 'http://sghjgsj.biz', '_.html', 'foo.txt']

asyncGetAny(2000,
  urls,
  function (data) { alert('データが見つかりました') },
  function (data) { console.log('全て失敗しました') })

// => 'GO'
```

### 再帰は低レイヤーでの操作

再帰は低レイヤーでの操作であり, 可能な場合は避けたほうが良いということです. よりよう方法は, 利用できる高階関数を調べて, それらを組み合わせて新しい関数を生成することです. `186`
