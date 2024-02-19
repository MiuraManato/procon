# プログラミングコンテスト(卒業制作)

## 前提環境

- Node.js v20.9.0
- npm 10.1.0 or yarn@3.6.4

## セットアップ
1. [プロジェクトのセットアップ](#プロジェクトのセットアップ)
2. [データベースのセットアップ](#データベースのセットアップ)
3. [Firebaseのセットアップ](#Firebaseのセットアップ)
4. [ローカルでの実行](#ローカルでの実行)

# 手順

## [プロジェクトのセットアップ](#プロジェクトのセットアップ)
```bash
# Clone the repository
git clone https://github.com/mmiura-2351/procon.git
# Go to the project directory
cd procon
# Install dependencies
npm run i
# or yarn i
```

## [データベースのセットアップ](#データベースのセットアップ)
Supabaseを使用しています。登録してください。

[登録する | Supabase](https://supabase.com/dashboard/sign-in)

登録をしたら、プロジェクトを作成し、API URLとAPI KEY(Service role)を取得してください。

Supabaseの左のメニュー -> Project settings -> API -> API URLとService roleをコピーしておいてください。


取得したAPI URLとAPI KEYを`.env`ファイルに記述してください。

```yaml
# Create `/procon/.env`
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SERVICE_ROLE=YOUR_SUPABASE_SERVICE_KEY
```

また、他に接続のための情報を`.env`ファイルに記述してください。

Supabaseの左のメニュー -> Project settings -> DATABASE -> Connection string -> URI をコピーしておいてください。

この時にデフォルトで入っているUse connection poolingをつけた状態、つけない状態の2つをコピーしておいてください。

```yaml
# つけた状態のURI(postgres://postgres.[PROJECT-ID]:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres)
DATABASE_URL=YOUR_SUPABASE_DATABASE_URL
# つけない状態のURI(postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres)
DIRECT_URL=YOUR_SUPABASE_DIRECT_DATABASE_URL
```

[YOUR-PASSWORD], [PROJECT-ID]は適切に変更してください。

データベースの作成
```bash
# migrate database
npx prisma migrate dev --name init
```
マイグレートでエラーが出てないことを確認し、Supabaseのデータベースにテーブルが作成されていることを確認してください。

## [Firebaseのセットアップ](#Firebaseのセットアップ)
Firebaseを使用しています。登録してください。

[登録する | Firebase](https://console.firebase.google.com/)

登録をしたら、プロジェクトを作成し、Firebaseの設定を行ってください。

1. ウェブアプリを追加を選択
2. アプリのニックネームを入力
3. 「npmの設定を使用する」を選択
4. 以下のようなコンフィグをコピーしておく
```javascript
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id",
};
```
5. コピーしたコンフィグを元に`.env`ファイルに記述してください。
```yaml
# Create `/procon/.env`
NEXT_PUBLIC_FIREBASE_APIKEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTHDOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECTID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGEBUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APPID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENTID
```
6. Firebaseの機能を有効にする
  - Authentication
  - Storage

### Authentication
1. Authenticationを選択
2. 始めるを選択
3. ログイン方法に移動
4. メール/パスワードを有効にする
5. 保存

メール/パスワードのステータスが有効になっていればOK

### Storage
1. 本番モードで開始
2. ロケーションを選択(asia-northeast1)
3. 保存
4. Ruleに移動
5. 以下のように設定

今回は簡単のため、全てのファイルに対して読み書きを許可しています。
```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {

    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```
6. ルールを公開
7. Filesに移動
8. フォルダを作成
  - `images/`
9. 画像を適当にアップロードしてください。
10. アップロードした画像をクリック
11. 右のメニューからアップロードした画像のファイル名をクリック(名前の下にあるリンク)
12. 新しく開いたタブのURLをコピーしておいてください。

### データベースの初期データ
次にデータベースの初期データを登録します。
データは`/prisma/init_db.sql`に記述しています。
コピーをして、SQL Editorに貼り付けて実行してください。

注意点として、`/prisma/init_db.sql`に記述されている`'your_image_url'`を先ほどコピーした画像のURLに変更してください。(置換すると楽)

## [ローカルでの実行](#ローカルでの実行)
```bash
# Run the development server
npm run dev
# or yarn dev
```