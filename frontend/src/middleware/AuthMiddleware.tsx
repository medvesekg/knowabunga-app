import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function AuthMiddleware({ children }: PropsWithChildren) {
  const session = useSelector((state: RootState) => state.auth.session);
  return isAuthenticated(session) ? children : <Navigate to="login" />;
}

function isAuthenticated(session: RootState["auth"]["session"]) {
  return session?.id;
}
