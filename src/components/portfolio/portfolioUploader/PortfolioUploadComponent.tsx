import { useState } from "react";
import { ImageUploader } from "../../common/imageUploader/ImageUploader.tsx";
import PortfolioUploadForm from "./PortfolioUploadForm.tsx";
interface ImageFile extends File {
  preview: string;
}

function PortfolioUploadComponent() {
  const [images, setImages] = useState<ImageFile[]>([]);
  return (
    <ImageUploader setImages={setImages} images={images}>
      <PortfolioUploadForm setImages={setImages} images={images} />
    </ImageUploader>
  );
}

export default PortfolioUploadComponent;
