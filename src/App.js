import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/userAuth/Login/Login";
import AuthProvider from "./contexts/AuthContext";
import DbProvider from "./contexts/DbContext";
import NotFound from "./pages/404/404";
import HomeScreen from "./pages/prs/HomeScreen/HomeScreen";
import NewPatient from "./pages/prs/AddPatient/NewPatient";

import AuthLayout from "./Layout/AuthLayout";
import GlobalContextProvider from "./contexts/GlobalContext";
import PatientListTable from "./pages/prs/PatientList/PatientListTable";
import MedicalFindings from "./pages/prs/MedicalFindings/MedicalFindings";
import PrintDocument from "./pages/prs/PrintDocument/PrintDocument";
import Modal from "./components/Modal/Modal";
import {
  ADD_PATIENT_ROUTE,
  APP_ROUTE,
  EDIT_PATIENT_ROUTE,
  HOME_ROUTE,
  LIST_PATIENT_ROUTE,
  LOGIN_ROUTE,
  MEDICAL_FINDINGS_ROUTE,
  PRINT_ROUTE,
  ROOT_ROUTE,
} from "./routes/constants";

function App() {
  return (
    <div id="scrollbar" className="app">
      <Router>
        <AuthProvider>
          <DbProvider>
            <GlobalContextProvider>
              <Modal />
              <Routes>
                <Route path={ROOT_ROUTE} element={<Login/>}/>
                <Route path={APP_ROUTE} element={<Navigate to={HOME_ROUTE}/>} />
                <Route path={HOME_ROUTE} element={<AuthLayout><HomeScreen/></AuthLayout>} />
                <Route path={ADD_PATIENT_ROUTE} element={<AuthLayout><NewPatient/></AuthLayout>} />
                <Route path={EDIT_PATIENT_ROUTE} element={<AuthLayout><NewPatient/></AuthLayout>} />
                <Route path={LIST_PATIENT_ROUTE} element={<AuthLayout><PatientListTable /></AuthLayout>} />
                <Route key={'finding'} path={MEDICAL_FINDINGS_ROUTE} element={<AuthLayout><MedicalFindings /></AuthLayout>} />
                <Route path={PRINT_ROUTE} element={<AuthLayout><PrintDocument /></AuthLayout>}/>
                <Route path={LOGIN_ROUTE} element={<Login />}/>
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
