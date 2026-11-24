/** The three slanted bars from the "E" in the logo, used as a recurring brand mark. */
export default function Stripes({ className = '', width = 96 }) {
  return (
    <svg className={className} width={width} viewBox="0 0 96 30" aria-hidden="true" focusable="false">
      <path d="M8 0H96L90 8H2Z" fill="currentColor" />
      <path d="M4 11H86L81 19H-1Z" fill="currentColor" />
      <path d="M0 22H80L75 30H-5Z" fill="currentColor" />
    </svg>
  );
}
