export default function ProfileOptions() {
  return (
    <div className="w-48 bg-[#8B1818] rounded shadow-lg">
      <div className="flex flex-col text-white">
        <button
          onClick={() => console.log("Mentee Profile clicked")}
          className="px-4 py-3 text-left hover:bg-white/10 transition-colors"
        >
          Mentee Profile
        </button>

        {/* Gradient Line */}
        <div className="h-[1px] mx-4 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <button
          onClick={() => console.log("Mentor Profile clicked")}
          className="px-4 py-3 text-left hover:bg-white/10 transition-colors"
        >
          Mentor Profile
        </button>
      </div>
    </div>
  );
}
