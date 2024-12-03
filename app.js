import express  from 'express';
 
const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.send('Simutrade mySql working')
})

app.listen(port, () => console.log('THis is a test'))