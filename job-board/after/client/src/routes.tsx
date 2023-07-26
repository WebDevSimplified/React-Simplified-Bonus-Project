import { Navigate, RouteObject } from "react-router-dom"
import { RootLayout } from "@/layouts/RootLayout"
import { ErrorPage } from "@/pages/ErrorPage"
import { TaskListPage } from "@/pages/tasks/TaskListPage"
import { NewTaskPage } from "@/pages/tasks/NewTaskPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { AuthLayout, LoginForm, SignupForm } from "@/features/authentication"
import { myJobListingsRoute } from "./pages/jobs/my-listings"
import { NewJobListingPage } from "./pages/jobs/NewJobListingPage"
import { editJobListingRoute } from "./pages/jobs/edit"
import { orderCompleteRoute } from "./pages/jobs/order-complete"
import { jobListingsIndexRoute } from "./pages/jobs/index"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/tasks" replace />,
          },
          {
            path: "tasks",
            children: [
              { index: true, element: <TaskListPage /> },
              { path: "new", element: <NewTaskPage /> },
            ],
          },
          {
            path: "jobs",
            children: [
              { index: true, ...jobListingsIndexRoute },
              { path: "my-listings", ...myJobListingsRoute },
              { path: "new", element: <NewJobListingPage /> },
              { path: ":id/edit", ...editJobListingRoute },
              { path: "order-complete", ...orderCompleteRoute },
            ],
          },
          {
            element: <AuthLayout />,
            children: [
              { path: "login", element: <LoginForm /> },
              { path: "signup", element: <SignupForm /> },
            ],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
