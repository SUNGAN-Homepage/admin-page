import { ImageUploader } from "../../common/imageUploader/ImageUploader.tsx";
import ProfileUploadForm from "./ProfileUploadForm.tsx";
import { useImageUploader } from "../../../hooks/useImageUploader.tsx";

function ProfileUploadComponent() {
  const {
    images,
    setImages,
    addImages,
    removeImage,
    handleDrop,
    handleDragEnd,
    handleDragOver,
    handleFileChange,
  } = useImageUploader();
  return (
    <ImageUploader
      images={images}
      addImages={addImages}
      removeImage={removeImage}
      handleDrop={handleDrop}
      handleDragOver={handleDragOver}
      handleDragEnd={handleDragEnd}
      handleFileChange={handleFileChange}
    >
      <ProfileUploadForm images={images} setImages={setImages} />
    </ImageUploader>
  );
}

export default ProfileUploadComponent;
