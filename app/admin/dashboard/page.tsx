"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Inbox, Newspaper, FileSpreadsheet, LogOut, Search, 
  PlusCircle, ListCheck, Upload, Trash2, Loader2 
} from "lucide-react";

interface Inquiry {
  id: number;
  full_name: string;
  phone: string;
  email?: string;
  wing: string;
  message: string;
  status: string;
  created_at: string;
}

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  image_url?: string;
  published_date: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"inquiries" | "news">("inquiries");

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // News State
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsCategory, setNewsCategory] = useState("Campus");
  const [newsContent, setNewsContent] = useState("");
  const [newsImageFile, setNewsImageFile] = useState<File | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<{ text: string; success: boolean } | null>(null);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch (e) {
      console.error(e);
    } finally {
      setInquiriesLoading(false);
    }
  };

  const loadNews = async () => {
    setNewsLoading(true);
    try {
      const res = await fetch("/api/news");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setNewsList(data.news || []);
    } catch (e) {
      console.error(e);
    } finally {
      setNewsLoading(false);
    }
  };

  const handleTabSwitch = (tab: "inquiries" | "news") => {
    setActiveTab(tab);
    if (tab === "news") {
      loadNews();
    } else {
      loadInquiries();
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handlePublishNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishing(true);
    setPublishStatus(null);

    try {
      const formData = new FormData();
      formData.append("title", newsTitle);
      formData.append("category", newsCategory);
      formData.append("content", newsContent);
      if (newsImageFile) {
        formData.append("image", newsImageFile);
      }

      const res = await fetch("/api/admin/news", {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      if (res.ok) {
        setPublishStatus({
          text: "Article & Image uploaded directly to R2 bucket!",
          success: true
        });
        setNewsTitle("");
        setNewsContent("");
        setNewsImageFile(null);
        loadNews();
      } else {
        setPublishStatus({
          text: data.error || "Failed to publish article",
          success: false
        });
      }
    } catch (err) {
      setPublishStatus({
        text: "Error uploading news article",
        success: false
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleDeleteNews = async (id: number) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadNews();
      } else {
        alert("Failed to delete news article.");
      }
    } catch (e) {
      alert("Error deleting news article.");
    }
  };

  const filteredInquiries = inquiries.filter(i => 
    i.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.wing.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-navy-950 text-white flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-navy-900 font-black text-xl flex items-center justify-center">J</div>
            <div>
              <h2 className="font-bold text-sm leading-none">JIJAU CAMPUS</h2>
              <span className="text-[10px] text-amber-400 font-semibold tracking-widest uppercase">Admin Dashboard</span>
            </div>
          </div>

          <nav className="p-4 space-y-1.5 text-sm font-medium">
            <button 
              onClick={() => handleTabSwitch("inquiries")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === "inquiries" ? "bg-navy-800 text-amber-400 font-bold" : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Contact Inquiries</span>
            </button>
            <button 
              onClick={() => handleTabSwitch("news")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === "news" ? "bg-navy-800 text-amber-400 font-bold" : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>News Publisher</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span className="text-xs font-bold text-slate-200">Administrator</span>
            </div>
            <button onClick={handleLogout} title="Logout" className="text-slate-400 hover:text-red-400 transition p-2">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        
        {/* Tab 1: Contact Inquiries */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-navy-900">Admission & Contact Inquiries</h1>
                <p className="text-xs text-slate-500 mt-1">Manage leads and inquiries received via the public campus portal.</p>
              </div>
              
              <div className="flex items-center gap-3">
                <a 
                  href="/api/admin/inquiries/export-csv" 
                  download 
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export to CSV</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="relative w-72">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, phone, or wing..." 
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Total: {filteredInquiries.length} inquiry(ies)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] tracking-wider font-bold">
                    <tr>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Full Name</th>
                      <th className="py-3.5 px-4">Phone</th>
                      <th className="py-3.5 px-4">Email</th>
                      <th className="py-3.5 px-4">Wing</th>
                      <th className="py-3.5 px-4">Message</th>
                      <th className="py-3.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inquiriesLoading ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-400">
                          <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-navy-900" /> Loading inquiries...
                        </td>
                      </tr>
                    ) : filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-6 text-slate-400">No matching inquiries found.</td>
                      </tr>
                    ) : (
                      filteredInquiries.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-4 font-medium">{new Date(item.created_at).toLocaleDateString()}</td>
                          <td className="py-3 px-4 font-bold text-navy-900">{item.full_name}</td>
                          <td className="py-3 px-4 font-mono">{item.phone}</td>
                          <td className="py-3 px-4 text-slate-500">{item.email || "N/A"}</td>
                          <td className="py-3 px-4"><span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold text-[10px]">{item.wing}</span></td>
                          <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={item.message}>{item.message}</td>
                          <td className="py-3 px-4"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold text-[10px] uppercase">{item.status}</span></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: News Publisher */}
        {activeTab === "news" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-navy-900">News & Updates Publisher</h1>
              <p className="text-xs text-slate-500 mt-1">Publish announcements and store feature images directly to Cloudflare R2 object storage.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Create Form */}
              <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
                <h3 className="font-bold text-navy-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-emerald-500" /> Create New Article
                </h3>

                <form onSubmit={handlePublishNews} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Article Title *</label>
                    <input 
                      type="text" 
                      required 
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      placeholder="Admissions open..." 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Category *</label>
                    <select 
                      value={newsCategory}
                      onChange={(e) => setNewsCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none bg-white"
                    >
                      <option value="Campus">Campus Wide</option>
                      <option value="Jijau ITI">Jijau ITI</option>
                      <option value="Junior College">Junior College</option>
                      <option value="School">School Wing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Feature Image (Uploaded to R2) *</label>
                    <input 
                      type="file" 
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => setNewsImageFile(e.target.files?.[0] || null)}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-navy-900 file:text-white hover:file:bg-navy-800" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Content / Description *</label>
                    <textarea 
                      rows={4} 
                      required 
                      value={newsContent}
                      onChange={(e) => setNewsContent(e.target.value)}
                      placeholder="Detailed description of news..." 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={publishing}
                    className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition flex justify-center items-center gap-2 disabled:opacity-50"
                  >
                    {publishing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Uploading to R2...
                      </>
                    ) : (
                      <>
                        <span>Publish Announcement</span>
                        <Upload className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {publishStatus && (
                  <div className={`text-xs font-semibold p-2.5 rounded-lg text-center ${
                    publishStatus.success ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                  }`}>
                    {publishStatus.text}
                  </div>
                )}
              </div>

              {/* Published Feed */}
              <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-navy-900 text-base border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                  <ListCheck className="w-5 h-5 text-amber-500" /> Published News Feed
                </h3>
                
                <div className="space-y-3">
                  {newsLoading ? (
                    <div className="text-center py-6 text-slate-400 text-xs">Loading articles...</div>
                  ) : newsList.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 text-xs">No news articles published yet.</div>
                  ) : (
                    newsList.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.image_url || "/api/images/default-news.jpg"} 
                            alt={item.title}
                            className="w-12 h-12 rounded-lg object-cover bg-slate-200 shrink-0" 
                            onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&auto=format&fit=crop"; }}
                          />
                          <div>
                            <h4 className="font-bold text-xs text-navy-900">{item.title}</h4>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              Category: {item.category} | {new Date(item.published_date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteNews(item.id)} 
                          className="text-red-500 hover:text-red-700 p-2 text-xs" 
                          title="Delete News"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
