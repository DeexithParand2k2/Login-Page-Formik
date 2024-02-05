const express =  require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const { stat } = require('fs')
const port = 3001

const storedUsers = [
    {
        name: 'Deexith Parandaman',
        mail: 'deexith2002@gmail.com',
        password: '1234',
        role: 'Grover'
    }
]

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

app.post('/reg', (req, res) => {

    console.log("Entry log of stored val in reg",storedUsers)

    const newUser = req.body;
    let status = false

    console.log(newUser.name)

    for(const obj of storedUsers){

        //check every object for name and email
        if(newUser.name === obj.name || newUser.email === obj.mail){
            res.status(409).json({message : 'User Already Present'})
            status = true 
            break
        }

    }

    if(status===false){
        storedUsers.push(newUser)
        console.log('Post request made',storedUsers)
        res.status(201).json({message:'User Created'})
    }
    
})

app.post('/log', (req,res)=>{

    console.log("Entry log of stored val in log",storedUsers)

    const cred = req.body
    let status = false

    for(const elem of storedUsers){

        console.log(elem)

        //check every object for name and email
        if(cred.name == elem.name && cred.password == elem.password){

            res.status(200).json({
                message : 'Login Success',
                name : elem.name,
                email : elem.email,
                role : elem.role
            })

            status = true
            break
        }

    }

    if(status===false){
        res.status(401).json({
            message:'invalid cred'
        })
    }

})

app.listen(port, ()=>{
    console.log('server is running and initial state is',storedUsers)
})