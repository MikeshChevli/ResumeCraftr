import React, { Suspense } from "react";
import { Header, MainSpinner } from "../components";
import { Route, Routes } from "react-router-dom";
import { Footer, HomeContainer } from "../containers";
import {
  CreateResume,
  CreateTempate,
  TemplateDesignPinDetails,
  UserProfile,
} from "../pages";

const HomeScreen = () => {
  return (
    <div className="w-full">
      <Header />
      <main className="w-full">
        <Suspense fallback={<MainSpinner />}>
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/template/create" element={<CreateTempate />} />
            <Route path="/profile/:uid" element={<UserProfile />} />
            <Route path="/resume/*" element={<CreateResume />} />
            <Route
              path="/resumeDetail/:templateId"
              element={<TemplateDesignPinDetails />}
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default HomeScreen;
