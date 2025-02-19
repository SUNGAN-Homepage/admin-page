import SideMenu from "../common/SideMenu.tsx";
import PortfolioList from "./profileList/PortfolioList.tsx";
import AddProfileComponent from "./profileUploader/AddProfileComponent.tsx";
import { useState } from "react";

export default function Profile() {
  const [isActiveIdx, setIsActiveIdx] = useState<number | null>(null);

  return (
    <SideMenu>
      <AddProfileComponent
        isActiveIdx={isActiveIdx}
        setIsActiveIdx={setIsActiveIdx}
      />
      <PortfolioList
        isActiveIdx={isActiveIdx}
        setIsActiveIdx={setIsActiveIdx}
      />
    </SideMenu>
  );
}
