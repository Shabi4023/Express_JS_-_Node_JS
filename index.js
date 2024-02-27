const express = require("express")
const app = express()


const students = [
    {
        name: 'Ali',
        rollNo: '5101',
        id: '4567'
    },
    {
        name: "Ismail",
        rollno: 5113,
        id: '5555'
    },
];

function generateID() {
    const randomNum = Math.random() * 9000
    const formattedRandomNum = Math.floor(randomNum)
    return formattedRandomNum
}


// `default` route.
app.get("/", (req, res) => {
    res.end("default route....")
})

// `create` route
app.get("/create", (req, res) => {
    let std1 = {
        name: "Aliyan",
        rollNo: 5116,
        id: generateID()
    }
    students.push(std1);
    res.end("Student created! Done.....")
})

// `read` route
app.get("/read", (req, res) => {
    res.end(JSON.stringify(students));
})

app.post("/update", (req, res) => {

    for (let key of Object.keys(students)) {
        console.log(req.body);
    }
    res.end("Student Updated successfully....")
})

// `delete` route.
app.delete("/delete", (req, res) => {
    for (let key in students) {
        if (students[key].id === '5555') {
            students.splice(key, 1);
            break;
        }
    }
    res.end("Student Deleted successfully.....")
})

app.listen(3000, () => {
    console.log("Listenng on the port 3000.....")
})
