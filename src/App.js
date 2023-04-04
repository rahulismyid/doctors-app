import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/userAuth/Login/Login";
import Signup from "./components/userAuth/Signup/Signup";
import AuthProvider from "./contexts/AuthContext";
import DbProvider from "./contexts/DbContext";
import NotFound from "./pages/404/404";
import PRSHomeScreen from "./pages/prs/PRSHomeScreen/PRSHomeScreen";
import NewPatient from "./pages/prs/AddPatient/NewPatient";

import AuthLayout from "./Layout/AuthLayout";
import GlobalContextProvider from "./contexts/GlobalContext";
import MedicalConsent from "./pages/prs/MedicalConsent/MedicalConsent";
import MedicalExamination from "./pages/prs/MedicalExamination/MedicalExamination";
import PatientListTable from "./pages/prs/PatientList/PatientListTable";
import MedicalFindings from "./pages/prs/MedicalFindings/MedicalFindings";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <DbProvider>
            <GlobalContextProvider>
              <Modal />
              <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/app' element={<Navigate to={'/app/home'}/>} />
                <Route path='/app/home' element={<AuthLayout><PRSHomeScreen/></AuthLayout>} />
                <Route path='/app/add-patient' element={<AuthLayout><NewPatient/></AuthLayout>} />
                <Route path='/app/edit-patient/:id' element={<AuthLayout><NewPatient/></AuthLayout>} />
                <Route path='/app/list-patient' element={<AuthLayout><PatientListTable /></AuthLayout>} />
                <Route key={'finding'} path='/app/medical-findings/:pid?/:id?' element={<AuthLayout><MedicalFindings /></AuthLayout>} />
                <Route path='/login' element={<Login />}/>
                <Route path='/signup' element={<Signup />}/>
                <Route path='*' element={<NotFound/>}/>
              </Routes>
            </GlobalContextProvider>
          </DbProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
