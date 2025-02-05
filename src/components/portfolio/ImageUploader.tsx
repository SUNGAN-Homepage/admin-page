import { useState, ChangeEvent } from "react";
import {
  Box,
  Typography,
  TextField,
  LinearProgress,
  IconButton,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import ClearIcon from "@mui/icons-material/Clear";
import ButtonComponent from "../common/ButtonComponent";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface ImageFile extends File {
  preview: string;
}

export function ImageUploader() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // 파일들을 받아 미리보기 URL을 생성 후 상태에 추가
  const addImages = (files: File[]) => {
    const newImages = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    setImages((prev) => [...prev, ...newImages]);
  };

  // input 태그를 통한 파일 선택 이벤트 처리 (여러 파일 선택 가능)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      addImages(files);
    }
  };

  // 드래그 앤 드롭을 통한 파일 업로드 처리
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      addImages(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // 업로드된 이미지 삭제
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // react-beautiful-dnd를 이용한 이미지 순서 재배열
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);
    setImages(reorderedImages);
  };

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
      `이미지가 성공적으로 업로드되었습니다.\n제목: ${title}\n설명: ${description}\n업로드된 이미지 개수: ${images.length}`,
    );

    // 상태 초기화
    setImages([]);
    setTitle("");
    setDescription("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Box sx={{ flex: 1, width: "60%" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            {/* 파일 업로드 및 드롭존 영역 */}
            <Box
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              sx={{
                height: 200,
                border: "2px dashed #ccc",
                borderRadius: 1,
                backgroundColor: "#f7f7f7",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#e0e0e0" },
                mb: 2,
              }}
            >
              <label
                htmlFor="dropzone-file"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <UploadIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  클릭하여 업로드 또는 드래그 앤 드롭
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  PNG, JPG, GIF (최대 10MB)
                </Typography>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                파일 선택
              </label>
            </Box>

            {/* 업로드한 이미지 미리보기 및 순서 변경 */}
            {images.length > 0 && (
              <Droppable droppableId="images" direction="horizontal">
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      display: "flex",
                      gap: 2,
                      // 드래그 중이면 visible로, 아닐 때는 auto로 설정하여 placeholder가 중간에 삽입될 수 있도록 함
                      overflowX: snapshot.isDraggingOver ? "visible" : "auto",
                      p: 1,
                      border: "1px solid #ccc",
                      borderRadius: 1,
                    }}
                  >
                    {images.map((image, index) => (
                      <Draggable
                        key={image.name + index}
                        draggableId={image.name + index}
                        index={index}
                      >
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ position: "relative" }}
                          >
                            <img
                              src={image.preview}
                              alt={image.name}
                              style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover",
                                borderRadius: 8,
                              }}
                            />
                            <IconButton
                              onClick={() => removeImage(index)}
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 3,
                                width: "20px",
                                height: "20px",
                                justifyContent: "center",
                                backgroundColor: "rgba(255,255,255,0.7)",
                                borderRadius: "50%",
                                fontSize: "18px",
                              }}
                            >
                              {index + 1}
                            </IconButton>
                            <IconButton
                              onClick={() => removeImage(index)}
                              sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                width: "20px",
                                height: "20px",
                                backgroundColor: "rgba(255,255,255,0.7)",
                              }}
                            >
                              <ClearIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            )}
          </DragDropContext>
        </Box>

        {/* 제목 및 설명 입력 영역 */}
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
        disabled={images.length === 0 || !title.trim() || uploading}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        {uploading ? "업로드 중..." : "업로드"}
        <UploadIcon sx={{ ml: 1, fontSize: 20 }} />
      </ButtonComponent>
    </Box>
  );
}
