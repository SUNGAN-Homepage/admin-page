import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.tsx";
import Events from "./components/events/Events.tsx";
import Email from "./components/email/Email.tsx";
import Partner from "./components/partner/Partner.tsx";
import Profile from "./components/profile/Profile.tsx"; // Login 컴포넌트

function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인 페이지 경로 설정 */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/email" element={<Email />} />
        <Route path="/admin/partner" element={<Partner />} />
      </Routes>
    </Router>
  );
}

export default App;
