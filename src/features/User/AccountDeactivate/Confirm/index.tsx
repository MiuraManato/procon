import { useState } from "react";
import { doConfirm } from "./doConfirm";
export const Confim = () => {
  const [password, setPassword] = useState("");
  const [confirmError, setconfirmError] = useState("");
  const [touched, setTouched] = useState({
    password: false,
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const confirmSuccess = await doConfirm(password);
      if (confirmSuccess) {
        window.location.href = "/user/account/deactivate/complete";
      } else {
        setconfirmError("パスワードが間違っています。");
      }
    } catch (err) {
      console.error(err);
      setconfirmError("退会中にエラーが発生しました。時間をあけ、再度実行してください。");
    }
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
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onBlur={() => setTouched({ ...touched, password: true })}
              onChange={(e) => setPassword(e.target.value)}
            />
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
