import { ImageResponse } from "next/og"

export const alt = "Coffee Brew Lab — Free Coffee Calculators and Brew Guides"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#166534",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#86efac"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
            <line x1="6" x2="6" y1="2" y2="4" />
            <line x1="10" x2="10" y1="2" y2="4" />
            <line x1="14" x2="14" y1="2" y2="4" />
          </svg>
          <span style={{ fontSize: "52px", fontWeight: 700, color: "#f0fdf4" }}>
            Coffee Brew Lab
          </span>
        </div>
        <p
          style={{
            fontSize: "28px",
            color: "#bbf7d0",
            margin: 0,
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Free coffee calculators and brew guides for every method
        </p>
      </div>
    ),
    { ...size }
  )
}
