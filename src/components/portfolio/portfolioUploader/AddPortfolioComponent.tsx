import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import ButtonComponent from "../../common/ButtonComponent.tsx";
import PortfolioUploadComponent from "./PortfolioUploadComponent.tsx";

function AddPortfolioComponent({
  isActiveIdx,
  setIsActiveIdx,
}: {
  isActiveIdx: number | null;
  setIsActiveIdx: (i: number | null) => void;
}) {
  const handleClose = () => {
    setIsActiveIdx(null);
  };
  const handleOpen = () => {
    //null 이 아니면
    if (isActiveIdx != null) {
      if (
        confirm(
          "수정또는 추가중인 포트폴리오가 있습니다. 기존 창을 닫고 새로 여시겠습니까?",
        )
      ) {
        setIsActiveIdx(-1);
      }
    } else {
      setIsActiveIdx(-1);
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 4 }}>
        포트폴리오 관리
      </Typography>

      <Card sx={{ marginBottom: 4, padding: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CardHeader
            title="포트폴리오 이미지 업로드"
            subheader="포트폴리오에 사용될 이미지와 정보를 업로드하세요."
          />
          {isActiveIdx === -1 && (
            <ButtonComponent
              sx={{ marginLeft: "auto", marginRight: 2 }}
              onClick={() => handleClose()}
            >
              취소
            </ButtonComponent>
          )}
        </Box>
        {isActiveIdx != -1 && (
          <ButtonComponent
            sx={{ marginLeft: 2 }}
            onClick={() => {
              handleOpen();
            }}
          >
            새 포트폴리오 항목 추가
          </ButtonComponent>
        )}
        {isActiveIdx === -1 && (
          <CardContent>
            <PortfolioUploadComponent key={"newPortfolio"} />
          </CardContent>
        )}
      </Card>
    </>
  );
}

export default AddPortfolioComponent;
