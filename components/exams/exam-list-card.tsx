import { BsPencil, BsTrash } from "react-icons/bs";
import { IoIosCalendar, IoMdCalendar } from "react-icons/io"
import { Exam } from "../../interfaces/exams";
import { dateParser } from "../../utils/dateParser";

type ExamProps = {
    exam: Exam,
    handleEdit: Function,
    handleDelete: Function
}

export const ExamListCard = (props: ExamProps) => {
    return (
        <div className='flex flex-col justify-evenly px-10 py-7 rounded-md shadow-md bg-white hover:shadow-xl transition-all duration-300 cursor-pointer'>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {props.exam.title}
            </h2>

            <div className="flex gap-3 text-slate-600 mt-3">
                <IoMdCalendar className="text-2xl"/>
                <p className='text-xl'>
                    { dateParser(props.exam.examDateTime) }
                </p>
            </div>
            <div className='flex gap-2 mt-3'>
                <button className='btn-sm bg-indigo-500 text-white hover:bg-indigo-700'
                    onClick={() => props.handleEdit(props.exam)}>
                    <BsPencil className='text-base'/>
                </button>
            
                <button className='btn-sm bg-rose-500 text-white hover:bg-rose-700'
                    onClick={() => props.handleDelete(props.exam)}>
                    <BsTrash className='text-base'/>
                </button>
            </div>
        </div>
    )
}