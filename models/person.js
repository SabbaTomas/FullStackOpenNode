const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(v) {
        // dos o tres dígitos, guion, y al menos un dígito; además minlength asegura longitud >=8
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} no es un número de teléfono válido`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()   
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)