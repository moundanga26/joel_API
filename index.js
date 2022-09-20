const express = require('express')
const cors = require('cors')
const app = express()
var mysql = require("mysql")

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Bienvenue sur l\'API de CITYSPORT des Développeurs web')
})

app.listen(process.env.PORT || 2500)

app.use(express.json())
app.use(cors())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
})



con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log('connexion établie');
    }
})


// Lister les chaussures enregistrer dans la base de données;
app.get('/api/chaussures', (req, res)=>{
    
    con.query('SELECT * FROM chaussures',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})


//Ajouter les chaussures dans la base de données;
app.post('/api/chaussures/ajout', (req, res)=>{
    const id_marque = req.body.id_marque;
    const taille = req.body.taille;
    const couleur = req.body.couleur;
    const prix = req.body.prix;
    const nom_chaussure = req.body.nom_chaussure;

    
    con.query('INSERT INTO chaussures VALUES(NULL,?,?,?,?,?)',[id_marque,taille,couleur,prix,nom_chaussure],(err,result)=>{
        if(err)
    {
        console.log(err)
    }else{
        res.send('POSTED');
    }
    })
})
  

//Ajouter des marques de chaussures dans la base de données
app.post('/api/marques/ajout', (req, res)=>{
    const marque = req.body.marque;
    const logo= req.body.logo;
    
    
    con.query('INSERT INTO marque VALUES(NULL,?,?)',[marque,logo],(err,result)=>{
        if(err)
    {
        console.log(err)
    }else{
        res.send('POSTED');
    }
    })
})

//recuperer l'id d'une chaussure sachant qu'un id a une valeur unique
app.get('/api/chaussures/:id', (req, res)=>{
    
    con.query('SELECT * FROM chaussures WHERE id_chaussures=?',[req.params.id],(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

//pour lister les pointures contenues dans la base de donnees
app.get('/api/pointure/chaussures', (req, res)=>{
    
    con.query('SELECT * FROM pointure',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})


app.get('/api/marques', (req, res)=>{
    
    con.query('SELECT * FROM marque',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

// pour faire une recherche
app.get('/api/chaussures/search/:nom', (req, res)=>{

    con.query("SELECT * FROM `chaussures` WHERE `nom_chaussure` =?",[req.params.nom],(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})


