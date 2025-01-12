import { useState, ChangeEvent } from "react";
import {
  TextField,
  Box,
  Typography,
  LinearProgress,
  IconButton,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import ButtonComponent from "../common/ButtonComponent.tsx";

export function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) return;

    setUploading(true);
    setProgress(0);

    // 실제 업로드 로직을 여기에 구현합니다.
    // 이 예제에서는 업로드를 시뮬레이션합니다.
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    setUploading(false);
    alert(
      `이미지가 성공적으로 업로드되었습니다.\n제목: ${title}\n설명: ${description}`,
    );
    setSelectedFile(null);
    setPreview(null);
    setTitle("");
    setDescription("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <label htmlFor="dropzone-file">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: 200,
                border: "2px dashed #ccc",
                borderRadius: 1,
                backgroundColor: "#f7f7f7",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              {/*<Upload style={{ width: 40, height: 40, marginBottom: 2 }} />*/}
              <Typography variant="body2" color="textSecondary">
                클릭하여 업로드 또는 드래그 앤 드롭
              </Typography>
              <Typography variant="caption" color="textSecondary">
                PNG, JPG, GIF (최대 10MB)
              </Typography>
            </Box>
            <input
              id="dropzone-file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
          {preview && (
            <Box sx={{ position: "relative", marginTop: 2 }}>
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              />
              <IconButton
                sx={{ position: "absolute", top: 8, right: 8 }}
                color="error"
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(null);
                }}
              >
                {/*<X style={{ width: 20, height: 20 }} />*/}
              </IconButton>
            </Box>
          )}
        </Box>

        <Box sx={{ flex: 1 }}>
          <TextField
            label="제목"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="포트폴리오 제목"
            required
            variant="outlined"
          />
          <TextField
            multiline
            label="설명"
            minRows={5}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="포트폴리오 설명"
            sx={{ marginTop: 2 }}
          />
        </Box>
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
        disabled={!selectedFile || !title.trim() || uploading}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        {uploading ? "업로드 중..." : "업로드"}
        <UploadIcon style={{ marginLeft: 5, width: 20, height: 20 }} />
      </ButtonComponent>
    </Box>
  );
}
