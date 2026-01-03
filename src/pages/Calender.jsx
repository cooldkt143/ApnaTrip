import { useEffect, useState } from "react";

export default function Calender() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthDate, setMonthDate] = useState(new Date());
  const [trips, setTrips] = useState(
    JSON.parse(localStorage.getItem("myTrips")) || []
  );
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    localStorage.setItem("myTrips", JSON.stringify(trips));
  }, [trips]);

  const getWeekStart = (date) => {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay());
    return d;
  };

  const isDateInRange = (date, start, end) =>
    date >= new Date(start) && date <= new Date(end);

  const weekStart = getWeekStart(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const renderMonthDays = () => {
    const days = [];
    const firstDay = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      1
    ).getDay();
    const lastDate = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + 1,
      0
    ).getDate();

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= lastDate; d++) days.push(d);
    return days;
  };

  const openModal = (day = null) => {
    if (day) {
      setForm((f) => ({
        ...f,
        startDate: day.toISOString().split("T")[0],
      }));
    }
    setShowModal(true);
  };

  const saveTrip = () => {
    if (!form.destination || !form.startDate || !form.endDate) return;
    setTrips([...trips, form]);
    setForm({ destination: "", startDate: "", endDate: "", description: "" });
    setShowModal(false);
  };

  const resetAll = () => {
    if (!confirm("Delete all trips?")) return;
    setTrips([]);
    localStorage.removeItem("myTrips");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,#1e6f6a,transparent_40%),radial-gradient(circle_at_bottom_left,#0b3c3f,transparent_45%),linear-gradient(135deg,#0a2f33,#0f4d4f)] p-5">

      <div className="flex h-[calc(100vh-40px)] rounded-2xl overflow-hidden bg-[#0a1416]/70 backdrop-blur-xl shadow-2xl">

        {/* LEFT SIDEBAR */}
        <aside className="w-60 bg-[#0c2023]/90 p-4 hidden md:block">
          <div className="flex justify-between items-center mb-2">
            <button onClick={() => setMonthDate(new Date(monthDate.setMonth(monthDate.getMonth() - 1)))}>‹</button>
            <h3 className="font-semibold">
              {monthDate.toLocaleString("default", { month: "long", year: "numeric" })}
            </h3>
            <button onClick={() => setMonthDate(new Date(monthDate.setMonth(monthDate.getMonth() + 1)))}>›</button>
          </div>

          <div className="grid grid-cols-7 text-center text-xs text-teal-200">
            {"SMTWTFS".split("").map(d => <span key={d}>{d}</span>)}
          </div>

          <div className="grid grid-cols-7 text-center mt-2">
            {renderMonthDays().map((d, i) =>
              d ? (
                <span
                  key={i}
                  className="p-2 rounded-full cursor-pointer hover:bg-white/10"
                  onClick={() => {
                    const newDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), d);
                    setCurrentDate(newDate);
                    openModal(newDate);
                  }}
                >
                  {d}
                </span>
              ) : (
                <span key={i}></span>
              )
            )}
          </div>
        </aside>

        {/* CENTER */}
        <main className="flex-1 p-4">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)))}>◀</button>
            <h2 className="font-semibold">
              {weekDays[0].toDateString()} – {weekDays[6].toDateString()}
            </h2>
            <button onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)))}>▶</button>

            <button
              onClick={resetAll}
              className="ml-auto px-3 py-1 text-red-400 border border-white/20 rounded-lg hover:bg-white/10"
            >
              Reset All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 border border-white/10 rounded-xl overflow-hidden">
            {weekDays.map(day => (
              <div key={day} className="border-l border-white/10 min-h-[420px]">
                <div className="bg-white/10 text-center py-2 font-medium">
                  {day.toDateString().slice(0, 10)}
                </div>

                <div
                  className="p-2 cursor-pointer"
                  onClick={() => openModal(day)}
                >
                  {trips.map((t, i) =>
                    isDateInRange(day, t.startDate, t.endDate) && (
                      <div
                        key={i}
                        className="mb-2 rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-500 text-black px-2 py-1 text-sm font-semibold shadow"
                      >
                        {t.destination}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* RIGHT */}
        <aside className="w-64 bg-[#0c2023]/90 p-4 hidden lg:block">
          <h3 className="font-semibold mb-3">My Trips</h3>

          {!trips.length && <p className="text-teal-200">No trips yet</p>}

          {trips.map((t, i) => (
            <div key={i} className="mb-2 p-3 bg-white/10 rounded-lg border-l-4 border-yellow-400">
              <strong>{t.destination}</strong>
              <div className="text-xs text-teal-200">
                {t.startDate} → {t.endDate}
              </div>
            </div>
          ))}

          <button
            onClick={() => openModal()}
            className="mt-3 w-full py-2 border border-dashed border-white/30 rounded-lg text-teal-200 hover:bg-white/10"
          >
            + Create Trip
          </button>
        </aside>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#14282d] p-5 rounded-xl w-80">
            <h3 className="font-semibold mb-2">Add Trip</h3>

            {["destination", "startDate", "endDate"].map((f) => (
              <input
                key={f}
                type={f.includes("Date") ? "date" : "text"}
                placeholder={f}
                className="w-full mb-2 p-2 rounded bg-white/10"
                value={form[f]}
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              />
            ))}

            <textarea
              placeholder="Description"
              className="w-full mb-3 p-2 rounded bg-white/10"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <div className="flex gap-2">
              <button onClick={saveTrip} className="flex-1 bg-yellow-400 text-black py-1 rounded">
                Save
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-600 py-1 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
