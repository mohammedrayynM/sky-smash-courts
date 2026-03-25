"use client";

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface BookingCalendarProps {
    onDateSelect: (date: Date) => void;
    selectedDate: Date;
}

export default function BookingCalendar({ onDateSelect, selectedDate }: BookingCalendarProps) {
    const [value, onChange] = useState<Value>(selectedDate);

    const handleDateChange = (newDate: Value) => {
        onChange(newDate);
        if (newDate instanceof Date) {
            onDateSelect(newDate);
        }
    };

    return (
        <div className="bg-card p-6 rounded-2xl shadow-xl border border-border">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                Select Date
            </h3>
            <div className="calendar-container">
                <Calendar
                    onChange={handleDateChange}
                    value={value}
                    minDate={new Date()}
                    className="bg-background text-foreground rounded-lg border-none w-full"
                    tileClassName={({ date, view }) => {
                        if (view === 'month') {
                            const day = date.getDay();
                            // Highlight weekends or specific days if needed
                            return 'hover:bg-primary/20 rounded-full transition-colors';
                        }
                        return null;
                    }}
                />
            </div>
            <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Selected: <span className="text-foreground font-medium">{format(selectedDate, 'MMMM do, yyyy')}</span>
            </p>
        </div>
    );
}
