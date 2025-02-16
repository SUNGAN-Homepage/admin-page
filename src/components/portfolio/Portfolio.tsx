import { Box, Typography, Card, CardContent, CardHeader } from "@mui/material";
import SideMenu from "../common/SideMenu";
import ButtonComponent from "../common/ButtonComponent.tsx";
import { useState } from "react";
import PortfolioList from "./PortfolioList.tsx";
import PortfolioUploadComponent from "./portfolioUploader/PortfolioUploadComponent.tsx";

export default function Portfolio() {
  const [isAddBtn, setIsAddBtn] = useState(false);

  return (
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
            <PortfolioUploadComponent />
          </CardContent>
        )}
      </Card>
      <PortfolioList />
    </SideMenu>
  );
}
