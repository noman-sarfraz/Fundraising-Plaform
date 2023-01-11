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
import NotFound from "../views/general/NotFound";
import Register from "../views/general/Register";
import Login from "../views/general/Login";
import { Dashboard } from "@mui/icons-material";
import NewDonation from "../views/donor/NewDonation";
import DonationHistory from "../views/donor/DonationHistory";
import SearchFundraisers from "../views/donor/SearchFundraisers";
import SavedFundraisers from "../views/donor/SavedFundraisers";
import RecurringDonations from "../views/donor/RecurringDonations";
import DonorProfileSettings from "../views/donor/ProfileSettings";
import DonorFAQs from "../views/donor/FAQs";
import DonorHowItWorks from "../views/donor/HowItWorks";
import Compaigns from "../views/fundraiser/Compaigns";
import NewCompaign from "../views/fundraiser/NewCompaign";
import Fundings from "../views/fundraiser/Fundings";
import VisualStatistics from "../views/fundraiser/VisualStatistics";
import FundraiserProfileSettings from "../views/fundraiser/ProfileSettings";
import FundraiserFAQs from "../views/fundraiser/FAQs";
import FundraiserHowItWorks from "../views/fundraiser/HowItWorks";

function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="fr_account" element={<FundraiserLayout />}>
          <Route index element={<Compaigns />} />
          <Route path="compaigns" element={<Compaigns />} />
          <Route path="new-compaign" element={<NewCompaign />} />
          <Route path="fundings" element={<Fundings />} />
          <Route path="visual-statistics" element={<VisualStatistics />} />
          <Route
            path="profile-settings"
            element={<FundraiserProfileSettings />}
          />
          <Route path="faqs" element={<FundraiserFAQs />} />
          <Route path="how-it-works" element={<FundraiserHowItWorks />} />
        </Route>

        <Route path="/don_account" element={<DonorLayout />}>
          <Route index element={<DonationHistory />} />
          <Route path="donation-history" element={<DonationHistory />} />
          <Route path="new-donation" element={<NewDonation />} />
          <Route path="search-fundraisers" element={<SearchFundraisers />} />
          <Route path="saved-fundraisers" element={<SavedFundraisers />} />
          <Route path="recurring-donations" element={<RecurringDonations />} />
          <Route path="profile-settings" element={<DonorProfileSettings />} />
          <Route path="faqs" element={<DonorFAQs />} />
          <Route path="how-it-works" element={<DonorHowItWorks />} />
        </Route>

        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Navigate to="login" />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default MainRoutes;