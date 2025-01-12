import SideMenu from "../common/SideMenu.tsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import ButtonComponent from "../common/ButtonComponent.tsx";
import { useState } from "react";

function Email() {
  const [isEdit, setIsEdit] = useState(false);
  const [email, setEmail] = useState("contact@example.com");
  return (
    <SideMenu>
      <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 4 }}>
        Email 설정
      </Typography>
      <Card sx={{ marginBottom: 4, padding: 2 }}>
        <Box sx={{ alignItems: "center" }}>
          <CardHeader
            title="연락처 이메일 관리"
            subheader="사용자들이 연락할 수 있는 이메일 주소를 관리합니다."
          />
          <CardContent>
            {isEdit ? (
              <TextField
                placeholder={"이메일을 입력해주세요"}
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <Typography variant={"h6"} sx={{ fontWeight: "bold" }}>
                {email}
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end", // 오른쪽 정렬
                gap: 2, // 버튼 간의 간격
                marginTop: 3,
              }}
            >
              {/* 취소 버튼 */}
              {isEdit && (
                <Button
                  size={"large"}
                  variant={"outlined"}
                  sx={{
                    color: "black",
                    borderColor: "#e4e4e7",
                  }}
                  onClick={() => {
                    setIsEdit(false);
                  }}
                >
                  취소
                </Button>
              )}
              {/* 수정 버튼 */}
              <ButtonComponent
                size={"large"}
                onClick={() => setIsEdit(!isEdit)}
              >
                {isEdit ? "저장" : "수정"}
              </ButtonComponent>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </SideMenu>
  );
}

export default Email;
