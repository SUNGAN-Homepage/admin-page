import { useState } from "react";
import { TextField, Box, Typography, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/SUNGAN.jpg";
import ButtonComponent from "./common/ButtonComponent.tsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 로그인 버튼 클릭시
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
    } else {
      setError("");
      navigate("/portfolio");
      // 여기에 로그인 처리 로직 추가
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
      <Box
        sx={{
          display: "flex", // Flexbox로 설정하여 중앙 정렬
          justifyContent: "center", // 세로 중앙 정렬
          alignItems: "center", // 가로 중앙 정렬
          height: "100%", // 부모 요소의 높이를 100%로 설정
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            width: "100%", // 로그인 박스의 가로 길이가 화면에 맞게
            maxWidth: "400px", // 최대 너비 제한 (넓어지지 않게)
          }}
        >
          <img
            src={Logo}
            width="300px"
            height="150px"
            alt="Logo"
            style={{ objectFit: "cover" }} // 이미지 비율을 유지한 채 크기 맞추기
          />
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{ marginTop: "20px" }}
          >
            관리자 로그인
          </Typography>
          {error && (
            <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="이메일"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="비밀번호"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <ButtonComponent
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ padding: 1.5 }}
                >
                  로그인
                </ButtonComponent>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
