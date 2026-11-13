<script lang="ts">
  let isMobileMenuOpen = $state(false);

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }
</script>

<svelte:head>
  <title>SustainAI — Sustainability &amp; Waste Intelligence Platform</title>
</svelte:head>

<div class="min-h-screen bg-surface-base text-text-strong font-body antialiased selection:bg-brand-mint selection:text-brand-forest">
<!-- ========================================================================= -->
    <!-- SECTION 01 — NAVIGATION BAR                                              -->
    <!-- ========================================================================= -->
    <header
      class="sticky top-0 z-50 w-full bg-surface-card/90 backdrop-blur-md border-b border-border-subtle transition-all"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
      >
        <!-- Brand Logo & Name -->
        <a
          class="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-btn"
          href="#beranda"
        >
          <div
            class="w-10 h-10 rounded-tile bg-brand-mint-subtle border border-border-focus/30 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105"
          >
            <img
              alt="SustainAI Logo"
              class="w-full h-full object-contain"
              src="/SustainAI-Icon.webp"
            />
          </div>
          <div class="flex flex-col">
            <span
              class="font-display font-bold text-xl text-primary leading-tight tracking-tight"
              >SustainAI</span
            >
            <span
              class="text-[11px] font-medium text-text-muted tracking-wide leading-none"
              >Intelligence Platform</span
            >
          </div>
        </a>
        <!-- Center Desktop Navigation -->
        <nav
          aria-label="Navigasi Utama"
          class="hidden md:flex items-center gap-8"
        >
          <a
            class="text-sm font-semibold text-text-strong hover:text-primary transition-colors py-1"
            href="#beranda"
            >Beranda</a
          >
          <a
            class="text-sm font-semibold text-text-muted hover:text-primary transition-colors py-1"
            href="#fitur"
            >Fitur</a
          >
          <a
            class="text-sm font-semibold text-text-muted hover:text-primary transition-colors py-1"
            href="#cara-kerja"
            >Cara Kerja</a
          >
          <a
            class="text-sm font-semibold text-text-muted hover:text-primary transition-colors py-1"
            href="#tentang-kami"
            >Tentang Kami</a
          >
        </nav>
        <!-- Right Side CTA & Mobile Toggle -->
        <div class="flex items-center gap-3">
          <a
            class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-brand-emerald-dark active:scale-95 text-white font-semibold text-sm rounded-btn transition-all duration-150 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            href="#fitur"
          >
            <span>Mulai Analisis</span>
            <span class="material-symbols-outlined text-[18px]"
              >arrow_forward</span
            >
          </a>
          <!-- Mobile Hamburger Button -->
          <button
  aria-expanded={isMobileMenuOpen}
  aria-label="Buka navigasi menu"
  class="md:hidden p-2 text-text-strong hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-btn"
  onclick={toggleMobileMenu}
  type="button"
>
  <span class="material-symbols-outlined text-2xl">
    {isMobileMenuOpen ? 'close' : 'menu'}
  </span>
</button>
        </div>
      </div>
      <!-- Mobile Navigation Drawer -->
      <div
        class="hidden md:hidden fixed inset-x-0 top-20 bg-surface-card border-b border-border-subtle px-6 py-6 shadow-xl transition-all"
        id="mobileDrawer"
      >
        <div class="flex flex-col gap-4">
          <a
            class="mobile-nav-link text-base font-semibold text-primary py-2 border-b border-border-subtle/50"
            href="#beranda"
            >Beranda</a
          >
          <a
            class="mobile-nav-link text-base font-medium text-text-strong hover:text-primary py-2 border-b border-border-subtle/50"
            href="#fitur"
            >Fitur</a
          >
          <a
            class="mobile-nav-link text-base font-medium text-text-strong hover:text-primary py-2 border-b border-border-subtle/50"
            href="#cara-kerja"
            >Cara Kerja</a
          >
          <a
            class="mobile-nav-link text-base font-medium text-text-strong hover:text-primary py-2 border-b border-border-subtle/50"
            href="#tentang-kami"
            >Tentang Kami</a
          >
          <div class="pt-2">
            <a
              class="mobile-nav-link w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-brand-emerald-dark active:scale-95 text-white font-semibold text-sm rounded-btn transition-all shadow-sm"
              href="#fitur"
            >
              <span>Mulai Analisis</span>
              <span class="material-symbols-outlined text-[18px]"
                >arrow_forward</span
              >
            </a>
          </div>
        </div>
      </div>
    </header>
    <main>
      <!-- ========================================================================= -->
      <!-- SECTION 02 — HERO SECTION                                                -->
      <!-- ========================================================================= -->
      <section
        class="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-subtle"
        id="beranda"
      >
        <!-- Glow ambient decorative gradients -->
        <div
          class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-mint-subtle/60 rounded-full blur-3xl pointer-events-none -z-10"
        ></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
          >
            <!-- Left Column: Copy & Actions -->
            <div class="lg:col-span-7 flex flex-col items-start text-left">
              <!-- Eyebrow Badge -->
              <div
                class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint-subtle border border-border-focus/20 mb-6"
              >
                <span
                  class="w-2 h-2 rounded-full bg-border-focus animate-pulse"
                ></span>
                <span
                  class="text-xs font-semibold text-brand-forest tracking-wide"
                  >AI-Powered Environmental Intelligence</span
                >
              </div>
              <!-- Main Headline -->
              <h1
                class="font-display font-extrabold text-[32px] leading-[40px] md:text-[48px] md:leading-[56px] text-text-strong tracking-tight mb-5"
              >
                Smarter Technology, <br class="hidden sm:inline" />
                <span class="text-primary relative inline-block">
                  Greener Tomorrow.
                  <svg
                    class="absolute -bottom-1 left-0 w-full h-2 text-brand-mint opacity-60"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 10"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="4"
                    ></path>
                  </svg>
                </span>
              </h1>
              <!-- Supporting Paragraph -->
              <p
                class="text-base md:text-lg text-text-muted leading-relaxed mb-8 max-w-2xl font-normal"
              >
                Kenali sampah, temukan peluang daur ulang, dan jaga kesehatan
                tanaman dengan bantuan kecerdasan buatan. Satu platform untuk
                langkah kecil menuju lingkungan yang lebih baik.
              </p>
              <!-- Actions Buttons -->
              <div
                class="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8"
              >
                <a
                  class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-brand-emerald-dark active:scale-95 text-white font-semibold text-base rounded-btn transition-all duration-150 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  href="#fitur"
                >
                  <span>Mulai Analisis</span>
                  <span class="material-symbols-outlined text-[20px]"
                    >arrow_forward</span
                  >
                </a>
                <a
                  class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-card hover:bg-surface-card-subtle text-text-strong font-semibold text-base rounded-btn border border-border-subtle transition-all duration-150 shadow-eco-subtle hover:border-text-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  href="#fitur"
                >
                  <span
                    class="material-symbols-outlined text-[20px] text-primary"
                    >explore</span
                  >
                  <span>Jelajahi Fitur</span>
                </a>
              </div>
              <!-- Microcopy & trust highlight -->
              <div
                class="flex items-center gap-3 text-xs md:text-sm font-medium text-text-muted"
              >
                <span class="material-symbols-outlined text-[18px] text-primary"
                  >verified</span
                >
                <span>Technology for a more sustainable future.</span>
                <span class="text-border-subtle">•</span>
                <span
                  class="inline-flex items-center gap-1.5 text-brand-forest font-semibold"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  SDG 12 Aligned
                </span>
              </div>
            </div>
            <!-- Right Column: Hero Visual Mascot -->
            <div class="lg:col-span-5 flex justify-center items-center">
              <div class="relative w-full max-w-[420px] lg:max-w-none">
                <!-- Soft mint ambient glow halo behind the robot -->
                <div
                  class="absolute inset-0 -m-6 bg-gradient-to-tr from-brand-mint/25 via-accent-teal/15 to-brand-mint-subtle/50 rounded-full blur-2xl pointer-events-none -z-10"
                ></div>
                <!-- Floating Leaf Accent 1 (Top Left) -->
                <div
                  class="absolute -top-6 -left-5 z-20 animate-leaf-1 pointer-events-none"
                >
                  <div
                    class="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm border border-brand-mint/40 shadow-eco-hover flex items-center justify-center text-primary transform -rotate-12"
                  >
                    <span
                      class="material-symbols-outlined text-2xl text-brand-emerald-dark"
                      >eco</span
                    >
                  </div>
                </div>
                <!-- Floating Leaf Accent 2 (Right Mid) -->
                <div
                  class="absolute top-1/3 -right-6 z-20 animate-leaf-2 pointer-events-none"
                >
                  <div
                    class="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-brand-mint/40 shadow-eco-hover flex items-center justify-center text-accent-teal transform rotate-12"
                  >
                    <span
                      class="material-symbols-outlined text-xl text-accent-teal"
                      >spa</span
                    >
                  </div>
                </div>
                <!-- Visual Card Frame with gentle float animation -->
                <div
                  class="relative rounded-card bg-surface-card p-3 sm:p-4 border border-border-subtle shadow-eco-card animate-gentle-float"
                >
                  <div
                    class="rounded-tile overflow-hidden bg-gradient-to-b from-brand-mint-subtle/40 to-surface-card-subtle/30 flex items-center justify-center"
                  >
                    <img
                      alt="SustainAI Robot Mascot &amp; Recycling Bin"
                      class="w-full h-auto aspect-square object-contain transform transition-transform duration-300 hover:scale-[1.02]"
                      src="https://lh3.googleusercontent.com/aida/ALJJyrC3ooSaeXmEXtKxm8NnZZp2vtE2fQoDS8aSTWv8t53Ix2V5ogeLjTZ-cN0T-SjtLStXODdRg-dhabRG2SYvbwfW8AuiZFSIxHbEkF9WcvbrspSoCcoyxm2s81qrXi74RXNcEvEd-v_1_OXrcnX4DKrCKgr0LnB8aVrmb61dBlLw2nEFFhwPIKNiSBs_hwtq2sePt4P9qtRfeu36gX-z4qqFdxN56w6koFOa2CffpjGCew"
                    />
                  </div>
                  <!-- Floating Eco Tag -->
                  <div
                    class="absolute -bottom-4 right-4 sm:-bottom-5 sm:right-6 bg-surface-card border border-border-subtle rounded-card px-4 py-2.5 shadow-eco-hover flex items-center gap-3"
                  >
                    <div
                      class="w-8 h-8 rounded-full bg-brand-mint-subtle flex items-center justify-center text-primary"
                    >
                      <span class="material-symbols-outlined text-[20px]"
                        >smart_toy</span
                      >
                    </div>
                    <div>
                      <div
                        class="text-[11px] font-medium text-text-muted uppercase tracking-wider"
                      >
                        AI Inference
                      </div>
                      <div
                        class="text-xs font-bold text-text-strong font-display"
                      >
                        Waste &amp; Plant Detection
                      </div>
                    </div>
                  </div>
                  <!-- Floating Accuracy badge -->
                  <div
                    class="absolute -top-4 -left-3 sm:-top-5 sm:-left-4 bg-surface-card border border-border-subtle rounded-card px-3.5 py-2 shadow-eco-hover flex items-center gap-2"
                  >
                    <span
                      class="w-2.5 h-2.5 rounded-full bg-border-focus"
                    ></span>
                    <span
                      class="text-xs font-semibold text-text-strong font-display"
                      >Multimodal AI Ready</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- ========================================================================= -->
      <!-- SECTION 03 — PROBLEM & ENVIRONMENTAL AWARENESS                            -->
      <!-- ========================================================================= -->
      <section
        class="py-16 md:py-24 bg-surface-base border-t border-border-subtle"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Section Header -->
          <div class="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div
              class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-2"
            >
              <span class="material-symbols-outlined text-[16px]">info</span>
              <span>Tantangan Pengelolaan Lingkungan</span>
            </div>
            <h2
              class="font-display font-bold text-2xl md:text-[32px] md:leading-[40px] text-text-strong tracking-tight mb-3"
            >
              Small Problems, Bigger Environmental Impact.
            </h2>
            <p class="text-sm md:text-base text-text-muted font-normal">
              Permasalahan lingkungan sering kali dimulai dari hal sederhana
              yang kurang kita perhatikan dalam kehidupan sehari-hari.
            </p>
          </div>
          <!-- 3 Problem Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <!-- Card 1 -->
            <div
              class="bg-surface-card border border-border-subtle rounded-card p-6 md:p-7 shadow-eco-subtle hover:shadow-eco-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                class="w-12 h-12 rounded-tile bg-accent-teal-subtle text-accent-teal flex items-center justify-center mb-5"
              >
                <span class="material-symbols-outlined text-2xl">delete</span>
              </div>
              <h3
                class="font-display font-bold text-lg text-text-strong mb-2.5 leading-snug"
              >
                Kesulitan Mengidentifikasi Sampah
              </h3>
              <p class="text-sm text-text-muted leading-relaxed font-normal">
                Tidak semua orang mengetahui cara membedakan kategori sampah dan
                menentukan metode pengelolaan yang tepat antara organik,
                anorganik, atau B3.
              </p>
            </div>
            <!-- Card 2 -->
            <div
              class="bg-surface-card border border-border-subtle rounded-card p-6 md:p-7 shadow-eco-subtle hover:shadow-eco-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                class="w-12 h-12 rounded-tile bg-brand-mint-subtle text-primary flex items-center justify-center mb-5"
              >
                <span class="material-symbols-outlined text-2xl"
                  >recycling</span
                >
              </div>
              <h3
                class="font-display font-bold text-lg text-text-strong mb-2.5 leading-snug"
              >
                Potensi Daur Ulang Belum Optimal
              </h3>
              <p class="text-sm text-text-muted leading-relaxed font-normal">
                Sebagian sampah yang masih dapat dimanfaatkan kembali berakhir
                sebagai limbah terbuka karena kurangnya informasi nilai ekonomi
                dan saluran bank sampah.
              </p>
            </div>
            <!-- Card 3 -->
            <div
              class="bg-surface-card border border-border-subtle rounded-card p-6 md:p-7 shadow-eco-subtle hover:shadow-eco-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                class="w-12 h-12 rounded-tile bg-accent-amber-subtle text-tertiary-text flex items-center justify-center mb-5"
              >
                <span class="material-symbols-outlined text-2xl"
                  >potted_plant</span
                >
              </div>
              <h3
                class="font-display font-bold text-lg text-text-strong mb-2.5 leading-snug"
              >
                Kurangnya Pengetahuan Kesehatan Tanaman
              </h3>
              <p class="text-sm text-text-muted leading-relaxed font-normal">
                Gejala awal hama dan penyakit tanaman sering kali sulit dikenali
                sejak dini sehingga penanganan medis maupun organik menjadi
                terlambat.
              </p>
            </div>
          </div>
        </div>
      </section>
      <!-- ========================================================================= -->
      <!-- SECTION 04 — OUR SOLUTION                                                 -->
      <!-- ========================================================================= -->
      <section
        class="py-16 md:py-24 bg-surface-card border-t border-border-subtle"
        id="tentang-kami"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center"
          >
            <!-- Left: Value Proposition -->
            <div class="lg:col-span-6 flex flex-col items-start text-left">
              <div
                class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-2"
              >
                <span class="material-symbols-outlined text-[16px]"
                  >lightbulb</span
                >
                <span>Solusi Berbasis Kecerdasan Buatan</span>
              </div>
              <h2
                class="font-display font-bold text-2xl md:text-[32px] md:leading-[40px] text-text-strong tracking-tight mb-4"
              >
                Meet SustainAI.
              </h2>
              <p
                class="text-base text-text-muted leading-relaxed mb-6 font-normal"
              >
                Solusi cerdas untuk membantu masyarakat memahami lingkungan
                melalui teknologi Artificial Intelligence. Kami mengubah proses
                pengenalan visual yang rumit menjadi wawasan yang aplikatif dan
                mudah diakses siapa saja.
              </p>
              <!-- 4 Value Proposition Points -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
                <div
                  class="flex items-start gap-3 p-3.5 rounded-tile bg-surface-base border border-border-subtle"
                >
                  <div
                    class="w-8 h-8 rounded-btn bg-brand-mint-subtle text-primary flex items-center justify-center shrink-0 mt-0.5"
                  >
                    <span class="material-symbols-outlined text-[18px]"
                      >document_scanner</span
                    >
                  </div>
                  <div>
                    <h4
                      class="font-display font-semibold text-sm text-text-strong"
                    >
                      AI Image Analysis
                    </h4>
                    <p class="text-xs text-text-muted leading-normal mt-0.5">
                      Deteksi cepat berbasis foto objek langsung.
                    </p>
                  </div>
                </div>
                <div
                  class="flex items-start gap-3 p-3.5 rounded-tile bg-surface-base border border-border-subtle"
                >
                  <div
                    class="w-8 h-8 rounded-btn bg-info-sky-subtle text-info-sky flex items-center justify-center shrink-0 mt-0.5"
                  >
                    <span class="material-symbols-outlined text-[18px]"
                      >public</span
                    >
                  </div>
                  <div>
                    <h4
                      class="font-display font-semibold text-sm text-text-strong"
                    >
                      Accessible Info
                    </h4>
                    <p class="text-xs text-text-muted leading-normal mt-0.5">
                      Edukasi lingkungan yang terbuka dan gratis.
                    </p>
                  </div>
                </div>
                <div
                  class="flex items-start gap-3 p-3.5 rounded-tile bg-surface-base border border-border-subtle"
                >
                  <div
                    class="w-8 h-8 rounded-btn bg-accent-teal-subtle text-accent-teal flex items-center justify-center shrink-0 mt-0.5"
                  >
                    <span class="material-symbols-outlined text-[18px]"
                      >task_alt</span
                    >
                  </div>
                  <div>
                    <h4
                      class="font-display font-semibold text-sm text-text-strong"
                    >
                      Rekomendasi Praktis
                    </h4>
                    <p class="text-xs text-text-muted leading-normal mt-0.5">
                      Panduan penanganan nyata dan tips daur ulang.
                    </p>
                  </div>
                </div>
                <div
                  class="flex items-start gap-3 p-3.5 rounded-tile bg-surface-base border border-border-subtle"
                >
                  <div
                    class="w-8 h-8 rounded-btn bg-brand-mint-subtle text-brand-forest flex items-center justify-center shrink-0 mt-0.5"
                  >
                    <span class="material-symbols-outlined text-[18px]"
                      >auto_stories</span
                    >
                  </div>
                  <div>
                    <h4
                      class="font-display font-semibold text-sm text-text-strong"
                    >
                      Hasil Terstruktur
                    </h4>
                    <p class="text-xs text-text-muted leading-normal mt-0.5">
                      Informasi ringkas, jelas, dan tanpa jargon rumit.
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="p-4 rounded-tile bg-brand-mint-subtle/70 border border-border-focus/30 flex items-center gap-3"
              >
                <span class="material-symbols-outlined text-primary text-xl"
                  >psychology</span
                >
                <p class="text-xs text-brand-forest font-medium">
                  Alur cerdas:
                  <strong class="text-primary"
                    >Identifikasi → Pemahaman → Rekomendasi → Tindakan</strong
                  >
                </p>
              </div>
            </div>
            <!-- Right: Interactive Realistic UI Mockup -->
            <div class="lg:col-span-6">
              <div
                class="bg-surface-base border border-border-subtle rounded-card p-4 sm:p-6 shadow-eco-card"
              >
                <!-- Window top bar -->
                <div
                  class="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle"
                >
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-danger-rose/70"></span>
                    <span
                      class="w-3 h-3 rounded-full bg-accent-amber/70"
                    ></span>
                    <span
                      class="w-3 h-3 rounded-full bg-border-focus/70"
                    ></span>
                    <span class="text-xs font-mono text-text-muted ml-2"
                      >sustainai.app/analyzer</span
                    >
                  </div>
                  <span
                    class="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-brand-mint-subtle px-2 py-0.5 rounded-full"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-primary animate-ping"
                    ></span>
                    Live Analyzer Demo
                  </span>
                </div>
                <!-- Product simulation step-by-step UI -->
                <div class="space-y-4">
                  <!-- Upload Step Simulator -->
                  <div
                    class="p-3.5 bg-surface-card rounded-tile border border-border-subtle flex items-center justify-between"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-lg bg-surface-card-subtle flex items-center justify-center text-text-muted"
                      >
                        <span class="material-symbols-outlined">image</span>
                      </div>
                      <div>
                        <div
                          class="text-xs font-bold text-text-strong font-display"
                        >
                          botol_plastik_pet.jpg
                        </div>
                        <div class="text-[11px] text-text-muted">
                          Ukuran: 1.4 MB • Format: JPG
                        </div>
                      </div>
                    </div>
                    <span
                      class="inline-flex items-center text-xs text-primary font-semibold"
                    >
                      <span class="material-symbols-outlined text-[16px] mr-1"
                        >check_circle</span
                      >
                      Terunggah
                    </span>
                  </div>
                  <!-- AI Processing Indicator -->
                  <div
                    class="p-3 bg-brand-mint-subtle/50 rounded-tile border border-border-focus/20 flex items-center justify-between"
                  >
                    <div class="flex items-center gap-2.5">
                      <span
                        class="material-symbols-outlined text-primary text-[20px] animate-spin"
                        >sync</span
                      >
                      <span class="text-xs font-medium text-brand-forest"
                        >Gemini Multimodal Inference Pipeline</span
                      >
                    </div>
                    <span class="text-[11px] font-mono text-primary font-bold"
                      >120ms</span
                    >
                  </div>
                  <!-- Output Card Simulation -->
                  <div
                    class="p-4 bg-surface-card rounded-tile border border-border-subtle shadow-eco-subtle space-y-3"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span
                          class="text-sm font-bold text-text-strong font-display"
                          >Botol Plastik PET (Polyethylene Terephthalate)</span
                        >
                      </div>
                      <span
                        class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-mint-subtle text-primary border border-border-focus/20"
                      >
                        Recyclable
                      </span>
                    </div>
                    <p class="text-xs text-text-muted leading-relaxed">
                      Sampah plastik nomor 1. Mudah didaur ulang menjadi serat
                      tekstil, tali, atau wadah baru.
                    </p>
                    <div
                      class="pt-2 border-t border-border-subtle flex flex-wrap items-center justify-between gap-2 text-xs"
                    >
                      <div class="flex items-center gap-1.5 text-text-muted">
                        <span
                          class="material-symbols-outlined text-[16px] text-accent-teal"
                          >storefront</span
                        >
                        <span
                          >Ref. Harga Bank Sampah:
                          <strong class="text-text-strong"
                            >Rp3.500 - Rp4.500 / kg</strong
                          ></span
                        >
                      </div>
                      <span class="text-[11px] font-semibold text-primary"
                        >Tersedia Rekomendasi →</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- ========================================================================= -->
      <!-- SECTION 05 — CORE FEATURES                                                -->
      <!-- ========================================================================= -->
      <section
        class="py-16 md:py-24 bg-surface-base border-t border-border-subtle"
        id="fitur"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Section Header -->
          <div class="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <div
              class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-2"
            >
              <span class="material-symbols-outlined text-[16px]">widgets</span>
              <span>Fitur Unggulan Platform</span>
            </div>
            <h2
              class="font-display font-bold text-2xl md:text-[32px] md:leading-[40px] text-text-strong tracking-tight mb-3"
            >
              Explore Our Features.
            </h2>
            <p class="text-sm md:text-base text-text-muted font-normal">
              Kenali dua solusi utama SustainAI yang dirancang untuk mendukung
              pengelolaan lingkungan berbasis teknologi cerdas.
            </p>
          </div>
          <!-- 2 Large Feature Showcase Cards -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8">
            <!-- Feature Card A — Waste Analyzer -->
            <div
              class="bg-surface-card border border-border-subtle rounded-card p-6 sm:p-8 shadow-eco-subtle hover:shadow-eco-hover transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <!-- Header with Icon & Category Pill -->
                <div class="flex items-center justify-between mb-5">
                  <div
                    class="w-12 h-12 rounded-tile bg-brand-mint-subtle text-primary flex items-center justify-center"
                  >
                    <span class="material-symbols-outlined text-2xl"
                      >recycling</span
                    >
                  </div>
                  <span
                    class="px-3 py-1 rounded-full text-xs font-bold bg-brand-mint-subtle text-brand-forest border border-border-focus/30"
                  >
                    Modul Sampah &amp; Lingkungan
                  </span>
                </div>
                <!-- Title & Description -->
                <h3
                  class="font-display font-bold text-xl md:text-2xl text-text-strong mb-3"
                >
                  Waste Analyzer
                </h3>
                <p
                  class="text-sm text-text-muted leading-relaxed mb-6 font-normal"
                >
                  Identifikasi dan klasifikasikan sampah melalui teknologi AI
                  untuk memahami dampak lingkungan serta menemukan cara
                  pengelolaan yang lebih bertanggung jawab.
                </p>
                <!-- Capability List -->
                <ul
                  class="space-y-2.5 mb-7 text-xs sm:text-sm text-text-strong font-medium"
                >
                  <li class="flex items-center gap-2.5">
                    <span
                      class="material-symbols-outlined text-primary text-[18px]"
                      >check_circle</span
                    >
                    <span
                      >Image-based waste identification cepat &amp; akurat</span
                    >
                  </li>
                  <li class="flex items-center gap-2.5">
                    <span
                      class="material-symbols-outlined text-primary text-[18px]"
                      >check_circle</span
                    >
                    <span
                      >Klasifikasi kategori sampah (Recyclable, Compost,
                      Hazardous, Paper)</span
                    >
                  </li>
                  <li class="flex items-center gap-2.5">
                    <span
                      class="material-symbols-outlined text-primary text-[18px]"
                      >check_circle</span
                    >
                    <span
                      >Penjelasan dampak lingkungan &amp; tips daur ulang
                      bertanggung jawab</span
                    >
                  </li>
                  <li class="flex items-center gap-2.5">
                    <span
                      class="material-symbols-outlined text-primary text-[18px]"
                      >check_circle</span
                    >
                    <span
                      >Informasi referensi harga bank sampah terintegrasi</span
                    >
                  </li>
                </ul>
                <!-- Interface Mockup Preview (Waste) -->
                <div
                  class="rounded-tile bg-surface-base border border-border-subtle p-4 mb-6"
                >
                  <div
                    class="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2.5"
                  >
                    Pratinjau Hasil Analisis:
                  </div>
                  <div
                    class="flex items-center gap-3 bg-surface-card p-3 rounded-lg border border-border-subtle"
                  >
                    <div
                      class="w-12 h-12 rounded-md bg-brand-mint-subtle flex items-center justify-center text-primary shrink-0"
                    >
                      <span class="material-symbols-outlined text-2xl"
                        >takeout_dining</span
                      >
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between gap-1">
                        <div
                          class="text-xs font-bold text-text-strong font-display truncate"
                        >
                          Kardus Makanan Bersih
                        </div>
                        <span
                          class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-amber-subtle text-tertiary-text border border-accent-amber/20"
                        >
                          Kertas / Karton
                        </span>
                      </div>
                      <div class="text-[11px] text-text-muted mt-0.5">
                        Dapat didaur ulang kembali menjadi bubur kertas.
                      </div>
                    </div>
                  </div>
                  <!-- Documented Semantic Color Pills -->
                  <div
                    class="mt-3 pt-3 border-t border-border-subtle flex flex-wrap gap-1.5 text-[10px] font-bold"
                  >
                    <span
                      class="px-2 py-0.5 rounded-full bg-brand-mint-subtle text-primary"
                      >Recyclable</span
                    >
                    <span
                      class="px-2 py-0.5 rounded-full bg-accent-teal-subtle text-accent-teal"
                      >Compost / Organik</span
                    >
                    <span
                      class="px-2 py-0.5 rounded-full bg-accent-amber-subtle text-tertiary-text"
                      >Kertas</span
                    >
                    <span
                      class="px-2 py-0.5 rounded-full bg-danger-rose-subtle text-danger-rose"
                      >Hazardous / B3</span
                    >
                    <span
                      class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
                      >Landfill / Residual</span
                    >
                  </div>
                </div>
              </div>
              <!-- CTA -->
              <a
                class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-brand-emerald-dark active:scale-95 text-white font-semibold text-sm rounded-btn transition-all shadow-sm"
                href="#cara-kerja"
              >
                <span>Jelajahi Waste Analyzer</span>
                <span class="material-symbols-outlined text-[18px]"
                  >arrow_forward</span
                >
              </a>
            </div>
            <!-- Feature Card B — Plant Disease Analyzer -->
            <div
              class="bg-surface-card border border-border-subtle rounded-card p-6 sm:p-8 shadow-eco-subtle hover:shadow-eco-hover transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <!-- Header with Icon & Category Pill -->
                <div class="flex items-center justify-between mb-5">
                  <div
                    class="w-12 h-12 rounded-tile bg-accent-teal-subtle text-accent-teal flex items-center justify-center"
                  >
                    <span class="material-symbols-outlined text-2xl"
                      >potted_plant</span
                    >
                  </div>
                  <span
                    class="px-3 py-1 rounded-full text-xs font-bold bg-accent-teal-subtle text-accent-teal border border-accent-teal/30"
                  >
                    Modul Agrikultur &amp; Tanaman
                  </span>
                </div>
                <!-- Title & Description -->
                <h3
                  class="font-display font-bold text-xl md:text-2xl text-text-strong mb-3"
                >
                  Plant Disease Analyzer
                </h3>
                <p
                  class="text-sm text-text-muted leading-relaxed mb-6 font-normal"
                >
                  Kenali indikasi awal penyakit dan gangguan pada tanaman
                  melalui analisis gambar berbasis AI, disertai rekomendasi
                  perawatan dan langkah pencegahan.
                </p>
                <!-- Capability List -->
                <ul
                  class="space-y-2.5 mb-7 text-xs sm:text-sm text-text-strong font-medium"
                >
                  <li class="flex items-center gap-2.5">
                    <span
                      class="material-symbols-outlined text-accent-teal text-[18px]"
                      >check_circle</span
                    >
                    <span
                      >Identifikasi nama &amp; spesies tanaman secara
                      otomatis</span
                    >
                  </li>
                  <li class="flex items-center gap-2.5">
                    <span
                      class="material-symbols-outlined text-accent-teal text-[18px]"
                      >check_circle</span
                    >
                    <span>Deteksi indikasi hama atau bercak penyakit daun</span>
                  </li>
                  <li class="flex items-center gap-2.5">
                    <span
                      class="material-symbols-outlined text-accent-teal text-[18px]"
                      >check_circle</span
                    >
                    <span
                      >Analisis gejala visual dan kemungkinan faktor
                      penyebab</span
                    >
                  </li>
                  <li class="flex items-center gap-2.5">
                    <span
                      class="material-symbols-outlined text-accent-teal text-[18px]"
                      >check_circle</span
                    >
                    <span
                      >Rekomendasi perawatan alami &amp; tips pencegahan
                      lanjutan</span
                    >
                  </li>
                </ul>
                <!-- Interface Mockup Preview (Plant) -->
                <div
                  class="rounded-tile bg-surface-base border border-border-subtle p-4 mb-6"
                >
                  <div
                    class="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2.5"
                  >
                    Pratinjau Hasil Analisis:
                  </div>
                  <div
                    class="flex items-center gap-3 bg-surface-card p-3 rounded-lg border border-border-subtle"
                  >
                    <div
                      class="w-12 h-12 rounded-md bg-accent-teal-subtle flex items-center justify-center text-accent-teal shrink-0"
                    >
                      <span class="material-symbols-outlined text-2xl"
                        >spa</span
                      >
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between gap-1">
                        <div
                          class="text-xs font-bold text-text-strong font-display truncate"
                        >
                          Tanaman Tomat (Solanum lycopersicum)
                        </div>
                        <span
                          class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-amber-subtle text-tertiary-text border border-accent-amber/20"
                        >
                          Bercak Daun Awal
                        </span>
                      </div>
                      <div class="text-[11px] text-text-muted mt-0.5">
                        Indikasi infeksi jamur Alternaria. Disarankan pangkas
                        daun bawah.
                      </div>
                    </div>
                  </div>
                  <!-- Safe Usage Disclaimer Note -->
                  <div
                    class="mt-3 pt-3 border-t border-border-subtle flex items-center gap-2 text-[11px] text-text-muted"
                  >
                    <span
                      class="material-symbols-outlined text-[16px] text-accent-teal"
                      >shield</span
                    >
                    <span
                      >Hasil AI bersifat indikatif awal untuk mendukung
                      perawatan petani &amp; masyarakat.</span
                    >
                  </div>
                </div>
              </div>
              <!-- CTA -->
              <a
                class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent-teal hover:bg-brand-forest active:scale-95 text-white font-semibold text-sm rounded-btn transition-all shadow-sm"
                href="#cara-kerja"
              >
                <span>Jelajahi Plant Analyzer</span>
                <span class="material-symbols-outlined text-[18px]"
                  >arrow_forward</span
                >
              </a>
            </div>
          </div>
        </div>
      </section>
      <!-- ========================================================================= -->
      <!-- SECTION 06 — HOW IT WORKS                                                 -->
      <!-- ========================================================================= -->
      <section
        class="py-16 md:py-24 bg-surface-card border-t border-border-subtle"
        id="cara-kerja"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Section Header -->
          <div class="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <div
              class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-2"
            >
              <span class="material-symbols-outlined text-[16px]"
                >conversion_path</span
              >
              <span>Alur Kerja Platform</span>
            </div>
            <h2
              class="font-display font-bold text-2xl md:text-[32px] md:leading-[40px] text-text-strong tracking-tight mb-3"
            >
              Simple Steps, Smarter Insights.
            </h2>
            <p class="text-sm md:text-base text-text-muted font-normal">
              Mulai analisis lingkungan hanya dengan beberapa langkah sederhana
              melalui smartphone atau peramban web Anda.
            </p>
          </div>
          <!-- 4 Step Process Layout -->
          <div class="relative">
            <!-- Connecting Line (Desktop) -->
            <div
              class="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-border-subtle -z-0"
            ></div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <!-- Step 1 -->
              <div
                class="relative flex flex-col items-start lg:items-center text-left lg:text-center z-10 group"
              >
                <div class="flex items-center gap-3 lg:flex-col mb-4">
                  <div
                    class="w-14 h-14 rounded-tile bg-brand-mint-subtle border-2 border-border-focus/30 text-primary flex items-center justify-center font-display font-bold text-lg shadow-sm group-hover:scale-105 transition-transform bg-surface-card"
                  >
                    <span class="material-symbols-outlined text-2xl"
                      >add_photo_alternate</span
                    >
                  </div>
                  <span
                    class="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-surface-card-subtle text-text-muted border border-border-subtle"
                  >
                    Langkah 01
                  </span>
                </div>
                <h3
                  class="font-display font-bold text-base md:text-lg text-text-strong mb-2"
                >
                  Unggah Gambar
                </h3>
                <p class="text-sm text-text-muted leading-relaxed font-normal">
                  Pilih atau ambil foto sampah maupun tanaman secara langsung
                  menggunakan kamera perangkat Anda.
                </p>
              </div>
              <!-- Step 2 -->
              <div
                class="relative flex flex-col items-start lg:items-center text-left lg:text-center z-10 group"
              >
                <div class="flex items-center gap-3 lg:flex-col mb-4">
                  <div
                    class="w-14 h-14 rounded-tile bg-brand-mint-subtle border-2 border-border-focus/30 text-primary flex items-center justify-center font-display font-bold text-lg shadow-sm group-hover:scale-105 transition-transform bg-surface-card"
                  >
                    <span class="material-symbols-outlined text-2xl"
                      >psychology</span
                    >
                  </div>
                  <span
                    class="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-surface-card-subtle text-text-muted border border-border-subtle"
                  >
                    Langkah 02
                  </span>
                </div>
                <h3
                  class="font-display font-bold text-base md:text-lg text-text-strong mb-2"
                >
                  Analisis oleh AI
                </h3>
                <p class="text-sm text-text-muted leading-relaxed font-normal">
                  Sistem memproses gambar menggunakan kecerdasan buatan untuk
                  mengenali objek dan karakteristik visualnya.
                </p>
              </div>
              <!-- Step 3 -->
              <div
                class="relative flex flex-col items-start lg:items-center text-left lg:text-center z-10 group"
              >
                <div class="flex items-center gap-3 lg:flex-col mb-4">
                  <div
                    class="w-14 h-14 rounded-tile bg-brand-mint-subtle border-2 border-border-focus/30 text-primary flex items-center justify-center font-display font-bold text-lg shadow-sm group-hover:scale-105 transition-transform bg-surface-card"
                  >
                    <span class="material-symbols-outlined text-2xl"
                      >analytics</span
                    >
                  </div>
                  <span
                    class="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-surface-card-subtle text-text-muted border border-border-subtle"
                  >
                    Langkah 03
                  </span>
                </div>
                <h3
                  class="font-display font-bold text-base md:text-lg text-text-strong mb-2"
                >
                  Dapatkan Hasil
                </h3>
                <p class="text-sm text-text-muted leading-relaxed font-normal">
                  Pelajari hasil identifikasi, klasifikasi, estimasi referensi
                  harga, serta indikasi kesehatan objek secara terstruktur.
                </p>
              </div>
              <!-- Step 4 -->
              <div
                class="relative flex flex-col items-start lg:items-center text-left lg:text-center z-10 group"
              >
                <div class="flex items-center gap-3 lg:flex-col mb-4">
                  <div
                    class="w-14 h-14 rounded-tile bg-brand-mint-subtle border-2 border-border-focus/30 text-primary flex items-center justify-center font-display font-bold text-lg shadow-sm group-hover:scale-105 transition-transform bg-surface-card"
                  >
                    <span class="material-symbols-outlined text-2xl">eco</span>
                  </div>
                  <span
                    class="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-surface-card-subtle text-text-muted border border-border-subtle"
                  >
                    Langkah 04
                  </span>
                </div>
                <h3
                  class="font-display font-bold text-base md:text-lg text-text-strong mb-2"
                >
                  Ambil Tindakan
                </h3>
                <p class="text-sm text-text-muted leading-relaxed font-normal">
                  Gunakan rekomendasi yang diberikan untuk mengambil keputusan
                  nyata yang ramah lingkungan dan bertanggung jawab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- ========================================================================= -->
      <!-- SECTION 07 — SUSTAINABLE DEVELOPMENT GOALS                                -->
      <!-- ========================================================================= -->
      <section
        class="py-16 md:py-24 bg-surface-base border-t border-border-subtle"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Section Header -->
          <div class="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <div
              class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-2"
            >
              <span class="material-symbols-outlined text-[16px]"
                >nest_eco_leaf</span
              >
              <span>Dukungan Terhadap Keberlanjutan Global</span>
            </div>
            <h2
              class="font-display font-bold text-2xl md:text-[32px] md:leading-[40px] text-text-strong tracking-tight mb-3"
            >
              Technology for a Sustainable Future.
            </h2>
            <p class="text-sm md:text-base text-text-muted font-normal">
              SustainAI hadir untuk mendukung kesadaran dan tindakan nyata dalam
              menjaga keberlanjutan lingkungan selaras dengan Sustainable
              Development Goals (SDGs).
            </p>
          </div>
          <!-- 3 SDG Cards with Hierarchy -->
          <div
            class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
          >
            <!-- Primary Focus — SDG 12 (Larger & Prominent) -->
            <div
              class="lg:col-span-6 bg-surface-card border-2 border-primary/30 rounded-card p-7 sm:p-8 shadow-eco-hover relative flex flex-col justify-between"
            >
              <div
                class="absolute -top-3.5 left-7 bg-primary text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5"
              >
                <span class="material-symbols-outlined text-[14px]">star</span>
                <span>Fokus Utama (Primary Focus)</span>
              </div>
              <div>
                <div class="flex items-center justify-between mb-6 pt-2">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 rounded-tile bg-brand-mint-subtle text-primary font-display font-extrabold text-xl flex items-center justify-center border border-border-focus/30"
                    >
                      12
                    </div>
                    <div>
                      <span
                        class="text-xs font-semibold text-primary uppercase tracking-wider"
                        >SDG 12</span
                      >
                      <h3
                        class="font-display font-bold text-xl text-text-strong"
                      >
                        Responsible Consumption &amp; Production
                      </h3>
                    </div>
                  </div>
                </div>
                <p
                  class="text-sm text-text-strong font-medium mb-4 leading-relaxed"
                >
                  Konsumsi dan Produksi yang Bertanggung Jawab
                </p>
                <p
                  class="text-sm text-text-muted leading-relaxed font-normal mb-6"
                >
                  SustainAI berkontribusi langsung dalam mendorong pengelolaan
                  sampah yang bertanggung jawab melalui identifikasi dan
                  klasifikasi sampah berbasis AI, edukasi daur ulang, serta
                  penyediaan referensi harga bank sampah untuk mengoptimalkan
                  pemanfaatan kembali sumber daya.
                </p>
              </div>
              <div
                class="pt-4 border-t border-border-subtle flex items-center gap-2 text-xs font-semibold text-brand-forest"
              >
                <span class="material-symbols-outlined text-[18px] text-primary"
                  >eco</span
                >
                <span>Waste Analyzer sebagai pendorong ekonomi sirkular</span>
              </div>
            </div>
            <!-- Supporting Focus — SDG 13 -->
            <div
              class="lg:col-span-3 bg-surface-card border border-border-subtle rounded-card p-6 sm:p-7 shadow-eco-subtle hover:shadow-eco-hover transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center gap-3 mb-5">
                  <div
                    class="w-10 h-10 rounded-tile bg-info-sky-subtle text-info-sky font-display font-extrabold text-base flex items-center justify-center border border-info-sky/20"
                  >
                    13
                  </div>
                  <div>
                    <span
                      class="text-[11px] font-semibold text-info-sky uppercase tracking-wider"
                      >SDG 13</span
                    >
                    <h3
                      class="font-display font-bold text-base text-text-strong"
                    >
                      Climate Action
                    </h3>
                  </div>
                </div>
                <p class="text-xs font-semibold text-text-strong mb-2">
                  Penanganan Perubahan Iklim
                </p>
                <p
                  class="text-xs text-text-muted leading-relaxed font-normal mb-4"
                >
                  Mendukung kesadaran lingkungan lewat edukasi pengurangan
                  timbunan sampah di TPA serta potensi penurunan jejak emisi gas
                  metana di masa mendatang.
                </p>
              </div>
              <div
                class="pt-3 border-t border-border-subtle text-[11px] text-text-muted flex items-center gap-1.5 font-medium"
              >
                <span
                  class="material-symbols-outlined text-[16px] text-info-sky"
                  >cloud_sync</span
                >
                <span>Edukasi dampak emisi limbah</span>
              </div>
            </div>
            <!-- Supporting Focus — SDG 15 -->
            <div
              class="lg:col-span-3 bg-surface-card border border-border-subtle rounded-card p-6 sm:p-7 shadow-eco-subtle hover:shadow-eco-hover transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center gap-3 mb-5">
                  <div
                    class="w-10 h-10 rounded-tile bg-accent-teal-subtle text-accent-teal font-display font-extrabold text-base flex items-center justify-center border border-accent-teal/20"
                  >
                    15
                  </div>
                  <div>
                    <span
                      class="text-[11px] font-semibold text-accent-teal uppercase tracking-wider"
                      >SDG 15</span
                    >
                    <h3
                      class="font-display font-bold text-base text-text-strong"
                    >
                      Life on Land
                    </h3>
                  </div>
                </div>
                <p class="text-xs font-semibold text-text-strong mb-2">
                  Ekosistem Daratan
                </p>
                <p
                  class="text-xs text-text-muted leading-relaxed font-normal mb-4"
                >
                  Plant Disease Analyzer membantu masyarakat dan petani
                  mengenali gangguan kesehatan tanaman dan menerapkan perawatan
                  ramah lingkungan.
                </p>
              </div>
              <div
                class="pt-3 border-t border-border-subtle text-[11px] text-text-muted flex items-center gap-1.5 font-medium"
              >
                <span
                  class="material-symbols-outlined text-[16px] text-accent-teal"
                  >yard</span
                >
                <span>Proteksi flora &amp; hortikultura</span>
              </div>
            </div>
          </div>
          <p class="text-center text-xs text-text-muted mt-8">
            *Penyelarasan dengan sasaran SDGs adalah bentuk kontribusi inovasi
            teknologi dan kesadaran lingkungan independen, bukan bentuk
            sertifikasi atau afiliasi resmi PBB.
          </p>
        </div>
      </section>
      <!-- ========================================================================= -->
      <!-- SECTION 08 — FINAL CALL TO ACTION                                         -->
      <!-- ========================================================================= -->
      <section class="py-16 md:py-24 bg-surface-base">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            class="relative bg-primary rounded-card px-6 py-12 md:p-16 text-center text-white overflow-hidden shadow-xl"
          >
            <!-- Background decorative leaf pattern -->
            <div
              class="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 pointer-events-none"
            >
              <svg fill="currentColor" viewBox="0 0 100 100">
                <path
                  d="M50 18C33 18 22 32 22 50C22 68 36 78 50 82C64 78 78 68 78 50C78 32 67 18 50 18Z"
                ></path>
              </svg>
            </div>
            <div
              class="absolute -left-10 -top-10 w-48 h-48 opacity-10 pointer-events-none"
            >
              <svg fill="currentColor" viewBox="0 0 100 100">
                <path
                  d="M50 18C33 18 22 32 22 50C22 68 36 78 50 82C64 78 78 68 78 50C78 32 67 18 50 18Z"
                ></path>
              </svg>
            </div>
            <div
              class="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
            >
              <div
                class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              >
                <span
                  class="material-symbols-outlined text-[16px] text-brand-mint"
                  >nest_eco_leaf</span
                >
                <span class="text-xs font-semibold text-brand-mint-subtle"
                  >Mulai Perubahan Hari Ini</span
                >
              </div>
              <h2
                class="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-4"
              >
                Start Your Journey Toward a Greener Future.
              </h2>
              <p
                class="text-sm md:text-base text-white/80 leading-relaxed max-w-2xl mb-8 font-normal"
              >
                Manfaatkan teknologi AI untuk mengenali, memahami, dan mengambil
                tindakan yang lebih baik bagi lingkungan.
              </p>
              <div
                class="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
              >
                <a
                  class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary hover:bg-brand-mint-subtle active:scale-95 font-bold text-base rounded-btn transition-all duration-150 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint"
                  href="#fitur"
                >
                  <span>Mulai Analisis Sekarang</span>
                  <span class="material-symbols-outlined text-[20px]"
                    >arrow_forward</span
                  >
                </a>
              </div>
              <p class="text-xs sm:text-sm text-brand-mint/90 font-medium">
                Small actions. Smarter decisions. Greener future.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!-- ========================================================================= -->
    <!-- SECTION 09 — FOOTER                                                       -->
    <!-- ========================================================================= -->
    <footer class="bg-surface-card border-t border-border-subtle pt-14 pb-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-border-subtle"
        >
          <!-- Brand Column -->
          <div class="lg:col-span-5 flex flex-col items-start">
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-9 h-9 rounded-tile bg-brand-mint-subtle border border-border-focus/30 flex items-center justify-center p-1.5"
              >
                <img
                  alt="SustainAI Logo"
                  class="w-full h-full object-contain"
                  src="/SustainAI-Icon.webp"
                />
              </div>
              <div>
                <span
                  class="font-display font-bold text-lg text-primary leading-tight"
                  >SustainAI</span
                >
                <span class="block text-[11px] font-medium text-text-muted"
                  >Intelligence Platform</span
                >
              </div>
            </div>
            <p
              class="text-xs md:text-sm text-text-muted leading-relaxed max-w-sm mb-4 font-normal"
            >
              AI-powered intelligence for a more sustainable environment.
              Membantu masyarakat mengenali sampah dan menjaga kelestarian
              hayati secara bertanggung jawab.
            </p>
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-card-subtle text-[11px] font-mono text-text-muted"
            >
              <span class="material-symbols-outlined text-[14px] text-primary"
                >terminal</span
              >
              <span>Developed by Tim GenForces</span>
            </div>
          </div>
          <!-- Navigation Column -->
          <div class="lg:col-span-3">
            <h4
              class="font-display font-bold text-sm text-text-strong uppercase tracking-wider mb-4"
            >
              Navigasi
            </h4>
            <ul
              class="space-y-2.5 text-xs sm:text-sm text-text-muted font-medium"
            >
              <li>
                <a class="hover:text-primary transition-colors" href="#beranda"
                  >Beranda</a
                >
              </li>
              <li>
                <a class="hover:text-primary transition-colors" href="#fitur"
                  >Fitur Utama</a
                >
              </li>
              <li>
                <a
                  class="hover:text-primary transition-colors"
                  href="#cara-kerja"
                  >Cara Kerja</a
                >
              </li>
              <li>
                <a
                  class="hover:text-primary transition-colors"
                  href="#tentang-kami"
                  >Tentang Kami</a
                >
              </li>
            </ul>
          </div>
          <!-- Feature Column -->
          <div class="lg:col-span-4">
            <h4
              class="font-display font-bold text-sm text-text-strong uppercase tracking-wider mb-4"
            >
              Modul Analisis
            </h4>
            <ul
              class="space-y-2.5 text-xs sm:text-sm text-text-muted font-medium"
            >
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <a class="hover:text-primary transition-colors" href="#fitur"
                  >Waste Analyzer (Identifikasi Sampah)</a
                >
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-accent-teal"></span>
                <a class="hover:text-primary transition-colors" href="#fitur"
                  >Plant Disease Analyzer (Penyakit Tanaman)</a
                >
              </li>
              <li class="pt-2">
                <a
                  class="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-strong transition-colors border border-border-subtle px-3 py-1.5 rounded-btn bg-surface-base"
                  href="https://github.com/christianxavierVibecode/SustainAI"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span class="material-symbols-outlined text-[16px]"
                    >code</span
                  >
                  <span>GitHub Repository</span>
                  <span class="material-symbols-outlined text-[14px]"
                    >open_in_new</span
                  >
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- Copyright & Bottom bar -->
        <div
          class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted"
        >
          <div>© 2026 SustainAI. All rights reserved.</div>
          <div class="flex items-center gap-6">
            <span>Recognize. Understand. Act.</span>
          </div>
        </div>
      </div>
    </footer>
    <!-- Script for Sticky Nav & Mobile Drawer -->
</div>
