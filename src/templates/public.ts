// Public Campus Frontend Template (Tailwind CSS, Modern Educational Theme)

export function renderPublicPage(): string {
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jijau Dnyanteerth Educational Campus | Shaping Brighter Futures</title>
    <meta name="description" content="Official website for Jijau Dnyanteerth Educational Campus. Offering Jijau ITI, Jijau Junior College, Primary & Secondary School, and Ramraoji Lohat Public School.">
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              navy: {
                800: '#0B1E36',
                900: '#0A2540',
                950: '#051329',
              },
              emerald: {
                500: '#10B981',
                600: '#059669',
              },
              amber: {
                500: '#F59E0B',
                600: '#D97706',
              }
            }
          }
        }
      }
    </script>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
      body { font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; }
      .glass-nav { backdrop-filter: blur(12px); background: rgba(10, 37, 64, 0.92); }
      .gradient-hero { background: linear-gradient(135deg, #0A2540 0%, #06182B 50%, #0A3258 100%); }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased selection:bg-amber-500 selection:text-white">

    <!-- 1. Top Alert & Contact Bar -->
    <div class="bg-emerald-600 text-white text-xs md:text-sm py-2 px-4 shadow-inner">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div class="flex items-center gap-2 font-medium">
          <span class="bg-amber-500 text-navy-900 font-bold uppercase text-[10px] px-2 py-0.5 rounded-full animate-pulse">Admissions Open 2026-27</span>
          <span>Enrollments open for ITI, Junior College & Schools!</span>
        </div>
        <div class="flex items-center gap-4 text-xs font-semibold">
          <a href="tel:+919511654252" class="hover:text-amber-300 transition flex items-center gap-1">
            <i class="fa-solid fa-phone text-amber-400"></i> ITI: +91 95116 54252
          </a>
          <span class="text-emerald-400">|</span>
          <a href="tel:+919823526555" class="hover:text-amber-300 transition flex items-center gap-1">
            <i class="fa-solid fa-phone text-amber-400"></i> Jr College: +91 98235 26555
          </a>
          <span class="text-emerald-400">|</span>
          <a href="tel:+919834819477" class="hover:text-amber-300 transition flex items-center gap-1">
            <i class="fa-solid fa-phone text-amber-400"></i> School: +91 98348 19477
          </a>
        </div>
      </div>
    </div>

    <!-- Navigation Header -->
    <header class="sticky top-0 z-40 glass-nav border-b border-slate-700/50 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
        <a href="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-navy-900 font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
            J
          </div>
          <div>
            <h1 class="text-lg md:text-xl font-bold tracking-tight leading-none text-white">JIJAU DNYANTEERTH</h1>
            <p class="text-[11px] text-amber-400 font-semibold tracking-wider uppercase mt-0.5">Educational Campus</p>
          </div>
        </a>

        <nav class="hidden md:flex items-center gap-8 font-medium text-sm">
          <a href="#about" class="hover:text-amber-400 transition">About Us</a>
          <a href="#wings" class="hover:text-amber-400 transition">Educational Wings</a>
          <a href="#news" class="hover:text-amber-400 transition">News & Updates</a>
          <a href="#contact" class="hover:text-amber-400 transition">Admissions</a>
        </nav>

        <div class="flex items-center gap-3">
          <a href="#contact" class="bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold px-4 py-2 rounded-lg text-sm shadow-lg shadow-amber-500/20 transition transform active:scale-95">
            Apply Now
          </a>
        </div>
      </div>
    </header>

    <!-- 2. Hero Section -->
    <section class="gradient-hero text-white relative overflow-hidden py-20 lg:py-28">
      <!-- Background Decorative Blur Rings -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl -z-0 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl -z-0 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-amber-400 text-xs font-semibold">
              <i class="fa-solid fa-award text-emerald-400"></i> ISO 9001:2015 Certified Educational Institution
            </div>
            <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Empowering Minds, <br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300">Building Futures</span>
            </h2>
            <p class="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Welcome to Jijau Dnyanteerth Educational Campus. Providing holistic excellence across Technical ITI Trades, Higher Secondary Junior College, and Quality School Education.
            </p>

            <div class="flex flex-wrap gap-4 pt-2">
              <a href="#contact" class="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition">
                Admission Inquiry <i class="fa-solid fa-arrow-right text-xs"></i>
              </a>
              <a href="#wings" class="bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-6 py-3.5 rounded-xl transition">
                Explore Institutions
              </a>
            </div>

            <!-- Dynamic Statistics Bar -->
            <div class="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80">
              <div>
                <div class="text-2xl sm:text-3xl font-extrabold text-amber-400">Est. 2002</div>
                <div class="text-xs text-slate-400 font-medium">20+ Years Excellence</div>
              </div>
              <div>
                <div class="text-2xl sm:text-3xl font-extrabold text-emerald-400">5+ Wings</div>
                <div class="text-xs text-slate-400 font-medium">Diverse Disciplines</div>
              </div>
              <div>
                <div class="text-2xl sm:text-3xl font-extrabold text-white">10,000+</div>
                <div class="text-xs text-slate-400 font-medium">Alumni Network</div>
              </div>
            </div>
          </div>

          <!-- Hero Image Banner Card -->
          <div class="lg:col-span-5">
            <div class="relative rounded-2xl p-2 bg-gradient-to-tr from-amber-500 via-emerald-500 to-navy-800 shadow-2xl">
              <div class="bg-navy-900 rounded-xl overflow-hidden p-6 text-center space-y-6">
                <div class="w-20 h-20 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-4xl">
                  <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white">Academic Excellence</h3>
                  <p class="text-xs text-slate-400 mt-1">State-of-the-art Computer Labs, Technical Workshops, Modern Classrooms & Dedicated Faculty.</p>
                </div>
                <div class="grid grid-cols-2 gap-3 text-left">
                  <div class="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                    <div class="text-emerald-400 font-bold text-sm"><i class="fa-solid fa-check-circle mr-1"></i> 100% Placement</div>
                    <div class="text-[11px] text-slate-400">Assistance for ITI</div>
                  </div>
                  <div class="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                    <div class="text-amber-400 font-bold text-sm"><i class="fa-solid fa-star mr-1"></i> Top Results</div>
                    <div class="text-[11px] text-slate-400">HSC & SSC Board</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Educational Wings Grid Section -->
    <section id="wings" class="py-20 bg-slate-100/70">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span class="text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">Our Institutions</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-navy-900">Educational Wings</h2>
          <p class="text-slate-600">Comprehensive educational programs tailored from primary schooling to vocational trade certifications.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Wing 1: Jijau ITI -->
          <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-slate-200 flex flex-col justify-between group">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-xl bg-navy-900 text-amber-400 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                <i class="fa-solid fa-gears"></i>
              </div>
              <h3 class="text-xl font-bold text-navy-900">Jijau ITI</h3>
              <p class="text-xs text-slate-500 font-medium">NCVT & DGT Approved Technical Institute</p>
              <ul class="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Electrician Trade (2 Yrs)</li>
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Fitter Trade (2 Yrs)</li>
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> COPA (Computer Operator)</li>
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Welder Trade (1 Yr)</li>
              </ul>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <a href="tel:+919511654252" class="text-xs font-bold text-emerald-600 hover:underline"><i class="fa-solid fa-phone"></i> +91 95116 54252</a>
              <a href="#contact" class="text-xs font-bold text-navy-900 hover:text-amber-600">Apply <i class="fa-solid fa-chevron-right text-[10px]"></i></a>
            </div>
          </div>

          <!-- Wing 2: Jijau Junior College -->
          <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-slate-200 flex flex-col justify-between group">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-xl bg-navy-900 text-emerald-400 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                <i class="fa-solid fa-book-open-reader"></i>
              </div>
              <h3 class="text-xl font-bold text-navy-900">Jijau Junior College</h3>
              <p class="text-xs text-slate-500 font-medium">Higher Secondary Board Education (11th & 12th)</p>
              <ul class="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Science Stream (PCM / PCB)</li>
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Commerce Stream</li>
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Arts Stream</li>
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Bi-Focal Electronics / CS</li>
              </ul>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <a href="tel:+919823526555" class="text-xs font-bold text-emerald-600 hover:underline"><i class="fa-solid fa-phone"></i> +91 98235 26555</a>
              <a href="#contact" class="text-xs font-bold text-navy-900 hover:text-amber-600">Apply <i class="fa-solid fa-chevron-right text-[10px]"></i></a>
            </div>
          </div>

          <!-- Wing 3: Jijau School -->
          <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-slate-200 flex flex-col justify-between group">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-xl bg-navy-900 text-amber-400 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                <i class="fa-solid fa-school"></i>
              </div>
              <h3 class="text-xl font-bold text-navy-900">Jijau Primary & Secondary</h3>
              <p class="text-xs text-slate-500 font-medium">Semi-English & English Medium School</p>
              <ul class="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> 1st to 10th Standard</li>
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Smart Classrooms & Labs</li>
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Sports & Cultural Activities</li>
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Experienced Teaching Staff</li>
              </ul>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <a href="tel:+919834819477" class="text-xs font-bold text-emerald-600 hover:underline"><i class="fa-solid fa-phone"></i> +91 98348 19477</a>
              <a href="#contact" class="text-xs font-bold text-navy-900 hover:text-amber-600">Apply <i class="fa-solid fa-chevron-right text-[10px]"></i></a>
            </div>
          </div>

          <!-- Wing 4: Ramraoji Lohat Public School -->
          <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-slate-200 flex flex-col justify-between group">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-xl bg-navy-900 text-teal-400 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                <i class="fa-solid fa-children"></i>
              </div>
              <h3 class="text-xl font-bold text-navy-900">Ramraoji Lohat Public School</h3>
              <p class="text-xs text-slate-500 font-medium">Holistic Primary & Secondary Foundation</p>
              <ul class="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Values-Based Pedagogy</li>
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Individual Attention</li>
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Science & Robotics Club</li>
                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Transport Facility Available</li>
              </ul>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <a href="tel:+919834819477" class="text-xs font-bold text-emerald-600 hover:underline"><i class="fa-solid fa-phone"></i> +91 98348 19477</a>
              <a href="#contact" class="text-xs font-bold text-navy-900 hover:text-amber-600">Apply <i class="fa-solid fa-chevron-right text-[10px]"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Dynamic News & Updates Section -->
    <section id="news" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span class="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">Updates</span>
            <h2 class="text-3xl font-extrabold text-navy-900 mt-2">Latest News & Announcements</h2>
          </div>
          <p class="text-slate-500 text-sm max-w-md">Stay updated with academic schedules, exam announcements, campus achievements, and admissions.</p>
        </div>

        <div id="news-grid" class="grid md:grid-cols-3 gap-8">
          <!-- Dynamically populated via API -->
          <div class="col-span-3 text-center py-12 text-slate-400">
            <i class="fa-solid fa-spinner fa-spin text-3xl text-emerald-500 mb-3"></i>
            <p>Loading latest campus announcements...</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Interactive Admission & Contact Form -->
    <section id="contact" class="py-20 bg-navy-900 text-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-5 space-y-6">
            <span class="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">Admissions 2026-27</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold">Get in Touch with Our Admission Office</h2>
            <p class="text-slate-300 text-sm leading-relaxed">
              Have questions regarding courses, eligibility, fees, or hostel facilities? Fill out the form or reach out to our department heads directly.
            </p>

            <div class="space-y-4 pt-4 border-t border-slate-800">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h4 class="font-bold text-sm">Campus Address</h4>
                  <p class="text-xs text-slate-400">Jijau Dnyanteerth Educational Campus, Main Highway, Maharashtra, India</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h4 class="font-bold text-sm">Helpline Numbers</h4>
                  <p class="text-xs text-slate-400">ITI: +91 95116 54252 | Jr College: +91 98235 26555 | School: +91 98348 19477</p>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7">
            <div class="bg-white text-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h3 class="text-2xl font-bold text-navy-900 mb-2">Submit Admission Inquiry</h3>
              <p class="text-slate-500 text-xs mb-6">Our admission team will call you back within 24 hours.</p>

              <form id="contact-form" class="space-y-4">
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                    <input type="text" name="full_name" required placeholder="e.g. Ramesh Patil" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                    <input type="tel" name="phone" required placeholder="10-digit Mobile Number" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                    <input type="email" name="email" placeholder="name@example.com" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Wing / Department *</label>
                    <select name="wing" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
                      <option value="">Select Wing</option>
                      <option value="Jijau ITI">Jijau ITI (Technical Trades)</option>
                      <option value="Junior College">Jijau Junior College (Arts/Comm/Sci)</option>
                      <option value="Primary & Secondary School">Jijau Primary & Secondary School</option>
                      <option value="Ramraoji Lohat School">Ramraoji Lohat Public School</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Message / Inquiry Details *</label>
                  <textarea name="message" rows="3" required placeholder="Mention desired trade/standard, previous qualification..." class="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"></textarea>
                </div>

                <button type="submit" id="submit-btn" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2">
                  <span>Send Inquiry</span>
                  <i class="fa-solid fa-paper-plane text-sm"></i>
                </button>
              </form>
              <div id="form-message" class="hidden mt-4 p-3 rounded-lg text-sm text-center font-semibold"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-navy-950 text-slate-400 text-xs py-8 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© 2026 Jijau Dnyanteerth Educational Campus. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <a href="https://admin.jijaudnyanteerth.in" class="hover:text-amber-400 transition">Admin Portal</a>
          <span>•</span>
          <a href="#about" class="hover:text-amber-400 transition">Privacy Policy</a>
        </div>
      </div>
    </footer>

    <!-- 6. Floating WhatsApp Button & Department Selector Modal -->
    <div class="fixed bottom-6 right-6 z-50">
      <button onclick="toggleWhatsappModal()" class="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition transform hover:scale-110 active:scale-95">
        <i class="fa-brands fa-whatsapp"></i>
      </button>

      <!-- Department Selector Popup -->
      <div id="whatsapp-modal" class="hidden absolute bottom-16 right-0 w-80 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3">
        <div class="flex justify-between items-center pb-2 border-b border-slate-100">
          <h4 class="font-bold text-sm text-navy-900 flex items-center gap-2">
            <i class="fa-brands fa-whatsapp text-emerald-500 text-lg"></i> Quick WhatsApp Inquiry
          </h4>
          <button onclick="toggleWhatsappModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <p class="text-xs text-slate-500">Select department to chat on WhatsApp:</p>

        <div class="space-y-2 text-xs">
          <a href="https://wa.me/919511654252?text=Hello%20Jijau%20ITI%20Team%2C%20I%20want%20to%20inquire%20about%20admissions." target="_blank" class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 transition font-medium">
            <span><i class="fa-solid fa-wrench text-amber-500 mr-2"></i> Jijau ITI Admissions</span>
            <i class="fa-solid fa-external-link text-slate-400"></i>
          </a>

          <a href="https://wa.me/919823526555?text=Hello%20Jijau%20Junior%20College%20Team%2C%20I%20want%20to%20inquire%20about%2011th%2F12th%20admissions." target="_blank" class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 transition font-medium">
            <span><i class="fa-solid fa-book text-emerald-500 mr-2"></i> Junior College</span>
            <i class="fa-solid fa-external-link text-slate-400"></i>
          </a>

          <a href="https://wa.me/919834819477?text=Hello%20Jijau%20School%20Team%2C%20I%20want%20to%20inquire%20about%20school%20admissions." target="_blank" class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 transition font-medium">
            <span><i class="fa-solid fa-school text-indigo-500 mr-2"></i> School Admissions</span>
            <i class="fa-solid fa-external-link text-slate-400"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Client-Side JavaScript -->
    <script>
      function toggleWhatsappModal() {
        document.getElementById('whatsapp-modal').classList.toggle('hidden');
      }

      // Fetch News & Announcements
      async function fetchNews() {
        const grid = document.getElementById('news-grid');
        try {
          const res = await fetch('/api/news');
          if (!res.ok) throw new Error('Failed to fetch news');
          const data = await res.json();

          if (!data.news || data.news.length === 0) {
            grid.innerHTML = '<div class="col-span-3 text-center py-8 text-slate-400">No active news announcements at this moment.</div>';
            return;
          }

          grid.innerHTML = data.news.map(item => `
            <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
              <div>
                <div class="h-44 bg-slate-100 relative overflow-hidden">
                  <img src="${item.image_url || '/images/default-news.jpg'}" alt="${item.title}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop'">
                  <span class="absolute top-3 right-3 bg-navy-900 text-amber-400 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow">
                    ${item.category}
                  </span>
                </div>
                <div class="p-5">
                  <div class="text-[11px] text-slate-400 font-semibold mb-2">
                    <i class="fa-regular fa-calendar mr-1"></i> ${new Date(item.published_date).toLocaleDateString()}
                  </div>
                  <h3 class="font-bold text-navy-900 text-base leading-snug mb-2">${item.title}</h3>
                  <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">${item.content}</p>
                </div>
              </div>
            </div>
          `).join('');
        } catch (err) {
          grid.innerHTML = '<div class="col-span-3 text-center text-red-500 py-6">Unable to load news updates.</div>';
        }
      }

      // Handle Contact Admission Form Submission
      document.getElementById('contact-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        const msg = document.getElementById('form-message');
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData.entries());

        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting...';
        msg.classList.add('hidden');

        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const result = await res.json();

          if (res.ok) {
            msg.className = 'mt-4 p-3 rounded-lg text-sm text-center font-semibold bg-emerald-100 text-emerald-800';
            msg.textContent = result.message || 'Thank you! Your admission inquiry has been received.';
            e.target.reset();
          } else {
            msg.className = 'mt-4 p-3 rounded-lg text-sm text-center font-semibold bg-red-100 text-red-800';
            msg.textContent = result.error || 'Failed to submit inquiry. Please try again.';
          }
          msg.classList.remove('hidden');
        } catch (err) {
          msg.className = 'mt-4 p-3 rounded-lg text-sm text-center font-semibold bg-red-100 text-red-800';
          msg.textContent = 'Connection error. Please try again later.';
          msg.classList.remove('hidden');
        } finally {
          btn.disabled = false;
          btn.innerHTML = '<span>Send Inquiry</span> <i class="fa-solid fa-paper-plane text-sm"></i>';
        }
      });

      fetchNews();
    </script>
</body>
</html>`;
}
