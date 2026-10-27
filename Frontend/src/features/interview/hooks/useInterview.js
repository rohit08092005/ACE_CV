import {getAllInterviewReports,generateInterviewReport,getInterviewReportById,generateResumePdf} from "../services/interview.api"
import { useCallback, useContext, useEffect, useRef } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"

const getRequestError = (requestError, fallback) => (
    requestError.code === "ECONNABORTED"
        ? "The server is taking too long to respond. Please try again."
        : requestError.response?.data?.message || fallback
)

export const useInterview =() =>{

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if(!context){
        throw new Error ("useInterview must be used within an InterviewProvider")
    }

    const {loading,setLoading,generating,setGenerating,downloadLoading,setDownloadLoading,report,setReport,reports,setReports,error,setError} =context
    const lastFetch = useRef(null)

    const generateReport = async ({jobDescription,selfDescription,resumeFile}) =>{
        setGenerating(true)
        setError("")
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (requestError) {
            throw new Error(
                getRequestError(requestError, "Unable to generate your interview plan. Please try again."),
                { cause: requestError }
            )
        } finally {
            setGenerating(false)
        }
}


   const getReportById = useCallback(async (interviewId) => {
        setLoading(true)
        setError("")
        setReport(null)
        try {
            const response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            setError(getRequestError(error, "Unable to load this interview plan. Please retry."))
            return null
        } finally {
            setLoading(false)
        }
    }, [setError, setLoading, setReport])

 const getReports = useCallback(async () => {
        setLoading(true)
        setError("")
        try {
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)
            return response.interviewReports
        } catch (error) {
            setError(getRequestError(error, "Unable to load your recent interview plans. Please retry."))
            setReports([])
            return []
        } finally {
            setLoading(false)
        }
    }, [setError, setLoading, setReports])

const getResumePdf = async (interviewReportId) => {
    setDownloadLoading(true)
    setError("")
        try {
            const response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
        }
        catch (requestError) {
            setError(getRequestError(requestError, "Unable to prepare the resume. Please try again."))
        } finally {
            setDownloadLoading(false)
        }
    }

     useEffect(() => {
        const requestKey = interviewId ? `report:${interviewId}` : "reports"
        if (lastFetch.current === requestKey) return
        lastFetch.current = requestKey

        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId, getReportById, getReports ])

    return { loading, generating, downloadLoading, report, reports, error, generateReport, getReportById, getReports, getResumePdf}
}