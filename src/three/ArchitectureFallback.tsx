export function ArchitectureFallback() {
  return (
    <div className="architecture-fallback" aria-hidden="true">
      <span className="architecture-fallback__orbit architecture-fallback__orbit--one" />
      <span className="architecture-fallback__orbit architecture-fallback__orbit--two" />
      <span className="architecture-fallback__orbit architecture-fallback__orbit--three" />
      <span className="architecture-fallback__core" />
      {Array.from({ length: 8 }, (_, index) => (
        <span key={index} className={`architecture-fallback__node architecture-fallback__node--${index + 1}`} />
      ))}
    </div>
  );
}
