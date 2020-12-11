const express = require("express")
const path = require("path")
const uniqid = require("uniqid")
const { readDB, writeDB } = require("../library/utilities.js")

const { check, validationResult } = require("express-validator")

const router = express.Router()

const productsFilePath = path.join(__dirname, "products.json")

router.get("/:id", async (req, res, next) => {
  try {
    const productsDB = await readDB(productsFilePath)
    const product = productsDB.filter(product => product.ID === req.params.id)
    if (product.length > 0) {
      res.send(product)
    } else {
      const err = new Error()
      err.httpStatusCode = 404
      next(err)
    }
  } catch (error) {
    next(error)
  }
})

router.get("/", async (req, res, next) => {
  try {
    const productsDB = await readDB(productsFilePath)
    //console.log(productsDB)
    if (req.query && req.query.name) {
      const filteredproducts = productsDB.filter(
        product =>
          product.hasOwnProperty("name") &&
          product.name.toLowerCase() === req.query.name.toLowerCase()
      )
      res.send(filteredproducts)
    } else {
      res.send(productsDB)
    }
  } catch (error) {
    next(error)
  }
})

router.post(
  "/",
  [
    check("name")
      .isLength({ min: 4 })
      .withMessage("No way! Name too short!")
      .exists()
      .withMessage("Insert a name please!"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const err = new Error()
        err.message = errors
        err.httpStatusCode = 400
        next(err)
      } else {
        const productsDB = await readDB(productsFilePath)
        const newproduct = {
          ...req.body,
          ID: uniqid(),
          modifiedAt: new Date(),
        }

        productsDB.push(newproduct)

        await writeDB(productsFilePath, productsDB)

        res.status(201).send({ id: newproduct.ID })
      }
    } catch (error) {
      next(error)
    }
  }
)

router.delete("/:id", async (req, res, next) => {
  try {
    const productsDB = await readDB(productsFilePath)
    const newDb = productsDB.filter(product => product.ID !== req.params.id)
    await writeDB(productsFilePath, newDb)

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const productsDB = await readDB(productsFilePath)
    const newDb = productsDB.filter(product => product.ID !== req.params.id)

    const modifiedproduct = {
      ...req.body,
      ID: req.params.id,
      modifiedAt: new Date(),
    }

    newDb.push(modifiedproduct)
    await writeDB(productsFilePath, newDb)

    res.send({ id: modifiedproduct.ID })
  } catch (error) {
    next(error)
  }
})

module.exports = router