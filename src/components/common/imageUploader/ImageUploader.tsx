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
  DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

interface ImageFile extends File {
  preview: string;
}

interface ImageUploaderProps {
  images: ImageFile[];
  addImages: (files: File[]) => void;
  removeImage: (index: number) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  children?: ReactNode;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isEvents?: boolean;
}

export function ImageUploader({
  images,
  removeImage,
  handleDrop,
  handleDragOver,
  handleDragEnd,
  children,
  handleFileChange,
  isEvents,
}: ImageUploaderProps) {
  // 센서 설정 (마우스 및 키보드)
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);
  const location = useLocation().pathname;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={images.map((img) => img.name)}>
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* 업로드 영역 */}
            <UploadArea onDrop={handleDrop} onDragOver={handleDragOver}>
              <label
                htmlFor="dropzone-file"
                style={{
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
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
                  multiple={location === "/admin/events"}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
            </UploadArea>

            {/* children 영역 */}
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

          {isEvents ? (
            <>
              {images.length > 0 && (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: 2,
                    p: 2,
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
            </>
          ) : (
            <>
              {images.length > 0 && (
                <Box
                  sx={{
                    backgroundColor: "#f3f4f6",
                    p: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      margin: "auto",
                    }}
                    src={images[0].preview}
                    alt={images[0].name}
                    width={"500px"}
                  />
                </Box>
              )}
            </>
          )}
        </SortableContext>
      </DndContext>
    </Box>
  );
}

// 업로드 영역 스타일링
const UploadArea = styled(Box)`
  flex: 0 0 40%;
  height: 250px;
  border: 2px dashed #ccc;
  background-color: #f7f7f7;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  &:hover {
    background-color: #e0e0e0;
  }
`;

// 이미지 컴포넌트 (드래그 가능)
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
      <StyledImage $isFirst={index === 0} src={src} alt="" />
      <Typography
        sx={{
          position: "absolute",
          top: "2px",
          left: "2px",
          width: "20px",
          height: "20px",
          display: "flex",
          alignItems: "center",
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
            e.stopPropagation(); // 부모 요소의 드래그 이벤트 방지
            e.preventDefault();
            onRemove(); // 삭제 실행
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

// 첫 번째 이미지 스타일을 크게
function getItemStyles(index: number) {
  return index === 0
    ? {
        fontSize: "2rem",
        padding: "36px 40px",
        width: "230px",
        height: "230px",
        gridRowStart: "span 2",
        gridColumnStart: "span 2",
      }
    : {
        width: "140px",
        height: "140px",
      };
}

const StyledImage = styled.img<{ $isFirst: boolean }>`
  width: ${({ $isFirst }) => ($isFirst ? "310px" : "150px")};
  height: ${({ $isFirst }) => ($isFirst ? "310px" : "150px")};
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
`;
