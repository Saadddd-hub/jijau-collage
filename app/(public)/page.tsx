"use client";

import { useState, useEffect } from "react";
import { 
  Phone, GraduationCap, Award, BookOpen, Cog, School, 
  Users, ArrowRight, Check, CheckCircle2, Star, MapPin, 
  Send, X, ExternalLink, Calendar, Loader2, MessageSquareText
} from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  image_url?: string;
  published_date: string;
}

export default function PublicHomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(false);

  const [formState, setFormState] = useState({
    full_name: "",
    phone: "",
    email: "",
    wing: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; success: boolean } | null>(null);

  const [showWhatsappModal, setShowWhatsappModal] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        if (!res.ok) throw new Error("Failed to fetch news");
        const data: any = await res.json();
        setNews(data.news || []);
      } catch (err) {
        setNewsError(true);
      } finally {
        setNewsLoading(false);
      }
    }
    fetchNews();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedbackMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });
      const data: any = await res.json();

      if (res.ok) {
        setFeedbackMessage({
          text: data.message || "Thank you! Your admission inquiry has been received.",
          success: true
        });
        setFormState({ full_name: "", phone: "", email: "", wing: "", message: "" });
      } else {
        setFeedbackMessage({
          text: data.error || "Failed to submit inquiry. Please try again.",
          success: false
        });
      }
    } catch (err) {
      setFeedbackMessage({
        text: "Connection error. Please try again later.",
        success: false
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-amber-500 selection:text-white">
      
      {/* 1. Top Alert & Emergency Contact Bar */}
      <div className="bg-emerald-600 text-white text-xs md:text-sm py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-amber-500 text-navy-900 font-bold uppercase text-[10px] px-2.5 py-0.5 rounded-full animate-pulse">
              Admissions Open 2026-27
            </span>
            <span>Enrollments open for ITI, Junior College & School Wings!</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a href="tel:+919511654252" className="hover:text-amber-300 transition flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-400" /> ITI: +91 95116 54252
            </a>
            <span className="text-emerald-400">|</span>
            <a href="tel:+919823526555" className="hover:text-amber-300 transition flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-400" /> Jr College: +91 98235 26555
            </a>
            <span className="text-emerald-400">|</span>
            <a href="tel:+919834819477" className="hover:text-amber-300 transition flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-400" /> School: +91 98348 19477
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 glass-nav border-b border-slate-700/50 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-navy-900 font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
              J
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight leading-none text-white">JIJAU DNYANTEERTH</h1>
              <p className="text-[11px] text-amber-400 font-semibold tracking-wider uppercase mt-0.5">Educational Campus</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
            <a href="#about" className="hover:text-amber-400 transition">About Us</a>
            <a href="#wings" className="hover:text-amber-400 transition">Educational Wings</a>
            <a href="#news" className="hover:text-amber-400 transition">News & Updates</a>
            <a href="#contact" className="hover:text-amber-400 transition">Admissions</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" className="bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold px-4 py-2 rounded-lg text-sm shadow-lg shadow-amber-500/20 transition transform active:scale-95">
              Apply Now
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="gradient-hero text-white relative overflow-hidden py-20 lg:py-28">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-amber-400 text-xs font-semibold">
                <Award className="w-4 h-4 text-emerald-400" /> ISO 9001:2015 Certified Educational Institution
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Empowering Minds, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300">Building Futures</span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Welcome to Jijau Dnyanteerth Educational Campus. Providing holistic excellence across Technical ITI Trades, Higher Secondary Junior College, and Quality Primary & Secondary Schooling.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#contact" className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition">
                  Admission Inquiry <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#wings" className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-6 py-3.5 rounded-xl transition">
                  Explore Institutions
                </a>
              </div>

              {/* Statistics Bar */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">Est. 2002</div>
                  <div className="text-xs text-slate-400 font-medium">20+ Years Excellence</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">5+ Wings</div>
                  <div className="text-xs text-slate-400 font-medium">Diverse Disciplines</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">10,000+</div>
                  <div className="text-xs text-slate-400 font-medium">Alumni Network</div>
                </div>
              </div>
            </div>

            {/* Hero Banner Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl p-2 bg-gradient-to-tr from-amber-500 via-emerald-500 to-navy-800 shadow-2xl">
                <div className="bg-navy-900 rounded-xl overflow-hidden p-6 text-center space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-4xl">
                    <GraduationCap className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Academic Excellence</h3>
                    <p className="text-xs text-slate-400 mt-1">State-of-the-art Technical Workshops, Computer Labs, and Experienced Faculty.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-left">
                    <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                      <div className="text-emerald-400 font-bold text-sm flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 100% Placement
                      </div>
                      <div className="text-[11px] text-slate-400">Assistance for ITI</div>
                    </div>
                    <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                      <div className="text-amber-400 font-bold text-sm flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> Top Results
                      </div>
                      <div className="text-[11px] text-slate-400">HSC & SSC Board</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Educational Wings Grid Section */}
      <section id="wings" className="py-20 bg-slate-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">Our Institutions</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">Educational Wings</h2>
            <p className="text-slate-600">Comprehensive educational programs tailored from primary schooling to technical trade certifications.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Wing 1: Jijau ITI */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-slate-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-navy-900 text-amber-400 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                  <Cog className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-900">Jijau ITI</h3>
                <p className="text-xs text-slate-500 font-medium">NCVT & DGT Approved Technical Institute</p>
                <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Electrician Trade (2 Yrs)</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Fitter Trade (2 Yrs)</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> COPA (Computer Operator)</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Welder Trade (1 Yr)</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <a href="tel:+919511654252" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                  <Phone className="w-3 h-3" /> +91 95116 54252
                </a>
                <a href="#contact" className="text-xs font-bold text-navy-900 hover:text-amber-600 flex items-center gap-1">
                  Apply <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Wing 2: Jijau Junior College */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-slate-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-navy-900 text-emerald-400 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-900">Jijau Junior College</h3>
                <p className="text-xs text-slate-500 font-medium">Higher Secondary Board Education (11th & 12th)</p>
                <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Science Stream (PCM / PCB)</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Commerce Stream</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Arts Stream</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Bi-Focal Electronics / CS</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <a href="tel:+919823526555" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                  <Phone className="w-3 h-3" /> +91 98235 26555
                </a>
                <a href="#contact" className="text-xs font-bold text-navy-900 hover:text-amber-600 flex items-center gap-1">
                  Apply <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Wing 3: Jijau School */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-slate-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-navy-900 text-amber-400 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                  <School className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-900">Jijau Primary & Secondary</h3>
                <p className="text-xs text-slate-500 font-medium">Semi-English & English Medium School</p>
                <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> 1st to 10th Standard</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Smart Classrooms & Labs</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Sports & Cultural Activities</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Experienced Teaching Staff</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <a href="tel:+919834819477" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                  <Phone className="w-3 h-3" /> +91 98348 19477
                </a>
                <a href="#contact" className="text-xs font-bold text-navy-900 hover:text-amber-600 flex items-center gap-1">
                  Apply <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Wing 4: Ramraoji Lohat Public School */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-slate-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-navy-900 text-teal-400 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-900">Ramraoji Lohat Public School</h3>
                <p className="text-xs text-slate-500 font-medium">Holistic Primary & Secondary Foundation</p>
                <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Values-Based Pedagogy</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Individual Attention</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Science & Robotics Club</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Transport Facility Available</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <a href="tel:+919834819477" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                  <Phone className="w-3 h-3" /> +91 98348 19477
                </a>
                <a href="#contact" className="text-xs font-bold text-navy-900 hover:text-amber-600 flex items-center gap-1">
                  Apply <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dynamic News & Announcements Section */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">Updates</span>
              <h2 className="text-3xl font-extrabold text-navy-900 mt-2">Latest News & Announcements</h2>
            </div>
            <p className="text-slate-500 text-sm max-w-md">Stay updated with academic schedules, exam announcements, campus achievements, and admissions.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {newsLoading ? (
              <div className="col-span-3 text-center py-12 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-3" />
                <p>Loading campus announcements...</p>
              </div>
            ) : newsError || news.length === 0 ? (
              <div className="col-span-3 text-center py-8 text-slate-400">
                No active news announcements at this moment.
              </div>
            ) : (
              news.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                  <div>
                    <div className="h-44 bg-slate-100 relative overflow-hidden">
                      <img 
                        src={item.image_url || "/api/images/default-news.jpg"} 
                        alt={item.title} 
                        className="w-full h-full object-cover" 
                        onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop"; }}
                      />
                      <span className="absolute top-3 right-3 bg-navy-900 text-amber-400 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] text-slate-400 font-semibold mb-2 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {new Date(item.published_date).toLocaleDateString()}
                      </div>
                      <h3 className="font-bold text-navy-900 text-base leading-snug mb-2">{item.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 5. Interactive Admission & Contact Form */}
      <section id="contact" className="py-20 bg-navy-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">Admissions 2026-27</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Get in Touch with Our Admission Office</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Have questions regarding courses, eligibility, fees, or hostel facilities? Fill out the form or reach out to our department heads directly.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Campus Address</h4>
                    <p className="text-xs text-slate-400">Jijau Dnyanteerth Educational Campus, Main Highway, Maharashtra, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Helpline Numbers</h4>
                    <p className="text-xs text-slate-400">ITI: +91 95116 54252 | Jr College: +91 98235 26555 | School: +91 98348 19477</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white text-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-navy-900 mb-2">Submit Admission Inquiry</h3>
                <p className="text-slate-500 text-xs mb-6">Our admission team will call you back within 24 hours.</p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={formState.full_name}
                        onChange={(e) => setFormState({ ...formState, full_name: e.target.value })}
                        placeholder="e.g. Ramesh Patil" 
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                      <input 
                        type="tel" 
                        required 
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="10-digit Mobile Number" 
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" 
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="name@example.com" 
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Wing / Department *</label>
                      <select 
                        required 
                        value={formState.wing}
                        onChange={(e) => setFormState({ ...formState, wing: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                      >
                        <option value="">Select Wing</option>
                        <option value="Jijau ITI">Jijau ITI (Technical Trades)</option>
                        <option value="Jijau Junior College">Jijau Junior College (Arts/Comm/Sci)</option>
                        <option value="Primary & Secondary School">Jijau Primary & Secondary School</option>
                        <option value="Ramraoji Lohat School">Ramraoji Lohat Public School</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message / Inquiry Details *</label>
                    <textarea 
                      rows={3} 
                      required 
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Mention desired trade/standard, previous qualification..." 
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {feedbackMessage && (
                  <div className={`mt-4 p-3 rounded-lg text-sm text-center font-semibold ${
                    feedbackMessage.success ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {feedbackMessage.text}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Jijau Dnyanteerth Educational Campus. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://admin.jijaudnyanteerth.in" className="hover:text-amber-400 transition">Admin Portal</a>
            <span>•</span>
            <a href="#about" className="hover:text-amber-400 transition">Privacy Policy</a>
          </div>
        </div>
      </footer>

      {/* 6. Floating WhatsApp Button & Department Selector Modal */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setShowWhatsappModal(!showWhatsappModal)}
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition transform hover:scale-110 active:scale-95"
        >
          <MessageSquareText className="w-7 h-7" />
        </button>

        {showWhatsappModal && (
          <div className="absolute bottom-16 right-0 w-80 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h4 className="font-bold text-sm text-navy-900 flex items-center gap-2">
                <MessageSquareText className="w-5 h-5 text-emerald-500" /> Quick WhatsApp Inquiry
              </h4>
              <button onClick={() => setShowWhatsappModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">Select department to chat on WhatsApp:</p>

            <div className="space-y-2 text-xs">
              <a 
                href="https://wa.me/919511654252?text=Hello%20Jijau%20ITI%20Team%2C%20I%20want%20to%20inquire%20about%20admissions." 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 transition font-medium"
              >
                <span className="flex items-center gap-2"><Cog className="w-4 h-4 text-amber-500" /> Jijau ITI Admissions</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a 
                href="https://wa.me/919823526555?text=Hello%20Jijau%20Junior%20College%20Team%2C%20I%20want%20to%20inquire%20about%2011th%2F12th%20admissions." 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 transition font-medium"
              >
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-emerald-500" /> Junior College</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a 
                href="https://wa.me/919834819477?text=Hello%20Jijau%20School%20Team%2C%20I%20want%20to%20inquire%20about%20school%20admissions." 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 transition font-medium"
              >
                <span className="flex items-center gap-2"><School className="w-4 h-4 text-indigo-500" /> School Admissions</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
