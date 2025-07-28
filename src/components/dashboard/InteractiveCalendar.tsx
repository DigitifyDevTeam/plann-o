import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Columns3, Grid } from 'lucide-react';
import { addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, isSameMonth, isSameDay, addDays } from 'date-fns';
// Remove import type { Appointment } from '@/pages/dashboard/ProfessionalDashboard';
// Instead, define locally:
export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'canceled' | 'completed';
  type: 'physical' | 'teleconsultation';
  notes?: string;
  service?: string;
  prix?: number;
}

export type DayType = {
  day: string;
  classNames: string;
  meetingInfo?: Appointment[];
  specialType?: 'absence' | 'ferie';
  isToday?: boolean;
  isBeforeToday?: boolean;
  isAfterToday?: boolean;
  isSunday?: boolean;
  isGreen?: boolean;
};

interface DayProps {
  classNames: string;
  day: DayType;
  onHover: (day: string | null) => void;
  onDayClick: (day: DayType) => void;
}

const Day: React.FC<DayProps> = ({ classNames, day, onHover, onDayClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  // Determine if the day is inactive (low opacity background)
  const isInactive = classNames.includes('/20');
  const isSpecial = !!day.specialType;
  const isToday = day.isToday;
  return (
    <>
      <motion.div
        className={`relative flex items-center justify-center py-1 ${classNames} ${isInactive ? 'border border-[#5EE0C1] bg-white/80 shadow-sm' : ''}`}
        style={{ height: '4rem', borderRadius: 16 }}
        onMouseEnter={() => {
          setIsHovered(true);
          onHover(day.day);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHover(null);
        }}
        id={`day-${day.day}`}
        onClick={() => {
          if (!isSpecial && day.meetingInfo && day.meetingInfo.length > 0) {
            onDayClick(day);
          }
        }}
      >
        <motion.div className="flex flex-col items-center justify-center">
          {!(day.day[0] === '+' || day.day[0] === '-') && (
            <>
              <span className={`text-sm ${
                isInactive
                  ? 'text-[#37C9A1]'
                  : isSpecial
                    ? 'text-red-700 font-bold'
                    : day.isBeforeToday
                      ? 'text-[#37C9A1] font-semibold'
                      : 'text-white font-semibold'
              }`}>{day.day}</span>
          {isSpecial && (
                <span className="block text-[11px] mt-1 font-semibold text-red-600">
                  {day.specialType === 'absence' ? 'absence' : day.specialType === 'ferie' ? 'férié' : ''}
            </span>
              )}
            </>
          )}
          {isToday && (
            <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-blue-500"></span>
          )}
        </motion.div>
        {day.meetingInfo && !isSpecial && (
          <motion.div
            className="absolute bottom-1 right-1 flex size-5 items-center justify-center rounded-full bg-[#37C9A1] p-1 text-[10px] font-bold text-white"
            layoutId={`day-${day.day}-meeting-count`}
            style={{ borderRadius: 999 }}
          >
            {day.meetingInfo.length}
          </motion.div>
        )}
        <AnimatePresence>
          {day.meetingInfo && isHovered && (
            <div className="absolute inset-0 flex size-full items-center justify-center">
              <motion.div
                className="flex size-10 items-center justify-center bg-[#37C9A1] p-1 text-xs font-bold text-white"
                layoutId={`day-${day.day}-meeting-count`}
                style={{ borderRadius: 999 }}
              >
                {day.meetingInfo.length}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

const CalendarGrid: React.FC<{ onHover: (day: string | null) => void; onDayClick: (day: DayType) => void; days: DayType[] }> = ({ onHover, onDayClick, days }) => {
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, index) => (
        <Day
          key={`${day.day}-${index}`}
          classNames={day.classNames}
          day={day}
          onHover={onHover}
          onDayClick={onDayClick}
        />
      ))}
    </div>
  );
};

interface InteractiveCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  confirmedAppointments: Appointment[];
  joursAbsence?: (Date | string)[];
  joursFeries?: (Date | string)[];
  initialMonth?: Date;
  showAllSlots?: boolean;
}

const InteractiveCalendar = React.forwardRef<HTMLDivElement, InteractiveCalendarProps>(({ className, confirmedAppointments, joursAbsence = [], joursFeries = [], initialMonth, ...props }, ref) => {
  const [moreView, setMoreView] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  // 1. Add state to track selected day for details
  // 0. Import or define the correct Appointment type at the top:
  // import type { Appointment } from '@/types/planning.types';
  // Or define:
  // type Appointment = {
  //   title: string;
  //   time: string;
  //   duration: number;
  //   client: string;
  //   service: string;
  //   price: number;
  // };
  // 1. Move selectedDay state and details panel rendering to the root of the component (not inside Day)
  const [selectedDay, setSelectedDay] = useState<null | { date: Date; appointments: Appointment[] }>(null);
  const [currentMonth, setCurrentMonth] = useState(initialMonth || new Date()); // Use initialMonth if provided

  // Build a map of confirmed appointments by date (YYYY-MM-DD)
  const appointmentsByDate = React.useMemo(() => {
    const map: Record<string, Appointment[]> = {};
    confirmedAppointments.forEach(app => {
      if (!map[app.date]) map[app.date] = [];
      map[app.date].push(app);
    });
    return map;
  }, [confirmedAppointments]);

  // Generate days for the current month (with leading/trailing days for full weeks)
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days: DayType[] = [];
  let day = startDate;
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  while (day <= endDate) {
    const dateStr = format(day, 'yyyy-MM-dd');
    const dayNum = format(day, 'dd');
    const isCurrentMonth = isSameMonth(day, monthStart);
    const isSunday = day.getDay() === 0;
    // For each day, check if it's in joursAbsence or joursFeries
    const isSpecialDay = (dateStr: string) => {
      return (
        joursAbsence.some(d => format(new Date(d), 'yyyy-MM-dd') === dateStr) ||
        joursFeries.some(d => format(new Date(d), 'yyyy-MM-dd') === dateStr)
      );
    };
    const getSpecialType = (dateStr: string) => {
      if (joursAbsence.some(d => format(new Date(d), 'yyyy-MM-dd') === dateStr)) return 'absence';
      if (joursFeries.some(d => format(new Date(d), 'yyyy-MM-dd') === dateStr)) return 'ferie';
      return null;
    };
    // Determine if the day is before, after, or today
    const isBeforeToday = day < today && isCurrentMonth;
    const isAfterToday = day > today && isCurrentMonth;
    const isToday = dateStr === todayStr;
    const isGreen = isCurrentMonth && !isBeforeToday && !isSunday;
    days.push({
      day: dayNum,
      classNames: isCurrentMonth
        ? isSpecialDay(dateStr)
          ? getSpecialType(dateStr) === 'absence'
            ? 'bg-red-200 border border-red-500 text-red-700 cursor-not-allowed relative'
            : 'bg-red-100 border border-red-400 text-red-700 cursor-not-allowed relative'
          : isToday
            ? 'bg-blue-100 border-2 border-blue-500 text-blue-700 font-bold cursor-pointer relative'
            : isGreen
              ? 'bg-[#5EE0C1] text-white cursor-pointer'
              : 'bg-white text-[#37C9A1] border border-[#5EE0C1]'
        : 'bg-[#37C9A1]/20',
      meetingInfo: appointmentsByDate[dateStr] || undefined,
      specialType: getSpecialType(dateStr),
      isToday,
      isBeforeToday,
      isAfterToday,
      isSunday,
      isGreen,
    });
    day = addDays(day, 1);
  }

  const handleDayHover = (day: string | null) => {
    setHoveredDay(day);
  };

  const handleDayClick = (day: DayType) => {
    // Only allow clicking days with appointments (dashboard logic)
    if (!day.meetingInfo || day.meetingInfo.length === 0) return;
    setSelectedDay({ date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), parseInt(day.day)), appointments: day.meetingInfo });
  };

  // In sortedDays and moreView, use the days array (DayType[]) for rendering, not confirmedAppointments (Appointment[])
  // Remove any code that tries to access meetingInfo or day on an Appointment object
  // Only access those properties on DayType objects
  const sortedDays = React.useMemo(() => {
    if (!hoveredDay) return days; // Use the days array directly
    return [...days].sort((a, b) => {
      if (a.day === hoveredDay) return -1;
      if (b.day === hoveredDay) return 1;
      return 0;
    });
  }, [hoveredDay, days]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={ref}
        className="relative mx-auto my-10 flex w-full flex-col items-center justify-center gap-8 lg:flex-row"
        {...props}
      >
        <motion.div className="w-full max-w-lg">
          <motion.div key="calendar-view" className="flex w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between">
              <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="text-[#37C9A1] font-bold text-2xl px-2">{'<'}</button>
              <motion.h2 className="mb-2 text-4xl font-bold tracking-wider text-[#37C9A1]">
                Agenda <span className="opacity-50">{format(currentMonth, 'MMMM yyyy')}</span>
              </motion.h2>
              <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-[#37C9A1] font-bold text-2xl px-2">{'>'}</button>
              <motion.button
                className="relative flex items-center gap-3 rounded-lg border border-[#5EE0C1] px-1.5 py-1 text-[#37C9A1]"
                onClick={() => setMoreView(!moreView)}
              >
                <Columns3 className="z-[2]" />
                <Grid className="z-[2]" />
                <div
                  className="absolute left-0 top-0 h-[85%] w-7 rounded-md bg-[#5EE0C1] transition-transform duration-300"
                  style={{
                    top: '50%',
                    transform: moreView
                      ? 'translateY(-50%) translateX(40px)'
                      : 'translateY(-50%) translateX(4px)',
                  }}
                ></div>
              </motion.button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="px-0/5 rounded-xl bg-[#5EE0C1] py-1 text-center text-xs text-white"
                >
                  {day}
                </div>
              ))}
            </div>
            <CalendarGrid onHover={handleDayHover} onDayClick={handleDayClick} days={days} />
          </motion.div>
        </motion.div>
        {moreView && (
          <motion.div
            className="w-full max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div key="more-view" className="mt-4 flex w-full flex-col gap-4">
              <div className="flex w-full flex-col items-start justify-between">
                <motion.h2 className="mb-2 text-4xl font-bold tracking-wider text-[#37C9A1]">
                  Bookings
                </motion.h2>
                <p className="font-medium text-[#37C9A1]/50">
                  See upcoming and past events booked through your event type links.
                </p>
              </div>
              <motion.div
                className="flex h-[620px] flex-col items-start justify-start overflow-hidden overflow-y-scroll rounded-xl border-2 border-[#5EE0C1] shadow-md"
              >
                {sortedDays
                  .filter((day) => day.meetingInfo)
                  .map((day) => (
                    <motion.div
                      key={day.day}
                      className={`w-full border-b-2 border-[#5EE0C1] py-0 last:border-b-0`}
                    >
                      {day.meetingInfo &&
                        day.meetingInfo.map((meeting, mIndex) => (
                          <motion.div
                            key={mIndex}
                            className="border-b border-[#5EE0C1] p-3 last:border-b-0"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, delay: mIndex * 0.05 }}
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-sm text-[#37C9A1]">
                                {meeting.date}
                              </span>
                              <span className="text-sm text-[#37C9A1]">
                                {meeting.time}
                              </span>
                            </div>
                            <h3 className="mb-1 text-lg font-semibold text-[#37C9A1]">
                              {meeting.service || 'Rendez-vous'}
                            </h3>
                            <p className="mb-1 text-sm text-[#37C9A1]/80">
                              {meeting.clientName}
                            </p>
                            <div className="flex items-center text-[#5EE0C1]">
                              <svg
                                className="mr-1 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="text-sm">
                                {meeting.type === 'physical' ? 'Sur place' : 'En ligne'}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        {selectedDay && (
          <motion.aside
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 p-6 overflow-y-auto"
          >
            <button
              className="absolute top-4 right-4 text-[#37C9A1] hover:text-[#5EE0C1] text-2xl"
              onClick={() => setSelectedDay(null)}
              aria-label="Fermer"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-4 text-[#37C9A1]">Détails du {selectedDay.date.toLocaleDateString('fr-FR')}</h3>
            <ul className="space-y-2">
              {selectedDay.appointments.map((rdv, idx) => (
                <li key={idx} className="border-l-4 border-[#5EE0C1] pl-4 py-2 bg-[#F8FFFE] rounded">
                  <div className="font-semibold text-lg">{rdv.service || 'Rendez-vous'}</div>
                  <div className="text-sm text-gray-600">{rdv.time} – {rdv.duration} min</div>
                  <div className="text-sm text-gray-600">Client : {rdv.clientName}</div>
                  <div className="text-sm text-gray-600">Service : {rdv.service}</div>
                  <div className="text-sm text-gray-600">Prix : {rdv.prix || 0} €</div>
                </li>
              ))}
            </ul>
          </motion.aside>
        )}
      </motion.div>
    </AnimatePresence>
  );
});
InteractiveCalendar.displayName = 'InteractiveCalendar';

export default InteractiveCalendar;

const daysOfWeek = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM']; 