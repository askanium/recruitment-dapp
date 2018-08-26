import RegisteredCompaniesList from '../containers/registeredCompaniesList';
import CompanyPage from '../containers/CompanyPage';
import Company2Page from '../containers/Company2Page';
import JobOfferPage from '../containers/JobOfferPage';
import RegisterCompanyForm from '../components/RegisterCompanyForm';
import CreateJobOfferForm from "../components/CreateJobOfferForm";

const indexRoutes = [
  { path: "/company/register", name: "CompanyRegistration", component: RegisterCompanyForm },
  { path: "/company/:address/jobOffer/create", name: "CreateJobOffer", component: CreateJobOfferForm },
  { path: "/company/:address/jobOffer/:titleHash", name: "JobOfferPage", component: JobOfferPage },
  { path: "/company/:address/2", name: "Company2Page", component: Company2Page },
  { path: "/company/:address", name: "CompanyPage", component: CompanyPage },
  { path: "/", name: "Home", component: RegisteredCompaniesList }
];

export default indexRoutes;
