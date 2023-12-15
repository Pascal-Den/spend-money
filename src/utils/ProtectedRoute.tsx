import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

function ProtectedRoute<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: NextPage<T>,
): NextPage<T> {
  return (props: T) => {
    const { isAuth } = useAppSelector((state) => state.admin);
    const router = useRouter();

    useEffect(() => {
      if (!isAuth) {
        router.push("/admin");
      }
    }, [isAuth, router]);

    if (!isAuth) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

export default ProtectedRoute;
