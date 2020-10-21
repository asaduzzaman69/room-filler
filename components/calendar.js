import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'
// import 'react-nice-dates/build/style.css'

export default function Calendar({ settings }) {
    return (
        <DatePickerCalendar locale={enGB} />
    )
}