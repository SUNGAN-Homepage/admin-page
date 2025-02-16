import SideMenu from "../common/SideMenu";
import PortfolioList from "./PortfolioList/PortfolioList.tsx";
import AddPortfolioComponent from "./portfolioUploader/AddPortfolioComponent.tsx";
import { useState } from "react";

export default function Portfolio() {
  const [isActiveIdx, setIsActiveIdx] = useState<number | null>(null);
  return (
    <SideMenu>
      <AddPortfolioComponent
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
