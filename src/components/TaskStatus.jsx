import React, { useEffect } from "react"

import { useToastify } from "../providers"
/*
Store
*/
import { useSnapshot } from 'valtio'
import state from  "../store"

const TaskStatus = (props) => {
    const snap = useSnapshot(state)

    const notifier = useToastify()

    const checkTaskStatus = async () => {
        try {
            const endpoint = `https://dttsrv.msunkara.de/convert/activetasks/${snap.conversion_srv_res.task_id}`
            const response = await fetch(endpoint, {
                method: "GET",
            })

            const data = await response.json()
            const stateSrv = data.state

            // Handle different task statuses
            if(stateSrv === "PENDING") {
                state.isPending = true
            }
            else if (stateSrv === "SUCCESS") {
                notifier.notifySuccess("Task completed successfully!")
                downloadFile(data.result)
                state.conversion_srv_res = {}
                state.isChecking = false
                state.isPending = false
            }
            else if (stateSrv === "FAILURE") {
                notifier.notifyError("Task failed!")
                conversion_srv_res = {}
                state.isChecking = false
                state.isPending = false
            }
        } catch (error) {
            notifier.notifyError("Error checking task status")
            state.isChecking = false
            state.isPending = false
        }
    }

    const downloadFile = async (fileName) => {
        try {
            let endpoint = `https://dttsrv.msunkara.de/convert/step2gltfDownload/${fileName}`
            let response = await fetch(endpoint, {
                method: "GET",
            })

            let data = await response.blob()
            const url = window.URL.createObjectURL(new Blob([data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', fileName)

            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link)

            notifier.notifyInfo(`${fileName} file downloaded successfully.`)
        } catch (error) {
            notifier.notifyError(`Error downloading the file with following: ${error}`)
            return
        }
    }

    // useEffect to run the checkTaskStatus function at intervals
    useEffect(() => {
        // Only start polling if we have a valid task ID
        if (snap.isChecking) {
            const intervalId = setInterval(() => {
                checkTaskStatus()
        }, 1000) // Poll every 5 seconds

        // Clean up the interval on component unmount or when task is done
        return () => clearInterval(intervalId)
    }}, [snap.isChecking])

    return (<div></div>)
}

export default TaskStatus