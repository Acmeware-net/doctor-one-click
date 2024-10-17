interface WorkingDay {
    // e.g. Mon, Tue, Wed, Thu, Fri, Sat, Sun
    day: string;
    // Doctor's shift start time
    // e.g. 9a for 9am
    dailyStartTime: string;
    // Doctor's shift end time
    // e.g. 5p for 5pm
    dailyEndTime: string;
    // e.g. on = 1 and off = 0
    isAvailable: boolean;
}