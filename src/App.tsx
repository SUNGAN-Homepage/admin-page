import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.tsx";
import Email from "./components/email/Email.tsx";
import { IsActiveIdxProvider } from "./context/IsActiveIdxContext.tsx";
import Event from "./components/event/Event.tsx";
import Profile from "./components/profile/Profile.tsx";
import Partner from "./components/partner/Partner.tsx";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute.tsx";
function App() {
  return (
    <Router>
      <IsActiveIdxProvider>
        <Routes>
          <Route path="/admin" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/events" element={<Event />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/partner" element={<Partner />} />
            <Route path="/admin/email" element={<Email />} />
          </Route>
        </Routes>
      </IsActiveIdxProvider>
    </Router>
  );
}

export default App;
