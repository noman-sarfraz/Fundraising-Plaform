import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import FundraiserLayout from "../layouts/FundraiserLayout";
import DonorLayout from "../layouts/DonorLayout";
import Home from "../views/general/Home";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";
import NotFound from "../views/general/NotFound";
import Register from "../views/general/Register";
import Login from "../views/general/Login";
import NewDonation from "../views/donor/NewDonation";
import DonationHistory from "../views/donor/DonationHistory";
import SearchFundraisers from "../views/donor/SearchFundraisers";
import SavedFundraisers from "../views/donor/SavedFundraisers";
import RecurringDonations from "../views/donor/RecurringDonations";
import DonorProfileSettings from "../views/donor/ProfileSettings";
import AdminProfileSettings from "../views/admin/ProfileSettings";
import DonorFAQs from "../views/donor/FAQs";
import DonorHowItWorks from "../views/donor/HowItWorks";
import Campaigns from "../views/fundraiser/Campaigns";
import Campaign from "../views/fundraiser/Campaign";
import Publiccampaign from "../views/general/Campaign";
import Newcampaign from "../views/fundraiser/NewCampaign";
import FRDonationHistory from "../views/fundraiser/DonationHistory";
import FundraiserProfileSettings from "../views/fundraiser/ProfileSettings";
import FundraiserFAQs from "../views/fundraiser/FAQs";
import FundraiserHowItWorks from "../views/fundraiser/HowItWorks";
import FundraiserAuth from "../layouts/auths/FundraiserAuth";
import DonorAuth from "../layouts/auths/DonorAuth";
import AdminAuth from "../layouts/auths/AdminAuth";
import Dashboard from "../views/admin/Dashboard";
import Editcampaign from "../views/fundraiser/EditCampaign";
import Donate from "../views/general/Donate";
import CampaignStatistics from "../views/fundraiser/CampaignStatistics";
import LayoutDeterminer from "../layouts/layout-determiner/LayoutDeterminer";
import PaymentMethod from "../views/general/PaymentMethod";
import VerifyEmail from "../views/general/VerifyEmail";
import ConfirmEmailMessage from "../views/general/ConfirmEmailMessage";
import ForgotPassword from "../views/general/ForgotPassword";
import ForgotPasswordMessage from "../views/general/ForgotPasswordMessage";
import ResetPassword from "../views/general/ResetPassword";
import ResetPasswordMessage from "../views/general/ResetPasswordMessage";
import WithdrawMoney from "../views/fundraiser/WithdrawMoney";

function MainRoutes() {
  return (
    <Routes>
      <Route element={<FundraiserAuth />}>
        <Route path="fr_account" element={<FundraiserLayout />}>
          <Route index element={<Campaigns />} />
          <Route path="campaigns" element={<Campaigns />} />
          {/* <Route path="campaign/:id" element={<Campaign />} /> */}
          <Route path="new-campaign" element={<Newcampaign />} />
          <Route path="edit-campaign/:id" element={<Editcampaign />} />
          <Route path="donation-history" element={<FRDonationHistory />} />
          <Route path="campaign-statistics" element={<CampaignStatistics />} />
          <Route path="withdraw-money" element={<WithdrawMoney />} />
          <Route
            path="profile-settings"
            element={<FundraiserProfileSettings />}
          />
          <Route path="faqs" element={<FundraiserFAQs />} />
          <Route path="how-it-works" element={<FundraiserHowItWorks />} />
        </Route>
      </Route>

      <Route element={<DonorAuth />}>
        <Route path="/don_account" element={<DonorLayout />}>
          <Route index element={<DonationHistory />} />
          <Route path="donation-history" element={<DonationHistory />} />
          <Route path="new-donation" element={<NewDonation />} />
          {/* <Route path="donate/:id" element={<Donate />} /> */}
          <Route path="search-fundraisers" element={<SearchFundraisers />} />
          <Route path="saved-fundraisers" element={<SavedFundraisers />} />
          <Route path="recurring-donations" element={<RecurringDonations />} />
          <Route path="profile-settings" element={<DonorProfileSettings />} />
          <Route path="faqs" element={<DonorFAQs />} />
          <Route path="how-it-works" element={<DonorHowItWorks />} />
        </Route>
      </Route>

      <Route element={<AdminAuth />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile-settings" element={<AdminProfileSettings />} />
        </Route>
      </Route>

      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Navigate to="login" />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="confirm-email" element={<ConfirmEmailMessage />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="forgot-password-message"
          element={<ForgotPasswordMessage />}
        />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route
          path="reset-password-message"
          element={<ResetPasswordMessage />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/" element={<LayoutDeterminer />}>
        <Route path="campaign/:id" element={<Publiccampaign />} />
        <Route path="donate/:id" element={<Donate />} />
        <Route path="donate/payment-method/:id" element={<PaymentMethod />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
