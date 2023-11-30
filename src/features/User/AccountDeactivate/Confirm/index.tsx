import { useState } from "react";
import { doDelete } from "./doDelete";
import router from "next/router";
import useAuth from "@/features/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

// 退会確認を行うReactコンポーネント
export const Confirm = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmError, setConfirmError] = useState("");
  const [touched, setTouched] = useState({
    password: false,
  });

  const user = useAuth();
  const uid = user?.uid || "";

  // フォームの送信ハンドラー
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // パスワードの確認を行い、成功したらサーバーに確認を送信
      const confirmSuccess = await doDelete(password);
      if (confirmSuccess) {
        const res = await fetch("/api/auth/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid }),
        });

        // サーバーのステータスコードを確認し、成功ならば特定のページにリダイレクト
        if (res.status === 200) {
          await router.push("/user/auth/login");
        } else {
          throw new Error("情報変更に失敗しました。時間をあけ、再度お試しください。");
        }
      } else {
        setConfirmError("パスワードが間違っています。");
      }
    } catch (err) {
      console.error(err);
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
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit}>
          <label>
            <div>パスワード</div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={password}
              onBlur={() => setTouched({ ...touched, password: true })}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
            {touched.password && !password && <span>パスワードを入力してください</span>}
          </label>
          <button type="submit" disabled={!password}>
            退会する
          </button>
        </form>
      </div>
    </>
  );
};
