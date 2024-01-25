import { useEffect, useState } from "react";
import { Allergies } from "./type";
import { exUser } from "@/features/Order/Menu/type";
import useAuth from "@/features/hooks/useAuth";

export const AllergySetting = ({ allergy }: { allergy: Allergies }) => {
  const [user, setUser] = useState<exUser>();
  const [loading, setLoading] = useState<boolean>(true);
  const [checkedAllergies, setCheckedAllergies] = useState<{ [key: number]: boolean }>({});

  const u = useAuth();

  useEffect(() => {
    if (u === undefined) return;
    if (u === null) {
      window.location.href = "/user/auth/login";
      return;
    }
    const fetchUser = async () => {
      try {
        const userData: exUser = await fetch(`/api/user/${u.uid}`).then((res: Response): Promise<exUser> => res.json());
        setUser(userData);
        // ユーザーのアレルギー情報に基づいてチェック状態を初期化
        const initialCheckedAllergies: { [key: number]: boolean } = {};
        allergy.allergies.forEach((a) => {
          initialCheckedAllergies[a.allergyId] = user
            ? user.allergies.some((ua) => ua.allergyId === a.allergyId)
            : false;
        });
        setCheckedAllergies(initialCheckedAllergies);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser().catch((err) => console.error(err));
    setLoading(false);
  }, [allergy.allergies, u, user]);

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

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div>
        {allergy.allergies.map((a) => (
          <div key={a.allergyId}>
            <input
              type="checkbox"
              name={a.allergyName}
              id={a.allergyId as unknown as string}
              checked={checkedAllergies[a.allergyId]}
              onChange={(e) => handleCheckboxChange(a.allergyId, e.target.checked)}
            />
            <label htmlFor={a.allergyName}>{a.allergyName}</label>
          </div>
        ))}
      </div>
      <button onClick={() => console.log(getDifferences())}>差分を表示</button>
    </>
  );
};
