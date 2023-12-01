import { useState } from "react";
import { doPasswordReset } from "./doPasswordReset";

export const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [passwordResetError, setPasswordResetError] = useState("");
  const [touched, setTouched] = useState({
    email: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginSuccess = await doPasswordReset(email);
      if (loginSuccess) {
        alert("メールを送信しました。");
      } else {
        setPasswordResetError("指定されたメールアドレスは登録されていません。");
      }
    } catch (err) {
      console.error(err);
      setPasswordResetError("メール送信中にエラーが発生しました。時間をあけ、再度実行してください。");
    }
  };
  return (
    <>
      <div>
        <h1>パスワードリセット</h1>
      </div>
      {passwordResetError && <div>{passwordResetError}</div>}
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit}>
        <label>
          <div>登録されているメールアドレスを入力してください</div>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onBlur={() => setTouched({ ...touched, email: true })}
            onChange={(e) => setEmail(e.target.value)}
          />
          {touched.email && !email && <span>メールアドレスを入力してください</span>}
        </label>
        <br />
        <button type="submit" disabled={!email}>
          メールを送信
        </button>
      </form>
    </>
  );
};
