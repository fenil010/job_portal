import { RouterProvider } from "react-router-dom";
import { ToastProvider } from "./components/ui";
import { AuthProvider, JobProvider } from "./contexts";
import router from "./router";

export default function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </JobProvider>
    </AuthProvider>
  );
}
