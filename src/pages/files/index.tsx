import React, { useState } from "react";


interface UploadProps {
    maxFileSize: number
    fileTypes: string[]
}

const Upload = ({ maxFileSize, fileTypes }: UploadProps) => {
    const [file, setFile] = useState()
    const [error, setError] = useState('')

    const validateFile = (file: File) => {
        if (!fileTypes.includes(file.type)) {
            setError("Invalid file type")
            return false
        }
        if (file.size > maxFileSize) {
            setError("File too large")
            return false
        }
        return true
    }

    const handleFile = (e) => {
        return
    }

    const handleSubmit = (e: React.FormEvent) => {
        return
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div>
                <input type="file" name="file" onChange={handleFile} accept={fileTypes.join(',')} />
                <button type="submit">Upload</button>
            </div>
        </form>
    )
}


interface Props {
}

const Page: React.FC<Props> = () => {
    return (
        <div>
            <h1>Files</h1>
        </div>
    );
}



export default Page