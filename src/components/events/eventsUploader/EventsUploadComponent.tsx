import { ImageUploader } from "../../common/imageUploader/ImageUploader.tsx";
import EventsUploadForm from "./EventsUploadForm.tsx";
import { useImageUploader } from "../../../hooks/useImageUploader.tsx";

function EventsUploadComponent() {
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
      <EventsUploadForm images={images} setImages={setImages} />
    </ImageUploader>
  );
}

export default EventsUploadComponent;
