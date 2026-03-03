export function BackgroundOrbs() {
  return (
    <>
      {/* Floating Orbs */}
      <div
        className="floating-orb w-[500px] h-[500px] bg-blue-500/30"
        style={{ top: '10%', left: '10%', animationDelay: '0s' }}
      />
      <div
        className="floating-orb w-[400px] h-[400px] bg-purple-500/30"
        style={{ top: '60%', right: '10%', animationDelay: '-5s' }}
      />
      <div
        className="floating-orb w-[300px] h-[300px] bg-pink-500/30"
        style={{ bottom: '10%', left: '30%', animationDelay: '-10s' }}
      />
      <div
        className="floating-orb w-[350px] h-[350px] bg-cyan-500/20"
        style={{ top: '30%', right: '30%', animationDelay: '-15s' }}
      />
    </>
  );
}
