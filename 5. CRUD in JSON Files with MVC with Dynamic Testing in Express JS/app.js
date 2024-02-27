const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = 3001;
const userRoute = require('./router/userRoute')

app.use(express.json());



app.use("/user", userRoute)

app.listen(port, () => {
    console.log(`Server started at port  ${port}.`);
});
