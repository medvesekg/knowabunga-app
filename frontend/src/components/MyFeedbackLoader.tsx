import { apiErrorHandler, getMyFeedback } from "@/api";
import { setFeedback } from "@/store/feedbackSlice";
import { AxiosError } from "axios";
import { keyBy } from "lodash-es";
import { useEffect } from "react";
import { useStore } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyFeedbackLoader() {
  const store = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    getMyFeedback()
      .then((response) => {
        store.dispatch(setFeedback(keyBy(response, "talk_id")));
      })
      .catch((e) => {
        if (e instanceof AxiosError) {
          apiErrorHandler(e);
          if (e?.response?.status === 401) {
            return navigate("/login");
          }
        }
      });
  }, [navigate, store]);

  return null;
}
