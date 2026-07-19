import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  tokenKey?: string;      // "user_token" yoki "admin_token"
  redirectTo?: string;    // qayerga uloqtirish
}

export default function ProtectedRoute({
  children,
  tokenKey = "user_token",
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const location = useLocation();
  const token = localStorage.getItem(tokenKey);

  // Token yo'q bo'lsa — login'ga yo'naltiramiz
  if (!token) {
    // Qayerdan kelganini eslab qolamiz (login'dan keyin qaytarish uchun)
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // Token bor — asl sahifani ko'rsatamiz
  return <>{children}</>;
}