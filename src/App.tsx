import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index.tsx";
import BookAppointment from "./pages/BookAppointment.tsx";
import HospitalityServices from "./pages/HospitalityServices.tsx";
import PatientsVisitors from "./pages/PatientsVisitors.tsx";
import AlSafwaProgram from "./pages/AlSafwaProgram.tsx";
import HomeHealth from "./pages/HomeHealth.tsx";
import Doctors from "./pages/Doctors.tsx";
import DoctorProfile from "./pages/DoctorProfile.tsx";
import DepartmentDetail from "./pages/DepartmentDetail.tsx";
import Downloads from "./pages/Downloads.tsx";
import Departments from "./pages/Departments.tsx";
import MedicalServices from "./pages/MedicalServices.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import WorkWithUs from "./pages/WorkWithUs.tsx";
import InternationalPatient from "./pages/InternationalPatient.tsx";
import AppointmentRequest from "./pages/AppointmentRequest.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import FAQ from "./pages/FAQ.tsx";
import MedicalRepVisitBooking from "./pages/MedicalRepVisitBooking.tsx";
import MedicalRecordsRequest from "./pages/MedicalRecordsRequest.tsx";
import TrackerWaveInfantSecurity from "./pages/TrackerWaveInfantSecurity.tsx";
import InRoomEvents from "./pages/InRoomEvents.tsx";
import JobApplication from "./pages/JobApplication.tsx";
import CSR from "./pages/CSR.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTopOnNav from "./components/ScrollToTopOnNav.tsx";

const queryClient = new QueryClient();
const inRoomEventGalleryImages = [
  "https://res.cloudinary.com/dwhc8kzpv/image/upload/v1776925513/DSC06020_ehruim.jpg",
  "https://res.cloudinary.com/dwhc8kzpv/image/upload/v1776925529/DSC06022_xybmbl.jpg",
  "https://res.cloudinary.com/dwhc8kzpv/image/upload/v1776925539/DSC06024_l5xmxc.jpg",
  "https://res.cloudinary.com/dwhc8kzpv/image/upload/v1776925551/DSC06036_p19nrt.jpg",
  "https://res.cloudinary.com/dwhc8kzpv/image/upload/v1776925567/DSC06045_jvt2rh.jpg",
  "https://res.cloudinary.com/dwhc8kzpv/image/upload/v1776925643/DSC06052_ibvveb.jpg",
];
const gardeniaHallImages = [
  "https://res.cloudinary.com/dwhc8kzpv/image/upload/v1776927275/DSC08789_jchzn4.jpg",
  "https://res.cloudinary.com/dwhc8kzpv/image/upload/v1776927267/DSC08760_co7jbw.jpg",
  "https://res.cloudinary.com/dwhc8kzpv/image/upload/v1776927266/DSC08758_rtqu6e.jpg",
];
const alJouriHallImages = [
  "https://res.cloudinary.com/dwhc8kzpv/image/upload/v1776926516/DSC00056_hjzwvy.jpg",
  "https://res.cloudinary.com/dwhc8kzpv/image/upload/v1776926527/DSC00058_d8vsgp.jpg",
  "https://res.cloudinary.com/dwhc8kzpv/image/upload/v1776926678/DSC08997_okdxrp.jpg",
  "https://res.cloudinary.com/dwhc8kzpv/image/upload/v1776926911/DSC08998_tgjegx.jpg",
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTopOnNav />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route
              path="/hospitality"
              element={<HospitalityServices gardeniaHallImages={gardeniaHallImages} alJouriHallImages={alJouriHallImages} />}
            />
            <Route path="/patients-visitors" element={<PatientsVisitors />} />
            <Route path="/al-safwa" element={<AlSafwaProgram />} />
            <Route path="/home-health" element={<HomeHealth />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorProfile />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/medical-services" element={<MedicalServices />} />
            <Route path="/medical-services/:slug" element={<DepartmentDetail />} />
            <Route path="/medical-services/:slug/:subSlug" element={<DepartmentDetail />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/work-with-us" element={<WorkWithUs />} />
            <Route path="/international-patient" element={<InternationalPatient />} />
            <Route path="/appointment-request" element={<AppointmentRequest />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/medical-rep-visit-booking" element={<MedicalRepVisitBooking />} />
            <Route path="/medical-records-request" element={<MedicalRecordsRequest />} />
            <Route path="/infant-security" element={<TrackerWaveInfantSecurity />} />
            <Route path="/in-room-events" element={<InRoomEvents galleryImages={inRoomEventGalleryImages} />} />
            <Route path="/job-application" element={<JobApplication />} />
            <Route path="/csr" element={<CSR />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
