import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add-property" element={<AddProperty />} />
            <Route path="/admin/edit-property/:id" element={<EditProperty />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
