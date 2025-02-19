import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import ButtonComponent from "../../common/ButtonComponent.tsx";
import ProfileUploadComponent from "./ProfileUploadComponent.tsx";
function AddProfileComponent({
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
          "수정또는 추가중인 항목가 있습니다. 기존 창을 닫고 새로 여시겠습니까?",
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
        프로필 이미지 관리
      </Typography>

      <Card sx={{ marginBottom: 4, padding: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CardHeader
            title="프로필 이미지 업로드"
            subheader="프로필에 사용할 사진과 정보를 입력하세요"
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
            새 프로필 항목 추가
          </ButtonComponent>
        )}
        {isActiveIdx === -1 && (
          <CardContent>
            <ProfileUploadComponent key={"newPartner"} />
          </CardContent>
        )}
      </Card>
    </>
  );
}

export default AddProfileComponent;
