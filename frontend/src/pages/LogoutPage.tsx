import { logout } from "@/api";
import { deleteAuthData } from "@/store/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function LogoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    logout();
    dispatch(deleteAuthData());
  }, [dispatch]);

  return <div>You have been successfully logged out</div>;
}
