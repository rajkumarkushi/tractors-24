import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import BrandDetails from './pages/BrandDetails';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Register';


import DealerDashboard from './pages/dealer/DealerDashboard';
import { AuthProvider } from './services/Authcontext';
import { LanguageProvider } from './utils/langaugeContext';

import EMICalculator from './pages/EmiCalculator';
import CustomerDashboard from './pages/user/CustomerDashboard';

// import TractorListing from './pages/tractors/TractorListing';
// import TractorDetail from './pages/tractors/TractorDetail';
import ReferralDashboard from './pages/Referral';
import SellerForm from './pages/user/SellerForm';
// import InsuranceEnquiry from './pages/Insuranceenquiry'
import AuctionTerms from './pages/AuctionTerms';
import BudgetDetails from './pages/Budjetdetails';
import PrivacyPolicy from './pages/PrivacyPolicy';
import UserAgreement from './pages/UserAgreement';
import AdminDashboard from './pages/admin/AdminDashboard';
import InsuranceInquiry from './pages/user/InsuranceInquiry';
import LoanInquiry from './pages/user/LoanInquiry';
import TractorDetails from './pages/tractors/TractorDetails'
import CustomerInquiryForm from './pages/dealer/CustomerInquiryForm'
import SearchResults from './pages/SearchResult';
import AllTractors from './pages/AllTractors';

// import Profile from './pages/user/Profile';
// import Wallet from './pages/user/Wallet';
import './App.css';


function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="app">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/brand/:brandName" element={<BrandDetails />} />
              <Route path="/budget/:budjet" element={<BudgetDetails />} />

              <Route path="/dealer" element={<DealerDashboard />} />
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<Signup />} />
              <Route path="/sell" element={<SellerForm />} />
              <Route path="/referal" element={<ReferralDashboard />} />
              <Route path="/emi" element={<EMICalculator />} />
              <Route path="/Insurance" element={<InsuranceInquiry />} />
              <Route path="/loan" element={<LoanInquiry />} />
              <Route path="/Dashboard" element={<CustomerDashboard />} />
              <Route path="/Admin" element={<AdminDashboard/>} />
              <Route path="/user-agreement" element={<UserAgreement />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/auction-terms" element={<AuctionTerms />} />
              <Route path="/tractor/:id" element={<TractorDetails />} />
              <Route path="/customerinquiry" element={<CustomerInquiryForm />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/tractors" element={<AllTractors />} />
              
              {/*  */}
              {/*  />
              <Route path="/wallet" element={<Wallet />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;