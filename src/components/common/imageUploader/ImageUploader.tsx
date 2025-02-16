import React, { ChangeEvent, ReactNode } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import ClearIcon from "@mui/icons-material/Clear";
import {
  DndContext,
  closestCenter,
  useSensor,
  KeyboardSensor,
  MouseSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
interface ImageFile extends File {
  preview: string;
}

interface ImageUploaderProps {
  setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
  images: ImageFile[];
  children?: ReactNode;
}

export function ImageUploader({
  setImages,
  images,
  children,
}: ImageUploaderProps) {
  // 파일 추가
  const addImages = (files: File[]) => {
    const newImages = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    setImages((prev) => [...prev, ...newImages]);
  };

  // 파일 선택 이벤트 처리
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

  // 이미지 삭제
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // `dnd-kit`에서 드래그 종료 후 배열 업데이트
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.name === active.id);
      const newIndex = images.findIndex((img) => img.name === over.id);
      setImages(arrayMove(images, oldIndex, newIndex));
    }
  };
  console.log("images", images);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={images.map((img) => img.name)}>
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* 업로드 영역 (왼쪽 40%) */}
            <Box
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              sx={{
                flex: "0 0 40%", // 왼쪽 40% 고정
                height: "230px",
                border: "2px dashed #ccc",
                borderRadius: 1,
                backgroundColor: "#f7f7f7",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#e0e0e0" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
              </label>
            </Box>

            {/* children 영역 (오른쪽 60%) */}
            <Box
              sx={{
                flex: "0 0 60%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {children}
            </Box>
          </Box>

          {/* 업로드한 이미지 미리보기 및 순서 변경 */}
          {images.length > 0 && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)", // ✅ 한 줄에 5개씩 배치
                gap: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 1,
                backgroundColor: "#f3f4f6",
              }}
            >
              {images.map((image, index) => (
                <SortableImage
                  key={image.name + index}
                  id={image.name}
                  src={image.preview}
                  index={index}
                  onRemove={() => removeImage(index)}
                />
              ))}
            </Box>
          )}
        </SortableContext>
      </DndContext>
    </Box>
  );
}

// ✅ 개별 이미지 드래그 가능하도록 설정
function SortableImage({
  id,
  src,
  index,
  onRemove,
}: {
  id: string;
  src: string;
  index: number;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        boxShadow: 2,
        borderRadius: 2,
        ...getItemStyles(index),
      }}
      style={style}
    >
      <StyledImage
        onClick={() => {
          console.log("테스트세트");
        }}
        $isFirst={index === 0}
        src={src}
        alt=""
        style={{
          objectFit: "cover",
          borderRadius: 8,
        }}
      />
      {/* 이미지 인덱스 */}
      <Typography
        sx={{
          position: "absolute",
          top: "2px",
          left: "2px",
          width: "20px",
          display: "flex",
          alignItems: "center", // ✅ 세로 중앙 정렬
          height: "20px",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.7)",
          borderRadius: "50%",
          fontSize: "18px",
        }}
      >
        {index + 1}
      </Typography>
      {/* 삭제 버튼 */}
      <IconButton
        onClick={(e) => {
          if (confirm("삭제하시겠습니까?")) {
            e.stopPropagation(); // ✅ 부모 요소의 드래그 이벤트 방지
            e.preventDefault();
            onRemove(); // ✅ 삭제 이벤트 정상 실행
          } else {
            e.stopPropagation(); // ✅ 부모 요소의 드래그 이벤트 방지
            e.preventDefault();
          }
        }}
        sx={{
          position: "absolute",
          top: "2px",
          right: "2px",
          width: "20px",
          height: "20px",
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        <ClearIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

// ✅ 첫 번째 이미지를 2배 크기로 설정
function getItemStyles(index: number) {
  if (index === 0) {
    return {
      fontSize: "2rem",
      padding: "36px 40px",
      width: "230px",
      height: "230px",
      gridRowStart: "span 2",
      gridColumnStart: "span 2",
    };
  }
  return {
    width: "140px",
    height: "140px",
  };
}

const StyledImage = styled.img<{ $isFirst: boolean }>`
  width: ${({ $isFirst }) => ($isFirst ? "310px" : "150px")};
  height: ${({ $isFirst }) => ($isFirst ? "310px" : "150px")};
  cursor: pointer;
`;
