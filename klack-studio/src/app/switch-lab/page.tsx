import type { Metadata } from "next";
import Styles from "@/components/Styles";
import SwitchGuide from "@/components/widgets/SwitchGuide";

export const metadata: Metadata = { title: "스위치 비교", description: "리니어 · 택타일 · 클릭 스위치의 누름 곡선과 소리 비교" };

export default function Page() {
  return (
    <>
      <Styles names={["shop-4", "home-switch-lab-workshop"]} />
      <main className="v2-home">
        <div className="page">
          <h1 className="sr-only">스위치 비교</h1>
          <SwitchGuide />
        </div>
      </main>
    </>
  );
}
