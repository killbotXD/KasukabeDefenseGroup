const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://ssahillppatell:Sahil123@datasetforcodefundo-mto6g.azure.mongodb.net/test?retryWrites=true&w=majority";
const voterId = document.getElementById('voterId').value;
const next = document.getElementById('next');

next.addEventListener("click", (err) => {

    if(err)
        throw err;
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
   
        if (err)
            throw err;
        const dbo = db.db("datasetForCodefundo");
        dbo.collection("Jodhpur").findOne({ _voterId : voterId },(err, res) =>{
            if(err)
                throw err;
            console.log(res);
        });
        db.close();
    
      });

});
