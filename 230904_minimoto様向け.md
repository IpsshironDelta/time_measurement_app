---
marp: true
theme: gaia
size: 16:9
paginate: true
headingDivider: 2
header: 業務記録ツールの概要について
footer: by Yasuhiro Sueda

style: | 
  img[src*='#center'] { 
    display: block;
    margin: auto;
  }

  footer {
      color: #000;
      font-size: 18px;
      text-align: center;
  }
  
  h1 {
      border-bottom: 2px solid #000;
      font-size: 50px;
      margin-bottom: 50px;
      padding-bottom: 10px;
      width: 100%;
  }
 
  h2 {
     border-bottom: 2px solid #000;
      font-size: 40px;
      margin-bottom: 50px;
      padding-bottom: 10px;
      width: 100%;
  }

  h3 {
    font-size: 35px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    width: 100%;
  }

  h4 {
    font-size: 25px;
    width: 100%;
  }

  h5 {
    font-size: 20px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    width: 100%;
  }

  h6 {
    font-size: 14px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    width: 100%;
  }
 
  p {
    font-size: 25px;
    line-height: 1.5;
  }
 
  ul {
    font-size: 23px;
    list-style: square;
    width: 85%;
  }
 
  table {
      background: none;
      font-size: 25px;
      text-align: center;
      width: 100%;
  }
 
  table thead th {
      background: #6495ed;
      color: #000;
      font-size: 23px;
      padding: 15px;
  }
 
  table td {
      padding: 10px;
      font-size: 20px;
  }
---

# 業務記録ツールの概要について

<!--
_class: lead
_paginate: false
_header: ""
-->

---
### 本日のアジェンダは以下の通りです。
1. 必要な機能について
2. 機能概要
3. 機能詳細
4. 動作環境
5. 作業期間と御見積額について
6. 見積詳細

# 1. 必要な機能について
### 概要
- 作業時間を計測するツール
- 実際にかかった時間、その作業の平均値を知りたい。
- iPadなどを使用したい。

# 2. 機能概要
### 画面構成について

|No.| 画面 | ユーザー | 機能 |
|:---|:---| :--- | :--- |
|1|メイン画面|管理者<br>ユーザー|作業時間を計測する為に使用|
|2|記録確認画面|管理者<br>ユーザー|過去の作業記録を確認する為に使用|
|3-1|記録編集画面(管理者用)|管理者|過去の作業記録を削除するために使用|
|3-2|記録編集画面(ユーザー用)|ユーザー|過去の作業記録を削除するために使用(自分の記録のみ)|
|4|ユーザー情報編集画面|管理者<br>ユーザー|各ユーザーのプロフィール、パスワード、の変更に使用|

---
### 機能概要について
- 利用者は必ずユーザー登録をする(メールアドレス/パスワード)。
- 管理者権限を持つユーザーのみ、全ユーザーの全作業記録を削除/編集できる。
- 一般ユーザーは、他のユーザーの過去の記録を閲覧できる。
- 一般ユーザーは、自分の記録のみ削除/編集できる。(当日の記録のみ編集可能)
- 管理者/一般ユーザー権限に関わらず過去の記録に対して、イイねやコメントなどのコミュニケーションを図れる。

# 3. 機能詳細
- 記録する情報は以下の通り
  - 記録日時：yyyy/mm/dd hh:mm
  - 記録者名前
  - 業務内容
  - 該当業務の平均値
  - イイね数(※)
  - コメント(※)
- 登録するユーザー情報は以下の通り
  - メールアドレス
  - パスワード
  - プロフィール画像
  - 名前

- ※の箇所については別途ご説明します。

# 4. 動作環境
- UI(フレームワーク)
  - Material-UIを使用
  - Material-UI(MUI)とはFacebookなどにも使用されているフレームワークです。
  - Googleのマテリアルデザインで構築されており、要素に洗練されたシンプルなデザインを備えています。また、コンポーネント(部品)がたくさんあり、高品質の外観をReactアプリに簡単に統合できます。
  - 【参考】https://mui.com/material-ui/getting-started/
- DB(データベース)
  - Firebaseを使用します。
  - FirebaseとはGoogleが提供しているモバイルプラットフォームで、今回の規模のWebアプリであれば無料でアプリ開発、運用が可能です。

# 5. 作業期間と御見積額について
### 作業期間
  - 約2カ月を想定
### 御見積額
  - \ 115,000　円

# 6. 見積詳細
- 御見積額の内訳は以下の通りです。
- 【内訳】
  - 基本料金----------------------------50,000
  - ユーザー認証機能-----------------5,000
  - 認証パスワードリセット機能----5,000
  - プロフィール編集機能------------5,000
  - アプリデザイン設計---------------40,000
  - イイね機能-------------------------5,000※
  - コメント/チャット機能-----------5,000※

※ココナラのサービス詳細に提示している見積項目を参考にしております。
※「イイね機能」「コメント/チャット機能」は提案事項になりますため、不要であればお値引き可能です。




