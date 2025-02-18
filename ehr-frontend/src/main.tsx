import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./App.tsx";
import { AuthProvider } from "./auth/authProvider.tsx";
import { Layout } from "./components/layoutApp.tsx";
import "./index.css";
import { Login } from "./pages/login.tsx";
import { ConfigurationEhr } from "./pages/configurationEhr.tsx";
import { HospitalList } from "./pages/hospitals.tsx";
import { HospitalId } from "./pages/hospitalId.tsx";
import { TestMapper } from "./pages/testMapper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/configuration" element={<ConfigurationEhr />} />
            <Route path="/hospitals">
              <Route index element={<HospitalList />} />
              <Route path=":hospitalId" element={<HospitalId />} />
            </Route>
            <Route path="/test" element={<TestMapper />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
