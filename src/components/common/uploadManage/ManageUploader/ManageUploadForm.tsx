import { useEffect, useState } from "react";
import { Box, LinearProgress, TextField } from "@mui/material";
import ButtonComponent from "../../ButtonComponent.tsx";
import UploadIcon from "@mui/icons-material/Upload";
import { useUpload } from "../../../../hooks/useUpload.tsx";

interface EventsUploadFormProps {
  images: File[];
  item?: {
    portfolioId?: number;
    url: string[];
    title: string;
    description: string;
    date: string;
  };
  isEdit?: boolean;
}
function ManageUploadForm({ item, images, isEdit }: EventsUploadFormProps) {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { uploadEvent } = useUpload();
  console.log(title);
  // 업로드 버튼 클릭 시 업로드 시뮬레이션 후 초기화
  console.log("image", images[0]);
  const handleUpload = async () => {
    if (images.length === 0 || !title.trim()) return;
    setUploading(true);
    setProgress(0);
    uploadEvent({
      images: images,
      postData: {
        portfolioId: item?.portfolioId,
        url: [],
        title: title,
        description: place,
        //todo: date 형식 수정해야함
        date: "2025-02-28T10:54:48.094Z",
      },
      isEdit,
    });
  };
  useEffect(() => {
    if (item) {
      setTitle(item?.title);
      setPlace(item?.description);
      setDate(item?.date);
    }
  }, [item]);

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
          label="장소"
          fullWidth
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="장소"
          sx={{ marginTop: 2 }}
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

export default ManageUploadForm;
