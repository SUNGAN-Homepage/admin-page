import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import ButtonComponent from "../../common/ButtonComponent.tsx";
import PortfolioUploadComponent from "./PortfolioUploadComponent.tsx";

function AddPortfolioComponent({
  isActiveIdx,
  setIsActiveIdx,
  isEvents,
}: {
  isActiveIdx: number | null;
  setIsActiveIdx: (i: number | null) => void;
  isEvents: boolean;
}) {
  const handleClose = () => {
    setIsActiveIdx(null);
  };
  const handleOpen = () => {
    //null 이 아니면
    if (isActiveIdx != null) {
      if (
        confirm(
          "수정또는 추가중인 항목이 있습니다. 기존 창을 닫고 새로 여시겠습니까?",
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
        {isEvents ? "행사" : "프로필"} 이미지 관리
      </Typography>

      <Card sx={{ marginBottom: 4, padding: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CardHeader
            title={`${isEvents ? "행사" : "프로필"} 이미지 업로드`}
            subheader={`${isEvents ? "행사" : "프로필"}에 사용될 이미지와 정보를 업로드하세요.`}
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
            새 {isEvents ? "행사" : "프로필"} 항목 추가
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
