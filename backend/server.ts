import csvToJson from "convert-csv-to-json";
import cors from 'cors';
import express from 'express';
import multer from "multer";

const app = express()
const port = process.env.PORT ?? 3000

const storage = multer.memoryStorage()
const upload = multer({ storage })

let userData :  Array<Record<string, string>> = []

app.use(cors())

app.post("/api/files", upload.single("file"), async (req, res) => {


    const {file} = req

    if(!file){
        return res.status(500).json({message:"file is required"})
    }

    if(file.mimetype === "text/csv"){
        return res.status(500).json({message:"file must be CSV"})
    }

    let json: Array<Record<string, string>> = []

    try {
      const rawCsv = Buffer.from(file.buffer).toString("utf-8")
      console.log(rawCsv)

       json = csvToJson.csvStringToJson(rawCsv)
    } catch (error) {
      return res.status(500).json({message: "error parsing the file"})
    }

    userData = json


    return res.status(200).json({ data: json, message: "EL archivo se cargo correctamente" })
})

app.get("/api/users", async (req, res) => {

    const {q} = req.query

    if(!q) {
        return res.status(500).json({
            message:"query param `q` is required"
        })
    }

    if(Array.isArray(q)){
        return res.status(500).json({
            message:"query param `q` must be a string"
        })
    }

    const search = q.toString().toLowerCase()


    const filteredData = userData.filter(row =>{
        

    })

    return res.status(200).json({ data: [] })
})

app.listen(port, () => {
    console.log(`server esta corriendo en http://localhost:${port}`)

})