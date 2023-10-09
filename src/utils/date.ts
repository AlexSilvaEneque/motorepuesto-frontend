import { format } from 'date-fns'

export const convertoDDMMYYYY = (isoDate : any) => {
    const newDate = new Date(isoDate)
    const formattedDate = format(newDate, 'dd/MM/yyyy')
    return formattedDate
}