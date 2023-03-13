import Head from 'next/head';
import React, {useState, useEffect} from 'react'
import { BsPlusCircle } from 'react-icons/bs'
import api from '../../../axios';
import AssignmentListCard from '../../../components/assignments/assignment-list-card'
import AddAssignmentModal from '../../../components/assignments/modals/add-assignment'
import DeleteAssignmentModal from '../../../components/assignments/modals/delete-assignment';
import EditAssignmentModal from '../../../components/assignments/modals/edit-assignment';
import { Assignment } from "../../../interfaces/assignments";
import AssignmentService from '../../../services/AssignmentService';

type AssignmentHost = {
  id: Number,
  title: String
}

export default function Assignments() {
  // assignments
  const [assignments, setAssignments] = useState<Array<Assignment>>([]);

  // modal toggle data
  const [ showAddModal, setShowAddModal ] = useState(false);
  const [ showDelModal, setShowDelModal ] = useState(false);
  const [ showEditModal, setShowEditModal ] = useState(false);
  // selected assignment for modal
  const [ selectedModal, setSelectedModal ] = useState<AssignmentHost>({} as AssignmentHost)
  const [ editAssignment, setEditAssignment ] = useState<Assignment>({} as Assignment)

  useEffect(() => {
    AssignmentService.getAllAssignments().then(res => {
      setAssignments(res.data)
    })
    .catch(err => console.log(err))
  }, [])
  
  // modal toggle
  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  }

  const toggleDeleteModal = () => {
    setShowDelModal(!showDelModal);
  }

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  }

  // handle delete & edit buttons
  const handleEditButtonPress = (assignment: Assignment) => {
    setEditAssignment(assignment);
    toggleEditModal();
  }

  const handleDeleteButtonPress = (id: Number, title: String) => {
    setSelectedModal({id: id, title: title});
    toggleDeleteModal();
  }

  // CRUD operations

  // create
  const handleSubmission = (title: String, priority: String, deadline: String) => {
    AssignmentService.createNewAssignment(title, priority, deadline).then(res => {
      let copy = [...assignments]
      copy.push({id: res.data.id, title: title, priority: priority, deadline: deadline, completed: res.data.completed} as Assignment)
      setAssignments(copy)
      toggleAddModal()
    })
    .catch(err => console.log(err))
  }

  // edit assignment
  const handleEdit = (title: string, priority: string, deadline: string) => {
    AssignmentService.editAssignment(editAssignment.id, title, priority, deadline).then(res => {
      setAssignments(prevState => prevState.map(a => (
        a.id == editAssignment.id ?
        { ...a, title: title, priority: priority, deadline: deadline, completed: editAssignment.completed} as Assignment
        : a
      )))
    }).catch(err => console.log(err))
  }

  // toggle completion status
  const toggleAssignmentCompletion = (id: number) => {
    AssignmentService.toggleAssignmentStatus(id)
      .then(res => {
        setAssignments(prevState => prevState.map(a => (
          a.id == id ?
          { ...a, completed: res.data.completed} as Assignment
          : a
        )))
      }).catch(err => console.log(err))
  }

  // delete
  const handleDelete = (id: number) => {
    AssignmentService.deleteAssignment(id).then(res => {
      console.log(res)
      let newAssignments: Array<Assignment> = assignments.filter(a => a.id != id);
      setAssignments(newAssignments);
      toggleDeleteModal();
    }).catch(err => console.log(err))
  }

  return (
    <div className='min-w-screen min-h-screen mx-auto text-3xl text-slate-800 bg-slate-50 font-poppins'>
      
      <Head>
        <title>My Assignments - Schkoula</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='text-slate-800 text-center py-10'>My Assignments</h1>
      <div className="flex w-5/6 mx-auto justify-end gap-3 pb-5">
        <button 
          className='btn bg-purple-700 text-zinc-50 hover:bg-purple-800'
          onClick={toggleAddModal}
        >
          <BsPlusCircle className='text-xl font-bold'/>
          Add Assignment
        </button>
      </div>
      <div className="w-5/6 flex flex-col gap-6 rounded-lg mx-auto">
        {/* Modals */}
        <AddAssignmentModal actionHandler={handleSubmission} opened={showAddModal} toggleHandler={toggleAddModal}></AddAssignmentModal>

        <DeleteAssignmentModal 
          opened={showDelModal} 
          toggleHandler={toggleDeleteModal} 
          handleDelete={handleDelete}
          assignmentId={selectedModal.id} 
          assignmentTitle={selectedModal.title}></DeleteAssignmentModal>

        <EditAssignmentModal opened={showEditModal} editHandler={handleEdit} toggleHandler={toggleEditModal} assignment={editAssignment}></EditAssignmentModal>

        {/* display assignments */}
        {assignments.map((assignment, idx) => {
          return (
            <AssignmentListCard 
              key={idx} 
              handleStatusToggle={toggleAssignmentCompletion} 
              handleDeleteFunc={handleDeleteButtonPress} 
              handleEditFunc={handleEditButtonPress} 
              assignment={assignment}
            ></AssignmentListCard>
          )
        })}
      </div>
    </div>
  )
}
