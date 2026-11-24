import Stripes from './Stripes';

/* An office floor plan drawn in SVG: every job starts with a site visit and measurements,
   so the hero shows the plan the work is based on. Numbered markers match the key below it.
   No stock photos to download, so the page stays fast. Real project photos live in the Gallery. */

const KEY = [
  'Workstations & carpentry',
  'Glass cabins & partitions',
  'Chair repair & supply',
  'Sofa repair & supply',
  'Carpet cleaning & fixing',
  'Blinds & curtains',
];

const slats = (x1, x2, y1 = 57, y2 = 73, step = 10) => {
  let d = '';
  for (let x = x1 + 8; x <= x2 - 6; x += step) d += `M${x} ${y1}V${y2}`;
  return d;
};

function Marker({ n, x, y, i }) {
  return (
    <g className="mk" style={{ animationDelay: `${1.1 + i * 0.12}s` }}>
      <circle cx={x} cy={y} r="12.5" fill="#E5303B" stroke="#0B2A63" strokeWidth="3" />
      <text x={x} y={y} dy=".36em" textAnchor="middle" fill="#fff" fontSize="13.5" fontWeight="800" fontFamily="inherit">{n}</text>
    </g>
  );
}

export default function HeroArt() {
  return (
    <figure className="hero-art">
      <svg className="plan" viewBox="0 24 560 396" role="img" aria-label="Floor plan of an office showing workstations, a glass cabin, sofa, carpet and blinds">
        <defs>
          <pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="9" stroke="#7F9BD0" strokeWidth="1.1" />
          </pattern>
        </defs>

        <g fill="none" stroke="#DCE6FA" strokeLinejoin="round" strokeLinecap="square">
          {/* walls, with gaps for two windows and the door */}
          <path d="M36 48V400M524 48V400M36 400H90M150 400H524M36 48H84M244 48H300M440 48H524" strokeWidth="4.5" />
          {/* door swing */}
          <path d="M90 400V340M90 340A60 60 0 0 1 150 400" stroke="#7F9BD0" strokeWidth="1.4" />
          {/* window glazing and blinds */}
          <path d="M84 45H244M84 51H244M300 45H440M300 51H440" stroke="#9DB6E6" strokeWidth="1.4" />
          <path d={slats(84, 244)} stroke="#7F9BD0" strokeWidth="1.3" />
          <path d={slats(300, 440)} stroke="#7F9BD0" strokeWidth="1.3" />

          {/* carpet */}
          <rect x="176" y="268" width="206" height="118" fill="url(#hatch)" stroke="#7F9BD0" strokeWidth="1.3" strokeDasharray="5 4" />

          {/* workstation pod: two rows of three desks, back to back */}
          {[60, 130, 200].map((x) => (
            <g key={x}>
              <rect x={x} y="92" width="62" height="32" rx="2" strokeWidth="1.6" />
              <rect x={x + 17} y="96" width="28" height="5" fill="#7F9BD0" stroke="none" />
              <rect x={x} y="204" width="62" height="32" rx="2" strokeWidth="1.6" />
              <rect x={x + 17} y="227" width="28" height="5" fill="#7F9BD0" stroke="none" />
              <circle cx={x + 31} cy="146" r="11" fill={x === 60 ? '#E5303B' : 'none'} stroke={x === 60 ? '#E5303B' : '#DCE6FA'} strokeWidth="1.6" />
              <circle cx={x + 31} cy="182" r="11" strokeWidth="1.6" />
            </g>
          ))}

          {/* storage cabinet on the left wall */}
          <rect x="40" y="262" width="24" height="70" strokeWidth="1.6" />
          <path d="M40 297H64" stroke="#7F9BD0" strokeWidth="1.2" />

          {/* glass cabin (double line = glazing) */}
          <rect x="330" y="96" width="170" height="122" stroke="#9DB6E6" strokeWidth="1.6" />
          <rect x="334.5" y="100.5" width="161" height="113" stroke="#9DB6E6" strokeWidth="0.8" />
          <rect x="350" y="150" width="84" height="28" rx="2" strokeWidth="1.5" />
          <rect x="381" y="154" width="24" height="5" fill="#7F9BD0" stroke="none" />
          <circle cx="392" cy="196" r="10" strokeWidth="1.5" />
          <circle cx="372" cy="126" r="8" strokeWidth="1.5" />
          <circle cx="412" cy="126" r="8" strokeWidth="1.5" />
          <circle cx="468" cy="136" r="14" stroke="#7F9BD0" strokeWidth="1.4" />

          {/* reception sofa and coffee table */}
          <rect x="426" y="292" width="62" height="24" rx="3" stroke="#7F9BD0" strokeWidth="1.4" />
          <rect x="406" y="336" width="14" height="52" rx="5" strokeWidth="1.6" />
          <rect x="494" y="336" width="14" height="52" rx="5" strokeWidth="1.6" />
          <rect x="420" y="336" width="74" height="36" rx="3" strokeWidth="1.6" />
          <rect x="420" y="372" width="74" height="16" rx="4" strokeWidth="1.6" />
          <path d="M444.7 336V372M469.3 336V372" stroke="#7F9BD0" strokeWidth="1.2" />
        </g>

        <Marker n={1} x={282} y={108} i={0} />
        <Marker n={2} x={500} y={100} i={1} />
        <Marker n={3} x={66} y={170} i={2} />
        <Marker n={4} x={457} y={336} i={3} />
        <Marker n={5} x={194} y={286} i={4} />
        <Marker n={6} x={370} y={66} i={5} />
      </svg>

      <ol className="plan-key">
        {KEY.map((k, i) => (
          <li key={k}><b>{i + 1}</b>{k}</li>
        ))}
      </ol>
      <Stripes className="plan-stripes" width={72} />
    </figure>
  );
}
