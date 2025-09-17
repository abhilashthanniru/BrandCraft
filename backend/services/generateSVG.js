const industryColors = {
  tech: { gradient: ["#0f2027", "#203a43", "#2c5364"], text: "#ffffff" },
  finance: { gradient: ["#283c86", "#45a247"], text: "#ffffff" },
  health: { gradient: ["#00bf8f", "#001510"], text: "#ffffff" },
  education: { gradient: ["#c31432", "#240b36"], text: "#ffffff" },
  fashion: { gradient: ["#e96443", "#904e95"], text: "#ffffff" },
  travel: { gradient: ["#4568dc", "#b06ab3"], text: "#ffffff" },
  food: { gradient: ["#f7971e", "#ffd200"], text: "#000000" },
  sports: { gradient: ["#1f4037", "#99f2c8"], text: "#ffffff" },
  default: { gradient: ["#bdc3c7", "#2c3e50"], text: "#ffffff" },
};

const styleFonts = {
  modern: "Poppins, sans-serif",
  classic: "Georgia, serif",
  minimal: "Helvetica Neue, sans-serif",
  bold: "Impact, sans-serif",
  elegant: "'Playfair Display', serif",
  playful: "'Comic Sans MS', cursive",
  default: "Arial, sans-serif",
};

function applyStyleToColor(base, style) {
  const s = style?.toLowerCase();
  let gradient = [...base.gradient];
  let text = base.text;

  switch (s) {
    case "elegant":
      gradient = ["#8360c3", "#2ebf91"];
      break;
    case "playful":
      gradient = ["#f857a6", "#ff5858"];
      text = "#ffffff";
      break;
    case "minimal":
      gradient = ["#f0f0f0", "#ffffff"];
      text = "#222";
      break;
    case "bold":
      gradient = ["#000000", "#ff512f"];
      text = "#ffffff";
      break;
    case "classic":
      gradient = ["#f7971e", "#ffd200"];
      text = "#000000";
      break;
  }

  return { gradient, text };
}

function generateGradient(gradientColors) {
  return `
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        ${gradientColors
          .map(
            (color, i) =>
              `<stop offset="${
                (i / (gradientColors.length - 1)) * 100
              }%" stop-color="${color}" />`
          )
          .join("\n")}
      </linearGradient>
    </defs>
  `;
}

function getIndustrySymbol(industry) {
  switch (industry.toLowerCase()) {
    case "tech":
      return `<path d="M4 4h16v16H4z M9 9h6v6H9z" fill="none" stroke="#fff" stroke-width="2"/>`;
    case "finance":
      return `<path d="M12 8v8M8 12h8" stroke="#fff" stroke-width="2" fill="none"/>`;
    case "health":
      return `<path d="M20 12h-4l-3 9L9 3l-3 9H2" stroke="#fff" stroke-width="2" fill="none"/>`;
    case "education":
      return `<path d="M22 12l-10 6L2 12l10-6 10 6z M2 12v6l10 6 10-6v-6" stroke="#fff" stroke-width="2" fill="none"/>`;
    case "fashion":
      return `<path d="M12 2v4m0 0l3 9h-6l3-9z" stroke="#fff" stroke-width="2" fill="none"/>`;
    case "travel":
      return `<path d="M2.5 19.5L21 12 2.5 4.5 6 12z" stroke="#fff" stroke-width="2" fill="none"/>`;
    case "food":
      return `<path d="M4 3h2v7H4zM8 3h2v7H8zM12 8h2v2h-2zM16 3h2v7h-2z" stroke="#000" stroke-width="2" fill="none"/>`;
    case "sports":
      return `<circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="2" fill="none"/>`;
    default:
      return `<circle cx="12" cy="12" r="8" stroke="#fff" stroke-width="2" fill="none"/>`;
  }
}

function generateSVG({ companyName, industry, style }) {
  const base =
    industryColors[industry?.toLowerCase()] || industryColors.default;
  const colorSet = applyStyleToColor(base, style);
  const font = styleFonts[style?.toLowerCase()] || styleFonts.default;

  const width = 600;
  const height = 200;
  const gradientDef = generateGradient(colorSet.gradient);
  const icon = getIndustrySymbol(industry);

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${gradientDef}
      <rect width="100%" height="100%" fill="url(#grad1)" rx="20"/>
      
      <!-- Icon (scaled larger) -->
      <g transform="translate(70, 60) scale(4)">
        ${icon}
      </g>

      <!-- Text -->
      <text x="180" y="115" fill="${colorSet.text}" font-size="42" font-family="${font}" font-weight="bold">
        ${companyName}
      </text>
    </svg>
  `;
}

module.exports = generateSVG;
