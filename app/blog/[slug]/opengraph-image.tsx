import { ImageResponse } from "next/og"
import { getPostBySlug } from "@/lib/blog"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  return [
    {
      id: slug,
      alt: post?.title ?? "Coffee Brew Lab",
    },
  ]
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const title = post?.title ?? "Coffee Brew Lab"
  const category = post?.category ?? "Brew Guide"

  return new ImageResponse(
    (
      <div
        style={{
          background: "#166534",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
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
          <span style={{ fontSize: "28px", fontWeight: 600, color: "#bbf7d0" }}>
            Coffee Brew Lab
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#4ade80",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {category}
          </span>
          <p
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "#f0fdf4",
              margin: 0,
              lineHeight: 1.15,
              maxWidth: "950px",
            }}
          >
            {title}
          </p>
        </div>
      </div>
    ),
    { ...size }
  )
}
