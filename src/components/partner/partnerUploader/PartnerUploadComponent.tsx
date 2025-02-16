import { ImageUploader } from "../../common/imageUploader/ImageUploader.tsx";
import PartnerUploadForm from "./PartnerUploadForm.tsx";
import { useImageUploader } from "../../../hooks/useImageUploader.tsx";

function PartnerUploadComponent() {
  const isPartner = true;
  const {
    images,
    setImages,
    addImages,
    removeImage,
    handleDrop,
    handleDragEnd,
    handleDragOver,
    handleFileChange,
  } = useImageUploader(isPartner);
  return (
    <ImageUploader
      images={images}
      addImages={addImages}
      removeImage={removeImage}
      handleDrop={handleDrop}
      handleDragOver={handleDragOver}
      handleDragEnd={handleDragEnd}
      handleFileChange={handleFileChange}
      isPartner={isPartner}
    >
      <PartnerUploadForm setImages={setImages} images={images} />
    </ImageUploader>
  );
}

export default PartnerUploadComponent;
