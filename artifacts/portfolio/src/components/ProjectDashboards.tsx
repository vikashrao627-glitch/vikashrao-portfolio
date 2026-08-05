/**
 * Unique SVG dashboard previews — 5 projects × 4 slides = 20 distinct visuals.
 * Every dashboard is rendered entirely in SVG; no images required.
 * When real screenshots are available, swap the DashboardPreview call with <img>.
 */

const BG = "#0D1526";
const GRID = "rgba(255,255,255,0.04)";

// ─── Shared primitives ────────────────────────────────────────────────────────

function DashBg({ w = 800, h = 450 }: { w?: number; h?: number }) {
  return (
    <>
      <rect width={w} height={h} fill={BG} />
      {/* horizontal grid lines */}
      {[90, 150, 210, 270, 330, 390].map((y) => (
        <line key={y} x1={0} y1={y} x2={w} y2={y} stroke={GRID} strokeWidth={1} />
      ))}
    </>
  );
}

function KpiCard({
  x, y, w = 160, h = 72, label, value, sub, color, delta,
}: {
  x: number; y: number; w?: number; h?: number;
  label: string; value: string; sub?: string; color: string; delta?: string;
}) {
  const pos = delta?.startsWith("+");
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.7} />
      <rect x={x} y={y} width={3} height={h} rx={1.5} fill={color} />
      <text x={x + 14} y={y + 20} fill="rgba(255,255,255,0.45)" fontSize={9.5} fontFamily="sans-serif">{label}</text>
      <text x={x + 14} y={y + 44} fill="white" fontSize={22} fontWeight="700" fontFamily="sans-serif">{value}</text>
      {sub && <text x={x + 14} y={y + 60} fill="rgba(255,255,255,0.35)" fontSize={9} fontFamily="sans-serif">{sub}</text>}
      {delta && (
        <text x={x + w - 40} y={y + 44} fill={pos ? "#10B981" : "#EF4444"} fontSize={10} fontFamily="sans-serif" textAnchor="middle">
          {delta}
        </text>
      )}
    </g>
  );
}

function VBar({
  x, y, w, h, color, label, value, opacity = 1,
}: {
  x: number; y: number; w: number; h: number; color: string; label?: string; value?: string; opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={color} />
      {label && <text x={x + w / 2} y={y + h + 14} fill="rgba(255,255,255,0.4)" fontSize={8.5} fontFamily="sans-serif" textAnchor="middle">{label}</text>}
      {value && <text x={x + w / 2} y={y - 5} fill="rgba(255,255,255,0.7)" fontSize={9} fontFamily="sans-serif" textAnchor="middle">{value}</text>}
    </g>
  );
}

function HBar({
  x, y, totalW, pct, color, label, value,
}: {
  x: number; y: number; totalW: number; pct: number; color: string; label: string; value: string;
}) {
  return (
    <g>
      <text x={x} y={y + 10} fill="rgba(255,255,255,0.55)" fontSize={9.5} fontFamily="sans-serif">{label}</text>
      <rect x={x} y={y + 16} width={totalW} height={7} rx={3.5} fill="rgba(255,255,255,0.06)" />
      <rect x={x} y={y + 16} width={totalW * pct} height={7} rx={3.5} fill={color} />
      <text x={x + totalW + 6} y={y + 23} fill="rgba(255,255,255,0.6)" fontSize={9} fontFamily="sans-serif">{value}</text>
    </g>
  );
}

function LineArea({
  pts, fill, stroke, w, h, ox, oy,
}: {
  pts: number[]; fill: string; stroke: string; w: number; h: number; ox: number; oy: number;
}) {
  const n = pts.length;
  const step = w / (n - 1);
  const coords = pts.map((v, i) => `${ox + i * step},${oy + h - v * h}`);
  const path = `M ${coords.join(" L ")}`;
  const area = `M ${ox},${oy + h} L ${coords.join(" L ")} L ${ox + (n - 1) * step},${oy + h} Z`;
  return (
    <g>
      <path d={area} fill={fill} />
      <path d={path} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((v, i) => (
        <circle key={i} cx={ox + i * step} cy={oy + h - v * h} r={3} fill={stroke} />
      ))}
    </g>
  );
}

function DonutRing({
  cx, cy, r, slices, colors,
}: {
  cx: number; cy: number; r: number; slices: number[]; colors: string[];
}) {
  const total = slices.reduce((a, b) => a + b, 0);
  let angle = -Math.PI / 2;
  return (
    <g>
      {slices.map((s, i) => {
        const sweep = (s / total) * 2 * Math.PI;
        const x1 = cx + r * Math.cos(angle);
        const y1 = cy + r * Math.sin(angle);
        angle += sweep;
        const x2 = cx + r * Math.cos(angle);
        const y2 = cy + r * Math.sin(angle);
        const large = sweep > Math.PI ? 1 : 0;
        const inner = r * 0.55;
        const xi1 = cx + inner * Math.cos(angle - sweep);
        const yi1 = cy + inner * Math.sin(angle - sweep);
        const xi2 = cx + inner * Math.cos(angle);
        const yi2 = cy + inner * Math.sin(angle);
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${inner} ${inner} 0 ${large} 0 ${xi1} ${yi1} Z`}
            fill={colors[i % colors.length]}
            opacity={0.85}
          />
        );
      })}
    </g>
  );
}

function SectionLabel({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
  return (
    <text x={x} y={y} fill={color} fontSize={10} fontWeight="600" fontFamily="sans-serif" letterSpacing="1" opacity={0.8}>
      {text.toUpperCase()}
    </text>
  );
}

// ─── P1: Amazon Sales Analysis ────────────────────────────────────────────────

export function P1S1() {
  // Sales Overview: KPI row + category bar chart + channel donut
  const bars = [
    { label: "Electronics", v: 0.82, val: "$2.1M" },
    { label: "Fashion", v: 0.61, val: "$1.5M" },
    { label: "Home", v: 0.49, val: "$1.2M" },
    { label: "Books", v: 0.35, val: "$0.9M" },
    { label: "Sports", v: 0.28, val: "$0.7M" },
    { label: "Beauty", v: 0.22, val: "$0.5M" },
  ];
  const bH = 170;
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Amazon Sales Dashboard</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">FY 2024 · All Regions · All Categories</text>
      {/* KPIs */}
      {[
        { label: "Total Revenue", value: "$6.9M", delta: "+18.4%", color: "#2563EB" },
        { label: "Total Orders", value: "84.2K", delta: "+12.1%", color: "#2563EB" },
        { label: "Avg Order Value", value: "$82", delta: "+5.3%", color: "#60A5FA" },
        { label: "Return Rate", value: "3.2%", delta: "-0.8%", color: "#60A5FA" },
      ].map((k, i) => (
        <KpiCard key={i} x={24 + i * 178} y={60} w={165} h={72} {...k} />
      ))}
      {/* Bar chart */}
      <SectionLabel x={24} y={162} text="Revenue by Category" color="#60A5FA" />
      {bars.map((b, i) => (
        <VBar
          key={i}
          x={24 + i * 84}
          y={170 + bH - b.v * bH}
          w={60}
          h={b.v * bH}
          color={`rgba(37,99,235,${0.55 + i * 0.04})`}
          label={b.label}
          value={b.val}
        />
      ))}
      {/* Axes */}
      <line x1={24} y1={340} x2={528} y2={340} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      {/* Donut */}
      <SectionLabel x={570} y={162} text="Channel Mix" color="#60A5FA" />
      <DonutRing cx={660} cy={280} r={80} slices={[42, 28, 18, 12]} colors={["#2563EB", "#60A5FA", "#93C5FD", "#DBEAFE"]} />
      {["Direct 42%", "Marketplace 28%", "Affiliate 18%", "Retail 12%"].map((l, i) => (
        <g key={i}>
          <rect x={570} y={348 + i * 18} width={8} height={8} rx={2} fill={["#2563EB", "#60A5FA", "#93C5FD", "#DBEAFE"][i]} />
          <text x={584} y={357 + i * 18} fill="rgba(255,255,255,0.5)" fontSize={9} fontFamily="sans-serif">{l}</text>
        </g>
      ))}
    </svg>
  );
}

export function P1S2() {
  // Revenue Trends: full-width area chart (monthly)
  const pts = [0.38, 0.42, 0.35, 0.51, 0.58, 0.54, 0.63, 0.72, 0.68, 0.81, 0.95, 0.88];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <defs>
        <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Monthly Revenue Trends</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Jan – Dec 2024 · YoY Growth +18.4%</text>
      <SectionLabel x={24} y={72} text="Revenue (USD)" color="#60A5FA" />
      {/* Y axis labels */}
      {["$1M", "$500K", "$0"].map((l, i) => (
        <text key={i} x={18} y={100 + i * 120} fill="rgba(255,255,255,0.3)" fontSize={8.5} fontFamily="sans-serif" textAnchor="end">{l}</text>
      ))}
      <LineArea pts={pts} fill="url(#ag1)" stroke="#2563EB" w={720} h={240} ox={30} oy={80} />
      {/* X labels */}
      {months.map((m, i) => (
        <text key={i} x={30 + i * (720 / 11)} y={338} fill="rgba(255,255,255,0.35)" fontSize={9} fontFamily="sans-serif" textAnchor="middle">{m}</text>
      ))}
      <line x1={30} y1={320} x2={750} y2={320} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      {/* Bottom metrics */}
      {[
        { label: "Peak Month", value: "November", color: "#2563EB" },
        { label: "Q4 Share", value: "41%", color: "#60A5FA" },
        { label: "YoY Growth", value: "+18.4%", color: "#10B981" },
      ].map((m, i) => (
        <g key={i}>
          <rect x={24 + i * 256} y={358} width={240} height={72} rx={8} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth={0.7} />
          <text x={40 + i * 256} y={384} fill="rgba(255,255,255,0.4)" fontSize={9.5} fontFamily="sans-serif">{m.label}</text>
          <text x={40 + i * 256} y={410} fill={m.color} fontSize={20} fontWeight="700" fontFamily="sans-serif">{m.value}</text>
        </g>
      ))}
    </svg>
  );
}

export function P1S3() {
  // Product Performance: ranked horizontal bars + scatter
  const products = [
    { name: "iPhone 15 Pro", pct: 0.92, rev: "$612K" },
    { name: "Samsung 65\" TV", pct: 0.78, rev: "$518K" },
    { name: "Nike Air Max", pct: 0.65, rev: "$431K" },
    { name: "Instant Pot", pct: 0.54, rev: "$358K" },
    { name: "Kindle Paperwhite", pct: 0.41, rev: "$272K" },
    { name: "Levi's 501 Jeans", pct: 0.33, rev: "$219K" },
    { name: "Coffee Maker", pct: 0.26, rev: "$173K" },
  ];
  const scatter = [
    [120, 82], [90, 140], [200, 60], [150, 110], [80, 170],
    [250, 45], [60, 200], [180, 75], [130, 125], [100, 155],
  ];
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Top Product Performance</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Revenue Ranking · FY 2024</text>
      <SectionLabel x={24} y={72} text="Top Products by Revenue" color="#60A5FA" />
      {products.map((p, i) => (
        <HBar key={i} x={24} y={82 + i * 46} totalW={350} pct={p.pct} color={`rgba(37,99,235,${0.9 - i * 0.07})`} label={p.name} value={p.rev} />
      ))}
      <SectionLabel x={430} y={72} text="Price vs Units Sold" color="#60A5FA" />
      {/* Scatter axes */}
      <line x1={430} y1={80} x2={430} y2={390} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      <line x1={430} y1={390} x2={770} y2={390} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      <text x={590} y={420} fill="rgba(255,255,255,0.3)" fontSize={8.5} fontFamily="sans-serif" textAnchor="middle">Avg. Price ($)</text>
      <text x={418} y={240} fill="rgba(255,255,255,0.3)" fontSize={8.5} fontFamily="sans-serif" textAnchor="middle" transform="rotate(-90,418,240)">Units Sold (K)</text>
      {scatter.map(([px, py], i) => (
        <circle
          key={i}
          cx={430 + px * 1.35}
          cy={390 - py * 1.5}
          r={7}
          fill="#2563EB"
          opacity={0.6}
        />
      ))}
    </svg>
  );
}

export function P1S4() {
  // Executive KPIs: 2×2 large metric tiles with sparklines
  const tiles = [
    { label: "Total Revenue", value: "$6.9M", change: "+18.4%", color: "#2563EB", spark: [0.4, 0.5, 0.45, 0.6, 0.7, 0.65, 0.88] },
    { label: "Customer LTV", value: "$312", change: "+9.2%", color: "#3B82F6", spark: [0.5, 0.48, 0.55, 0.62, 0.58, 0.7, 0.78] },
    { label: "Conversion Rate", value: "4.8%", change: "+1.1%", color: "#60A5FA", spark: [0.3, 0.38, 0.42, 0.4, 0.5, 0.46, 0.55] },
    { label: "Repeat Purchase", value: "62%", change: "+4.5%", color: "#93C5FD", spark: [0.55, 0.58, 0.6, 0.57, 0.65, 0.68, 0.72] },
  ];
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Executive KPI Dashboard</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Amazon Sales · Q4 2024 Performance Review</text>
      {tiles.map((t, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const tx = 24 + col * 390;
        const ty = 68 + row * 185;
        const sw = 150;
        const sh = 50;
        const sox = tx + 210;
        const soy = ty + 30;
        return (
          <g key={i}>
            <rect x={tx} y={ty} width={375} height={170} rx={12} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.7} />
            <rect x={tx} y={ty} width={4} height={170} rx={2} fill={t.color} />
            <text x={tx + 20} y={ty + 32} fill="rgba(255,255,255,0.45)" fontSize={11} fontFamily="sans-serif">{t.label}</text>
            <text x={tx + 20} y={ty + 90} fill="white" fontSize={44} fontWeight="800" fontFamily="sans-serif">{t.value}</text>
            <text x={tx + 20} y={ty + 120} fill="#10B981" fontSize={13} fontFamily="sans-serif">{t.change} vs last year</text>
            {/* Sparkline */}
            <LineArea pts={t.spark} fill={`${t.color}22`} stroke={t.color} w={sw} h={sh} ox={sox} oy={soy} />
          </g>
        );
      })}
    </svg>
  );
}

// ─── P2: IBM HR Analytics ────────────────────────────────────────────────────

export function P2S1() {
  // Attrition Overview: gauge + dept bars
  const depts = [
    { name: "Sales", v: 0.40, val: "40.0%" },
    { name: "HR", v: 0.29, val: "29.0%" },
    { name: "R&D", v: 0.19, val: "19.0%" },
    { name: "Finance", v: 0.15, val: "15.0%" },
    { name: "IT/Tech", v: 0.11, val: "11.0%" },
    { name: "Marketing", v: 0.09, val: "9.0%" },
  ];
  // Gauge arc (180-degree)
  const gaugePct = 0.161;
  const r = 90;
  const cx = 220, cy = 260;
  const startAngle = Math.PI;
  const endAngle = startAngle + gaugePct * Math.PI;
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">IBM HR Attrition Overview</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">1,470 Employees · FY 2024 Analysis</text>
      <SectionLabel x={40} y={130} text="Overall Attrition Rate" color="#06B6D4" />
      {/* Gauge background */}
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={22} />
      {/* Gauge fill */}
      <path d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`} fill="none" stroke="#06B6D4" strokeWidth={22} strokeLinecap="round" />
      <text x={cx} y={cy + 20} fill="white" fontSize={38} fontWeight="800" fontFamily="sans-serif" textAnchor="middle">16.1%</text>
      <text x={cx} y={cy + 44} fill="rgba(255,255,255,0.4)" fontSize={10} fontFamily="sans-serif" textAnchor="middle">vs 12% industry avg</text>
      <text x={cx - r - 8} y={cy + 16} fill="rgba(255,255,255,0.3)" fontSize={9} fontFamily="sans-serif" textAnchor="end">0%</text>
      <text x={cx + r + 8} y={cy + 16} fill="rgba(255,255,255,0.3)" fontSize={9} fontFamily="sans-serif">100%</text>
      {/* Dept bars */}
      <SectionLabel x={440} y={72} text="Attrition by Department" color="#06B6D4" />
      {depts.map((d, i) => (
        <HBar key={i} x={440} y={82 + i * 52} totalW={300} pct={d.v} color={`rgba(6,182,212,${0.9 - i * 0.08})`} label={d.name} value={d.val} />
      ))}
    </svg>
  );
}

export function P2S2() {
  // Workforce Demographics: multi-donut row
  const donuts = [
    { title: "Gender Split", slices: [60, 40], colors: ["#06B6D4", "#8B5CF6"], labels: ["Male 60%", "Female 40%"] },
    { title: "Age Groups", slices: [18, 44, 30, 8], colors: ["#06B6D4", "#0EA5E9", "#38BDF8", "#BAE6FD"], labels: ["<25 18%", "25-35 44%", "36-50 30%", "50+ 8%"] },
    { title: "Education Level", slices: [11, 39, 27, 23], colors: ["#6EE7F7", "#06B6D4", "#0E7490", "#164E63"], labels: ["High School", "Bachelor's", "Master's", "PhD"] },
  ];
  const kpis = [
    { label: "Total Employees", value: "1,470" },
    { label: "Attrition Count", value: "237" },
    { label: "Retention Rate", value: "83.9%" },
    { label: "Avg Tenure", value: "7.0 yrs" },
  ];
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Workforce Demographics</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">IBM HR · Employee Profile Analysis</text>
      {/* KPI strip */}
      {kpis.map((k, i) => (
        <g key={i}>
          <rect x={24 + i * 188} y={60} width={175} height={58} rx={7} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth={0.7} />
          <text x={38 + i * 188} y={82} fill="rgba(255,255,255,0.4)" fontSize={9} fontFamily="sans-serif">{k.label}</text>
          <text x={38 + i * 188} y={106} fill="white" fontSize={20} fontWeight="700" fontFamily="sans-serif">{k.value}</text>
        </g>
      ))}
      {/* Donuts */}
      {donuts.map((d, i) => {
        const cx = 130 + i * 250;
        const cy = 280;
        return (
          <g key={i}>
            <SectionLabel x={cx - 70} y={140} text={d.title} color="#06B6D4" />
            <DonutRing cx={cx} cy={cy} r={75} slices={d.slices} colors={d.colors} />
            {d.labels.map((l, j) => (
              <g key={j}>
                <rect x={cx - 70} y={356 + j * 16} width={8} height={8} rx={2} fill={d.colors[j]} />
                <text x={cx - 58} y={364 + j * 16} fill="rgba(255,255,255,0.45)" fontSize={8.5} fontFamily="sans-serif">{l}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export function P2S3() {
  // Tenure Analysis: stacked area + age histogram
  const pts1 = [0.72, 0.68, 0.62, 0.54, 0.48, 0.42, 0.38, 0.34, 0.30, 0.28];
  const pts2 = [0.20, 0.22, 0.25, 0.26, 0.24, 0.22, 0.20, 0.18, 0.16, 0.14];
  const ageBars = [0.12, 0.28, 0.38, 0.44, 0.40, 0.30, 0.18, 0.08];
  const ageLabels = ["18-22", "23-27", "28-32", "33-37", "38-42", "43-47", "48-52", "53+"];
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <defs>
        <linearGradient id="ag2a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="ag2b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Tenure & Attrition Risk Analysis</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Employees most at risk: 1–2 years tenure cohort</text>
      <SectionLabel x={24} y={70} text="Retention Rate by Years of Service" color="#06B6D4" />
      <LineArea pts={pts1} fill="url(#ag2a)" stroke="#06B6D4" w={710} h={160} ox={40} oy={80} />
      <LineArea pts={pts2} fill="url(#ag2b)" stroke="#8B5CF6" w={710} h={160} ox={40} oy={80} />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((y, i) => (
        <text key={i} x={40 + i * 78} y={258} fill="rgba(255,255,255,0.3)" fontSize={8} fontFamily="sans-serif" textAnchor="middle">{y}yr</text>
      ))}
      <line x1={40} y1={240} x2={750} y2={240} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      {/* Legend */}
      {[{ c: "#06B6D4", l: "Retention Rate" }, { c: "#8B5CF6", l: "High-Risk Segment" }].map((lg, i) => (
        <g key={i}>
          <rect x={24 + i * 140} y={264} width={8} height={8} rx={2} fill={lg.c} />
          <text x={38 + i * 140} y={272} fill="rgba(255,255,255,0.45)" fontSize={9} fontFamily="sans-serif">{lg.l}</text>
        </g>
      ))}
      <SectionLabel x={24} y={295} text="Age Distribution of Attrition" color="#06B6D4" />
      {ageBars.map((v, i) => (
        <VBar key={i} x={24 + i * 86} y={305 + 120 - v * 120} w={68} h={v * 120} color={`rgba(6,182,212,${0.5 + v * 0.4})`} label={ageLabels[i]} />
      ))}
    </svg>
  );
}

export function P2S4() {
  // HR KPI tiles with trend lines
  const metrics = [
    { label: "Overall Attrition", value: "16.1%", sub: "Benchmark: 12.0%", color: "#EF4444", spark: [0.3, 0.4, 0.35, 0.42, 0.5, 0.48, 0.55] },
    { label: "Avg Job Satisfaction", value: "2.7 / 4", sub: "Target: 3.5 / 4", color: "#06B6D4", spark: [0.5, 0.52, 0.48, 0.55, 0.58, 0.54, 0.62] },
    { label: "Avg Monthly Income", value: "$6,502", sub: "+3.2% YoY", color: "#10B981", spark: [0.45, 0.48, 0.5, 0.55, 0.58, 0.62, 0.68] },
    { label: "Promotion Rate", value: "11.8%", sub: "Quarterly avg", color: "#8B5CF6", spark: [0.4, 0.42, 0.45, 0.44, 0.48, 0.5, 0.52] },
  ];
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">HR Executive KPI Summary</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">IBM Human Resources · Q4 2024 · Leadership View</text>
      {metrics.map((m, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const tx = 24 + col * 390, ty = 68 + row * 185;
        return (
          <g key={i}>
            <rect x={tx} y={ty} width={375} height={170} rx={12} fill="rgba(255,255,255,0.04)" stroke={`${m.color}30`} strokeWidth={1} />
            <rect x={tx} y={ty} width={4} height={170} rx={2} fill={m.color} />
            <text x={tx + 20} y={ty + 30} fill="rgba(255,255,255,0.4)" fontSize={10} fontFamily="sans-serif">{m.label}</text>
            <text x={tx + 20} y={ty + 86} fill="white" fontSize={40} fontWeight="800" fontFamily="sans-serif">{m.value}</text>
            <text x={tx + 20} y={ty + 114} fill="rgba(255,255,255,0.35)" fontSize={10} fontFamily="sans-serif">{m.sub}</text>
            <LineArea pts={m.spark} fill={`${m.color}22`} stroke={m.color} w={120} h={50} ox={tx + 235} oy={ty + 50} />
          </g>
        );
      })}
    </svg>
  );
}

// ─── P3: Student Social Media ─────────────────────────────────────────────────

export function P3S1() {
  // Executive summary: 3 KPIs + platform horizontal bars
  const platforms = [
    { name: "Instagram", v: 0.82, h: "3.2 hrs/day" },
    { name: "YouTube", v: 0.71, h: "2.8 hrs/day" },
    { name: "TikTok", v: 0.65, h: "2.5 hrs/day" },
    { name: "Twitter/X", v: 0.38, h: "1.5 hrs/day" },
    { name: "Snapchat", v: 0.29, h: "1.1 hrs/day" },
    { name: "Facebook", v: 0.18, h: "0.7 hrs/day" },
  ];
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Social Media Addiction — Executive Summary</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Student Behavioral Analysis · n=3,200 students</text>
      {[
        { label: "Avg Daily Screen Time", value: "6.4 hrs", delta: "+22%", color: "#8B5CF6" },
        { label: "Avg GPA (Heavy Users)", value: "2.61", delta: "-18%", color: "#C4B5FD" },
        { label: "Students w/ Sleep Issues", value: "68%", delta: "+15%", color: "#7C3AED" },
      ].map((k, i) => (
        <KpiCard key={i} x={24 + i * 254} y={60} w={240} h={72} {...k} />
      ))}
      <SectionLabel x={24} y={160} text="Daily Screen Time by Platform" color="#C4B5FD" />
      {platforms.map((p, i) => (
        <HBar key={i} x={24} y={170 + i * 46} totalW={360} pct={p.v} color={`rgba(139,92,246,${0.9 - i * 0.09})`} label={p.name} value={p.h} />
      ))}
      {/* Addiction score donut */}
      <SectionLabel x={460} y={160} text="Addiction Level Distribution" color="#C4B5FD" />
      <DonutRing cx={590} cy={300} r={90} slices={[32, 41, 27]} colors={["#EF4444", "#F59E0B", "#10B981"]} />
      {["High 32%", "Moderate 41%", "Low 27%"].map((l, i) => (
        <g key={i}>
          <rect x={460} y={380 + i * 18} width={8} height={8} rx={2} fill={["#EF4444", "#F59E0B", "#10B981"][i]} />
          <text x={474} y={388 + i * 18} fill="rgba(255,255,255,0.45)" fontSize={9} fontFamily="sans-serif">{l}</text>
        </g>
      ))}
    </svg>
  );
}

export function P3S2() {
  // Screen time calendar heatmap (7 rows = days, 12 cols = hours 8am-8pm)
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
  // intensity grid [day][hour] 0-1
  const grid = [
    [0.1, 0.2, 0.3, 0.5, 0.4, 0.6, 0.7, 0.8, 0.7, 0.9, 0.95, 0.85],
    [0.15, 0.25, 0.35, 0.55, 0.5, 0.65, 0.75, 0.85, 0.8, 0.92, 0.98, 0.9],
    [0.1, 0.15, 0.25, 0.4, 0.35, 0.55, 0.65, 0.75, 0.7, 0.85, 0.9, 0.8],
    [0.2, 0.3, 0.4, 0.6, 0.55, 0.7, 0.8, 0.88, 0.82, 0.95, 1.0, 0.92],
    [0.25, 0.35, 0.45, 0.65, 0.6, 0.72, 0.82, 0.9, 0.88, 0.96, 0.99, 0.93],
    [0.4, 0.55, 0.65, 0.8, 0.75, 0.88, 0.92, 0.96, 0.95, 0.99, 1.0, 0.97],
    [0.5, 0.6, 0.7, 0.85, 0.8, 0.9, 0.95, 0.98, 0.96, 1.0, 1.0, 0.98],
  ];
  const cellW = 50, cellH = 38;
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Screen Time Heatmap — Weekly Pattern</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Usage intensity by day and hour · Darker = Higher Usage</text>
      {/* Hour labels */}
      {hours.map((h, j) => (
        <text key={j} x={105 + j * cellW + cellW / 2} y={76} fill="rgba(255,255,255,0.35)" fontSize={8.5} fontFamily="sans-serif" textAnchor="middle">{h}:00</text>
      ))}
      {/* Day labels + cells */}
      {grid.map((row, i) => (
        <g key={i}>
          <text x={100} y={96 + i * cellH + cellH / 2} fill="rgba(255,255,255,0.45)" fontSize={9} fontFamily="sans-serif" textAnchor="end">{days[i]}</text>
          {row.map((v, j) => (
            <rect
              key={j}
              x={105 + j * cellW}
              y={82 + i * cellH}
              width={cellW - 3}
              height={cellH - 3}
              rx={4}
              fill={`rgba(139,92,246,${v * 0.9})`}
            />
          ))}
        </g>
      ))}
      {/* Legend */}
      <text x={105} y={368} fill="rgba(255,255,255,0.3)" fontSize={8} fontFamily="sans-serif">Low</text>
      {[0.1, 0.25, 0.45, 0.65, 0.85, 1.0].map((v, i) => (
        <rect key={i} x={130 + i * 24} y={358} width={20} height={10} rx={2} fill={`rgba(139,92,246,${v * 0.9})`} />
      ))}
      <text x={278} y={368} fill="rgba(255,255,255,0.3)" fontSize={8} fontFamily="sans-serif">High</text>
      {/* Insight box */}
      <rect x={480} y={82} width={295} height={282} rx={10} fill="rgba(139,92,246,0.06)" stroke="rgba(139,92,246,0.2)" strokeWidth={0.8} />
      <text x={500} y={106} fill="#C4B5FD" fontSize={11} fontWeight="600" fontFamily="sans-serif">Key Findings</text>
      {[
        "Peak usage: Fri–Sun evenings (18:00–20:00)",
        "Weekday mornings show lowest engagement",
        "Late-night spikes correlated with sleep issues",
        "Weekend usage 38% higher than weekdays",
        "Academic hours (9–11am) show 2× weekday dip",
      ].map((t, i) => (
        <g key={i}>
          <circle cx={498} cy={130 + i * 42} r={3} fill="#8B5CF6" />
          <text x={508} y={134 + i * 42} fill="rgba(255,255,255,0.5)" fontSize={9} fontFamily="sans-serif">{t}</text>
        </g>
      ))}
    </svg>
  );
}

export function P3S3() {
  // Academic Correlation scatter + bar
  const scatter = [
    { x: 1.5, y: 3.8, cat: 0 }, { x: 2.1, y: 3.5, cat: 0 }, { x: 1.8, y: 3.9, cat: 0 },
    { x: 3.5, y: 3.1, cat: 1 }, { x: 4.2, y: 2.8, cat: 1 }, { x: 3.8, y: 3.0, cat: 1 }, { x: 4.5, y: 2.7, cat: 1 },
    { x: 6.2, y: 2.3, cat: 2 }, { x: 7.0, y: 2.1, cat: 2 }, { x: 6.8, y: 2.0, cat: 2 }, { x: 7.5, y: 1.8, cat: 2 }, { x: 8.2, y: 1.6, cat: 2 },
    { x: 5.1, y: 2.6, cat: 2 }, { x: 2.5, y: 3.4, cat: 0 }, { x: 5.8, y: 2.4, cat: 1 },
  ];
  const colors = ["#10B981", "#F59E0B", "#EF4444"];
  const scaleX = (v: number) => 30 + v * 45;
  const scaleY = (v: number) => 340 - (v - 1) * 90;
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Academic Performance vs Screen Time</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Pearson r = −0.73 · Strong Negative Correlation</text>
      {/* Scatter */}
      <SectionLabel x={24} y={70} text="GPA vs Daily Screen Time (hrs)" color="#C4B5FD" />
      <line x1={30} y1={80} x2={30} y2={340} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      <line x1={30} y1={340} x2={420} y2={340} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      {/* Trend line */}
      <line x1={30} y1={165} x2={415} y2={330} stroke="#8B5CF6" strokeWidth={1.5} strokeDasharray="5,4" opacity={0.5} />
      {scatter.map((p, i) => (
        <circle key={i} cx={scaleX(p.x)} cy={scaleY(p.y)} r={7} fill={colors[p.cat]} opacity={0.75} />
      ))}
      {/* X/Y labels */}
      {[0, 2, 4, 6, 8].map((v) => (
        <text key={v} x={scaleX(v)} y={354} fill="rgba(255,255,255,0.3)" fontSize={8} fontFamily="sans-serif" textAnchor="middle">{v}h</text>
      ))}
      {[1.5, 2.0, 2.5, 3.0, 3.5, 4.0].map((v) => (
        <text key={v} x={22} y={scaleY(v) + 3} fill="rgba(255,255,255,0.3)" fontSize={8} fontFamily="sans-serif" textAnchor="end">{v}</text>
      ))}
      <text x={220} y={378} fill="rgba(255,255,255,0.25)" fontSize={8.5} fontFamily="sans-serif" textAnchor="middle">Screen Time (hours/day)</text>
      {/* Legend */}
      {["Low (<3h)", "Moderate (3-5h)", "Heavy (>5h)"].map((l, i) => (
        <g key={i}>
          <circle cx={34 + i * 130} cy={395} r={5} fill={colors[i]} />
          <text x={44 + i * 130} y={399} fill="rgba(255,255,255,0.45)" fontSize={8.5} fontFamily="sans-serif">{l}</text>
        </g>
      ))}
      {/* Right bar chart */}
      <SectionLabel x={450} y={70} text="Avg GPA by Usage Group" color="#C4B5FD" />
      {[
        { label: "Light (<3h)", gpa: 3.72, color: "#10B981" },
        { label: "Moderate (3-5h)", gpa: 3.05, color: "#F59E0B" },
        { label: "Heavy (>5h)", gpa: 2.48, color: "#EF4444" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={460 + i * 100} y={340 - b.gpa * 62} width={80} height={b.gpa * 62} rx={6} fill={b.color} opacity={0.8} />
          <text x={500 + i * 100} y={350 - b.gpa * 62 - 6} fill={b.color} fontSize={11} fontWeight="700" fontFamily="sans-serif" textAnchor="middle">{b.gpa}</text>
          <text x={500 + i * 100} y={354} fill="rgba(255,255,255,0.35)" fontSize={8} fontFamily="sans-serif" textAnchor="middle">{b.label}</text>
        </g>
      ))}
      <line x1={450} y1={340} x2={775} y2={340} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
    </svg>
  );
}

export function P3S4() {
  // Sleep pattern analysis
  const sleepPts = [0.7, 0.65, 0.55, 0.5, 0.42, 0.38, 0.58, 0.72, 0.68, 0.62];
  const distBars = [0.2, 0.38, 0.55, 0.7, 0.82, 0.6, 0.35, 0.15];
  const distLabels = ["<4h", "4-5h", "5-6h", "6-7h", "7-8h", "8-9h", "9-10h", ">10h"];
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <defs>
        <linearGradient id="ag3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Sleep Pattern Analysis</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Late-night social media usage → disrupted sleep cycles</text>
      {[
        { label: "Avg Sleep (Heavy Users)", value: "5.4 hrs", color: "#EF4444" },
        { label: "Avg Sleep (Light Users)", value: "7.8 hrs", color: "#10B981" },
        { label: "Sleep Deficit", value: "2.4 hrs", color: "#8B5CF6" },
      ].map((k, i) => (
        <KpiCard key={i} x={24 + i * 254} y={58} w={240} h={72} {...k} />
      ))}
      <SectionLabel x={24} y={152} text="Sleep Quality Score Over Time (Heavy Users)" color="#C4B5FD" />
      <LineArea pts={sleepPts} fill="url(#ag3)" stroke="#8B5CF6" w={440} h={150} ox={24} oy={162} />
      <line x1={24} y1={312} x2={464} y2={312} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      <SectionLabel x={500} y={152} text="Sleep Duration Distribution" color="#C4B5FD" />
      {distBars.map((v, i) => (
        <VBar key={i} x={500 + i * 37} y={310 - v * 120} w={28} h={v * 120} color={`rgba(139,92,246,${0.5 + v * 0.5})`} label={distLabels[i]} />
      ))}
      <line x1={500} y1={310} x2={796} y2={310} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      {/* insight callout */}
      <rect x={24} y={328} width={760} height={92} rx={10} fill="rgba(139,92,246,0.07)" stroke="rgba(139,92,246,0.2)" strokeWidth={0.8} />
      <text x={44} y={352} fill="#C4B5FD" fontSize={11} fontWeight="600" fontFamily="sans-serif">Key Insight</text>
      <text x={44} y={372} fill="rgba(255,255,255,0.5)" fontSize={9.5} fontFamily="sans-serif">Students averaging 6+ hours of daily social media had 78% higher likelihood of reporting poor sleep quality.</text>
      <text x={44} y={390} fill="rgba(255,255,255,0.5)" fontSize={9.5} fontFamily="sans-serif">Notification-induced sleep disruptions averaged 4.2 interruptions/night among heavy-use group vs 0.9 for light users.</text>
      <text x={44} y={408} fill="rgba(255,255,255,0.5)" fontSize={9.5} fontFamily="sans-serif">Recommendation: Digital wellness programs targeting screen time after 9pm reduce academic sleep debt by ~1.8 hrs/night.</text>
    </svg>
  );
}

// ─── P4: Customer Data Analysis (Python) ──────────────────────────────────────

export function P4S1() {
  // Spending distribution histogram + density curve
  const bins = [0.08, 0.15, 0.28, 0.42, 0.58, 0.72, 0.88, 0.95, 0.85, 0.7, 0.52, 0.35, 0.22, 0.12, 0.06];
  const binLabels = ["0", "1K", "2K", "3K", "4K", "5K", "6K", "7K", "8K", "9K", "10K", "11K", "12K", "13K", "14K"];
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Customer Spending Distribution</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Python EDA · Histogram with KDE Overlay · n=12,450 customers</text>
      {[
        { label: "Mean Spend", value: "₹4,200", color: "#10B981" },
        { label: "Median Spend", value: "₹3,850", color: "#6EE7B7" },
        { label: "Std Deviation", value: "₹2,180", color: "#34D399" },
        { label: "95th Percentile", value: "₹9,200", color: "#059669" },
      ].map((k, i) => (
        <KpiCard key={i} x={24 + i * 188} y={60} w={175} h={66} {...k} />
      ))}
      <SectionLabel x={24} y={150} text="Monthly Spend Distribution (₹)" color="#6EE7B7" />
      {/* Histogram bars */}
      {bins.map((v, i) => (
        <g key={i}>
          <rect x={24 + i * 48} y={160 + 200 - v * 200} width={44} height={v * 200} rx={3} fill={`rgba(16,185,129,${0.45 + v * 0.3})`} />
          <text x={46 + i * 48} y={375} fill="rgba(255,255,255,0.3)" fontSize={7.5} fontFamily="sans-serif" textAnchor="middle">{binLabels[i]}</text>
        </g>
      ))}
      <line x1={24} y1={360} x2={740} y2={360} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      {/* KDE curve (smooth approximation) */}
      <path
        d="M 46,358 C 80,340 120,290 180,230 C 240,175 280,152 360,148 C 420,148 460,165 520,200 C 580,240 620,295 680,330 C 710,345 730,355 740,358"
        fill="none"
        stroke="#10B981"
        strokeWidth={2.5}
        strokeDasharray="none"
        opacity={0.9}
      />
      {/* Mean line */}
      <line x1={288} y1={160} x2={288} y2={360} stroke="#F59E0B" strokeWidth={1.5} strokeDasharray="4,3" />
      <text x={292} y={175} fill="#F59E0B" fontSize={8.5} fontFamily="sans-serif">Mean</text>
      {/* Median line */}
      <line x1={264} y1={160} x2={264} y2={360} stroke="#34D399" strokeWidth={1.5} strokeDasharray="4,3" />
      <text x={216} y={175} fill="#34D399" fontSize={8.5} fontFamily="sans-serif">Median</text>
      <text x={375} y={395} fill="rgba(255,255,255,0.25)" fontSize={8.5} fontFamily="sans-serif" textAnchor="middle">Monthly Spend (₹)</text>
    </svg>
  );
}

export function P4S2() {
  // Correlation heatmap 6×6
  const vars = ["Age", "Income", "Spend", "Visits", "Score", "LTV"];
  const data = [
    [1.00, 0.42, 0.38, 0.22, 0.15, 0.40],
    [0.42, 1.00, 0.72, 0.35, 0.28, 0.68],
    [0.38, 0.72, 1.00, 0.61, 0.44, 0.85],
    [0.22, 0.35, 0.61, 1.00, 0.52, 0.55],
    [0.15, 0.28, 0.44, 0.52, 1.00, 0.38],
    [0.40, 0.68, 0.85, 0.55, 0.38, 1.00],
  ];
  const cellSize = 78;
  const ox = 100, oy = 90;
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Feature Correlation Matrix</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Python · Pandas + Seaborn · Pearson Correlation</text>
      {vars.map((v, i) => (
        <g key={i}>
          <text x={ox + i * cellSize + cellSize / 2} y={oy - 8} fill="rgba(255,255,255,0.5)" fontSize={10} fontFamily="sans-serif" textAnchor="middle">{v}</text>
          <text x={ox - 8} y={oy + i * cellSize + cellSize / 2 + 3} fill="rgba(255,255,255,0.5)" fontSize={10} fontFamily="sans-serif" textAnchor="end">{v}</text>
        </g>
      ))}
      {data.map((row, i) =>
        row.map((val, j) => {
          const intensity = Math.abs(val);
          const color = val >= 0 ? `rgba(16,185,129,${intensity * 0.85})` : `rgba(239,68,68,${intensity * 0.85})`;
          return (
            <g key={`${i}-${j}`}>
              <rect x={ox + j * cellSize} y={oy + i * cellSize} width={cellSize - 2} height={cellSize - 2} rx={4} fill={color} />
              <text x={ox + j * cellSize + cellSize / 2} y={oy + i * cellSize + cellSize / 2 + 4} fill="rgba(255,255,255,0.85)" fontSize={11} fontWeight={val === 1 ? "700" : "400"} fontFamily="sans-serif" textAnchor="middle">
                {val.toFixed(2)}
              </text>
            </g>
          );
        })
      )}
      {/* Color bar */}
      <defs>
        <linearGradient id="cbg4" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(239,68,68,0.8)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(16,185,129,0.8)" />
        </linearGradient>
      </defs>
      <rect x={580} y={120} width={16} height={300} rx={4} fill="url(#cbg4)" />
      <text x={600} y={123} fill="rgba(255,255,255,0.35)" fontSize={8.5} fontFamily="sans-serif">+1.0</text>
      <text x={600} y={273} fill="rgba(255,255,255,0.35)" fontSize={8.5} fontFamily="sans-serif">0.0</text>
      <text x={600} y={422} fill="rgba(255,255,255,0.35)" fontSize={8.5} fontFamily="sans-serif">−1.0</text>
    </svg>
  );
}

export function P4S3() {
  // Customer segments scatter (3 clusters)
  const clusters = [
    { pts: [[120,380],[140,360],[110,400],[130,370],[150,350],[125,390],[135,365]], color: "#10B981", label: "High-Value" },
    { pts: [[280,260],[310,240],[295,270],[265,255],[320,245],[275,265],[300,250]], color: "#F59E0B", label: "Mid-Value" },
    { pts: [[450,130],[480,110],[440,145],[465,120],[495,105],[455,138],[475,115]], color: "#EF4444", label: "Low-Value" },
  ];
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Customer Segmentation — K-Means Clustering</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Python · Scikit-learn · K=3 · Silhouette Score: 0.71</text>
      <SectionLabel x={40} y={70} text="Purchase Frequency vs Annual Spend" color="#6EE7B7" />
      {/* Axes */}
      <line x1={40} y1={80} x2={40} y2={420} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      <line x1={40} y1={420} x2={560} y2={420} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      <text x={300} y={440} fill="rgba(255,255,255,0.25)" fontSize={8.5} fontFamily="sans-serif" textAnchor="middle">Annual Spend (₹K)</text>
      <text x={30} y={250} fill="rgba(255,255,255,0.25)" fontSize={8.5} fontFamily="sans-serif" textAnchor="middle" transform="rotate(-90,30,250)">Purchase Frequency</text>
      {/* Grid */}
      {[100, 200, 300, 400].map((v) => (
        <line key={v} x1={40} y1={v} x2={560} y2={v} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
      ))}
      {/* Clusters */}
      {clusters.map((c) =>
        c.pts.map(([px, py], i) => (
          <circle key={i} cx={px + 40} cy={py} r={8} fill={c.color} opacity={0.7} />
        ))
      )}
      {/* Centroids */}
      {clusters.map((c, i) => {
        const cx = c.pts.reduce((a, p) => a + p[0], 0) / c.pts.length + 40;
        const cy = c.pts.reduce((a, p) => a + p[1], 0) / c.pts.length;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={14} fill="none" stroke={c.color} strokeWidth={2} strokeDasharray="3,2" />
            <text cx={cx} x={cx} y={cy + 4} fill={c.color} fontSize={10} fontWeight="700" fontFamily="sans-serif" textAnchor="middle">✕</text>
          </g>
        );
      })}
      {/* Legend */}
      {clusters.map((c, i) => (
        <g key={i}>
          <circle cx={590} cy={120 + i * 36} r={7} fill={c.color} opacity={0.8} />
          <text x={604} y={124 + i * 36} fill="rgba(255,255,255,0.6)" fontSize={10} fontFamily="sans-serif">{c.label} Customers</text>
        </g>
      ))}
      {/* Stats panel */}
      <rect x={580} y={200} width={195} height={200} rx={10} fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.15)" strokeWidth={0.8} />
      <text x={598} y={224} fill="#6EE7B7" fontSize={10} fontWeight="600" fontFamily="sans-serif">Cluster Stats</text>
      {[
        ["Cluster", "Count", "Avg Spend"],
        ["High", "2,890", "₹9,400"],
        ["Mid", "5,240", "₹4,200"],
        ["Low", "4,320", "₹1,600"],
      ].map((row, i) => (
        row.map((cell, j) => (
          <text key={j} x={598 + j * 62} y={248 + i * 38} fill={i === 0 ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.6)"} fontSize={i === 0 ? 8 : 9} fontFamily="sans-serif">{cell}</text>
        ))
      ))}
    </svg>
  );
}

export function P4S4() {
  // Box plots for 4 variables
  const boxes = [
    { label: "Age", q1: 0.28, med: 0.45, q3: 0.62, wl: 0.12, wu: 0.82, color: "#10B981" },
    { label: "Income", q1: 0.35, med: 0.55, q3: 0.72, wl: 0.15, wu: 0.90, color: "#6EE7B7" },
    { label: "Spend", q1: 0.22, med: 0.48, q3: 0.68, wl: 0.08, wu: 0.85, color: "#34D399" },
    { label: "Visits", q1: 0.30, med: 0.52, q3: 0.70, wl: 0.10, wu: 0.88, color: "#059669" },
  ];
  const maxH = 280;
  const baseY = 360;
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Statistical Distribution — Box Plots</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Python · Matplotlib · IQR Method · Outlier Detection</text>
      {/* Horizontal grid */}
      {[0.2, 0.4, 0.6, 0.8, 1.0].map((v) => (
        <g key={v}>
          <line x1={80} y1={baseY - v * maxH} x2={730} y2={baseY - v * maxH} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
          <text x={75} y={baseY - v * maxH + 3} fill="rgba(255,255,255,0.25)" fontSize={8.5} fontFamily="sans-serif" textAnchor="end">{v.toFixed(1)}</text>
        </g>
      ))}
      <line x1={80} y1={baseY} x2={730} y2={baseY} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      {boxes.map((b, i) => {
        const cx = 160 + i * 150;
        const bw = 80;
        const q1y = baseY - b.q1 * maxH;
        const q3y = baseY - b.q3 * maxH;
        const medy = baseY - b.med * maxH;
        const wly = baseY - b.wl * maxH;
        const wuy = baseY - b.wu * maxH;
        return (
          <g key={i}>
            {/* Whiskers */}
            <line x1={cx} y1={wuy} x2={cx} y2={q3y} stroke={b.color} strokeWidth={1.5} opacity={0.6} />
            <line x1={cx} y1={q1y} x2={cx} y2={wly} stroke={b.color} strokeWidth={1.5} opacity={0.6} />
            <line x1={cx - bw / 2} y1={wuy} x2={cx + bw / 2} y2={wuy} stroke={b.color} strokeWidth={1.5} opacity={0.6} />
            <line x1={cx - bw / 2} y1={wly} x2={cx + bw / 2} y2={wly} stroke={b.color} strokeWidth={1.5} opacity={0.6} />
            {/* Box */}
            <rect x={cx - bw / 2} y={q3y} width={bw} height={q1y - q3y} rx={4} fill={`${b.color}22`} stroke={b.color} strokeWidth={1.5} />
            {/* Median */}
            <line x1={cx - bw / 2} y1={medy} x2={cx + bw / 2} y2={medy} stroke={b.color} strokeWidth={3} />
            {/* Label */}
            <text x={cx} y={baseY + 18} fill="rgba(255,255,255,0.5)" fontSize={10} fontFamily="sans-serif" textAnchor="middle">{b.label}</text>
            {/* Outliers (dots) */}
            {[0.94, 0.97, 0.04, 0.02].map((ov, oi) => (
              i === oi % 4 && <circle key={oi} cx={cx + (oi % 2 === 0 ? -12 : 12)} cy={baseY - ov * maxH} r={3} fill={b.color} opacity={0.5} />
            ))}
          </g>
        );
      })}
      <text x={405} y={420} fill="rgba(255,255,255,0.2)" fontSize={8.5} fontFamily="sans-serif" textAnchor="middle">Variables (Normalized Scale)</text>
      {/* Summary stats */}
      <rect x={590} y={80} width={185} height={260} rx={10} fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.15)" strokeWidth={0.8} />
      <text x={608} y={104} fill="#6EE7B7" fontSize={10} fontWeight="600" fontFamily="sans-serif">Descriptive Stats</text>
      {[
        ["Variable", "Skewness"],
        ["Age", "+0.24"],
        ["Income", "+0.61"],
        ["Spend", "+1.02"],
        ["Visits", "+0.38"],
      ].map((row, i) => (
        row.map((cell, j) => (
          <text key={j} x={608 + j * 90} y={130 + i * 38} fill={i === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.6)"} fontSize={i === 0 ? 8 : 9.5} fontFamily="sans-serif">{cell}</text>
        ))
      ))}
    </svg>
  );
}

// ─── P5: Retail Store SQL ─────────────────────────────────────────────────────

export function P5S1() {
  // Combo bar + line (monthly sales)
  const barH = [0.48, 0.55, 0.42, 0.61, 0.70, 0.65, 0.72, 0.80, 0.75, 0.88, 0.95, 0.82];
  const linePts = [0.38, 0.44, 0.40, 0.50, 0.58, 0.55, 0.62, 0.70, 0.65, 0.78, 0.82, 0.75];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const maxH = 200, baseY = 330, ox = 40;
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <defs>
        <linearGradient id="ag5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Retail Sales Performance</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">MySQL Analysis · Monthly Revenue + Profit Margin Trend</text>
      {[
        { label: "Annual Revenue", value: "₹8.4M", delta: "+16.2%", color: "#F59E0B" },
        { label: "Gross Margin", value: "38.4%", delta: "+2.1%", color: "#FCD34D" },
        { label: "Transactions", value: "92.4K", delta: "+11.8%", color: "#D97706" },
        { label: "Avg Basket", value: "₹910", delta: "+4.0%", color: "#B45309" },
      ].map((k, i) => (
        <KpiCard key={i} x={24 + i * 188} y={58} w={175} h={66} {...k} />
      ))}
      <SectionLabel x={24} y={148} text="Monthly Revenue (Bars) + Profit Margin % (Line)" color="#FCD34D" />
      {/* Bars */}
      {barH.map((v, i) => (
        <rect key={i} x={ox + i * 59} y={baseY - v * maxH} width={44} height={v * maxH} rx={4} fill="url(#ag5)" opacity={0.8} />
      ))}
      {/* Month labels */}
      {months.map((m, i) => (
        <text key={i} x={ox + i * 59 + 22} y={baseY + 16} fill="rgba(255,255,255,0.35)" fontSize={8.5} fontFamily="sans-serif" textAnchor="middle">{m}</text>
      ))}
      <line x1={ox} y1={baseY} x2={742} y2={baseY} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      {/* Line overlay */}
      <polyline
        points={linePts.map((v, i) => `${ox + i * 59 + 22},${baseY - v * maxH}`).join(" ")}
        fill="none" stroke="#FBBF24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      />
      {linePts.map((v, i) => (
        <circle key={i} cx={ox + i * 59 + 22} cy={baseY - v * maxH} r={4} fill="#FBBF24" />
      ))}
      {/* Legend */}
      <rect x={24} y={362} width={12} height={12} rx={2} fill="#F59E0B" />
      <text x={40} y={372} fill="rgba(255,255,255,0.4)" fontSize={9} fontFamily="sans-serif">Monthly Revenue</text>
      <circle cx={180} cy={368} r={4} fill="#FBBF24" />
      <text x={190} y={372} fill="rgba(255,255,255,0.4)" fontSize={9} fontFamily="sans-serif">Profit Margin %</text>
    </svg>
  );
}

export function P5S2() {
  // Customer ranking + donut
  const customers = [
    { name: "Priya Sharma", v: 0.92, rev: "₹84,200" },
    { name: "Ravi Kumar", v: 0.81, rev: "₹74,100" },
    { name: "Anita Patel", v: 0.73, rev: "₹66,800" },
    { name: "Suresh Nair", v: 0.65, rev: "₹59,500" },
    { name: "Deepak Singh", v: 0.58, rev: "₹53,100" },
    { name: "Kavya Reddy", v: 0.50, rev: "₹45,800" },
    { name: "Arjun Mehta", v: 0.42, rev: "₹38,400" },
  ];
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Top Customer Analysis</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">SQL Query: Top 10 Customers by Revenue · FY 2024</text>
      <SectionLabel x={24} y={72} text="Top 7 Customers by Annual Revenue" color="#FCD34D" />
      {customers.map((c, i) => (
        <HBar key={i} x={24} y={82 + i * 46} totalW={370} pct={c.v} color={`rgba(245,158,11,${0.9 - i * 0.08})`} label={c.name} value={c.rev} />
      ))}
      <SectionLabel x={470} y={72} text="Revenue by Customer Segment" color="#FCD34D" />
      <DonutRing cx={590} cy={250} r={90} slices={[28, 35, 24, 13]} colors={["#F59E0B", "#FBBF24", "#FCD34D", "#FDE68A"]} />
      <text x={590} y={254} fill="white" fontSize={18} fontWeight="700" fontFamily="sans-serif" textAnchor="middle">28%</text>
      <text x={590} y={272} fill="rgba(255,255,255,0.35)" fontSize={9} fontFamily="sans-serif" textAnchor="middle">Top 10</text>
      {["Top 10: 28%", "Mid-tier: 35%", "Regular: 24%", "Occasional: 13%"].map((l, i) => (
        <g key={i}>
          <rect x={470} y={360 + i * 18} width={8} height={8} rx={2} fill={["#F59E0B", "#FBBF24", "#FCD34D", "#FDE68A"][i]} />
          <text x={484} y={368 + i * 18} fill="rgba(255,255,255,0.45)" fontSize={9} fontFamily="sans-serif">{l}</text>
        </g>
      ))}
    </svg>
  );
}

export function P5S3() {
  // Product profitability waterfall
  const cats = [
    { name: "Electronics", val: 0.82, pos: true },
    { name: "Clothing", val: 0.65, pos: true },
    { name: "Furniture", val: 0.48, pos: true },
    { name: "Returns", val: -0.22, pos: false },
    { name: "Discounts", val: -0.18, pos: false },
    { name: "Groceries", val: 0.55, pos: true },
    { name: "Sports", val: 0.38, pos: true },
    { name: "Net Total", val: 0.88, pos: true },
  ];
  const maxH = 200, baseY = 360, bw = 72;
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Product Profitability Analysis</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">SQL Waterfall Chart · Gross Margin Contribution by Category</text>
      <SectionLabel x={24} y={68} text="Category Profit Contribution (₹M)" color="#FCD34D" />
      {/* Grid */}
      {[0.25, 0.5, 0.75, 1.0].map((v) => (
        <line key={v} x1={24} y1={baseY - v * maxH} x2={776} y2={baseY - v * maxH} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
      ))}
      {cats.map((c, i) => {
        const h = Math.abs(c.val) * maxH;
        const y = c.pos ? baseY - h : baseY;
        const color = i === cats.length - 1 ? "#F59E0B" : c.pos ? "#10B981" : "#EF4444";
        return (
          <g key={i}>
            <rect x={24 + i * 94} y={y} width={bw} height={h} rx={5} fill={color} opacity={0.8} />
            <text x={24 + i * 94 + bw / 2} y={c.pos ? y - 6 : y + h + 14} fill={color} fontSize={9.5} fontWeight="600" fontFamily="sans-serif" textAnchor="middle">
              {c.pos ? "+" : "−"}₹{(Math.abs(c.val) * 1.2).toFixed(1)}M
            </text>
            <text x={24 + i * 94 + bw / 2} y={baseY + 16} fill="rgba(255,255,255,0.35)" fontSize={8} fontFamily="sans-serif" textAnchor="middle">{c.name}</text>
          </g>
        );
      })}
      <line x1={24} y1={baseY} x2={776} y2={baseY} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
      {/* Legend */}
      {[{ c: "#10B981", l: "Positive Contribution" }, { c: "#EF4444", l: "Negative / Cost" }, { c: "#F59E0B", l: "Net Total" }].map((lg, i) => (
        <g key={i}>
          <rect x={24 + i * 200} y={396} width={10} height={10} rx={2} fill={lg.c} />
          <text x={38 + i * 200} y={405} fill="rgba(255,255,255,0.4)" fontSize={9} fontFamily="sans-serif">{lg.l}</text>
        </g>
      ))}
    </svg>
  );
}

export function P5S4() {
  // Business KPI overview with progress bars
  const kpis = [
    { label: "Revenue vs Target", value: "₹8.4M", target: "₹9.0M", pct: 0.93, color: "#F59E0B" },
    { label: "Orders Fulfilled", value: "91,200", target: "95,000", pct: 0.96, color: "#FBBF24" },
    { label: "Customer Satisfaction", value: "4.2 / 5.0", target: "4.5 / 5.0", pct: 0.84, color: "#D97706" },
    { label: "Inventory Turnover", value: "8.2x", target: "9.0x", pct: 0.91, color: "#B45309" },
  ];
  const weeklyRev = [0.55, 0.62, 0.58, 0.70, 0.78, 0.72, 0.82, 0.88, 0.84, 0.91, 0.96, 0.88];
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <DashBg />
      <defs>
        <linearGradient id="ag5b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </linearGradient>
      </defs>
      <text x="24" y="32" fill="white" fontSize="13" fontWeight="700" fontFamily="sans-serif">Business KPI Dashboard — SQL Report</text>
      <text x="24" y="48" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="sans-serif">Retail Store · FY 2024 · Actuals vs Targets</text>
      {/* KPI cards with progress bars */}
      {kpis.map((k, i) => {
        const tx = 24 + i * 188, ty = 60;
        return (
          <g key={i}>
            <rect x={tx} y={ty} width={175} height={115} rx={8} fill="rgba(255,255,255,0.04)" stroke={`${k.color}30`} strokeWidth={0.8} />
            <text x={tx + 12} y={ty + 22} fill="rgba(255,255,255,0.4)" fontSize={9} fontFamily="sans-serif">{k.label}</text>
            <text x={tx + 12} y={ty + 52} fill="white" fontSize={20} fontWeight="700" fontFamily="sans-serif">{k.value}</text>
            <text x={tx + 12} y={ty + 68} fill="rgba(255,255,255,0.3)" fontSize={8} fontFamily="sans-serif">Target: {k.target}</text>
            <rect x={tx + 12} y={ty + 80} width={150} height={6} rx={3} fill="rgba(255,255,255,0.08)" />
            <rect x={tx + 12} y={ty + 80} width={150 * k.pct} height={6} rx={3} fill={k.color} />
            <text x={tx + 166} y={ty + 86} fill={k.color} fontSize={8.5} fontFamily="sans-serif" textAnchor="end">{Math.round(k.pct * 100)}%</text>
          </g>
        );
      })}
      <SectionLabel x={24} y={202} text="Weekly Revenue Trend" color="#FCD34D" />
      <LineArea pts={weeklyRev} fill="url(#ag5b)" stroke="#F59E0B" w={740} h={160} ox={24} oy={212} />
      <line x1={24} y1={372} x2={764} y2={372} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      {["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"].map((w, i) => (
        <text key={i} x={24 + i * (740 / 11)} y={386} fill="rgba(255,255,255,0.25)" fontSize={8} fontFamily="sans-serif" textAnchor="middle">{w}</text>
      ))}
      {/* SQL insight strip */}
      <rect x={24} y={396} width={740} height={42} rx={8} fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.15)" strokeWidth={0.8} />
      <text x={40} y={416} fill="#FCD34D" fontSize={9.5} fontFamily="sans-serif" fontStyle="italic">
        SELECT category, SUM(revenue) as total_rev, AVG(margin_pct) as avg_margin FROM sales GROUP BY category ORDER BY total_rev DESC;
      </text>
      <text x={40} y={432} fill="rgba(255,255,255,0.3)" fontSize={8.5} fontFamily="sans-serif">Result: Top 3 categories drive 58% of total revenue · Weekend premium: +23%</text>
    </svg>
  );
}
