import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { RedirectPage } from "./pages/RedirectPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Toast, ToastContainer } from "./components/ui/Toast";
import { useToast } from "./hooks/useToast";

// Configuração do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const { toasts } = useToast();

  return (
    <>
      <Router>
        <Routes>
          {/* Página principal */}
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />

          {/* Página de redirecionamento */}
          <Route path="/:shortUrl" element={<RedirectPage />} />

          {/* Página 404 específica */}
          <Route path="/404" element={<NotFoundPage />} />

          {/* Página 404 catch-all */}
          <Route
            path="*"
            element={
              <Layout>
                <NotFoundPage />
              </Layout>
            }
          />
        </Routes>
      </Router>

      {/* Sistema de toasts */}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </ToastContainer>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
