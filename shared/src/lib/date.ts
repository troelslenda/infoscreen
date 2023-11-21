    export const firstDayOfWeek = (d: Date) =>
    new Date(new Date(d).setDate(new Date(d).getDate() - (new Date(d).getDay() - 1)));

export const startOfDay = (d: Date): Date =>
    new Date(new Date(d).setHours(0, 0, 0, 0));

export const endOfDay = (d: Date): Date =>
    new Date(new Date(new Date(d).setHours(23, 59, 59, 999)));


export const addOneWeek = (d: Date): Date =>
    new Date(new Date(d).setDate(new Date(d).getDate() + 7));

