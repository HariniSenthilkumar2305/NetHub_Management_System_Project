import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Dashboard from "./Pages/Dashboard";
import SystemAllotment from "./Pages/SystemAllotment";
import PaymentPageSystemAllotment from "./Pages/PaymentPageSystemAllotment";
import ConfirmationPage from "./Pages/ConfirmationPage";
import LaptopService from "./Pages/LaptopService"; 
import PaymentPageLaptopService from "./Pages/PaymentPageLaptopService";
import ConfirmationPageLaptopService from "./Pages/ConfirmationPageLaptopService";
import CCTVService from "./Pages/CCTVService";
import PaymentPageCCTVService from "./Pages/PaymentPageCCTVService";
import ConfirmationPageCCTVService from "./Pages/ConfirmationPageCCTVService";
import TicketBooking from "./Pages/TicketBooking"; // ✅ Import Ticket Booking Page
import PaymentPage from "./Pages/PaymentPage"; // ✅ Common Payment Page
import PaymentPageTicketBooking from "./Pages/PaymentPageTicketBooking"; // ✅ Import Payment Page for Ticket Booking

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/system-allotment" element={<SystemAllotment />} />
          <Route path="/payment-system-allotment" element={<PaymentPageSystemAllotment />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/laptop-service" element={<LaptopService />} />
          <Route path="/payment-laptop-service" element={<PaymentPageLaptopService />} />
          <Route path="/confirmation-laptop-service" element={<ConfirmationPageLaptopService />} />
          <Route path="/cctv-service" element={<CCTVService />} />
          <Route path="/payment" element={<PaymentPageCCTVService />} />
           <Route path="/cctv-confirmation" element={<ConfirmationPageCCTVService />} /> 
          <Route path="/ticket-booking" element={<TicketBooking />} /> {/* ✅ Ticket Booking Route */}
          <Route path="/payment" element={<PaymentPage />} /> {/* ✅ Common Payment Page */}
          <Route path="/payment-ticket" element={<PaymentPageTicketBooking />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
