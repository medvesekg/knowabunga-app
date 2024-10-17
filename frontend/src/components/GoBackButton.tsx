import { useNavigate, useLocation } from "react-router-dom";

export function GoBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  function goBack() {
    // If this is the first page visited navigate to the root, else go to the previous page
    return location.key === "default" ? navigate("/") : navigate(-1);
  }

  return (
    <span
      className="material-symbols-outlined cursor-pointer shrink"
      onClick={goBack}
    >
      arrow_back
    </span>
  );
}
