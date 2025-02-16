import { useState } from "react";
import SideMenu from "../common/SideMenu.tsx";
import PartnerList from "./partnerList/PartnerList.tsx";
import AddPartnerComponent from "./partnerUploader/AddPartnerComponent.tsx";

function Partner() {
  const [isActiveIdx, setIsActiveIdx] = useState<number | null>(null);

  return (
    <SideMenu>
      <AddPartnerComponent
        isActiveIdx={isActiveIdx}
        setIsActiveIdx={setIsActiveIdx}
      />
      <PartnerList isActiveIdx={isActiveIdx} setIsActiveIdx={setIsActiveIdx} />
    </SideMenu>
  );
}

export default Partner;
