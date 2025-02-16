import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.tsx";
import Portfolio from "./components/portfolio/Portfolio.tsx";
import Email from "./components/email/Email.tsx";
import Partner from "./components/partner/Partner.tsx"; // Login 컴포넌트

function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인 페이지 경로 설정 */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/events" element={<Portfolio isEvents={true} />} />
        <Route path="/admin/profile" element={<Portfolio isEvents={false} />} />
        <Route path="/admin/email" element={<Email />} />
        <Route path="/admin/partner" element={<Partner />} />
      </Routes>
    </Router>
  );
}

export default App;
