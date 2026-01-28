"use client";

export default function NoiseOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay overflow-hidden">
      <div className="absolute inset-[-200%] w-[400%] h-[400%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-noise" />
    </div>
  );
}
