const express = require("express")
const multer = require("multer")
const { writeFile, createReadStream } = require("fs-extra")
const { pipeline } = require("stream")
const { join } = require("path")

const router = express.Router()

const upload = multer({})

const dataFolderPath = join(__dirname, "../../public")

router.post(
  "/uploadMultiple",
  upload.array("multipleAvatar", 3),
  async (req, res, next) => {
    try {
      const arrayOfPromises = req.files.map(file =>
        writeFile(join(dataFolderPath, file.originalname), file.buffer)
      )
      await Promise.all(arrayOfPromises)
      res.send("ok")
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

router.get("/:name/download", (req, res, next) => {
  const source = createReadStream(
    join(dataFolderPath, `${req.params.name}`)
  )
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${req.params.name}`
  )
  pipeline(source, res, error => next(error))
})

module.exports = router
