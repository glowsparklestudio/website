import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

const categories = ["Men's Grooming", "Women's Beauty", "Hair Treatments", "Skin Treatments", "Bridal", "Other"];
const services: Record<string, string[]> = {
  "Men's Grooming": ["Signature Haircut", "Beard Spa", "Coloring", "Other"],
  "Women's Beauty": ["Haircut & Styling", "Global Coloring", "Highlights", "Other"],
  "Hair Treatments": ["Keratin/Botox", "Hair Spa", "Scalp Treatment", "Other"],
  "Skin Treatments": ["Premium Facial", "D-Tan", "Cleanup", "Other"],
  "Bridal": ["Bridal Makeup", "Pre-Bridal Package", "Consultation"],
  "Other": ["General Inquiry", "Custom Package"]
};

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    category: "",
    service: "",
    time: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 6) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Send to Google Sheets Webhook
      const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbxZRhmXDZFU4HzrCg6r8jrNYsmnRkn4fRylQipdQBSX0sDmqZW9PqJI__TYi8bePNjv/exec";
      if (scriptUrl) {
           let sourceVal = "Book Now";
           if (formData.category === "Bridal" && formData.service === "Consultation") {
               sourceVal = "Bridal Consultation";
           } else if (formData.service === "Consultation") {
               sourceVal = "Consultation";
           }

           const params = new URLSearchParams();
           params.append("sheetName", sourceVal);
           params.append("Source", sourceVal);
           params.append("Name", formData.name);
           params.append("Phone", formData.phone);
           params.append("Gender", formData.gender);
           params.append("Category", formData.category);
           params.append("Services", formData.service);
           params.append("Date", formData.time.split('T')[0] || "");
           params.append("Time", formData.time.split('T')[1] || "");

           await fetch(scriptUrl, {
               method: 'POST',
               mode: 'no-cors',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: params.toString()
           });
      }
      setSubmitted(true);
    } catch (e) {
      console.error("Sheet sync failed", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl leading-tight mb-4">Request an Appointment</h1>
          <div className="w-12 h-[1px] bg-brand-400 mx-auto"></div>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-sm relative overflow-hidden">
          {/* Progress Bar */}
          {!submitted && (
             <div className="absolute top-0 left-0 h-1 bg-white/10 w-full">
               <motion.div 
                 className="h-full bg-brand-400"
                 initial={{ width: 0 }}
                 animate={{ width: `${(step / 6) * 100}%` }}
               />
             </div>
          )}

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key={step}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {step === 1 && (
                  <div>
                    <label className="block text-xl font-serif mb-6 text-brand-400">What is your name?</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-transparent border-b border-white/20 text-white text-2xl py-2 focus:outline-none focus:border-brand-400 font-light placeholder:text-white/20 transition-colors"
                      autoFocus
                    />
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <label className="block text-xl font-serif mb-6 text-brand-400">Select Gender</label>
                    <div className="grid grid-cols-2 gap-4">
                      {["Male", "Female"].map(gender => (
                        <button
                          key={gender}
                          onClick={() => { updateForm('gender', gender); setTimeout(nextStep, 300); }}
                          className={`p-6 border rounded-sm transition-all duration-300 text-lg uppercase tracking-wider ${
                            formData.gender === gender 
                              ? "bg-brand-400/10 border-brand-400 text-brand-400" 
                              : "bg-transparent border-white/10 hover:border-brand-400/50"
                          }`}
                        >
                          {gender}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <label className="block text-xl font-serif mb-6 text-brand-400">What are you looking for?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => { 
                            updateForm('category', cat); 
                            updateForm('service', ''); // Reset service on category change
                            setTimeout(nextStep, 300); 
                          }}
                          className={`p-4 border rounded-sm transition-all duration-300 ${
                            formData.category === cat 
                              ? "bg-brand-400/10 border-brand-400 text-brand-400" 
                              : "bg-transparent border-white/10 hover:border-brand-400/50"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <label className="block text-xl font-serif mb-6 text-brand-400">Select Specific Service</label>
                    <div className="grid grid-cols-1 gap-3">
                      {(services[formData.category] || services["Other"]).map(service => (
                        <button
                          key={service}
                          onClick={() => { updateForm('service', service); setTimeout(nextStep, 300); }}
                          className={`p-4 border rounded-sm transition-all duration-300 text-left ${
                            formData.service === service 
                              ? "bg-brand-400/10 border-brand-400 text-brand-400" 
                              : "bg-transparent border-white/10 hover:border-brand-400/50"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <label className="block text-xl font-serif mb-6 text-brand-400">Preferred Date & Time</label>
                    <input 
                      type="datetime-local" 
                      value={formData.time}
                      onChange={(e) => updateForm('time', e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 text-white text-xl py-2 focus:outline-none focus:border-brand-400 font-light [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]"
                    />
                  </div>
                )}

                {step === 6 && (
                  <div>
                    <label className="block text-xl font-serif mb-6 text-brand-400">How can we reach you?</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full bg-transparent border-b border-white/20 text-white text-2xl py-2 focus:outline-none focus:border-brand-400 font-light placeholder:text-white/20"
                    />
                    <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-sm">
                      <h4 className="text-sm text-brand-400 uppercase tracking-widest mb-2">Summary</h4>
                      <p className="font-light text-sm text-white/70">
                        {formData.name} • {formData.service} • {formData.time ? new Date(formData.time).toLocaleString() : 'TBD'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
                  <button 
                    onClick={prevStep}
                    disabled={step === 1}
                    className={`flex items-center gap-2 uppercase tracking-widest text-xs font-medium transition-colors ${step === 1 ? 'text-transparent cursor-default' : 'text-white/50 hover:text-white'}`}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>

                  {step < 6 ? (
                    <button 
                      onClick={nextStep}
                      disabled={(step === 1 && !formData.name) || (step === 5 && !formData.time)}
                      className="flex items-center gap-2 uppercase tracking-widest text-xs font-medium text-brand-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button 
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.phone}
                      className="flex items-center gap-2 bg-brand-400 text-charcoal-900 px-6 py-2 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-brand-500 transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? 'Submitting...' : 'Confirm Request'}
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-brand-400/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-400/50">
                  <Check size={40} className="text-brand-400" />
                </div>
                <h3 className="font-serif text-3xl mb-4 text-brand-400">Request Received</h3>
                <p className="text-white/70 font-light max-w-sm mx-auto mb-10">
                  Thank you, {formData.name}. Our master stylists are reviewing your request. We will contact you shortly to confirm your appointment.
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setStep(1); setFormData({name:"", gender:"", category:"", service:"", time:"", phone:""}); }}
                  className="text-xs uppercase tracking-widest border-b border-white/30 pb-1 hover:text-brand-400 hover:border-brand-400 transition-colors"
                >
                  Book another appointment
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
