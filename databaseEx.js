let prompt = require('prompt-sync')();
let mongoClient = require('mongodb').MongoClient , assert = require('assert');
let url = 'mongodb://ddematheu:ACMT3ST@ds121955.mlab.com:21955/acmtest?authMexhanism=DEFAULT';
var command = "";

getcommand();

function ProcessInput()
{
    if(command == "INSERT")
    {
        let title = prompt('Enter the title ');
        let year = prompt('Enter the year ');
        let author = prompt('Enter the author ');
        let publisher = prompt('Enter the publisher ')
        
        mongoClient.connect(url,function(err,db){
            assert.equal(null,err);
            db.collection('BookCollection').insertOne({
                "Title":title,
                "Year":year,
                "Author":author,
                "Publisher":publisher
            }, function(err, item){
                if(err) throw err;
                console.log("Item was added");
                command = getcommand();
            });
            db.close();
        });
    
    }
    
    else if(command == "FIND")
    {
        let author = prompt('Enter the author of the book: ');
        mongoClient.connect(url,function(err,db){
            assert.equal(null,err);
            db.collection('BookCollection').findOne({"Author":author}, function(err, item){
                if(err) throw err;
                console.log(item.Title);
                console.log(item.Author);
                console.log(item.Year);
                console.log(item.Publisher);
                command = getcommand()
            });
            db.close();
        });
    }
    else if(command == "PRINT")
    {
        //Getting student info and requirements
        mongoClient.connect(url,function(err,db){
            assert.equal(null,err);
            console.log("Connected correctly to server");
            console.log("Printing Collection");
            var books = db.collection('BookCollection');
            books.find().toArray(function(e,d){
                console.log(d);
                command = getcommand()
            });
            db.close();
        });
    }
    else if(command == "DELETE")
    {
        let title = prompt('Enter the title of the book: ');
        mongoClient.connect(url,function(err,db){
            assert.equal(null,err);
            db.collection('BookCollection').deleteOne({"Title":title}, function(err, item){
                if(err) throw err;
                console.log("Item deleted");
                command = getcommand()
            });
            db.close();;
        }); 
    }
    else
    {
        console.log("Command not found");
        command = getcommand();
    }
}


function printAll()
{
    //Getting student info and requirements
    mongoClient.connect(url,function(err,db){
        assert.equal(null,err);
        console.log("Connected correctly to server");
        var books = db.collection('BookCollection');
        books.find().toArray(function(e,d){
            console.log(d);
        });
    db.close();
    });
}

function getcommand()
{
    command = prompt('Enter Your Command (FIND,INSERT, DELETE, PRINT): ');
    ProcessInput();
}
