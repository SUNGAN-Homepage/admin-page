import { Box, Button, Card, CardContent, CardHeader } from "@mui/material";
import DummyImg from "../../assets/dummy.png";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CreateOutlined } from "@mui/icons-material";
import { useState } from "react";
import PortfolioUploadComponent from "./portfolioUploader/PortfolioUploadComponent.tsx";

function PortfolioList() {
  const [isEditBtn, setIsEditBtn] = useState(false);

  const handleEditBtnClick = () => {
    setIsEditBtn(!isEditBtn);
  };
  return (
    <Card>
      <CardHeader title="testTitle" subheader="내용" />
      <CardContent>
        <img src={DummyImg} alt="Dummy" width="100%" />
      </CardContent>
      <Box></Box>
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
          onClick={handleEditBtnClick}
        >
          <CreateOutlined sx={{ marginRight: 1 }} />
          {isEditBtn ? "수정 취소" : "수정"}
        </Button>
        <Button variant="contained" color="error">
          <DeleteOutlineIcon sx={{ marginRight: 1 }} />
          삭제
        </Button>
      </Box>
      {isEditBtn && (
        <Box sx={{ padding: 2 }}>
          <PortfolioUploadComponent />
        </Box>
      )}
    </Card>
  );
}

export default PortfolioList;
