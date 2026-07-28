export default function PageTitle({ title, subtitle, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-stone-900">{title}</h1>

        {subtitle && <p className="mt-2 text-stone-500">{subtitle}</p>}
      </div>

      {action}
    </div>
  );
}
