const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    const connect = await mongoose.connect(process.env.CONNECTION_STRING)
    console.log(
      'DB connected'.brightMagenta,
      connect.connection.host.brightCyan,
      connect.connection.name.brightBlue
    )
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
