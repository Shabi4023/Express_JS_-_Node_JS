const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.method == "GET" && req.url == "/create") {
        let data = "This is the initial content on creation of the file......\n";
        fs.appendFile("book.txt", data, (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File Written Successfully!!");
            }
        })
    }
    else if (req.method == "GET" && req.url == "/read") {
        fs.readFile("book.txt", "utf8", (data, err) => {
            if (err)
                res.end(err);
            else {
                res.end("Read File Successfully....")
            }
        })
    }
    else if (req.method == "DELETE" && req.url == "/delete") {
        fs.unlink("book.txt", (err) => {
            if (err)
                res.end(err);
            res.end("File deleted successfully.....")
        })
    }
    else if (req.method == "POST" && req.url == "/update") {
        const newData = "This is the updated content of the file....\n";
        fs.appendFile("book.txt", newData, (err) => {
            if (err)
                res.end(err);
            res.end("File updated successfully...");
        })
    }
    else{
        res.end("not recognized url.....")
    }
})

server.listen(3001, () => {
    console.log(`Server is listening.....`);
});


