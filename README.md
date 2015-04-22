Compass-Bootstrap
==========

## Usage

Installing packages and dependencies
```
npm install
```

easymock
```
cd easymock
easymock -p 8080
```

```
- 【思想】Bootstrapをが提供するUIをうまく使って素早くUIを構築する
- 【思想】手書きでラフに書くくらいのスピードでブラウザにワイヤーを描画する。MVPとしてそのままリリースしちゃう。
- Bootstrapが提供するクラス（bs-*ってプレフィックスクラス名にする）とproduct(prod-* プレフィックス, prod-*-ly- みたいな感じ)のクラスを明確に分ける。
- auto-prefixerを使ってブラウザprefix対応する
- 軽量化するため、Bootstrapは使うコンポーネントだけimportするようにする。
- Bootstrapが提供するjsは使わない（とりあえず）
- normalize -> bootstrap -> procduction という感じで上書きして使う
- cssプリプロセッサとしてsassを使用する
- Bootstrapが提供するクラスおよび変数は、基本的には修正しないが適宜修正してもよい。
- 使うBootstrapのコンポーネント ['Glyphicons', 'Dropdowns', 'Button', 'Input groups', 'Navs(Tabs)', 'Breadcrumbs', 'Labels', 'Badges', 'Alerts', 'Progress bars', 'Media object', 'List group', 'Panels', 'Responsive embed']
```

