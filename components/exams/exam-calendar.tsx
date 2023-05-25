import dayjs from "dayjs"
import { useEffect, useState } from "react"
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"

type DateType = {
    date: dayjs.Dayjs
    currentMonth: boolean,
    today: boolean,
    event: boolean
}

export const ExamCalendar = () => {

    const [dates, setDates] = useState<Array<DateType>>([]);
    const [displayMonth, setDisplayMonth] = useState(dayjs().month());

    const generateDate = (month = dayjs().month(), year = dayjs().year()): void => {
        const firstDate = dayjs().year(year).month(month).startOf('month');
        const lastDate = dayjs().year(year).month(month).endOf('month');

        const dates: Array<DateType> = []

        // prefix dates
        for (let i = 0; i < firstDate.day(); i++) {
            dates.push({
                date: firstDate.day(i),
                currentMonth: false,
                today: false,
                event: false
            })
            
        }

        // month dates
        for(let i = firstDate.date(); i <= lastDate.date(); i++){
            dates.push({
                date: firstDate.date(i),
                currentMonth: true,
                today: firstDate.date(i).toDate().toDateString() === dayjs().toDate().toDateString(),
                event: false
            })
        }

        // suffix dates
        const remaining = 35 - dates.length;
        
        for (let i = lastDate.date()+1; i <= lastDate.date()+remaining; i++) {
            dates.push({
                date: lastDate.date(i),
                currentMonth: false,
                today: false,
                event: false
            })
        }

        setDates(dates)
    }

    const changeMonth = (offset: number) => {
        let newMonth = displayMonth + offset
        generateDate(newMonth)
        setDisplayMonth(newMonth)
    }

    const monthMap: Array<string> = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const daysOfWeek: Array<string> = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ]

    useEffect(() => {
      generateDate();
    }, [])
    

    return (
        <div className='w-full px-10 py-7 shadow-md hover:shadow-xl transition-all duration-300 bg-slate-100 rounded-2xl'>
            <div className="w-full px-5 flex justify-between pb-5">
                <button 
                    className="bg-slate-900 text-zinc-50 px-4 py-4 rounded-3xl"
                    onClick={() => changeMonth(-1)}
                >
                    <FaChevronLeft size={20}/>
                </button>
                
                <h1 className="text-center">{monthMap[displayMonth]}</h1>

                <button 
                    className="bg-slate-900 text-zinc-50 px-4 py-3 rounded-3xl"
                    onClick={() => changeMonth(1)}
                >
                    <FaChevronRight size={20}/>
                </button>
            </div>

            <div className="w-full grid grid-cols-7 justify-evenly">
                {daysOfWeek.map((day, idx) => {
                    return (
                        <div className="text-slate-500 text-center px-3 py-2.5">{day}</div>
                    )
                })}
                {dates.map((dates, idx) => {
                    return (
                        <div 
                            className={
                                `cursor-pointer mx-auto ${dates.today ? "bg-purple-500 text-zinc-50": ""} ${dates.currentMonth ? "text-slate-800": "text-slate-400"} px-3 py-2.5 rounded-full hover:bg-slate-900 hover:text-zinc-50 transition-all duration-300`
                            } key={idx}>
                            {dates.date.date()}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}