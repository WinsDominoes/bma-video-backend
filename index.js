const config = require('config');
const unirest= require('unirest')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: '*'
}));

const token = config.get("aspToken");
const port = config.get("server.port");
const host = config.get("server.host");

app.get('/img', (req2, res2) => {
    let imgReqBody = req2.body;
    let camId = req2.query.camId;
    let time = req2.query.time; // unix time
    console.log("An image has been requested");
    console.log("---REQUEST BODY---");
    console.log("Camera ID: " + camId + " - Unix Time: " + req2.query.time);

    console.log("Processing request...")

    let imgUrl = "http://www.bmatraffic.com/show.aspx?image=" + camId + "&&time=" + time;

    unirest('GET', imgUrl)
    .encoding(null)
    .headers({
        'Origin': 'www.bmatraffic.com',
        'Cookie': 'ASP.NET_SessionId=' + token
    })

    // customizing response body
    .end(function(res) {
        var fs = require('fs');
        
        const base64data = Buffer.from(res.raw_body).toString('base64'); 

        res2.setHeader('Content-Type', 'application/json');
        res2.json({
            "error": 0,
            "response": 200,
            "camId": camId,
            "time": time, 
            "image": base64data
        })

        console.log("RESPONSE SENT")
    });
    
})

const server = app.listen(port, host, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`App is running on ${host}:${server.address().port}`);
});