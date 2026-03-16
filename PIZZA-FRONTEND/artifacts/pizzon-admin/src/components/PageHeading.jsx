export default function PageHeading({ subtitle, title, description }) {
  return (
    <div className="mb-6 sm:mb-8">
      {subtitle && <span className="section-subtitle">{subtitle}</span>}
      <h1 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem,4vw,2rem)' }}>
        {title}
      </h1>
      <div className="w-12 h-0.5 bg-[#e8342e] my-3" />
      {description && <p className="text-gray-500 text-sm">{description}</p>}
    </div>
  );
}
