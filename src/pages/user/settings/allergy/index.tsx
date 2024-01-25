import { UserHeader } from "@/components/User/Header";
import { AllergySetting } from "@/features/User/Settings/Allergy";
import { getAllergies } from "@/features/User/Settings/Allergy/getAllergies";
// import { UserAllergy } from "@/features/User/Settings/Allergy/type";
import { Allergies } from "@/features/User/Settings/Allergy/type";

const AllergySettingPage = ({ allergy }: { allergy: Allergies }) => {
  return (
    <>
      <UserHeader />
      <AllergySetting allergy={allergy} />
    </>
  );
};

export const getServerSideProps = async () => {
  const allergy = await getAllergies();
  return {
    props: {
      allergy,
    },
  };
};

export default AllergySettingPage;
