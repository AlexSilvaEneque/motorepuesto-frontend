import { format } from 'date-fns'

// export const convertoDDMMYYYY = (isoDate : any) => {
//     const newDate = new Date(isoDate)
//     const formattedDate = format(newDate, 'dd/MM/yyyy')
//     return formattedDate
// }

export const convertoDDMMYYYY = (isoDate : any) => {
    const newDate = new Date(isoDate);
    const adjustedDate = new Date(newDate.valueOf() + newDate.getTimezoneOffset() * 60 * 1000);
    const formattedDate = format(adjustedDate, 'dd/MM/yyyy');
    return formattedDate;

}