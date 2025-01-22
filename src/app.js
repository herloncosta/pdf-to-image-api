import express from 'express'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import poppler from 'pdf-poppler'
import { upload } from './config/multer-config.js'

export const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())

app.post('/upload', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.')
    }
    const pdfPath = req.file.path
    const outputDir = path.join('converted')

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    const options = {
        format: 'jpeg',
        out_dir: outputDir,
        out_prefix: 'image',
        page: null,
    }

    try {
        await poppler.convert(pdfPath, options)
        const imageFiles = fs.readdirSync(outputDir)
        const imagePaths = imageFiles.map(file => path.join(outputDir, file))

        res.status(200).send({ message: 'PDF converted successfully.', files: imagePaths })
    } catch (err) {
        console.log(`Error converting file: ${err}`)
        res.status(500).send({ message: 'Error converting file.' })
    }
})

app.get('/download/:folder/:filename', (req, res) => {
    const folder = req.params.folder
    const filename = req.params.filename
    const filePath = path.join(__dirname, '..', folder, filename)

    if (fs.existsSync(filePath)) {
        res.download(filePath, filename, err => {
            if (err) {
                console.log(`Error downloading file: ${err}`)
                res.status(500).send('Error downloading file.')
            }
        })
    } else {
        res.status(404).send('File not found.')
    }
})
