// create new assignment
import api from "../axios"

const createNewAssignment = (title: String, priority: String, deadline: String) => {
    return api.post("assignments/", {
        "title": title,
        "priority": priority,
        "deadline": deadline
    })
}

const editAssignment = (id: number, title: string, priority: string, deadline: string) => {
    return api.patch(`/assignments/${id}`, {
        "title": title,
        "priority": priority,
        "deadline": deadline
    })
}

const toggleAssignmentStatus = (id: number) => {
    return api.post(`/assignments/toggle/${id}`)
}

const deleteAssignment = (id: number) => {
    return api.delete(`assignments/${id}`)
}

const getAllAssignments = () => {
    return api.get('/assignments/')
}

const AssignmentService = {
    getAllAssignments,
    createNewAssignment,
    editAssignment,
    deleteAssignment,
    toggleAssignmentStatus
}

export default AssignmentService;