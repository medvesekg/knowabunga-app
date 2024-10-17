import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiErrorHandler, loginWithGoogleCredentials } from "@/api";
import { saveAuthData } from "@/store/authSlice";
import Button from "@/components/Button";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";
import { isDevelopment } from "@/utils";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function handleSuccessfullLogin(credentialResponse: CredentialResponse) {
    if (credentialResponse.credential) {
      setLoading(true);
      loginWithGoogleCredentials(credentialResponse.credential)
        .then((response) => {
          dispatch(
            saveAuthData({
              user: response.data.user,
              session: response.data.session,
            })
          );
          navigate("/");
        })
        .catch((e) => {
          setLoading(false);
          apiErrorHandler(e);
        });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        {loading ? (
          <div>
            <div>Logging you in ...</div>
            <LoadingSpinner />
          </div>
        ) : (
          <div>
            <div className="text-center">Login required</div>
            <div className="mb-10">
              <GoogleLogin
                width="200"
                onSuccess={handleSuccessfullLogin}
                onError={() => {
                  toast.error("Login failed");
                }}
                useOneTap
              />
            </div>
            {isDevelopment() && (
              <div className="absolute text-center w-full left-0">
                <div className="mb-3">Testing area</div>
                <div className="mb-3">
                  <Button
                    style="tertiary"
                    onClick={() =>
                      handleSuccessfullLogin({ credential: "admin" })
                    }
                  >
                    Login as admin
                  </Button>
                </div>
                <div className="mb-3">
                  <Button
                    style="tertiary"
                    onClick={() =>
                      handleSuccessfullLogin({ credential: "speaker" })
                    }
                  >
                    Login as speaker
                  </Button>
                </div>
                <div className="mb-3">
                  <Button
                    style="tertiary"
                    onClick={() =>
                      handleSuccessfullLogin({ credential: "attendee" })
                    }
                  >
                    Login as attendee
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
