import React, { useState } from "react";
import { Wand2, Download, Save, RefreshCw, Sparkles } from "lucide-react";
import axios from "axios";

const GeneratorPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    style: "modern",
  });

  const [generatedLogo, setGeneratedLogo] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const industries = [
    { key: "tech", label: "Technology" },
    { key: "finance", label: "Finance" },
    { key: "health", label: "Healthcare" },
    { key: "education", label: "Education" },
    { key: "fashion", label: "Fashion" },
    { key: "travel", label: "Travel" },
    { key: "food", label: "Food & Beverage" },
    { key: "sports", label: "Sports" },
  ];

  const styles = [
    { value: "modern", label: "Modern", description: "Clean and contemporary" },
    {
      value: "classic",
      label: "Classic",
      description: "Timeless and traditional",
    },
    { value: "minimal", label: "Minimal", description: "Simple and elegant" },
    { value: "bold", label: "Bold", description: "Strong and impactful" },
    {
      value: "elegant",
      label: "Elegant",
      description: "Sophisticated and refined",
    },
    { value: "playful", label: "Playful", description: "Fun and creative" },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateLogo = async () => {
    if (!formData.companyName || !formData.industry || !formData.style) {
      alert("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/generate-logo",
        formData
      );

      const svg = response.data.svg;

      setGeneratedLogo({
        svgData: svg,
        industry: formData.industry,
        style: formData.style,
        colorScheme: {
          primary: "#000000",
          secondary: "#ffffff",
        },
      });
    } catch (error) {
      console.error(
        "Error generating logo:",
        error?.response?.data || error.message
      );
      alert("Failed to generate logo. Please check backend or try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveLogo = async () => {
    if (!generatedLogo) return;

    setIsSaving(true);

    try {
      await axios.post("http://localhost:4000/api/logos", generatedLogo);
      alert("Logo saved successfully!");
    } catch (error) {
      console.error(
        "Error saving logo:",
        error?.response?.data || error.message
      );
      alert("Failed to save logo. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const downloadLogo = () => {
    if (!generatedLogo) return;

    const blob = new Blob([generatedLogo.svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.companyName
      .replace(/\s+/g, "-")
      .toLowerCase()}-logo.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl text-white">
            <Wand2 size={40} />
          </div>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          AI Logo Generator
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Create professional logos in seconds with our AI-powered design engine
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {/* Form Section */}
        <div className="glass-effect p-6 sm:p-8 rounded-3xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
            Design Your Logo
          </h2>
          <div className="space-y-6">
            {/* Company Name */}
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Company Name *
              </label>
              <input
                id="companyName"
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-sm sm:text-base rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="Enter your company name"
              />
            </div>
            {/* Industry */}
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Industry *
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-sm sm:text-base rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              >
                <option value="">Select your industry</option>
                {industries.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Styles */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Style Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {styles.map((style) => (
                  <label
                    key={style.value}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.style === style.value
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="style"
                      value={style.value}
                      checked={formData.style === style.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="text-sm font-medium text-gray-800">
                      {style.label}
                    </div>
                    <div className="text-xs text-gray-600">
                      {style.description}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            {/* Generate Button */}
            <button
              onClick={generateLogo}
              disabled={
                isGenerating || !formData.companyName || !formData.industry
              }
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 text-white font-semibold rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={20} className="animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Generate Logo</span>
                </>
              )}
            </button>
          </div>
        </div>
        {/* Preview Section */}
        <div className="glass-effect p-6 sm:p-8 rounded-3xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
            Logo Preview
          </h2>
          {generatedLogo ? (
            <div className="space-y-6">
              <div className="logo-preview bg-white p-6 sm:p-8 rounded-2xl shadow-lg overflow-x-auto">
                <div
                  className="flex items-center justify-center max-w-full"
                  dangerouslySetInnerHTML={{ __html: generatedLogo.svgData }}
                />
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Industry:</span>
                  <span className="font-medium capitalize">
                    {generatedLogo.industry}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Style:</span>
                  <span className="font-medium capitalize">
                    {generatedLogo.style}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Colors:</span>
                  <div className="flex space-x-2">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor: generatedLogo.colorScheme.primary,
                      }}
                    />
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor: generatedLogo.colorScheme.secondary,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={downloadLogo}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                >
                  <Download size={18} />
                  <span>Download</span>
                </button>
                <button
                  onClick={saveLogo}
                  disabled={isSaving}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <RefreshCw size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  <span>{isSaving ? "Saving..." : "Save"}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="text-center">
                <Wand2 size={48} className="mx-auto mb-4 opacity-50" />
                <p>Your generated logo will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage;
