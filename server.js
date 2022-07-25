const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

var db;

// MongoClient.connect('mongodb+srv://AannaKim:rladkfma1@atlascluster.nfsd5.mongodb.net/?retryWrites=true&w=majority', function (에러, client) {
//   if (에러) return console.log('error=> ', 에러)
//   db = client.db('todoapp');

// })

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://AannaKim:rladkfma1@atlascluster.nfsd5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("todoapp").collection("post");
  collection.insertOne({}, function (에러, 결과) {
    console.log('저장완료');
  });
  client.close();
});

app.listen(8080, function () {
  console.log('listening on 8080')
});
// app.get('/pet',function(요청,응답){
//     응답.send('펫용품 쇼핑할 수 있는 페이지입니다.');
// });


app.get('/', function (요청, 응답) {
  응답.sendFile(__dirname + '/index.html')
});

app.get('/write', function (요청, 응답) {
  응답.sendFile(__dirname + '/write.html')
});

app.post('/add', function (요청, 응답) {
  응답.send('헤헤헤헤 내가 만들었지룽')
  console.log(요청.body.date);
  console.log(요청.body.title);

  db.collection('counter').findOne({ name: '게시물갯수' }, function (에러, 결과) {
    console.log(결과.totalPost)
    var 총게시물갯수 = 결과.totalPost;
    db.collection('post').insertOne({ _id: 총게시물갯수 + 1, 제목: 요청.body.title, 날짜: 요청.body.date }, function (에러, 결과) {
      console.log('저장완료');
    });
  });
})

///list 로 get 요청으로 접속하면
// 실제 DB에 저장된 데이터들로 예쁘게 꾸며진 HTML을 보여줌

app.get('/list', function (요청, 응답) {
  db.collection('post').find().toArray(function (에러, 결과) {
    console.log(결과);
    응답.render('list.ejs', { posts: 결과 });
  });
});
app.post('/add', function (요청, 응답) {
  응답.send('헤헤헤헤 내가 만들었지룽')
  console.log(요청.body.date);
  console.log(요청.body.title);

  db.collection('post').findOne({ name: '게시물갯수' }, function (에러, 결과) {
    console.log(결과.totalPost)
    var 총게시물갯수 = 결과.totalPost;
    db.collection('post').insertOne({ _id: 총게시물갯수 + 1, 제목: 요청.body.title, 날짜: 요청.body.date }, function (에러, 결과) {
      console.log('저장완료');
    });
  });
})
