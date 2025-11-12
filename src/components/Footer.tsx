const Footer = () => {
  return (
    <footer class="flex flex-col gap-4 border-t border-white/5 pt-8 text-sm font-semibold text-white/50 sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} IPTV_APP. Engineered on TanStack + Solid.
      </p>
      <div class="flex gap-4 text-xs uppercase tracking-[0.3em]">
        <button class="text-white/60 hover:text-white">Status</button>
        <button class="text-white/60 hover:text-white">Support</button>
        <button class="text-white/60 hover:text-white">Download apps</button>
      </div>
    </footer>
  );
};
export default Footer;
