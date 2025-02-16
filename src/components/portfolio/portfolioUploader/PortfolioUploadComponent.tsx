import { ImageUploader } from "../../common/imageUploader/ImageUploader.tsx";
import PortfolioUploadForm from "./PortfolioUploadForm.tsx";
import { useImageUploader } from "../../../hooks/useImageUploader.tsx";

function PortfolioUploadComponent() {
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
      isPartner={false}
    >
      <PortfolioUploadForm images={images} setImages={setImages} />
    </ImageUploader>
  );
}

export default PortfolioUploadComponent;
