import React, { useEffect, useState } from 'react'
import PriorityBadge from '../general/priority-badge'
import {BsCheckCircle, BsCheckCircleFill, BsPencil, BsTrash} from 'react-icons/bs'
import { Assignment } from '../../interfaces/assignments'
import api from '../../axios'

type AssignmentProps = {
  assignment: Assignment,

  handleDeleteFunc: Function,
  handleEditFunc: Function,
  handleStatusToggle: Function
}

const dateParser = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'})
}

export default function AssignmentListCard(props: AssignmentProps) {

  const [assignment, setAssignment] = useState<Assignment>(props.assignment);

  useEffect(() => {
    setAssignment(props.assignment)
  }, [props])
  

  const toggleAssignmentCompletion = () => {
    props.handleStatusToggle(props.assignment.id);
    setAssignment({id: props.assignment.id, title: props.assignment.title, deadline: props.assignment.deadline, priority: props.assignment.priority, completed: !assignment.completed})
  }

  return (
    <div className='flex justify-evenly px-10 py-7 rounded-md shadow-sm bg-white'>
        {assignment.completed ? 
          <BsCheckCircleFill onClick={toggleAssignmentCompletion} className='mr-5 cursor-pointer text-emerald-500 transition-all duration-200 hover:scale-125'/>:
          <BsCheckCircle onClick={toggleAssignmentCompletion} className='mr-5 cursor-pointer hover:text-emerald-500 transition-all duration-200 hover:scale-125'/>
        }
        <h2 className={`text-base font-bold text-slate-900 mt-1 ${assignment.completed ? 'line-through': ''}`}>
          {assignment.title}
        </h2>
        <PriorityBadge title={assignment.priority}></PriorityBadge>
        <div><p className='text-base font-bold mt-1'>{ dateParser(assignment.deadline) }</p></div>
        <div className='ml-3 flex gap-2'>
          <button onClick={() => props.handleEditFunc(assignment)} className='btn-sm bg-indigo-500 text-white hover:bg-indigo-700'>
            <BsPencil className='text-base'/>
          </button>
          
          <button onClick={() => props.handleDeleteFunc(assignment.id, assignment.title)} className='btn-sm bg-rose-500 text-white hover:bg-rose-700'>
            <BsTrash className='text-base'/>
          </button>
        </div>
    </div>
  )
}
