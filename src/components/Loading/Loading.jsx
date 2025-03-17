import { InfinitySpin } from "react-loader-spinner";
import s from "./Loading.module.css"; 

export default function Loading() {
  return (
    <div className={s.loaderWrapper}>
      <InfinitySpin
        visible={true}
        width="200"
        color="#005EFF"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}
