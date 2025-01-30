import { Routes, Route } from "react-router-dom";
import {
  AddProperty,
  Home,
  Login,
  Properties,
  PropertyDetails,
  Signup,
  UserDetails,
  Users,
} from "./pages";
import { DashboardLayout } from "./layout";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="user/:id" element={<UserDetails />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyDetails />} />
          <Route path="property" element={<AddProperty />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
