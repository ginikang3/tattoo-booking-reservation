"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, MapPin, Camera, Scissors, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TattooBookingPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white overflow-x-hidden">
      
      {/* --- HERO SECTION (기존 투어 섹션처럼 배경 강조) --- */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="z-10"
        >
          <div className="flex justify-center mb-6 text-white drop-shadow-lg">
            <Scissors size={48} className="rotate-90" />
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)] leading-none uppercase">
            Roy Burgos <br /> <span className="text-[#00d1c1]">Tattoo</span>
          </h1>
          <p className="text-white text-lg md:text-xl font-bold mb-12 max-w-lg mx-auto drop-shadow-md">
            Fine Line, Botánico y Minimalista. <br /> Convierte tu idea en arte eterno.
          </p>
          <button 
            onClick={() => { setIsFormOpen(true); setIsSubmitted(false); }}
            className="px-14 py-6 bg-[#00d1c1] text-white font-black rounded-full hover:bg-white hover:text-[#00d1c1] transition-all transform hover:scale-110 uppercase text-sm tracking-[0.2em] shadow-2xl"
          >
            Cotizar Proyecto
          </button>
        </motion.div>

        {/* 배경: Roy의 작업 스타일과 어울리는 고화질 타투/예술적 배경 */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </section>

      {/* --- CONSULTATION MODAL (기존 예약 페이지 구조) --- */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed inset-0 z-50 bg-[#F0F9F9] flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-white border-b border-[#00d1c1]/10 sticky top-0 z-10">
              <span className="font-black text-[#00d1c1] tracking-tighter text-xl uppercase">Roy Burgos Tattoo</span>
              <button onClick={() => setIsFormOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"><X size={24} /></button>
            </div>

            <div className="p-8 max-w-xl mx-auto w-full">
              {!isSubmitted ? (
                <div className="space-y-8">
                  <div className="text-center mb-4">
                    <h2 className="text-3xl font-black tracking-tight text-[#0f3d3e] uppercase italic">Tu Idea</h2>
                    <p className="text-gray-500 font-medium text-sm">Cuéntame sobre tu próximo tatuaje</p>
                  </div>

                  {/* 상담 정보 입력 카드 (기존 UI 활용) */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white p-6 rounded-[2rem] border border-[#00d1c1]/10 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3 font-bold"><MapPin className="text-[#00d1c1]" /><span>Zona del cuerpo</span></div>
                      <input type="text" placeholder="Ej: Antebrazo" className="bg-gray-50 px-4 py-2 rounded-xl outline-none text-right font-bold w-1/2" />
                    </div>

                    <div className="bg-white p-6 rounded-[2rem] border border-[#00d1c1]/10 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3 font-bold"><Sparkles className="text-[#00d1c1]" /><span>Tamaño (cm)</span></div>
                      <input type="text" placeholder="Ej: 10cm" className="bg-gray-50 px-4 py-2 rounded-xl outline-none text-right font-bold w-1/2" />
                    </div>
                  </div>

                  {/* 메인 폼 */}
                  <div className="space-y-3 pb-20 mt-4">
                    <input type="text" placeholder="Nombre" className="w-full bg-white border border-gray-100 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#00d1c1]/20 transition-all text-black" />
                    <input type="tel" placeholder="WhatsApp" className="w-full bg-white border border-gray-100 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#00d1c1]/20 transition-all text-black" />
                    <textarea placeholder="Cuéntame tu idea (estilo, elementos...)" className="w-full bg-white border border-gray-100 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#00d1c1]/20 transition-all text-black min-h-[120px] resize-none" />
                    
                    <div className="p-6 border-2 border-dashed border-[#00d1c1]/20 rounded-2xl flex flex-col items-center gap-2 cursor-pointer hover:bg-[#00d1c1]/5 transition-colors">
                      <Camera size={24} className="text-[#00d1c1]" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Adjuntar Referencia</span>
                    </div>

                    <button 
                      onClick={() => setIsSubmitted(true)}
                      className="w-full py-6 bg-[#00d1c1] text-white font-black rounded-[2rem] shadow-xl shadow-[#00d1c1]/30 active:scale-95 transition-all mt-4 uppercase tracking-widest flex items-center justify-center gap-3"
                    >
                      Enviar Solicitud <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                /* --- SUCCESS STATE (상담 신청 완료) --- */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-24 h-24 bg-[#00d1c1] text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#00d1c1]/40">
                    <Send size={40} />
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter text-[#0f3d3e] mb-4 uppercase italic">¡Recibido!</h2>
                  <p className="text-gray-500 font-medium max-w-[280px] mb-12">
                    He recibido tu propuesta. Te contactaré por **WhatsApp** para definir los detalles y darte un presupuesto.
                  </p>
                  <button 
                    onClick={() => setIsFormOpen(false)}
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
    </main>
  );
}