import { useDropzone } from 'react-dropzone'

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from  "../store"


const FileDrop = ({ onDrop }) => {
    const snap = useSnapshot(state)

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    })

    return (
    <div className={`h-full w-screen flex flex-col items-center justify-center text-center ${snap.isPending ? "pointer-events-none" : "pointer-events-auto"}`} {...getRootProps()}>
        <input {...getInputProps()} accept='.step' />

        {isDragActive ? (
            <p className="text-4xl font-bold text-emerald-800 pointer-events-none">Drop the file here...</p>
        ) : (
        <p className="text-4xl font-bold pointer-events-none">
            Drag {"'"}n{"'"} drop your STEP file {" "}
            <button className="text-emerald-800">here</button>
            {" "} or <span className="text-emerald-800">click</span> anywhere to <span className="text-emerald-800">upload!</span>
        </p>
    )}
    </div>)
}

export default FileDrop