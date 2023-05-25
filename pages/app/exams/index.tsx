import Head from "next/head"
import { useEffect, useState } from "react"
import { BsPencil, BsPlusCircle, BsTrash } from "react-icons/bs"
import { ExamListCard } from "../../../components/exams/exam-list-card";
import AddExamModal from "../../../components/exams/modals/add-exam-modal";
import { Exam } from "../../../interfaces/exams";
import EditExamModal from "../../../components/exams/modals/edit-exam-modal";
import examService from "../../../services/ExamService";
import DeleteExamModal from "../../../components/exams/modals/del-exam-modal";

export default function Exams() {
    const [exams, setExams] = useState<Array<Exam>>([]);

    const [examToEdit, setExamToEdit] = useState<Exam>({} as Exam)
    const [examToDelete, setExamToDelete] = useState<Exam>({} as Exam)

    // modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
      examService.getAllExams().then(res => {
        console.log(res.data)
        setExams(res.data)
    }).catch(err=> console.log(err))
    }, [])
    

    const toggleAddModal = () => {
        setShowAddModal(!showAddModal);
    }

    const toggleUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
    }

    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }

    // button presses
    const handleEditPress = (exam: Exam) => {
        setExamToEdit(exam)
        toggleUpdateModal()
    }

    const handleDelPress = (exam: Exam) => {
        setExamToDelete(exam)
        toggleDeleteModal()
    }
    // actions
    const addNewExam = (exam: Exam) => {
        let copy = [...exams]
        copy.push(exam)
        setExams(copy)

        examService.createNewExam(exam.title, exam.examDateTime).then(res => {
            console.log(`new exam has been added ${res.data}`)
        }).catch(err => console.log(err))

        toggleAddModal()
    }

    const updateExam = (editedExam: Exam) => {
        setExams(prevState => prevState.map(exam => (
            exam.id === examToEdit.id ?
            { ...exam, title: editedExam.title, examDateTime: editedExam.examDateTime} as Exam
            : exam
        )))
        
        examService.editExam(editedExam).then(res => {
            console.log(`exam ${editedExam.id} has been edited ${res.data}`)
        }).catch(err => console.log(err))

        toggleUpdateModal()
    }

    const deleteExam = (id: number) => {
        let newExams = exams.filter(e => e.id !== id)
        setExams(newExams);
        
        examService.deleteExam(id).then(res => {
            console.log(`exam ${id} has been deleted`)
        }).catch(err => console.log(err))

        toggleDeleteModal();
    }

    return (
        <div className="min-w-screen min-h-screen mx-auto text-3xl text-slate-800 bg-slate-50 font-poppins">
            <Head>
                <title>Exams - Schkoula</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1 className='text-slate-800 text-center py-10'>Exams</h1>

            <div className="flex w-5/6 mx-auto justify-end gap-3 pb-5">
                <button className='btn bg-purple-700 text-zinc-50 hover:bg-purple-800' 
                    onClick={() => toggleAddModal()}
                >
                    <BsPlusCircle className='text-xl font-bold'/>
                    Add Exam
                </button>
            </div>

            <div className="w-5/6 grid grid-cols-3 gap-6 rounded-lg mx-auto">
                <AddExamModal 
                    opened={showAddModal}
                    modalHandler={toggleAddModal} 
                    handleSubmission={addNewExam}></AddExamModal>

                <EditExamModal 
                    exam={examToEdit}
                    opened={showUpdateModal}
                    modalHandler={toggleUpdateModal}
                    handleSubmission={updateExam}></EditExamModal>
                    
                <DeleteExamModal
                    exam={examToDelete}
                    opened={showDeleteModal}
                    toggleHandler={toggleDeleteModal}
                    handleDelete={deleteExam}
                ></DeleteExamModal>
                
                {exams.map((exam, idx) => {
                    return (
                        <ExamListCard key={idx} exam={exam} handleEdit={handleEditPress} handleDelete={handleDelPress}></ExamListCard>
                    )
                })}       
            </div>
        </div>
    )
}