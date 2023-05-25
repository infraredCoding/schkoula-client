import api from "../axios"
import { Exam } from "../interfaces/exams"

const createNewExam = (title: string, datetime: string) => {
    return api.post("exams/", {
        "title": title,
        "examDateTime": datetime,
    })
}

const editExam = (exam: Exam) => {
    return api.patch(`/exams/${exam.id}`, {
        "title": exam.title,
        "examDateTime": exam.examDateTime
    })
}

const deleteExam = (id: number) => {
    return api.delete(`exams/${id}`)
}

const getAllExams = () => {
    return api.get('/exams/')
}

const examService = {
    getAllExams,
    createNewExam,
    editExam,
    deleteExam
}

export default examService;