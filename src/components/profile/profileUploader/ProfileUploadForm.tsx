import React, { useState } from "react";
import { Box, LinearProgress, TextField } from "@mui/material";
import ButtonComponent from "../../common/ButtonComponent.tsx";
import UploadIcon from "@mui/icons-material/Upload";

interface ImageFile extends File {
  preview: string;
}

interface ImageUploaderProps {
  setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
  images: ImageFile[];
}

function ProfileUploadForm({ images, setImages }: ImageUploaderProps) {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // 업로드 버튼 클릭 시 업로드 시뮬레이션 후 초기화
  const handleUpload = async () => {
    if (images.length === 0 || !title.trim()) return;

    setUploading(true);
    setProgress(0);

    // 업로드 진행 상황 시뮬레이션
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    setUploading(false);
    alert(
      `이미지가 성공적으로 업로드되었습니다.\n제목: ${title}\nc: ${place}\n업로드된 이미지 개수: ${images.length}`,
    );

    // 상태 초기화
    setImages([]);
    setTitle("");
    setPlace("");
  };
  return (
    <div>
      {/* 제목 및 설명 입력 영역 */}
      <Box sx={{ flex: 1 }}>
        <TextField
          label="제목"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={`제목`}
          required
          variant="outlined"
        />

        <TextField
          multiline
          label="촬영 일시"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="촬영 일시"
          sx={{ marginTop: 2 }}
        />
      </Box>

      {uploading && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ width: "100%", height: "5px" }}
        />
      )}

      <ButtonComponent
        onClick={handleUpload}
        disabled={images.length === 0 || !title.trim() || uploading}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        {uploading ? "업로드 중..." : "업로드"}
        <UploadIcon sx={{ ml: 1, fontSize: 20 }} />
      </ButtonComponent>
    </div>
  );
}

export default ProfileUploadForm;
