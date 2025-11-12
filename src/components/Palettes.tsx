import { monochromePalette } from "../data/data";

const Palettes = () => {
  return (
    <section class="space-y-6">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
          Palette
        </p>
        <h3 class="text-2xl font-bold">Monochrome support cast</h3>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {monochromePalette.map((tone) => (
          <div
            class="rounded-3xl border border-white/10 p-4 text-center"
            style={{ background: tone.value }}
          >
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              {tone.label}
            </p>
            <p class="mt-3 text-lg font-bold">{tone.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Palettes;
