// ReactのuseStateフックをインポート
import { useState } from "react";

// doConfirm関数をインポート
import { doConfirm } from "./doConfirm";

// Next.jsのルーターをインポート
import router from "next/router";

// カスタムフック useAuth をインポート
import useAuth from "@/features/hooks/useAuth";

// FontAwesomeIconをインポート
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// FontAwesomeのアイコンをインポート
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

// 退会確認を行うReactコンポーネント
export const Confirm = () => {
  // パスワードの状態管理
  const [password, setPassword] = useState("");
  // パスワード表示/非表示の状態管理
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // 確認エラーの状態管理
  const [confirmError, setConfirmError] = useState("");
  // 入力のタッチ状態を管理
  const [touched, setTouched] = useState({
    password: false,
  });

  // ユーザー情報を取得
  const user = useAuth();
  // ユーザーIDを取得（もし取得できなければ空文字列）
  const uid = user?.uid || "";

  // フォームの送信ハンドラー
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // フォームのデフォルトの動作を防止

    try {
      // パスワードの確認を行い、成功したらサーバーに確認を送信
      const confirmSuccess = await doConfirm(password);
      if (confirmSuccess) {
        // サーバーに確認を送信
        const res = await fetch("/api/auth/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid }), // uidを送信（ここでuidの定義がないことに注意）
        });

        // サーバーのステータスコードを確認し、成功ならば特定のページにリダイレクト
        if (res.status === 200) {
          await router.push("/user/auth/edit-profile/complete");
        } else {
          throw new Error("情報変更に失敗しました。時間をあけ、再度お試しください。");
        }
      } else {
        // パスワードが間違っている場合のエラーをセット
        setConfirmError("パスワードが間違っています。");
      }
    } catch (err) {
      console.error(err);
      // 退会中にエラーが発生した場合のエラーをセット
      setConfirmError("退会中にエラーが発生しました。時間をあけ、再度実行してください。");
    }
  };

  // パスワード表示/非表示のトグル処理
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div>
        <h1>退会確認</h1>
        {confirmError && <p>{confirmError}</p>}
        {/* フォーム */}
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit}>
          <label>
            <div>パスワード</div>
            {/* パスワード入力フィールド */}
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={password}
              onBlur={() => setTouched({ ...touched, password: true })}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* パスワード表示/非表示のボタン */}
            <button type="button" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
            {/* パスワード未入力時のエラーメッセージ */}
            {touched.password && !password && <span>パスワードを入力してください</span>}
          </label>
          {/* 退会ボタン */}
          <button type="submit" disabled={!password}>
            退会する
          </button>
        </form>
      </div>
    </>
  );
};
