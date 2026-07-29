export function Footer() {
  return (
    <footer className="border-t border-[#f0f2f7] dark:border-[#0a2d6b] bg-white dark:bg-[#001f5b] px-6 py-4 text-xs text-[#5a6478] dark:text-[#a0aec0]">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p>© {new Date().getFullYear()} DMS Enterprise ERP. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-[#00BFFF]">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#00BFFF]">
            System Status
          </a>
          <span className="font-semibold text-[#001F5B] dark:text-white">
            v3.1.0-PROD
          </span>
        </div>
      </div>
    </footer>
  );
}