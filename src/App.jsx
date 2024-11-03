import { useCallback, useMemo } from 'react'
import { FileDrop, Footer, TaskStatus, Nav, Notice } from './components'

import { useToastify } from "./providers"

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "./store"

function App() {
  const snap = useSnapshot(state)

  const notifier = useToastify()

  const shouldUpdate = snap.conversion_srv_res.status === "Submitted"

  const onDrop = useCallback(async (acceptedFiles) => {
    if(acceptedFiles.length > 1){
      notifier.notifyError("Currently only one file per conversion is accepted!")
      return
    }

    const inFile = acceptedFiles[0]
    const kb = Math.round((inFile.size / 1024))
    const fileSizeInMB = Math.round((kb / 1024))

    if(fileSizeInMB >= 20) {
      notifier.notifyError("Max supported file size is 20mb. Please select a smaller file.")
      return
    }

    const fileExtension = inFile.path?.split('.').pop() === 'step' || 'STEP'
    if(!fileExtension){
      notifier.notifyError("Please upload only STEP files for conversion.")
      return
    }

    const formData = new FormData()
    formData.append("input_step_file", inFile)

    try {
      const endpoint = "https://dttsrv.msunkara.de/convert/step2gltf/"

      await fetch(endpoint, {
        method: "POST",
        body: formData
      }).then(res => res.json()).then((data) => {
        if(!data){
          notifier.notifyError("Error in conversion. Check on server side for more details.")
          return
        }
        state.conversion_srv_res = data
        state.isChecking = true
      })
    } catch (error) {
      notifier.notifyError(`Conversion server failed with following error: ${error}`)
      return
    }


  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-300">
      <Nav/>
      <Notice />
      <main className="flex flex-col items-center justify-center flex-1">
        {shouldUpdate && <TaskStatus />}
        <FileDrop onDrop={onDrop} />
        <div className='flex flex-col items-center justify-center flex-1'>
          {snap.isPending ?
          <p className='pointer-events-none font-bold text-sm'>Task Status: <span className='font-bold text-emerald-800'>"Get your 🍵 and wait for the magic to happen!"</span></p> :
          <></>}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
