import { useState, useEffect } from "react";
import { BiPhone } from "react-icons/bi";
import {
  FaTimes,
  FaUpload,
  FaVideo,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFilePdf,
  FaPlay,
  FaPhone,
  FaPhoneAlt,
} from "react-icons/fa";
import apiClient from "../api";

const JoinTeamPopup = ({ isOpen, onClose, language }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "Bihar",
    district: "",
    resume: null,
    demoVideo: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error'
  const [submissionMessage, setSubmissionMessage] = useState("");

  const districtsOfBihar = [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Reset submission status on new submission attempt
    setSubmissionStatus(null);
    setSubmissionMessage("");

    try {
      // Create FormData object to send files
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("district", formData.district);

      if (formData.resume) formDataToSend.append("resume", formData.resume);
      if (formData.demoVideo)
        formDataToSend.append("demoVideo", formData.demoVideo);

      const response = await apiClient.post("/join-team", formDataToSend);

      console.log("Form submitted successfully:", response.data);
      setSubmissionStatus("success");
      setSubmissionMessage(
        response.data.message || "Application submitted successfully!"
      );

      // Close popup after a short delay to show success message
      setTimeout(() => {
        onClose();
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          state: "Bihar",
          district: "",
          resume: null,
          demoVideo: null,
        });
      }, 2000);
    } catch (err) {
      console.error("Error submitting form:", err);
      let errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred.";

      // Check for MongoDB duplicate key error for the email
      const mongoError = err.response?.data?.error;
      if (
        typeof mongoError === "string" &&
        mongoError.includes("E11000") &&
        mongoError.includes("email")
      ) {
        errorMessage =
          language === "hi"
            ? "यह ईमेल पहले से पंजीकृत है। कृपया एक अलग ईमेल का उपयोग करें।"
            : "This email is already registered. Please use a different one.";
      }
      setSubmissionStatus("error");
      setSubmissionMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = (fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: null,
    }));
  };

  useEffect(() => {
    if (isOpen) {
      // Reset submission status when popup opens
      setSubmissionStatus(null);
      setSubmissionMessage("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function to restore scroll on component unmount
    return () => {
      if (!isOpen) {
        setIsSubmitting(false);
      }
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[60] p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-slideUp border border-gray-100">
        {/* Header */}
        <div className="relative bg-linear-to-r from-red-800 to-red-900 p-8 text-white shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold tracking-tight">
                {language === "hi" ? "हमसे जुड़ें" : "Join Our Team"}
              </h2>
              <p className="text-red-100 text-sm lg:text-base mt-2 font-medium opacity-90">
                {language === "hi"
                  ? "AP News के साथ पत्रकारिता में अपना करियर बनाएं"
                  : "Build your career in journalism with AP News"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <FaTimes size={20} />
            </button>
          </div>
          <div className="absolute -bottom-8 right-8 w-16 h-16 bg-white rounded-2xl rotate-3 flex items-center justify-center shadow-lg border-4 border-white/50 hidden md:flex">
            <FaUser className="text-red-700 text-2xl" />
          </div>
        </div>

        {/* Form Container */}
        <div className="overflow-y-auto p-6 md:p-8 grow custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6">
            {submissionStatus && (
              <div
                className={`p-4 rounded-xl text-center font-medium flex items-center justify-center gap-2 ${
                  submissionStatus === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {submissionStatus === "success" && (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                )}
                {submissionMessage}
              </div>
            )}

            {submissionStatus !== "success" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="group">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                      {language === "hi" ? "पूरा नाम" : "Full Name"}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-200 font-medium text-gray-900 placeholder-gray-400"
                        placeholder={
                          language === "hi" ? "आपका नाम" : "John Doe"
                        }
                      />
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="group">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-200 font-medium text-gray-900 placeholder-gray-400"
                        placeholder="john@example.com"
                      />
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="group">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                      {language === "hi" ? "फोन नंबर" : "Phone Number"}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-200 font-medium text-gray-900 placeholder-gray-400"
                        placeholder="+91 98765 43210"
                      />
                      <FaPhoneAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                    </div>
                  </div>

                  {/* District Field */}
                  <div className="group">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                      {language === "hi" ? "जिला" : "District"}
                    </label>
                    <div className="relative">
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-200 font-medium text-gray-900 appearance-none cursor-pointer"
                      >
                        <option value="">
                          {language === "hi" ? "चुनें..." : "Select..."}
                        </option>
                        {districtsOfBihar.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                      <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload Section */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-1 h-4 bg-red-600 rounded-full"></span>
                    {language === "hi" ? "दस्तावेज़ अपलोड" : "Upload Documents"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Resume Upload */}
                    <label className="relative group cursor-pointer">
                      <input
                        type="file"
                        name="resume"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        required
                        className="hidden"
                      />
                      <div
                        className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 h-full flex flex-col items-center justify-center gap-2 ${
                          formData.resume
                            ? "border-green-300 bg-green-50/50"
                            : "border-gray-300 hover:border-red-400 hover:bg-red-50/30"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            formData.resume
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-400 group-hover:bg-red-100 group-hover:text-red-500"
                          }`}
                        >
                          <FaFilePdf className="text-lg" />
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {formData.resume ? (
                            <span className="text-green-700 break-all line-clamp-1 px-2">
                              {formData.resume.name}
                            </span>
                          ) : (
                            <span>
                              {language === "hi"
                                ? "रिज्यूमे अपलोड करें"
                                : "Upload Resume"}
                            </span>
                          )}
                        </div>
                        {!formData.resume && (
                          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                            PDF, DOC (Max 5MB)
                          </span>
                        )}
                      </div>
                      {formData.resume && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFile("resume");
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md transition-transform hover:scale-110"
                        >
                          <FaTimes size={10} />
                        </button>
                      )}
                    </label>

                    {/* Video Upload */}
                    <label className="relative group cursor-pointer">
                      <input
                        type="file"
                        name="demoVideo"
                        onChange={handleFileChange}
                        accept="video/*"
                        className="hidden"
                      />
                      <div
                        className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 h-full flex flex-col items-center justify-center gap-2 ${
                          formData.demoVideo
                            ? "border-green-300 bg-green-50/50"
                            : "border-gray-300 hover:border-red-400 hover:bg-red-50/30"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            formData.demoVideo
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-400 group-hover:bg-red-100 group-hover:text-red-500"
                          }`}
                        >
                          <FaVideo className="text-lg" />
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {formData.demoVideo ? (
                            <span className="text-green-700 break-all line-clamp-1 px-2">
                              {formData.demoVideo.name}
                            </span>
                          ) : (
                            <span>
                              {language === "hi" ? "डेमो वीडियो" : "Demo Video"}
                            </span>
                          )}
                        </div>
                        {!formData.demoVideo && (
                          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                            MP4, MOV
                          </span>
                        )}
                      </div>
                      {formData.demoVideo && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFile("demoVideo");
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md transition-transform hover:scale-110"
                        >
                          <FaTimes size={10} />
                        </button>
                      )}
                    </label>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all duration-200 disabled:opacity-50"
                  >
                    {language === "hi" ? "रद्द करें" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3.5 bg-linear-to-r from-red-700 to-red-800 text-white rounded-xl hover:from-red-800 hover:to-red-900 font-bold tracking-wide shadow-lg shadow-red-200 hover:shadow-red-300 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>
                          {language === "hi"
                            ? "प्रतीक्षा करें..."
                            : "Processing..."}
                        </span>
                      </>
                    ) : (
                      <>
                        <FaUpload className="text-sm" />
                        <span>
                          {language === "hi"
                            ? "आवेदन जमा करें"
                            : "Submit Application"}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinTeamPopup;
