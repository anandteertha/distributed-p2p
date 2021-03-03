var PORT = process.env.PORT || 5000;
var express = require('express');
var session = require('express-session')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser')
var list = [];
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
io.on('connection',function(socket){
  console.log('a client joined..');
  socket.on('addClient',function(data){
    list.push(data);
    console.log('the users online are: ',list);
    console.log('number of users online are: ',list.length);
  });

  socket.on('sendMessage',function(data){
    io.sockets.emit('recieveMessage',data);
    //socket.emit('recieveMessage',data);
    console.log('data recieved is: ',data.str);
  });

  socket.on('typing',function(data) {
    io.sockets.emit('typing',data)
  })

  socket.on('doneTyping',(data) => {
    io.sockets.emit('doneTyping',data)
  })

  socket.on('sendOnline',(data) => {
    console.log('list: ',list);
    io.sockets.emit('getOnline',list)
  })

});

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/css/style.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css'+'/style.css'));
});

app.get('/html/chatpage.html',function(req,res){
  res.sendFile(path.join(__dirname+'/html'+'/chatpage.html'));
});

app.get('/chatpage',(req,res) => {
  res.sendFile(path.join(__dirname+'/html'+'/chatpage.html'))
})

app.get('/wallpaper',(req,res) => {
  res.sendFile(path.join(__dirname+'/chatWallpaper.jpg'))
})

app.post('/chatpage',function(req,res){
  console.log(req.body);
  if(req.body.usname.trim().length == 0) {
    res.redirect('/')
  }
  res.sendFile(path.join(__dirname+'/html'+'/chatpage.html'));
});


http.listen(PORT,function(){
  console.log('listening on port 5000..');
});
