import { useState } from 'react';

function ConvertFile() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleFileUpload = async () => {
        if (selectedFiles.length === 0) {
            alert('กรุณาเลือกไฟล์');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('csvFiles', selectedFiles[i]);
        }

        try {
            const response = await fetch('https://convertfilecsv.onrender.com/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.blob();

                let filename = '';
                if (selectedFiles.length > 0) {
                    const firstFile = selectedFiles[0].name;

                    const match = firstFile.match(/(\d{6})_(ELOOP[A-Z]+)_File/);
                    if (match) {
                        filename = `${match[1]}_${match[2]}_File.csv`;
                    } else {
                        filename = 'merged_output.csv';
                    }
                }
                const url = window.URL.createObjectURL(result);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
            } else {
                console.error('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <>
            <div>
                <input type="file" multiple onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Upload Files</button>
            </div>
        </>
    );
}

export default ConvertFile