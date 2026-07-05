import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Package, 
  FileText, 
  Mail, 
  LogOut,
  Sparkles,
  MessageCircle,
  FolderClosed
} from "lucide-react";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const isLoggedIn = session === "session_token_value_ok";

  // Let's get the pathname safely or let page handles redirect.
  // Actually, we can check if logged in inside the layout.
  // But wait, the login page itself is inside /admin/login. We shouldn't redirect to /admin/login if we are already there!
  // To solve this, pages themselves or client-side check can handle specific redirects.
  // Let's render a clean, premium dashboard layout for logged-in users, or just return children if it's the login page.
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row font-sans">
      {isLoggedIn && (
        <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 shrink-0">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-white">
              <Sparkles className="w-5 h-5 text-red-600" />
              <span>Ecare Admin</span>
            </Link>
          </div>
          
          <nav className="p-4 space-y-1">
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all">
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              Dashboard
            </Link>
            <Link href="/admin/blogs" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all">
              <BookOpen className="w-4 h-4 shrink-0" />
              Blogs
            </Link>
            <Link href="/admin/team" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all">
              <Users className="w-4 h-4 shrink-0" />
              Team
            </Link>
            <Link href="/admin/testimonials" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all">
              <MessageSquare className="w-4 h-4 shrink-0" />
              Testimonials
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all">
              <Package className="w-4 h-4 shrink-0" />
              Products
            </Link>
            <Link href="/admin/pages" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all">
              <FileText className="w-4 h-4 shrink-0" />
              Pages & Policies
            </Link>
            <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all">
              <FolderClosed className="w-4 h-4 shrink-0" />
              Categories
            </Link>
            <Link href="/admin/comments" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all">
              <MessageCircle className="w-4 h-4 shrink-0" />
              Comments
            </Link>
            <Link href="/admin/chats" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all">
              <MessageSquare className="w-4 h-4 shrink-0" />
              Live Chats
            </Link>
            <Link href="/admin/contacts" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all">
              <Mail className="w-4 h-4 shrink-0" />
              Contacts Inbox
            </Link>
            
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 transition-all cursor-pointer text-left">
                  <LogOut className="w-4 h-4 shrink-0" />
                  Logout
                </button>
              </form>
            </div>
          </nav>
        </aside>
      )}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
