import { Box } from "@mui/material";
import EventsItem from "./EventsItem.tsx";
import { useEffect, useState } from "react";
import DummyImg from "../../../assets/dummy.png";

interface Item {
  id: string;
  title: string;
  text: string;
  img: string;
}

function EventsList({
  isActiveIdx,
  setIsActiveIdx,
}: {
  isActiveIdx: number | null;
  setIsActiveIdx: (i: number | null) => void;
}) {
  const [data, setData] = useState<Item[]>([]);
  const dummyData: Item[] = [
    { id: "0", title: "이미지1", text: "내용1", img: DummyImg },
    { id: "1", title: "이미지2", text: "내용2", img: DummyImg },
  ];

  //백엔드 데이터 받아오기
  useEffect(() => {
    setData(dummyData);
  }, []);

  return (
    <Box>
      {data.map((item: Item, index: number) => (
        <EventsItem
          item={item}
          key={item.id}
          index={index}
          isActiveIdx={isActiveIdx}
          setIsActiveIdx={setIsActiveIdx}
        />
      ))}
    </Box>
  );
}

export default EventsList;
