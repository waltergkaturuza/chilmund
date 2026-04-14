'use client'

import React, { useEffect, useRef } from 'react'

type Market = {
  country: string
  code: string
  lat: number
  lng: number
  desc: string
  highlight?: boolean
}

export function RegionalMarketsMap({ markets }: { markets: Market[] }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMap = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return

    let cancelled = false

    async function init() {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      if (cancelled || !mapRef.current) return

      const map = L.map(mapRef.current, {
        center: [-10, 28],
        zoom: 4,
        minZoom: 3,
        maxZoom: 7,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: false,
      })

      leafletMap.current = map

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      L.control.attribution({ prefix: false, position: 'bottomright' }).addTo(map)

      markets.forEach((m) => {
        const size = m.highlight ? 14 : 10
        const pulseSize = m.highlight ? 28 : 0

        const icon = L.divIcon({
          className: '',
          iconSize: [Math.max(size, pulseSize) + 4, Math.max(size, pulseSize) + 4],
          iconAnchor: [(Math.max(size, pulseSize) + 4) / 2, (Math.max(size, pulseSize) + 4) / 2],
          html: `
            <div style="position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
              ${m.highlight ? `<div style="position:absolute;width:${pulseSize}px;height:${pulseSize}px;border-radius:50%;background:rgba(37,99,235,0.25);animation:leaflet-pulse 2s ease-out infinite;"></div>` : ''}
              <div style="width:${size}px;height:${size}px;border-radius:50%;background:#2563eb;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4);position:relative;z-index:2;"></div>
            </div>
          `,
        })

        const marker = L.marker([m.lat, m.lng], { icon }).addTo(map)

        const popupContent = `
          <div style="min-width:200px;font-family:system-ui,sans-serif;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <img src="https://flagcdn.com/w40/${m.code}.png" srcset="https://flagcdn.com/w80/${m.code}.png 2x" width="28" height="21" alt="" style="border-radius:3px;" />
              <strong style="font-size:1.1rem;">${m.country}</strong>
            </div>
            <p style="margin:0;font-size:0.85rem;color:#94a3b8;line-height:1.4;">${m.desc}</p>
          </div>
        `

        marker.bindPopup(popupContent, {
          className: 'chilmund-popup',
          closeButton: true,
          maxWidth: 280,
        })

        marker.on('mouseover', () => marker.openPopup())
      })

      const style = document.createElement('style')
      style.textContent = `
        @keyframes leaflet-pulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .chilmund-popup .leaflet-popup-content-wrapper {
          background: #0f172a;
          color: white;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .chilmund-popup .leaflet-popup-tip {
          background: #0f172a;
          border-color: rgba(255,255,255,0.15);
        }
        .chilmund-popup .leaflet-popup-close-button {
          color: rgba(255,255,255,0.5);
        }
        .chilmund-popup .leaflet-popup-close-button:hover {
          color: white;
        }
      `
      document.head.appendChild(style)
    }

    init()

    return () => {
      cancelled = true
      if (leafletMap.current) {
        leafletMap.current.remove()
        leafletMap.current = null
      }
    }
  }, [markets])

  return (
    <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
      <div ref={mapRef} className="h-[450px] w-full md:h-[550px]" />
    </div>
  )
}
