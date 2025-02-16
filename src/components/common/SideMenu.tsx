import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, MenuItem, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FilterIcon from "@mui/icons-material/Filter";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import HandshakeIcon from "@mui/icons-material/Handshake";
interface SettingsProps {
  children: ReactNode; // children의 타입을 명시적으로 정의
}
const SideMenu: React.FC<SettingsProps> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Box>
      {/* 왼쪽 사이드 메뉴 (Drawer) */}
      <Drawer
        anchor="left"
        open={true}
        variant="persistent"
        sx={{
          width: "250px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "#f3f4f6", // Paper 내부 배경색
          },
        }}
      >
        <Box sx={{ width: 250 }}>
          <Typography
            variant={"h5"}
            sx={{ marginX: 1, marginY: 2, fontWeight: "600", padding: 1 }}
          >
            순간,스튜디오
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <MenuItem
              onClick={() => {
                navigate("/admin/events");
              }}
              sx={{
                backgroundColor:
                  pathname === "/admin/events" ? "#b5b5b5" : "none",
              }}
            >
              <FilterIcon sx={{ marginRight: 1 }} />
              행사 이미지 관리
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/admin/profile");
              }}
              sx={{
                backgroundColor:
                  pathname === "/admin/profile" ? "#b5b5b5" : "none",
              }}
            >
              <FilterIcon sx={{ marginRight: 1 }} />
              프로필 이미지 관리
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/admin/email");
              }}
              sx={{
                backgroundColor:
                  pathname === "/admin/email" ? "#b5b5b5" : "none",
              }}
            >
              <EmailIcon sx={{ marginRight: 1 }} />
              이메일 관리
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/admin/partner");
              }}
              sx={{
                backgroundColor:
                  pathname === "/admin/partner" ? "#b5b5b5" : "none",
              }}
            >
              <HandshakeIcon sx={{ marginRight: 1 }} />
              파트너 관리
            </MenuItem>
          </Box>
        </Box>
        <Button
          sx={{
            marginTop: "auto",
            marginBottom: 2,
            background: "white",
            color: "black",
            marginX: 1,
            border: "1px solid #e4e4e7",
          }}
          onClick={() => navigate("/admin")}
        >
          <LogoutIcon />
          로그아웃
        </Button>
      </Drawer>

      {/* 본문 내용 */}
      <Box
        sx={{
          marginLeft: "250px",
          display: "flex", // flexbox를 사용하여 배치
          justifyContent: "center", // 수평 중앙 정렬
          padding: 3,
        }}
      >
        <Box sx={{ maxWidth: "1200px", width: "900px" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default SideMenu;
