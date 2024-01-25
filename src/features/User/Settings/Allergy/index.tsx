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
    const fetchUser = async () => {
      try {
        if (u === undefined || u === null) {
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
      window.location.href = "/user/auth/login";
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
    const differences = getDifferences();
    if (differences.length === 0 || u === undefined || u === null) {
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
    }
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
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <button onClick={() => updateAllergies()}>更新する</button>
      <button onClick={() => console.log(getDifferences())}>差分を表示</button>
    </>
  );
};
