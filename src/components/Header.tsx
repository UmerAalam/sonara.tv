const Header = () => {
  return (
    <header class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div class="space-y-2">
        <p class="text-xs font-semibold uppercase tracking-[0.6em] text-[#ccff33]">
          SONARA
        </p>
        <h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Fluid streaming for bold screens
        </h1>
        <p class="max-w-2xl text-sm font-medium text-white/70">
          Live television, on-demand archives, and monochrome aesthetics
          engineered for viewers who want a premium IPTV experience across every
          device.
        </p>
      </div>
      <div class="flex gap-3">
        <button class="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white hover:text-white/80">
          Schedule
        </button>
        <button class="rounded-full bg-[#ccff33] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#111] transition hover:bg-[#dfff4d]">
          Start free preview
        </button>
      </div>
    </header>
  );
};
export default Header;
