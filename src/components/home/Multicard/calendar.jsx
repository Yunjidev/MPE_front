import { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';

const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const daysOfWeek = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Manually format the month and year in French
  const monthIndex = currentMonth.getMonth();
  const year = currentMonth.getFullYear();
  const monthYear = `${months[monthIndex]} ${year}`;

  const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const startDay = (startDate.getDay() || 7) - 1; // Adjust for week starting on Monday
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

  const days = Array.from({ length: startDay + daysInMonth }, (_, i) => 
    i < startDay ? '' : i - startDay + 1
  );

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-full sm:max-w-md md:max-w-3xl bg-neutral-800 shadow-lg rounded-lg border border-[#67FFCC]">
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={handlePreviousMonth}
            className="text-white"
            aria-label="Previous month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>
          <span className="text-lg text-white sm:text-xl font-semibold">{monthYear}</span>
          <button
            onClick={handleNextMonth}
            className="text-white"
            aria-label="Next month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr>
                {daysOfWeek.map(day => (
                  <th key={day} className="p-2 text-white text-xs sm:text-sm md:text-base">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.ceil(days.length / 7) }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {days.slice(rowIndex * 7, (rowIndex + 1) * 7).map((day, index) => (
                    <td key={index} className="p-2 text-center text-white text-xs sm:text-sm md:text-base">
                      {day ? (
                        <span className={`block p-2 rounded ${day === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth() ? 'bg-[#67FFCC] text-black' : 'text-white '}`}>
                          {day}
                        </span>
                      ) : (
                        <span className="block p-2 text-gray-400  "> </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
