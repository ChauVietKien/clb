export default function InfoCard({ label, children, className = "" }) {
  return (
    <div
      className={`rounded-xl bg-[#fff8f4]/96 dark:bg-[#151924]/96 backdrop-blur-none sm:backdrop-blur-md border border-amber-900/15 dark:border-gray-800 border-l-4 border-l-amber-500 py-2.5 px-3.5 sm:py-3 sm:px-4 shadow-xs hover:shadow-md transition-all text-[13px] sm:text-sm md:text-base leading-snug ${className}`}
    >
      {label && (
        <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
          {label}
        </span>
      )}
      <span className="text-gray-700 dark:text-gray-300">{children}</span>
    </div>
  );
}
