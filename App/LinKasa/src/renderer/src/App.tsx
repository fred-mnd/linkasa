import CreateRequest from "./components/CEM/CreateRequest";
import ProjectDetails from "./components/CFO/ProjectDetails";
import ChatRoom from "./components/Chat/ChatRoom";
import Home from "./components/Home";
import CreateLog from "./components/LnF/CreateLog";
import UpdateLog from "./components/LnF/UpdateLog";
import Login from "./components/Login"
import { Route, Routes } from "react-router-dom";
import ReviseRequest from './components/CEM/ReviseRequest'
import AirplaneDetail from "./components/FOM/AirplaneDetail";
import ManageCrew from "./components/FOM/ManageCrew";
import CreateAccount from "./components/HRD/RecruitEmployee/CreateAccount";
import CreateJobVacancy from "./components/HRD/JobVacancy/CreateJobVacancy";
import ViewJobVacancyDetails from "./components/HRD/JobVacancy/ViewJobVacancyDetails";
import UpdateJobVacancy from "./components/HRD/JobVacancy/UpdateJobVacancy";
import CreateIncident from "./components/CSO/Incidents/CreateIncident";
import UpdateIncident from "./components/CSO/Incidents/UpdateIncident";
import CreateTraining from './components/HRD/Training/CreateTraining'
import UpdateTraining from './components/HRD/Training/UpdateTraining'
import CreateInterview from './components/HRD/Interview/CreateInterview'
import UpdateInterview from './components/HRD/Interview/UpdateInterview'

function App(){
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/lnf/create-log" element={<CreateLog />}></Route>
        <Route path="/lnf/update-log" element={<UpdateLog />}></Route>
        <Route path="/chat" element={<ChatRoom />}></Route>
        <Route path="/cem/create-request" element={<CreateRequest />}></Route>
        <Route path="/cem/revise-request" element={<ReviseRequest />}></Route>
        <Route path="/cfo/project-details" element={<ProjectDetails />}></Route>
        <Route path="/fom/airplane-detail" element={<AirplaneDetail />}></Route>
        <Route path="/fom/manage-crews" element={<ManageCrew />}></Route>
        <Route path="/hrd/create-account" element={<CreateAccount />}></Route>
        <Route path="/hrd/create-job-vacancy" element={<CreateJobVacancy />}></Route>
        <Route path="/hrd/job-vacancy-details" element={<ViewJobVacancyDetails />}></Route>
        <Route path="/hrd/update-job-vacancy" element={<UpdateJobVacancy />}></Route>
        <Route path="/cso/create-incident-report" element={<CreateIncident />}></Route>
        <Route path="/cso/update-incident-report" element={<UpdateIncident />}></Route>
        <Route path="/hrd/create-training" element={<CreateTraining />}></Route>
        <Route path="/hrd/update-training" element={<UpdateTraining />}></Route>
        <Route path="/hrd/create-interview" element={<CreateInterview />}></Route>
        <Route path="/hrd/update-interview" element={<UpdateInterview />}></Route>
      </Routes>
    </div>
  )
}
export default App
