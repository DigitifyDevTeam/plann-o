const SelectionReservationIllustration = () => (
  <svg
    className="w-full h-auto lg:h-[400px]"
    viewBox="0 0 800 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="title desc"
  >
    <title id="title">Illustration Sélection et Réservation</title>
    <desc id="desc">
      Agenda stylisé et coche de validation représentant la sélection et la confirmation d’un créneau.
    </desc>
    <defs>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5EE0C1" />
        <stop offset="100%" stopColor="#37C9A1" />
      </linearGradient>
    </defs>
    {/* Agenda centré et agrandi */}
    <g transform="translate(150 30) scale(1.4)">
      {/* Ombre */}
      <rect x="8" y="12" width="350" height="210" rx="24" fill="#000" opacity="0.05" />
      {/* Carte */}
      <rect width="350" height="210" rx="24" fill="#FFFFFF" stroke="url(#accent)" strokeWidth="3" />
      {/* Barre supérieure */}
      <rect width="350" height="48" rx="24 24 0 0" fill="url(#accent)" />
      {/* Pastilles de jours (4×3) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 30 + col * 75;
        const y = 70 + row * 42;
        const isPicked = i === 6;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="45"
            height="28"
            rx="8"
            fill={isPicked ? 'url(#accent)' : '#F5F5F5'}
          />
        );
      })}
      {/* Coche sur créneau sélectionné */}
      <path
        d="M210 110 l12 12 24 -24"
        stroke="url(#accent)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default SelectionReservationIllustration; 