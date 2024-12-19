export default function EnergyBackground() {
  return (
    <div className="absolute inset-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 animate-gradient"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
      
      {/* Energy particles */}
      <div className="absolute inset-0">
        <div className="absolute h-2 w-2 bg-accent/30 rounded-full top-1/4 left-1/4 animate-float-slow"></div>
        <div className="absolute h-3 w-3 bg-primary/30 rounded-full top-1/3 right-1/3 animate-float-medium"></div>
        <div className="absolute h-2 w-2 bg-secondary/30 rounded-full bottom-1/4 right-1/4 animate-float-fast"></div>
        <div className="absolute h-4 w-4 bg-accent/20 rounded-full bottom-1/3 left-1/3 animate-pulse-slow"></div>
      </div>
    </div>
  );
} 