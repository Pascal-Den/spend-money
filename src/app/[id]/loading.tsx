import { ReactNode } from "react";
import { ClipLoader } from "react-spinners";

type LoadingProps = {
  loading: boolean;
  children: ReactNode;
};
export default function Loading({ loading, children }: LoadingProps) {
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center ">
        <ClipLoader color="#3D4D55" size={120} />
      </div>
    );
  }
  return children;
}
