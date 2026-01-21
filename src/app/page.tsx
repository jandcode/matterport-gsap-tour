'use client';

import { useState } from 'react';
import MatterportViewer from "@/components/MatterportViewer";
import TourOverlay from "@/components/TourOverlay";
import { SHOWROOM_TOUR } from "@/lib/tourData";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleSdkReady = (mpSdk: any) => {
    console.log("SDK is ready in Home");
    setIsLoading(false);
  };

  const handleStepChange = (index: number) => {
    setCurrentStepIndex(index);
  };

  return (
    <main className="fixed inset-0 flex flex-col bg-black overflow-hidden touch-none h-[100dvh] w-screen">
      <div className="flex-1 w-full relative h-full">
        <MatterportViewer
          modelId="SxQL3iGyoDo"
          applicationKey="yrth7w7ap0w8yfbxptqa1t28d"
          assetBase="/foo"
          currentStep={SHOWROOM_TOUR.steps[currentStepIndex]}
          onSdkReady={handleSdkReady}
        />

        <TourOverlay
          steps={SHOWROOM_TOUR.steps}
          onStepChange={handleStepChange}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}

