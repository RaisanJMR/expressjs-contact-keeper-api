const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    const connect = await mongoose.connect(process.env.CONNECTION_STRING)
    console.log(
      'DB connected:'.bgCyan,
      connect.connection.host.bgCyan,
      connect.connection.name.bgCyan
    )
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
