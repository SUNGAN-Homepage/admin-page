import ManageImg from "../common/uploadManage/ManageImg.tsx";
import { useLocation } from "react-router-dom";

export default function Event() {
  const data = useLocation();
  console.log("location", data);
  return (
    <>
      <ManageImg />
    </>
  );
}
