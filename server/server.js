const express = require('express')
const app = express()
// const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')

// DB Option
const dbUrl = "mongodb+srv://haniif:haniif@cluster0-igq45.mongodb.net/test"
const dbOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.Promise = global.Promise
mongoose.connect(dbUrl, dbOption)

var customers = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  address: {
    type: String,
    trim: true,
    required: true
  }
})

var Customers = mongoose.model('customers', customers)

// Insert
app.get('/insert', function (req, res) {
    // MongoClient.connect(dbUrl, dbOption, function(err, db) {
    // if (err) throw err
    // var dbo = db.db("mydb")
    // var myobj = { 
    //   name: "Company Inc 2", 
    //   address: "Highway 37 2"
    // }
    // dbo.collection("customers").insertOne(myobj, function(err, resDB) {
    //   if (err) throw err
    //   db.close()
    //   res.send("1 document inserted")
    // })

  try {
    var myobj = { 
      name: "Company Inc 2", 
      address: "Highway 37 2"
    }
    const customer = new Customers(myobj)
    customer.save()
    res.send("1 document inserted")
  } catch (error) {
    console.log('Error')
  }
})

// Find One
app.get('/findOne', async function (req, res) {
  // MongoClient.connect(dbUrl, dbOption, function(err, db) {
  //   if (err) throw err
  //   var dbo = db.db("mydb")
  //   dbo.collection("customers").findOne({}, function(err, resDB) {
  //     if (err) throw err
  //     db.close()
  //     res.send(resDB)
  //   })
  // })

  try {
    const customers = await Customers.findOne({})
    res.send(customers)
  } catch (error) {
    console.log('Ada error nih')
  }
})

// Find All
app.get('/findAll', async function (req, res) {
  // MongoClient.connect(dbUrl, dbOption, function(err, db) {
  //   if (err) throw err
  //   var dbo = db.db("mydb")
  //   dbo.collection("customers").find({}).toArray(function(err, result) {
  //     if (err) throw err
  //     db.close()
  //     res.send(result)
  //   })
  // })

  try {
    const customers = await Customers.find({})
    res.send(customers)
  } catch (error) {
    console.log('Ada error nih')
  }
})

// Find All + Filter
app.get('/findAllFilter', async function (req, res) {
  // MongoClient.connect(dbUrl, dbOption, function(err, db) {
  //   if (err) throw err
  //   var dbo = db.db("mydb")
  //   var filter = {
  //     address: 'Highway 3'
  //   }
  //   dbo.collection("customers").find(filter).toArray(function(err, result) {
  //     if (err) throw err
  //     db.close()
  //     res.send(result)
  //   })
  // })
  try {
    var filter = {
      address: 'Highway 3'
    }
    const customers = await Customers.find(filter)
    res.send(customers)
  } catch (error) {
    console.log('Ada error')
  }
})

// Delete One
app.get('/deleteOne', async function (req, res) {
  // MongoClient.connect(dbUrl, dbOption, function(err, db) {
  //   if (err) throw err
  //   var dbo = db.db("mydb")
  //   var myquery = { 
  //     name: 'Company Inc 2' 
  //   }
  //   dbo.collection("customers").deleteOne(myquery, function(err, obj) {
  //     if (err) throw err
  //     db.close()
  //     res.send("1 document deleted")
  //   })
  // })
  try {
    var myquery = { 
      name: 'Company Inc 2' 
    }
    await Customers.deleteOne(myquery)
    res.send("1 document deleted")
  } catch (error) {
    console.log('Error')
  }
})

// Delete Many
app.get('/deleteMany', async function (req, res) {
  // MongoClient.connect(dbUrl, dbOption, function(err, db) {
  //   if (err) throw err
  //   var dbo = db.db("mydb")
  //   var myquery = { 
  //     address: "Highway 37 2"
  //   }
  //   dbo.collection("customers").deleteMany(myquery, function(err, obj) {
  //     if (err) throw err
  //     db.close()
  //     res.send(obj.result.n + " document(s) deleted")
  //   })
  // })
  try {
    var myquery = { 
      address: "Highway 37 2"
    }
    var result = await Customers.deleteMany(myquery)
    res.send(result.n + " document(s) deleted")
  } catch (error) {
    console.log('Error')
  }
})

// Update One
app.get('/updateOne', async function (req, res) {
  // MongoClient.connect(dbUrl, dbOption, function(err, db) {
  //   if (err) throw err
  //   var dbo = db.db("mydb")
  //   var myquery = { 
  //     address: "Highway 37 2" 
  //   }
  //   var newvalues = { 
  //     $set: {
  //       name: "Mickey"
  //     } 
  //   }
  //   dbo.collection("customers").updateOne(myquery, newvalues, function(err, resDB) {
  //     if (err) throw err
  //     db.close()
  //     res.send("1 document updated")
  //   })
  // })
  try {
    var myquery = { 
      address: "Highway 37 2" 
    }
    var newvalues = { 
      $set: {
        name: "Mickey"
      } 
    }
    await Customers.updateOne(myquery, newvalues)
    res.send("1 document updated")
  } catch (error) {
    console.log('Error')
  }
})

// Update Many
app.get('/updateMany', async function (req, res) {
  // MongoClient.connect(dbUrl, dbOption, function(err, db) {
  //   if (err) throw err
  //   var dbo = db.db("mydb")
  //   var myquery = { 
  //     address: "Highway 37 2",
  //     name: "Company Inc"
  //   }
  //   var newvalues = {
  //     $set: {
  //       name: "Minnie s"
  //     } 
  //   }
  //   dbo.collection("customers").updateMany(myquery, newvalues, function(err, resDB) {
  //     if (err) throw err
  //     db.close()
  //     res.send(resDB.result.nModified + " document(s) updated")
  //   })
  // })
  try {
    var myquery = { 
      name: "Company Inc 2"
    }
    var newvalues = {
      $set: {
        name: "Minnie s"
      } 
    }
    var result = await Customers.updateMany(myquery, newvalues)
    res.send(result.nModified + " document(s) updated")
  } catch (error) {
    res.send('Error')
  }
})

app.listen(3000, function () {
  console.log('Run in Port 3000')
})