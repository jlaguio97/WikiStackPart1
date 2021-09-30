const express = require('express');
const morgan = require("morgan");
// const layout = require("./views/layout");
const views = require("./views");
const { db, Page, User } = require('./models')
db.authenticate()
  .then(() => {
    console.log('connected to the database')
  })
const app = express();
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public/"));
app.use(express.urlencoded({extended: false}));

const wikiRouter = require('./routes/wiki')
app.use('/wiki', wikiRouter)

app.get('/', (req, res) => {
  console.log('i am working!');
  res.send(views.main());
  res.status(200);
})




const PORT = 8080;
const init = async () => {
  await db.sync({force:true});
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  })
}
init()






