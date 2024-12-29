export function ConnectingLine() {
  return (
    <div className="absolute top-[6.5rem] left-0 w-full h-px hidden md:block">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse-slow" />
    </div>
  );
}