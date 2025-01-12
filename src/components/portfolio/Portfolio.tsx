import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
} from "@mui/material";
import SideMenu from "../common/SideMenu";
import { ImageUploader } from "./ImageUploader.tsx";
import ButtonComponent from "../common/ButtonComponent.tsx";
import { useState } from "react";
import Dummyimg from "../../assets/dummy.png";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CreateOutlined } from "@mui/icons-material";
export default function Portfolio() {
  const [isAddBtn, setIsAddBtn] = useState(false);
  const [isEditBtn, setIsEditBtn] = useState(false);
  const handleEditBtnClick = () => {
    setIsEditBtn(!isEditBtn);
  };
  return (
    <div>
      <SideMenu>
        <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 4 }}>
          포트폴리오 관리
        </Typography>

        <Card sx={{ marginBottom: 4, padding: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CardHeader
              title="포트폴리오 이미지 업로드"
              subheader="포트폴리오에 사용될 이미지와 정보를 업로드하세요."
            />
            {isAddBtn && (
              <ButtonComponent
                sx={{ marginLeft: "auto", marginRight: 2 }}
                onClick={() => setIsAddBtn(false)}
              >
                취소
              </ButtonComponent>
            )}
          </Box>
          {!isAddBtn && (
            <ButtonComponent
              sx={{ marginLeft: 2 }}
              onClick={() => setIsAddBtn(true)}
            >
              새 포트폴리오 항목 추가
            </ButtonComponent>
          )}
          {isAddBtn && (
            <CardContent>
              <ImageUploader />
            </CardContent>
          )}
        </Card>
        <Card>
          <CardHeader title="testTitle" subheader="내용" />
          <CardContent>
            <img src={Dummyimg} alt="Dummy" width="100%" />
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
              <ImageUploader />
            </Box>
          )}
        </Card>
      </SideMenu>
    </div>
  );
}
