import SideMenu from "../common/SideMenu.tsx";
import EventsList from "./eventsList/EventsList.tsx";
import AddEventsComponent from "./eventsUploader/AddEventsComponent.tsx";
import { useState } from "react";

export default function Events() {
  const [isActiveIdx, setIsActiveIdx] = useState<number | null>(null);

  return (
    <SideMenu>
      <AddEventsComponent
        isActiveIdx={isActiveIdx}
        setIsActiveIdx={setIsActiveIdx}
      />
      <EventsList isActiveIdx={isActiveIdx} setIsActiveIdx={setIsActiveIdx} />
    </SideMenu>
  );
}
