const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const mongojs = require('mongojs');
const db = mongojs('mongodb://solitary:123456@ds133816.mlab.com:33816/lykhanhduy2008', ['users','category','news']);

const storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './../src/assets/img/');
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.originalname);
  }
});
const upload = multer({ //multer settings
  storage: storage
}).single('file');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  next();
});

app.get('/', (req, res) => res.send('Hello'));

app.post('/login', (req, res) => {
  const infoLogin = req.body;
  db.users.find(infoLogin,(err,docs) => {
    if(err) console.log(err);
    if(docs.length > 0){
      res.json('success');
    } else {
      res.json('fail');
    }
  })
});
app.get('/listnew', (req, res) => {
  db.news.find((err,docs) => {
    if(err) console.log(err)
    res.send(docs);
  });
});
app.get('/listnew/:id', (req, res) => {
  db.news.findOne({_id: mongojs.ObjectId(req.params.id)}, (err,docs) => {
    if(err) console.log(err)
    res.send(docs);
  });
});
app.get('/listcategory', (req, res) => {
  db.category.find((err, docs) => {
    if(err) console.log(err)
    res.send(docs);
  })
})
app.post('/uploadimage', (req, res) => {
  upload(req, res, (err) => {
    if(err) console.log(err);
    res.json({error_code:0,err_desc:null});
  })
})
app.post('/editnew/:id', (req, res) => {
  const id = req.params.id;
  db.news.update({_id: mongojs.ObjectId(id)}, {$set: req.body}, function (err,docs ) {
    if(err) console.log(err);
    res.send(docs);
  })
})
app.post('/addnew', (req, res) => {
  db.news.save(req.body, (err,docs) => {
    if(err) console.log(err);
    res.send(docs);
  })
})
app.delete('/deletenew/:id', (req, res) => {
  db.news.remove( {_id: mongojs.ObjectId(req.params.id)}, (err,docs) => {
    if(err) console.log(err)
    res.send(docs)
  });
})
app.listen(3000, () => console.log('Server is running!'));
