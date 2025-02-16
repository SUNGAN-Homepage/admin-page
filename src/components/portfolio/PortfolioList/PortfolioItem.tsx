import { Box, Button, Card, CardContent, CardHeader } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CreateOutlined } from "@mui/icons-material";
import PortfolioUploadComponent from "../portfolioUploader/PortfolioUploadComponent.tsx";

interface Item {
  id: string;
  title: string;
  text: string;
  img: string; // 이미지 경로 또는 이미지 객체
}

function PortfolioItem({
  item,
  index,
  isActiveIdx,
  setIsActiveIdx,
}: {
  item: Item;
  index: number;
  isActiveIdx: number | null;
  setIsActiveIdx: (i: number | null) => void;
}) {
  const handleCloseOpen = () => {
    //열려 있으면 닫기
    if (isActiveIdx === index) {
      setIsActiveIdx(null);
    } else {
      //     닫겨있으면 열기
      if (isActiveIdx != null) {
        if (
          confirm(
            "수정또는 추가중인 항목이 있습니다. 기존 창을 닫고 새로 여시겠습니까?",
          )
        ) {
          setIsActiveIdx(index);
        }
      } else setIsActiveIdx(index);
    }
  };
  return (
    <Card sx={{ marginTop: "20px", marginBottom: "20px" }}>
      <CardHeader title={item.title} subheader={item.text} />
      <CardContent>
        <img src={item.img} alt="Dummy" width="100%" />
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          padding: 2,
        }}
      >
        <Button
          variant="outlined"
          sx={{ color: "black", borderColor: "#e4e3e7" }}
          onClick={handleCloseOpen}
        >
          <CreateOutlined sx={{ marginRight: 1 }} />
          {isActiveIdx === index ? "수정 취소" : "수정"}
        </Button>
        <Button variant="contained" color="error">
          <DeleteOutlineIcon sx={{ marginRight: 1 }} />
          삭제
        </Button>
      </Box>
      {isActiveIdx === index && (
        <Box sx={{ padding: 2 }}>
          <PortfolioUploadComponent key={item.id} />
        </Box>
      )}
    </Card>
  );
}

export default PortfolioItem;
