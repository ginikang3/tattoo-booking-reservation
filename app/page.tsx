"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, MapPin, Camera, Scissors, ChevronRight, Grid, CheckCircle2, Image as ImageIcon } from "lucide-react";

// 국가 선택 전화번호 라이브러리 (npm install react-phone-number-input)
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PORTFOLIO = [
  { id: 1, title: "Fine Line", url: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=774&auto=format&fit=crop" },
  { id: 2, title: "Botanical", url: "https://images.unsplash.com/photo-1601848714157-d845bb5c11ff?q=80&w=1160&auto=format&fit=crop" },
  { id: 3, title: "Minimalist", url: "https://images.unsplash.com/photo-1604374376934-2df6fad6519b?q=80&w=1740&auto=format&fit=crop" },
  { id: 4, title: "Artistic", url: "https://images.unsplash.com/photo-1541121514895-0f36e7d38d14?q=80&w=1740&auto=format&fit=crop" },
  { id: 5, title: "Detail", url: "https://images.unsplash.com/photo-1627960630431-270d04164a22?q=80&w=870&auto=format&fit=crop" },
  { id: 6, title: "Line Work", url: "https://images.unsplash.com/photo-1617196556242-d0de7c06a13e?q=80&w=744&auto=format&fit=crop" },
];

export default function TattooBookingPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // 예약 정보 상태
  const [name, setName] = useState("");
  const [phone, setPhone] = useState<string | undefined>();
  const [area, setArea] = useState("");
  const [size, setSize] = useState("");
  const [idea, setIdea] = useState("");
  const [image, setImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 모든 필드 및 사진(image) 입력 여부 확인
  const isFormValid = useMemo(() => {
    return name.trim() !== "" && 
           phone !== undefined && phone.length > 5 && 
           area.trim() !== "" && 
           size.trim() !== "" && 
           idea.trim() !== "" &&
           image !== null;
  }, [name, phone, area, size, idea, image]);

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="z-10"
        >
          <div className="flex justify-center mb-6 text-white drop-shadow-lg">
            <Scissors size={48} className="rotate-90" />
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)] leading-none uppercase">
            CHIDO <br /> <span className="text-[#00d1c1]">Tattoo</span>
          </h1>
          <p className="text-white text-lg md:text-xl font-bold mb-12 max-w-lg mx-auto drop-shadow-md">
            Fine Line, Botánico y Minimalista. <br /> Convierte tu idea en arte eterno.
          </p>
          <button 
            onClick={() => { setIsFormOpen(true); setIsSubmitted(false); setImage(null); }}
            className="px-14 py-6 bg-[#00d1c1] text-white font-black rounded-full hover:bg-white hover:text-[#00d1c1] transition-all transform hover:scale-110 uppercase text-sm tracking-[0.2em] shadow-2xl"
          >
            Cotizar Proyecto
          </button>
        </motion.div>

        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-white" />
      </section>

      {/* --- PORTFOLIO SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center gap-3 mb-12">
          <Grid className="text-[#00d1c1]" size={28} />
          <h2 className="text-3xl font-black uppercase tracking-tighter">Portafolio</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PORTFOLIO.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ scale: 0.98 }}
              className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-gray-100 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-bold text-sm uppercase tracking-widest">{item.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CONSULTATION MODAL --- */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed inset-0 z-50 bg-[#F0F9F9] flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 bg-white border-b border-[#00d1c1]/10 sticky top-0 z-10">
              <span className="font-black text-[#00d1c1] tracking-tighter text-xl uppercase">CHIDO Tattoo</span>
              <button onClick={() => setIsFormOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"><X size={24} /></button>
            </div>

            <div className="p-8 max-w-xl mx-auto w-full">
              {!isSubmitted ? (
                <div className="space-y-8">
                  <div className="text-center mb-4">
                    <h2 className="text-3xl font-black tracking-tight text-[#0f3d3e] uppercase italic">Tu Idea</h2>
                    <p className="text-gray-500 font-medium text-sm">Cuéntame sobre tu próximo tatuaje</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white p-6 rounded-[2rem] border border-[#00d1c1]/10 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3 font-bold"><MapPin className="text-[#00d1c1]" /><span>Zona del cuerpo</span></div>
                      <input 
                        type="text" 
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="Ej: Antebrazo" 
                        className="bg-gray-50 px-4 py-2 rounded-xl outline-none text-right font-bold w-1/2 text-black" 
                      />
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-[#00d1c1]/10 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3 font-bold"><Sparkles className="text-[#00d1c1]" /><span>Tamaño (cm)</span></div>
                      <input 
                        type="text" 
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="Ej: 10cm" 
                        className="bg-gray-50 px-4 py-2 rounded-xl outline-none text-right font-bold w-1/2 text-black" 
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pb-20 mt-4">
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nombre" 
                      className="w-full bg-white border border-gray-100 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#00d1c1]/20 transition-all text-black font-bold" 
                    />
                    
                    <div className="global-phone-input-container">
                      <PhoneInput 
                        international 
                        defaultCountry="MX" 
                        value={phone} 
                        onChange={setPhone} 
                        placeholder="WhatsApp" 
                        className="w-full bg-white border border-gray-100 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#00d1c1]/20 transition-all text-black font-bold" 
                      />
                    </div>

                    <textarea 
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="Cuéntame tu idea..." 
                      className="w-full bg-white border border-gray-100 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#00d1c1]/20 transition-all text-black min-h-[120px] resize-none font-bold" 
                    />
                    
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center gap-2 cursor-pointer hover:bg-[#00d1c1]/5 transition-colors relative overflow-hidden ${
                        image ? "border-[#00d1c1]" : "border-[#00d1c1]/20"
                      }`}
                    >
                      {image ? (
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={image} alt="Reference" className="w-12 h-12 object-cover rounded-lg shadow-sm" />
                          <span className="text-[10px] font-black text-[#00d1c1] uppercase tracking-widest">Imagen adjunta</span>
                        </div>
                      ) : (
                        <>
                          <Camera size={24} className="text-[#00d1c1]" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Adjuntar Referencia (Obligatorio)</span>
                        </>
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </div>

                    <button 
                      disabled={!isFormValid}
                      onClick={() => setIsSubmitted(true)}
                      className={`w-full py-6 font-black rounded-[2rem] shadow-xl active:scale-95 transition-all mt-4 uppercase tracking-widest flex items-center justify-center gap-3 ${
                        isFormValid ? "bg-[#00d1c1] text-white shadow-[#00d1c1]/30" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Enviar Solicitud <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-24 h-24 bg-[#00d1c1] text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#00d1c1]/40">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter text-[#0f3d3e] mb-2 uppercase italic">¡Solicitud recibida!</h2>
                  <p className="text-gray-500 font-bold mb-8">Me pondré en contacto contigo muy pronto.</p>
                  
                  <div className="w-full bg-white rounded-[2rem] p-8 shadow-sm border border-[#00d1c1]/10 text-left space-y-4 mb-10">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Resumen de Cita</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-gray-400">Nombre</span>
                      <span className="font-black text-[#0f3d3e]">{name}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-gray-400">WhatsApp</span>
                      <span className="font-black text-[#0f3d3e]">{phone}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-gray-400">Zona / Tamaño</span>
                      <span className="font-black text-[#0f3d3e]">{area} / {size}</span>
                    </div>
                    {image && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-gray-400">Referencia</span>
                        <ImageIcon size={16} className="text-[#00d1c1]" />
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => { setIsFormOpen(false); setImage(null); }}
                    className="px-12 py-4 bg-[#0f3d3e] text-white font-black rounded-full text-xs uppercase tracking-widest"
                  >
                    Volver
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .global-phone-input-container .PhoneInputInput {
          outline: none;
          background: transparent;
          font-weight: bold;
          border: none;
          width: 100%;
          padding-left: 10px;
          color: black;
        }
        .global-phone-input-container .PhoneInputCountry {
          border-right: 1px solid #eee;
          padding-right: 10px;
        }
      `}</style>
    </main>
  );
}