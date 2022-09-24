var express = require('express');
const open = require("open");
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const dbContext = require("./data/databaseContext");
var nodemailer = require('nodemailer');
const { send } = require('process');
var app = express();

const crashItem = {
    id: getRandomId(1000).toString(),
    category: "crash",
    name: "OutOfMemeory Exception",
    description: "OutOfMemeory",
    isComplete: false
};

function getRandomId(max) {
    return Math.floor(Math.random() * max);
}


async function main() {
    const { endpoint, key, databaseId, containerId } = config;

    const client = new CosmosClient({ endpoint, key });

    const database = client.database(databaseId);
    const container = database.container(containerId);

    // Make sure Tasks database is already setup. If not, create it.
    await dbContext.create(client, databaseId, containerId);

    try {

        const { resource: createdItem } = await container.items.create(crashItem);

        console.log(`\r\nCreated new item: ${createdItem.id} - ${createdItem.description}\r\n`);


    } catch (error) {
        console.log(error);
    }
}

main();


function getRepoUrl() {
    return "https://vscode.dev/azurerepos/vasanthkorada999/MFRASHack22/MFRASHack22?path=%2F&version=GBmaster";
}


app.get('/devfocus/bugReport', function (req, res) {
    // const {projectId, module, fileName, lineNo} = req.body;
    var repoUrl = getRepoUrl();
    open(repoUrl);
    sendEmail();
    return res.status(200).send("Success")
})

var server = app.listen(8000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

function sendEmail() {
    console.log("Entered");
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vasanthkorada999@gmail.com',
            pass: 'tgcheafmckmvnhkf'
        }
    });

    var mailOptions = {
        from: 'vasanthkorada999@gmail.com',
        to: 'infytech2019@gmail.com',
        subject: 'HEADS UP!!! OutOfMemory Crash Detected.',
        text: 'HEADS UP!!! OutOfMemeory Crash Detected. Please follow the below link to debug and resolve https://vscode.dev/azurerepos/vasanthkorada999/MFRASHack22/MFRASHack22?path=%2F&version=GBmaster'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}