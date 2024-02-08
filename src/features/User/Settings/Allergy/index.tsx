import { useEffect, useState } from "react";
import { Allergies } from "./type";
import { exUser } from "@/features/Order/Menu/type";
import useAuth from "@/features/hooks/useAuth";
import styles from "./index.module.css";
import Head from "next/head";
import Router from "next/router";

export const AllergySetting = ({ allergy }: { allergy: Allergies }) => {
  const [user, setUser] = useState<exUser>();
  const [loading, setLoading] = useState<boolean>(true);
  const [checkedAllergies, setCheckedAllergies] = useState<{ [key: number]: boolean }>({});
  const [updated, setUpdated] = useState<boolean>(false);

  const u = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (u === undefined || u === null) {
          setLoading(true);
          return;
        }
        const userData: exUser = await fetch(`/api/user/${u.uid}`).then((res: Response): Promise<exUser> => res.json());
        setUser(userData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (u === undefined) return;
    if (u === null) {
      Router.push("/user/auth/login").catch(console.error);
    }
    fetchUser().catch((err) => console.error(err));
  }, [u]);

  useEffect(() => {
    if (!user) return;
    const initialCheckedAllergies: { [key: number]: boolean } = {};
    allergy.allergies.forEach((a) => {
      initialCheckedAllergies[a.allergyId] = user.allergies.some((ua) => ua.allergyId === a.allergyId);
    });
    setCheckedAllergies(initialCheckedAllergies);
  }, [user, allergy.allergies]);

  const handleCheckboxChange = (allergyId: number, checked: boolean) => {
    setCheckedAllergies((prevState) => ({
      ...prevState,
      [allergyId]: checked,
    }));
  };

  // 差分を取得する関数
  const getDifferences = () => {
    if (!user) {
      return [];
    }
    const differences = [];
    for (const allergyId in checkedAllergies) {
      if (user.allergies.some((ua) => ua.allergyId === parseInt(allergyId)) !== checkedAllergies[allergyId]) {
        differences.push({ allergyId: parseInt(allergyId), isChecked: checkedAllergies[allergyId] });
      }
    }
    return differences;
  };

  const updateAllergies = async () => {
    setLoading(true);
    const differences = getDifferences();
    if (differences.length === 0 || u === undefined || u === null) {
      setLoading(false);
      return;
    }
    try {
      await fetch(`/api/user/updateAllergies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: u.uid, differences: differences }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setUpdated(true);
    }
  };

  if (u === undefined || u === null || loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>アレルギー設定 | PersonalizedMenu</title>
      </Head>
      <div className={styles["container"]}>
        <h1 className={styles.title}>アカウント情報変更</h1>
        {updated && <div className={styles["update-success"]}>更新が完了しました</div>}
        <div className={styles["allergy-list"]}>
          {allergy.allergies.map((a) => (
            <div key={a.allergyId} className={styles["allergy-item"]}>
              <input
                type="checkbox"
                name={a.allergyName}
                id={a.allergyId.toString()}
                checked={checkedAllergies[a.allergyId]}
                onChange={(e) => handleCheckboxChange(a.allergyId, e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor={a.allergyId.toString()} className={styles.label}>
                {a.allergyName}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className={styles["button-container"]}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button onClick={() => updateAllergies()} className={styles.button}>
          更新する
        </button>
      </div>
    </>
  );
};
