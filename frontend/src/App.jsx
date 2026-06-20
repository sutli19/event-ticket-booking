import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen bg-background text-textPrimaryDark">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#111827",
            color: "#F8FAFC",
            border: "1px solid #1F2937",
          },
        }}
      />

      <AppRoutes />
    </div>
  );
}

export default App;