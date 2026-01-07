"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import HandwritingAnalysisSection from "@/components/sections/HandwritingAnalysisSection";

export default function HandwritingAnalysisPage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleTryNow = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/homeanalisis");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden pt-20">
      <HandwritingAnalysisSection onTryNow={handleTryNow} />
    </main>
  );
}
