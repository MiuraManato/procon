import { useState } from "react";
import { doConfirm } from "./doConfirm";
import router from "next/router";
import useAuth from "@/features/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

export const Confirm = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmError, setConfirmError] = useState("");
  const [touched, setTouched] = useState({
    password: false,
  });

  const user = useAuth();
  const uid = user?.uid || "";
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const confirmSuccess = await doConfirm(password);
      if (confirmSuccess) {
        const res = await fetch("/api/auth/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid }), // uidの定義がないので注意してください
        });
        if (res.status === 200) {
          await router.push("/user/auth/edit-profile/complete");
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
