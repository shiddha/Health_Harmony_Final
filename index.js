const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

const app = express()
const port = 5000
// chamku pamku
//middleware
app.use(cors());
app.use(express.json());

//const url = `mongodb+srv://arafatdayan05:arafat00@cluster0.ltwq8j4.mongodb.net/?retryWrites=true&w=majority`;

//const url = 'mongodb://0.0.0.0:27017';

// const client = new MongoClient(url, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

//const url = `mongodb+srv://arafatdayan05:arafat00@cluster0.ltwq8j4.mongodb.net/?retryWrites=true&w=majority`;
//const url = "mongodb+srv://sakibsaad:12345@cluster0.g5kpbbg.mongodb.net/?retryWrites=true&w=majority";

const url = 'mongodb://0.0.0.0:27017';

const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const usersCollection = client.db("Protybeshi").collection("users");
        //const classesCollection = client.db("YogaCampersDB").collection("classes");
        //const selectedCollection = client.db("YogaCampersDB").collection("slected classes");
        const itemData = client.db("Protybeshi").collection("items");
        const borrowData = client.db("Protybeshi").collection("borrowings");
        const donateitemData = client.db("Protybeshi").collection("donateitems");
        const takeData = client.db("Protybeshi").collection("takings");
        

        //Save user and role
        app.put('/users/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const query = { email: email }
            const options = { upsert: true }
            const update = {
                $set: user,
            }
            res.send(await usersCollection.updateOne(query, update, options))
        });

        // Save user and role
        // app.put('/profile/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const address = req.body;
            
        //     const query = { email: email }
        //     const options = { upsert: true }
        //     const update = {
        //         $set: address, $set: contact
        //     }
        //     res.send(await usersCollection.updateOne(query, update, options))
        // });

        //Get a user
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            res.send(await usersCollection.findOne(query))
        });

        //Get all user
        app.get('/users', async (req, res) => {
            res.send(await usersCollection.find().toArray())
        });

        app.get('/items', async (req, res) => {
            const result = await itemData.find().toArray()
            res.send(result)
        })

        //changes from 89 line
        app.get('/donateitems', async (req, res) => {
            const result = await donateitemData.find().toArray()
            res.send(result)
        })
        
        //get a single item for a borrower
        app.get('/borrowItem/:id', async (req, res) => {
            const id = req.params.id
            const data = { _id: id }
            res.send(await borrowData.findOne(data))
        }) 

        app.get('/item/:id', async (req, res) => {
            const id = req.params.id
            const data = { _id: new ObjectId(id) }
            res.send(await itemData.findOne(data))
        })

        //changes from 100 line
        //get a single donate item for a taker
        app.get('/takeItem/:id', async (req, res) => {
            const id = req.params.id
            const data = { _id: id }
            res.send(await takeData.findOne(data))
        }) 

        //changes from 106 line
        app.get('/donateitem/:id', async (req, res) => {
            const id = req.params.id
            const data = { _id: new ObjectId(id) }
            res.send(await donateitemData.findOne(data))
        })

        //save item
         app.post('/items', async (req, res) => {
             const  newclass = req.body
             console.log(newclass)
             res.send(await itemData.insertOne(newclass))
         });


         app.post('/borrowings', async (req, res) => {
            const  borrowitem = req.body
            
            res.send(await borrowData.insertOne(borrowitem))
        });
      
        //changes from 126 line
        //save donate
        app.post('/donateitems', async (req, res) => {
            const  newclass = req.body
            console.log(newclass)
            res.send(await donateitemData.insertOne(newclass))
        });


        //changes from 133 line
        app.post('/takings', async (req, res) => {
           const  takeitem = req.body
           
           res.send(await takeData.insertOne(takeitem))
       });

        //borrowings update
        app.put('/borrowing/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;
            const query = { _id: id }
            const options = { upsert: true }
            const update = {
                $set: { 'status': status.status, 'pin' : status.pin }
                
            }
            res.send(await borrowData.updateOne(query, update, options))
        });

         //changes from 154 line
         //takings update
         app.put('/taking/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;
            const query = { _id: id }
            const options = { upsert: true }
            const update = {
                $set: { 'status': status.status, 'pin' : status.pin }
                
            }
            res.send(await takeData.updateOne(query, update, options))
        });


       
        // Change user role
        app.put('/details/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;
            const query = { _id: new ObjectId(id) }
            const options = { upsert: true }
            
            const update = {
                $set: { 'status': status.status, 'pin' : status.pin}
                
            }
            res.send(await itemData.updateOne(query, update, options))
        });
        
        //changes from 182 line
        app.put('/things/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;
            const query = { _id: new ObjectId(id) }
            const options = { upsert: true }
            
            const update = {
                $set: { 'status': status.status, 'pin' : status.pin}
                
            }
            res.send(await donateitemData.updateOne(query, update, options))
        });

        app.put('/feedback/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;
            const query = { _id: new ObjectId(id) }
            const options = { upsert: true }
            
            const update = {
                $set: { 'feedback': status.feedback }
                
            }
            res.send(await itemData.updateOne(query, update, options))
        });
        
        //changes from 208 line
        app.put('/advice/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;
            const query = { _id: new ObjectId(id) }
            const options = { upsert: true }
            
            const update = {
                $set: { 'advice': status.advice }
                
            }
            res.send(await donateitemData.updateOne(query, update, options))
        });

        //Get all selected class for a particular student
        app.get('/items/:email', async (req, res) => {
            const email = req.params.email
            const query = {
                'userEmail': email,
                
            }
            res.send(await itemData.find(query).toArray())
        });
        
        //changes from 235 line
        app.get('/donateitems/:email', async (req, res) => {
            const email = req.params.email
            const query = {
                'userEmail': email,
                
            }
            res.send(await donateitemData.find(query).toArray())
        });

        app.get('/borrowings/:email', async (req, res) => {
            const email = req.params.email
            const query = {
                'borrowEmail': email,
                
            }
            res.send(await borrowData.find(query).toArray())
        });
        
        //changes from 253 line
        app.get('/takings/:email', async (req, res) => {
            const email = req.params.email
            const query = {
                'takeEmail': email,
                
            }
            res.send(await takeData.find(query).toArray())
        });

        app.delete('/borrowing/:id', async (req, res) => {
            const id = req.params.id; 
	    const query = { _id: id }
            res.send(await borrowData.deleteOne(query))
        });
        //changes from 271 line
        app.delete('/taking/:id', async (req, res) => {
            const id = req.params.id; 
	    const query = { _id: id }
            res.send(await takeData.deleteOne(query))
        });



        // //Get all classes
        // app.get('/classes', async (req, res) => {
        //     res.send(await classesCollection.find().toArray())
        // });

        // //Get approved classes
        // app.get('/classes/approved', async (req, res) => {
        //     const query = { status: "approved" }
        //     res.send(await classesCollection.find(query).toArray())
        // });

        // //Get all classes for specific instructor
        // app.get('/classes/:email', async (req, res) => {
        //     const email = req.params.email
        //     const query = { 'instructor.email': email }
        //     res.send(await classesCollection.find(query).toArray())
        // });

        // //Save a calss
        // app.post('/classes', async (req, res) => {
        //     const newclass = req.body
        //     res.send(await classesCollection.insertOne(newclass))
        // });

        // //Change class status
        // app.put('/classes/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const status = req.body;
        //     const query = { _id: new ObjectId(id) }
        //     const options = { upsert: true }
        //     const update = {
        //         $set: { 'status': status.status },
        //     }
        //     res.send(await classesCollection.updateOne(query, update, options))
        // });

        // //Save a selected class
        // app.post('/classes/selected', async (req, res) => {
        //     const newclass = req.body
        //     res.send(await selectedCollection.insertOne(newclass))
        // });

        // //Get a selected class for a particular student
        // app.get('/classes/selected/:id/:email', async (req, res) => {
        //     const id = req.params.id
        //     const studentEmail = req.params.email
        //     const query = {
        //         'class_id': id,
        //         'studentEmail': studentEmail
        //     }
        //     res.send(await selectedCollection.findOne(query))
        // });

        // //Get all selected class for a particular student
        // app.get('/classes/selected/:email', async (req, res) => {
        //     const email = req.params.email
        //     const query = {
        //         'studentEmail': email,
        //         'enrolled': false
        //     }
        //     res.send(await selectedCollection.find(query).toArray())
        // });

        // //Delete selected class
        // app.delete('/classes/selected/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) }
        //     res.send(await selectedCollection.deleteOne(query))
        // });

        // //Update enroll status
        // app.put('/classes/selected/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) }
        //     const options = { upsert: true }
        //     const update = {
        //         $set: { 'enrolled': true },
        //     }
        //     res.send(await selectedCollection.updateOne(query, update, options))
        // });

        // //Get all enrolled class for a particular student
        // app.get('/classes/enrolled/:email', async (req, res) => {
        //     const email = req.params.email
        //     const query = {
        //         'studentEmail': email,
        //         'enrolled': true
        //     }
        //     res.send(await selectedCollection.find(query).toArray())
        // });

    } finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Protybeshi Server is Running');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})