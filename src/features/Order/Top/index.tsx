import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faChild } from "@fortawesome/free-solid-svg-icons";
import router from "next/router";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";
import Head from "next/head";

const EmployeeButton = () => {
  return (
    <button
      className={styles.employeeButton}
      onClick={() => {
        void router.push("/order/employee/login").then().catch();
      }}
    >
      従業員画面
    </button>
  );
};

export const OrderTop = () => {
  const [numberOfPeople, setNumberOfPeople] = useState({
    adult: 0,
    child: 0,
  });
  const [tableId, setTableId] = useState<number | null>(null);
  const [isErrorTableId, setIsErrorTableId] = useState(false);
  const [warning, setWarning] = useState(true);

  // 人数を変更する関数
  const handleChangeNumberOfPeople = (key: "adult" | "child", method: "add" | "sub") => {
    setNumberOfPeople((prev) => ({
      ...prev,
      [key]: method === "add" ? prev[key] + 1 : prev[key] > 0 ? prev[key] - 1 : 0,
    }));
  };

  // 人数登録ボタンを押した時の処理
  const handleSubmit = async () => {
    // テーブルIDが設定されていないか、大人も子供も0人の場合に処理を終了
    if (tableId === null || (numberOfPeople.adult === 0 && numberOfPeople.child === 0)) return;
    const res = await fetch("/api/table/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableId,
        numberOfPeople,
      }),
    });

    if (!res.ok) {
      alert("エラーが発生しました。");
      return;
    }

    void router.push("/order/menu").then().catch();
  };

  // Firebaseの認証情報を取得
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    // ログインしていたらログアウトさせる
    if (auth.currentUser !== null) {
      void auth.signOut();
    }

    // ローカルストレージからテーブルIDを取得
    const table = Number(localStorage.getItem("table"));

    // テーブルIDが設定されていればセットし、設定されていなければエラーを表示
    if (table) {
      setTableId(table);
      setIsErrorTableId(false);
    } else {
      setIsErrorTableId(true);
    }
  }, [auth]);

  return (
    <div className={styles.container}>
      <Head>
        <title>人数入力 | PersonalizedMenu</title>
      </Head>
      <div className={styles.EmployeeButton}>
        <EmployeeButton />
      </div>
      <div className={styles.persons}>
        <h1 className={styles.title}>人数選択</h1>
        <div className={styles.selectionArea}>
          <div className={styles.personSelection}>
            <FontAwesomeIcon icon={faPerson} className={styles.icon} />
            <button className={styles.changeButton} onClick={() => handleChangeNumberOfPeople("adult", "sub")}>
              －
            </button>
            <span className={styles.numberDisplay}>{numberOfPeople.adult}</span>
            <button className={styles.changeButton} onClick={() => handleChangeNumberOfPeople("adult", "add")}>
              ＋
            </button>
          </div>
          <div className={styles.personSelection}>
            <FontAwesomeIcon icon={faChild} className={styles.icon} />
            <button className={styles.changeButton} onClick={() => handleChangeNumberOfPeople("child", "sub")}>
              －
            </button>
            <span className={styles.numberDisplay}>{numberOfPeople.child}</span>
            <button className={styles.changeButton} onClick={() => handleChangeNumberOfPeople("child", "add")}>
              ＋
            </button>
          </div>
        </div>
        <div className={styles.humanlabel}>
          <div className={styles.bighuman}>20歳以上</div>
          <div className={styles.smallhuman}>20歳未満</div>
        </div>

        <button
          disabled={numberOfPeople.adult <= 0 && numberOfPeople.child <= 0}
          className={styles.submitButton}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleSubmit}
        >
          次へ
        </button>
      </div>
      {isErrorTableId && (
        <div className={styles.errorModal}>
          <div className={styles.errorModalContent}>
            <p className={styles.errorModalText}>テーブルIDが設定されていません</p>
            <button
              className={styles.errorModalButton}
              onClick={() => {
                void router.push("/order/employee/login").then().catch();
              }}
            >
              テーブルIDを設定する
            </button>
          </div>
        </div>
      )}
      {warning && (
        <div className={styles.modal}>
          <div className={styles.warningModal}>
            <div className={styles.warningModalContent}>
              <h2 className={styles.warningTitle}>重要：20歳未満のお客様へのアルコール提供に関するご注意</h2>
              <li className={styles.warningText}>
                当店では、お客様と社会の安全を守るため、未成年者（20歳未満の方）へのアルコール提供を固く禁じています。日本国内の法律では、20歳未満の方の飲酒は法律で禁止されており、違反した場合には罰則が適用されます。
              </li>
              <li className={styles.warningText}>
                20歳未満の方には、アルコール飲料の提供、販売、または飲酒をさせることはできません。
              </li>
              <li className={styles.warningText}>
                ご注文の際、アルコール含有飲料を選択されるお客様には、年齢確認を実施しております。身分証明書の提示をお願いする場合がございますので、ご協力をお願いいたします。
              </li>
              <li className={styles.warningText}>
                アルコール飲料をご注文の場合、20歳未満の方と一緒にいるお客様も、同席している未成年者への提供は厳禁であることを予めご了承ください。
              </li>
              <br />
              <p className={styles.warningText}>
                未成年者の健康と成長を守るため、また、社会的責任を果たすため、ご理解とご協力を心よりお願い申し上げます。
              </p>
              <p className={styles.warningText}>
                <b>
                  ボタンを押すと、「20歳未満のお客様へのアルコール提供に関する重要なご注意」に同意したとみなされます。
                </b>
              </p>
              <button
                className={styles.closeButton}
                onClick={() => {
                  setWarning(false);
                }}
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
