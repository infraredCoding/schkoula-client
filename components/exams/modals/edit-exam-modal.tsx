import React, { useEffect, useState } from "react";
import { Exam } from "../../../interfaces/exams";

type modalProp = { 
  exam: Exam
  opened: boolean
  modalHandler: Function
  handleSubmission: Function
}

export default function EditExamModal({ exam, opened, modalHandler, handleSubmission }: modalProp) {
  const [title, setTitle] = useState('');
  const [datetime, setDatetime] = useState('');

  useEffect(() => {
    setTitle(exam.title)
    setDatetime(exam.examDateTime)
  }, [exam])
  

  return (
    <>
      {opened ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Exam: {exam.title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="w-full">
                    <form className="w-full text-sm flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Exam Title</label>
                            <input onChange={(e) => setTitle(e.target.value)} type="text" defaultValue={exam.title} className="bg-slate-50 px-4 py-3 rounded-sm focus:outline-purple-500 duration-150"/>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Exam Date</label>
                            <input defaultValue={new Date(exam.examDateTime.toString()).toISOString().split('T')[0]} type="date" onChange={(e) => setDatetime(e.target.value)} className="bg-slate-50 px-4 py-3 rounded-sm focus:outline-purple-500 duration-150"/>
                        </div>
                    </form>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => modalHandler()}
                  >
                    Close
                  </button>
                  <button
                    className="btn bg-purple-500 hover:bg-purple-700 text-white"
                    onClick={() => handleSubmission({id: exam.id, title: title, examDateTime: datetime} as Exam)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}