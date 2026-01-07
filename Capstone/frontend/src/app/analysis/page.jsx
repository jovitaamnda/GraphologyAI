"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import CanvasDrawing from "@/components/analysis/CanvasDrawing";
import ImageUpload from "@/components/analysis/ImageUpload";
import AnalysisResult from "@/components/analysis/AnalysisResult";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalysisPage() {
  const { user } = useAuth();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("canvas");

  const handleAnalysisComplete = (result) => {
    setAnalysis(result);
    setError("");
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Graphology Analysis
          </h1>
          <p className="text-purple-200 text-lg">
            Analyze your handwriting and discover your personality traits
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analysis Tools */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Analysis Tools
              </h2>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="canvas">Draw</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>

                <TabsContent value="canvas" className="space-y-4">
                  <CanvasDrawing
                    userId={user?.id}
                    onComplete={handleAnalysisComplete}
                    onError={handleError}
                    setLoading={setLoading}
                  />
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                  <ImageUpload
                    userId={user?.id}
                    onComplete={handleAnalysisComplete}
                    onError={handleError}
                    setLoading={setLoading}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-3xl mb-6">
                <p className="font-semibold">Error: {error}</p>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Analyzing your handwriting...</p>
              </div>
            )}

            {analysis && !loading && (
              <AnalysisResult analysis={analysis} />
            )}

            {!analysis && !loading && !error && (
              <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                <div className="text-6xl mb-4">✏️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Ready to Start?
                </h3>
                <p className="text-gray-600">
                  Draw your handwriting or upload an image to begin the analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
