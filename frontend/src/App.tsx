import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import DefaultBackround from "./layouts/DefaultBackground";
import store from "./store/store";
import routes from "./routes";

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RouterProvider
          router={router}
          fallbackElement={
            <DefaultBackround className="flex justify-center items-center">
              <LoadingSpinner />
            </DefaultBackround>
          }
        />
      </GoogleOAuthProvider>
    </Provider>
  );
}
