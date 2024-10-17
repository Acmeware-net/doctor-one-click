
interface Timing {
    
    // Days on for the doctor in a week
    workingDays: WorkingDay[];
    // Days off for the doctor in a week
    // e.g. Sat, Sun
    offDays: string[];
    // In case a doctor wants to take random days off in future then add dates in this array
    offDates: Date[];
    // Time gap between appointments
    // e.g. 15m | 30m | 1h | 2h
    interval: string;
    // TODO: if different interval is required for different days then move it to WorkingDay entity
}