import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { useDispatch } from '../context/DispatchContext';

const riderIcon = divIcon({
  className: 'rider-marker-custom',
  html: '<div style="width:24px;height:24px;border-radius:50%;background:#e8342e;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export default function LiveTrackPage() {
  const { riders } = useDispatch();
  const onlineRiders = useMemo(() => riders.filter((r) => r.status === 'ONLINE'), [riders]);

  return (
    <div>
      <div className="mb-6">
        <span className="section-subtitle">Live Tracking</span>
        <h1 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem,4vw,2rem)' }}>
          Rider Tracking
        </h1>
        <div className="w-12 h-0.5 bg-[#e8342e] my-3" />
        <p className="text-gray-500 text-sm">Monitor rider locations and delivery progress.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <h2 className="font-semibold text-gray-900 mb-3">Active Riders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {riders.map((r) => (
            <div key={r.id} className="p-3 rounded-lg border border-gray-200">
              <p className="font-medium text-gray-900">{r.name}</p>
              <p className="text-xs text-gray-500">{r.status} · {r.distance} · {r.activeOrders} orders</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <h2 className="font-semibold text-gray-900 p-4 border-b border-gray-100">Map</h2>
        <div className="p-2">
          <MapContainer center={[51.5074, -0.1278]} zoom={12} className="w-full rounded-lg" style={{ height: 500 }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap" />
            {onlineRiders.map((r) => (
              <Marker key={r.id} position={[r.lat, r.lng]} icon={riderIcon}>
                <Popup>{r.name} · {r.activeOrders} active orders</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
