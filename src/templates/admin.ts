// Admin Portal HTML Template (Login & Management Dashboard)

export function renderAdminPage(isAuthenticated: boolean = false, adminUsername: string = ""): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard | Jijau Dnyanteerth Educational Campus</title>
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
              }
            }
          }
        }
      }
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
      body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-slate-100 text-slate-800 antialiased min-h-screen">

${!isAuthenticated ? `
    <!-- LOGIN INTERFACE -->
    <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-tr from-navy-950 via-navy-900 to-slate-900">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-700/30">
        <div class="text-center mb-8">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-amber-500 text-navy-900 font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 mb-3">
            J
          </div>
          <h1 class="text-2xl font-bold text-navy-900">Campus Admin Portal</h1>
          <p class="text-xs text-slate-500 mt-1">Jijau Dnyanteerth Educational Campus</p>
        </div>

        <form id="login-form" class="space-y-5">
          <div>
            <label class="block text-xs font-bold uppercase text-slate-600 mb-1.5">Username</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm"><i class="fa-solid fa-user"></i></span>
              <input type="text" name="username" required placeholder="admin" class="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-navy-900 focus:outline-none">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-slate-600 mb-1.5">Password</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm"><i class="fa-solid fa-lock"></i></span>
              <input type="password" name="password" required placeholder="••••••••" class="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-navy-900 focus:outline-none">
            </div>
          </div>

          <button type="submit" id="login-btn" class="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-3 rounded-xl shadow-lg transition flex justify-center items-center gap-2">
            <span>Sign In</span>
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </form>

        <div id="login-error" class="hidden mt-4 p-3 bg-red-100 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center"></div>
      </div>
    </div>

    <script>
      document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('login-btn');
        const err = document.getElementById('login-error');
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
        err.classList.add('hidden');

        try {
          const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          const result = await res.json();

          if (res.ok) {
            window.location.reload();
          } else {
            err.textContent = result.error || 'Invalid credentials';
            err.classList.remove('hidden');
          }
        } catch (e) {
          err.textContent = 'Network error during login';
          err.classList.remove('hidden');
        } finally {
          btn.disabled = false;
          btn.innerHTML = '<span>Sign In</span> <i class="fa-solid fa-arrow-right text-xs"></i>';
        }
      });
    </script>
` : `
    <!-- DASHBOARD INTERFACE -->
    <div class="flex h-screen overflow-hidden bg-slate-100">
      
      <!-- Sidebar -->
      <aside class="w-64 bg-navy-950 text-white flex flex-col justify-between shrink-0">
        <div>
          <div class="p-6 border-b border-slate-800 flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-amber-500 text-navy-900 font-black text-xl flex items-center justify-center">J</div>
            <div>
              <h2 class="font-bold text-sm leading-none">JIJAU CAMPUS</h2>
              <span class="text-[10px] text-amber-400 font-semibold tracking-widest uppercase">Admin Dashboard</span>
            </div>
          </div>

          <nav class="p-4 space-y-1.5 text-sm font-medium">
            <button onclick="switchTab('inquiries')" id="nav-inquiries" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-navy-800 text-amber-400 font-bold transition">
              <i class="fa-solid fa-inbox text-base"></i>
              <span>Contact Inquiries</span>
            </button>
            <button onclick="switchTab('news')" id="nav-news" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition">
              <i class="fa-solid fa-newspaper text-base"></i>
              <span>News Publisher</span>
            </button>
          </nav>
        </div>

        <div class="p-4 border-t border-slate-800/80">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                ${adminUsername.substring(0, 1).toUpperCase() || 'A'}
              </div>
              <span class="text-xs font-bold text-slate-200">${adminUsername || 'Administrator'}</span>
            </div>
            <button onclick="logout()" title="Logout" class="text-slate-400 hover:text-red-400 transition p-2">
              <i class="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto p-8">
        
        <!-- Tab 1: Contact Inquiries -->
        <div id="tab-inquiries" class="space-y-6">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 class="text-2xl font-extrabold text-navy-900">Admission & Contact Inquiries</h1>
              <p class="text-xs text-slate-500 mt-1">Manage leads and inquiries received via the public campus portal.</p>
            </div>
            
            <div class="flex items-center gap-3">
              <a href="/api/admin/inquiries/export-csv" download target="_blank" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition flex items-center gap-2">
                <i class="fa-solid fa-file-csv text-base"></i>
                <span>Export to CSV</span>
              </a>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <input type="text" id="inquiry-search" oninput="filterInquiries()" placeholder="Search by name, phone, or wing..." class="w-72 px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none">
              <span id="inquiry-count" class="text-xs font-semibold text-slate-500">Loading...</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-slate-600">
                <thead class="bg-slate-100 text-slate-700 uppercase text-[10px] tracking-wider font-bold">
                  <tr>
                    <th class="py-3.5 px-4">Date</th>
                    <th class="py-3.5 px-4">Full Name</th>
                    <th class="py-3.5 px-4">Phone</th>
                    <th class="py-3.5 px-4">Email</th>
                    <th class="py-3.5 px-4">Wing</th>
                    <th class="py-3.5 px-4">Message</th>
                    <th class="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody id="inquiries-tbody" class="divide-y divide-slate-100">
                  <tr><td colspan="7" class="text-center py-8 text-slate-400">Loading inquiries data...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Tab 2: News Publisher -->
        <div id="tab-news" class="hidden space-y-6">
          <div>
            <h1 class="text-2xl font-extrabold text-navy-900">News & Updates Publisher</h1>
            <p class="text-xs text-slate-500 mt-1">Publish announcements and store feature images directly to Cloudflare R2 object storage.</p>
          </div>

          <div class="grid lg:grid-cols-12 gap-8">
            <!-- Create Article Form -->
            <div class="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 class="font-bold text-navy-900 text-base border-b border-slate-100 pb-3"><i class="fa-solid fa-plus-circle text-emerald-500 mr-2"></i> Create New Article</h3>

              <form id="news-form" class="space-y-4">
                <div>
                  <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Article Title *</label>
                  <input type="text" name="title" required placeholder="Admissions open..." class="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none">
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Category *</label>
                  <select name="category" required class="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none bg-white">
                    <option value="Campus">Campus Wide</option>
                    <option value="ITI">Jijau ITI</option>
                    <option value="Junior College">Junior College</option>
                    <option value="School">School Wing</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Feature Image (Uploaded to R2) *</label>
                  <input type="file" name="image" accept="image/*" required class="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-navy-900 file:text-white hover:file:bg-navy-800">
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Content / Description *</label>
                  <textarea name="content" rows="4" required placeholder="Detailed description of news..." class="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"></textarea>
                </div>

                <button type="submit" id="news-submit-btn" class="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition flex justify-center items-center gap-2">
                  <span>Publish Announcement</span>
                  <i class="fa-solid fa-upload"></i>
                </button>
              </form>
              <div id="news-status" class="hidden text-xs font-semibold p-2.5 rounded-lg text-center"></div>
            </div>

            <!-- Published Articles List -->
            <div class="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 class="font-bold text-navy-900 text-base border-b border-slate-100 pb-3 mb-4"><i class="fa-solid fa-list-check text-amber-500 mr-2"></i> Published News Feed</h3>
              
              <div id="news-list" class="space-y-3">
                <div class="text-center py-6 text-slate-400 text-xs">Loading articles...</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <script>
      let allInquiries = [];

      function switchTab(tab) {
        document.getElementById('tab-inquiries').classList.add('hidden');
        document.getElementById('tab-news').classList.add('hidden');
        document.getElementById('nav-inquiries').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition";
        document.getElementById('nav-news').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition";

        if (tab === 'inquiries') {
          document.getElementById('tab-inquiries').classList.remove('hidden');
          document.getElementById('nav-inquiries').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-navy-800 text-amber-400 font-bold transition";
          loadInquiries();
        } else {
          document.getElementById('tab-news').classList.remove('hidden');
          document.getElementById('nav-news').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-navy-800 text-amber-400 font-bold transition";
          loadAdminNews();
        }
      }

      async function logout() {
        await fetch('/api/admin/logout', { method: 'POST' });
        window.location.reload();
      }

      async function loadInquiries() {
        try {
          const res = await fetch('/api/admin/inquiries');
          const data = await res.json();
          allInquiries = data.inquiries || [];
          renderInquiriesTable(allInquiries);
        } catch (e) {
          document.getElementById('inquiries-tbody').innerHTML = '<tr><td colspan="7" class="text-center py-4 text-red-500">Failed to load inquiries.</td></tr>';
        }
      }

      function filterInquiries() {
        const q = document.getElementById('inquiry-search').value.toLowerCase();
        const filtered = allInquiries.filter(i => 
          i.full_name.toLowerCase().includes(q) ||
          i.phone.toLowerCase().includes(q) ||
          i.wing.toLowerCase().includes(q) ||
          i.message.toLowerCase().includes(q)
        );
        renderInquiriesTable(filtered);
      }

      function renderInquiriesTable(list) {
        const tbody = document.getElementById('inquiries-tbody');
        document.getElementById('inquiry-count').textContent = 'Total: ' + list.length + ' inquiry(ies)';

        if (list.length === 0) {
          tbody.innerHTML = '<tr><td colspan="7" class="text-center py-6 text-slate-400">No matching inquiries found.</td></tr>';
          return;
        }

        tbody.innerHTML = list.map(item => `
          <tr class="hover:bg-slate-50 transition">
            <td class="py-3 px-4 font-medium">${new Date(item.created_at).toLocaleDateString()}</td>
            <td class="py-3 px-4 font-bold text-navy-900">${item.full_name}</td>
            <td class="py-3 px-4 font-mono">${item.phone}</td>
            <td class="py-3 px-4 text-slate-500">${item.email || 'N/A'}</td>
            <td class="py-3 px-4"><span class="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold text-[10px]">${item.wing}</span></td>
            <td class="py-3 px-4 text-slate-600 max-w-xs truncate" title="${item.message}">${item.message}</td>
            <td class="py-3 px-4"><span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold text-[10px] uppercase">${item.status}</span></td>
          </tr>
        `).join('');
      }

      // Load News in Admin Panel
      async function loadAdminNews() {
        const listDiv = document.getElementById('news-list');
        try {
          const res = await fetch('/api/news');
          const data = await res.json();
          const news = data.news || [];

          if (news.length === 0) {
            listDiv.innerHTML = '<div class="text-center py-6 text-slate-400 text-xs">No active news articles published yet.</div>';
            return;
          }

          listDiv.innerHTML = news.map(item => `
            <div class="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition">
              <div class="flex items-center gap-3">
                <img src="${item.image_url}" class="w-12 h-12 rounded-lg object-cover bg-slate-200 shrink-0" onerror="this.src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&auto=format&fit=crop'">
                <div>
                  <h4 class="font-bold text-xs text-navy-900">${item.title}</h4>
                  <div class="text-[10px] text-slate-400 mt-0.5">Category: ${item.category} | ${new Date(item.published_date).toLocaleDateString()}</div>
                </div>
              </div>
              <button onclick="deleteNews(${item.id})" class="text-red-500 hover:text-red-700 p-2 text-xs" title="Delete News">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          `).join('');
        } catch (e) {
          listDiv.innerHTML = '<div class="text-center py-4 text-red-500 text-xs">Failed to load news list.</div>';
        }
      }

      // Handle News Form Submission
      document.getElementById('news-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('news-submit-btn');
        const status = document.getElementById('news-status');
        const formData = new FormData(e.target);

        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uploading image to R2...';
        status.classList.add('hidden');

        try {
          const res = await fetch('/api/admin/news', {
            method: 'POST',
            body: formData
          });
          const result = await res.json();

          if (res.ok) {
            status.className = 'text-xs font-semibold p-2.5 rounded-lg text-center bg-emerald-100 text-emerald-800';
            status.textContent = 'Article & Image uploaded successfully!';
            e.target.reset();
            loadAdminNews();
          } else {
            status.className = 'text-xs font-semibold p-2.5 rounded-lg text-center bg-red-100 text-red-800';
            status.textContent = result.error || 'Failed to publish news';
          }
          status.classList.remove('hidden');
        } catch (err) {
          status.className = 'text-xs font-semibold p-2.5 rounded-lg text-center bg-red-100 text-red-800';
          status.textContent = 'Upload failed. Check your file & network.';
          status.classList.remove('hidden');
        } finally {
          btn.disabled = false;
          btn.innerHTML = '<span>Publish Announcement</span> <i class="fa-solid fa-upload"></i>';
        }
      });

      async function deleteNews(id) {
        if (!confirm('Are you sure you want to delete this news article?')) return;
        try {
          const res = await fetch('/api/admin/news/' + id, { method: 'DELETE' });
          if (res.ok) {
            loadAdminNews();
          } else {
            alert('Failed to delete news article.');
          }
        } catch (e) {
          alert('Network error while deleting.');
        }
      }

      loadInquiries();
    </script>
`}
</body>
</html>`;
}
