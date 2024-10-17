import { Outlet, redirect } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthMiddleware from "./middleware/AuthMiddleware";
import LoginPage from "./pages/LoginPage";
import SchedulePage from "./pages/SchedulePage";
import store from "./store/store";
import LogoutPage from "./pages/LogoutPage";
import GiveFeedbackPage from "./pages/GiveFeedbackPage";
import ViewFeedbackPage from "./pages/ViewFeedbackPage";
import DefaultBackground from "./layouts/DefaultBackground";
import { apiErrorHandler, getMyFeedback } from "./api";
import { setFeedback } from "./store/feedbackSlice";
import { keyBy } from "lodash-es";
import TalkPage from "./pages/TalkPage";
import PageLayout from "./layouts/PageLayout";
import PhotosPage from "./pages/PhotosPage";
import { AxiosError } from "axios";
import { Toaster } from "react-hot-toast";
import TalkFeedbackNotifier from "./components/TalkFeedbackNotifier";
import NotificationPermissionsNagger from "./components/NotificationPermissionsNagger";
import UsersPage from "@/pages/UsersPage";

export default [
  {
    element: (
      <>
        <Outlet />
        <Toaster />
      </>
    ),
    children: [
      // Public Routes
      {
        path: "/login",
        element: (
          <DefaultBackground>
            <LoginPage />
          </DefaultBackground>
        ),
      },
      // Authenticated Routes
      {
        element: (
          <AuthMiddleware>
            <Outlet />
            <TalkFeedbackNotifier />
          </AuthMiddleware>
        ),
        loader: async () => {
          const user = store.getState().auth.user;

          if (user && user.email) {
            try {
              getMyFeedback().then((response) => {
                store.dispatch(setFeedback(keyBy(response, "talk_id")));
              });
              return null;
            } catch (e) {
              if (e instanceof AxiosError) {
                apiErrorHandler(e);
                if (e?.response?.status === 401) {
                  return redirect("/login");
                }
              }
            }
          }

          return redirect("/login");
        },

        children: [
          {
            path: "/",
            loader: async () => {
              const homeRegionId =
                store.getState().auth.user?.region_id || "lj";
              return redirect(`/${homeRegionId}`);
            },
          },
          {
            path: "/:regionId",
            element: (
              <MainLayout>
                <NotificationPermissionsNagger />

                <SchedulePage />
              </MainLayout>
            ),
          },
          {
            path: "/talks/:talkId",
            element: (
              <PageLayout>
                <TalkPage />
              </PageLayout>
            ),
          },
          {
            path: "/talks/:talkId/give-feedback",
            element: (
              <PageLayout>
                <GiveFeedbackPage />
              </PageLayout>
            ),
          },
          {
            path: "/talks/:talkId/view-feedback",
            element: (
              <PageLayout>
                <ViewFeedbackPage />
              </PageLayout>
            ),
          },
          {
            path: "/photos",
            element: (
              <MainLayout>
                <PhotosPage />
              </MainLayout>
            ),
          },
          {
            path: "/users",
            element: (
              <PageLayout>
                <UsersPage />
              </PageLayout>
            ),
          },
          {
            path: "/logout",
            element: (
              <DefaultBackground>
                <LogoutPage />
              </DefaultBackground>
            ),
          },
        ],
      },
    ],
  },
];
