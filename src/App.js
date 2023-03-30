import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/userAuth/Login/Login";
import Signup from "./components/userAuth/Signup/Signup";
import AuthProvider from "./contexts/AuthContext";
import DbProvider from "./contexts/DbContext";
import NotFound from "./pages/404/404";
import PRSHomeScreen from "./pages/prs/PRSHomeScreen/PRSHomeScreen";
import AddPatientForm from "./pages/prs/AddPatient/AddPatientForm";
import NewPatient from "./pages/prs/AddPatient/NewPatient";
import PatientList from "./pages/prs/PatientList/PatientList";

import AuthLayout from "./Layout/AuthLayout";
import GlobalContextProvider from "./contexts/GlobalContext";
import MedicalConsent from "./pages/prs/MedicalConsent/MedicalConsent";
import MedicalExamination from "./pages/prs/MedicalExamination/MedicalExamination";
import PatientListTable from "./pages/prs/PatientList/PatientListTable";

function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <DbProvider>
            <GlobalContextProvider>
              <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/app' element={<AuthLayout />}>
                  <Route path="/app" element={<Navigate to={'/app/home'}/>} />
                  <Route path="/app/home" element={<PRSHomeScreen/>} />
                  <Route path='/app/add-patient' element={<NewPatient/>} />
                  <Route path='/app/list-patient' element={<PatientListTable />} />
                  <Route path='/app/medical-consent' element={<MedicalConsent />} />
                  <Route path='/app/medical-examination' element={<MedicalExamination />} />
                </Route>
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
