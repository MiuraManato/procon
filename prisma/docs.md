1. [PostgreSQLのインストール](https://qiita.com/tom-sato/items/037b8f8cb4b326710f71)

2. sql shell(psql)の起動する
Server[localhost]: のような表示が出ますがEnterで進んでください。
パスワードを求められたら、インストール時に設定したパスワードを入力してください。デフォルトはpostgresです。

3. データベースの作成
以下の記事を参考にしてデータベースを作成してください。
dbの名前は自由にして構いません
https://www.javadrive.jp/postgresql/database/index2.html

作成したら \l (バックスラッシュエル)でデータベース一覧を確認してください。

作成したデータベースがあることを確認し、\c {データベース名} でデータベースに接続してください。

4. テーブルの作成
init_db.sqlの本番用テストデータより下部分のテーブル作成のSQLをコピーして実行してください。

5. データの利用
.envファイルに以下の形式でデータベースの情報を記述してください。

DATABASE_URL="postgresql://postgres:パスワード@localhost:5432/データベース名"

パスワードはインストール時に設定したものです。

5432の部分はポート番号なので必要に応じて変更してください。


[tera term手順]
sudo su
su - postgres
psql
\c {データベース名}

これでDBに接続できます。
