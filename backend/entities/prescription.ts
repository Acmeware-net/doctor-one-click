

export default interface Prescription{
    // Name of medication
    name: string;
    // Dose e.g. in milligrams
    dose: string;
    // Number of pills taken at a time
    number: string;
    // e.g. cream/oral/injection
    route: string;
    // e.g. Taken in the morning or night or twice a day
    frequency: string;
    // e.g. How many pills in a bottle? (number x frequency x days)
    dispensed: string;
    // e.g. Can take refills?
    refills: boolean;
    // e.g. Can be replaced with another medicine?
    substitute: boolean;
}