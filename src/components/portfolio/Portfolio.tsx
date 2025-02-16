import SideMenu from "../common/SideMenu";
import PortfolioList from "./PortfolioList/PortfolioList";
import AddPortfolioComponent from "./portfolioUploader/AddPortfolioComponent";
import { useState } from "react";

export default function Portfolio({ isEvents }: { isEvents: boolean }) {
  const [isActiveIdx, setIsActiveIdx] = useState<number | null>(null);
  return (
    <SideMenu>
      <AddPortfolioComponent
        isEvents={isEvents}
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
