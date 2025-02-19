import { ImageUploader } from "../../common/imageUploader/ImageUploader.tsx";
import PartnerUploadForm from "./PartnerUploadForm.tsx";
import { useImageUploader } from "../../../hooks/useImageUploader.tsx";

function PartnerUploadComponent() {
  const isEvents = false;
  const {
    images,
    setImages,
    addImages,
    removeImage,
    handleDrop,
    handleDragEnd,
    handleDragOver,
    handleFileChange,
  } = useImageUploader(isEvents);
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
      <PartnerUploadForm setImages={setImages} images={images} />
    </ImageUploader>
  );
}

export default PartnerUploadComponent;
