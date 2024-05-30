import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import ViewAnimals from "./pages/ViewAnimals";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Adminroute from "./components/Routes/Adminroute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateAnimal from "./pages/Admin/CreateAnimal";
import Users from "./pages/Admin/Users";
import Adopts from "./pages/user/Adopts";
import Profile from "./pages/user/Profile";
import Animals from "./pages/Admin/Animals";
import UpdateAnimal from "./pages/Admin/UpdateAnimal";
import AnimalDetails from "./pages/AnimalDetails";
import AdminAdopts from "./pages/Admin/AdminAdopts";
import Rescue from "./pages/Rescue";
import UserRescue from "./pages/user/UserRescue";
import AdRescue from "./pages/Admin/AdRescue";
import AdminContactUs from "./pages/Admin/AdminConctactUs";




function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/viewanimals/:id" element={<AnimalDetails />} />


        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="user" element={<Dashboard/>} />
          <Route path="user/adopts" element={<Adopts/>} />
          <Route path="user/userrescue" element={<UserRescue/>} />
          <Route path="user/profile" element={<Profile/>} />
        </Route>
        <Route path="/dashboard" element={<Adminroute/>}>
          <Route path="admin" element={<AdminDashboard/>}/>
          <Route path="admin/create-category" element={<CreateCategory/>}/>
          <Route path="admin/create-animal" element={<CreateAnimal/>}/>
          <Route path="admin/animal/:id" element={<UpdateAnimal/>}/>
          <Route path="admin/animals" element={<Animals/>}/>
          <Route path="admin/users" element={<Users/>}/>
          <Route path="admin/adopts" element={<AdminAdopts/>}/>
          <Route path="admin/adrescue" element={<AdRescue/>}/>
          <Route path="admin/inquiries" element={<AdminContactUs/>}/>



        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/viewanimals" element={<ViewAnimals />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rescue" element={<Rescue />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
      
    </>
  );
}

export default App;
