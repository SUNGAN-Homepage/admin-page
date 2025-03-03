import AddManageComponent from "./ManageUploader/AddManageComponent.tsx";
import ManageList from "./ManageList/ManageList.tsx";
import Loading from "../Loading/Loading.tsx";
import { useUpload } from "../../../hooks/useUpload.tsx";
import SideMenu from "../SideMenu.tsx";
import ManageUploadComponent from "./ManageUploader/ManageUploadComponent.tsx";
import { useLocation } from "react-router-dom";

function ManageImg() {
  const { isLoading, isUploading } = useUpload();
  const pathname = useLocation();
  return (
    <SideMenu>
      <AddManageComponent>
        <ManageUploadComponent key={`${pathname}`} />
      </AddManageComponent>
      <ManageList />
      {(isLoading || isUploading) && <Loading />}
    </SideMenu>
  );
}

export default ManageImg;
