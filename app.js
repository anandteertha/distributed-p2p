var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var list = [];
io.on('connection',function(socket){
  console.log('a client joined..');
  socket.on('addClient',function(data){
    list.push(data);
    console.log('number of users online are: ',list.length);
  });

  socket.on('sendMessage',function(data){
    io.sockets.emit('recieveMessage',data);
    //socket.emit('recieveMessage',data);
    console.log('data recieved is: ',data.str);
  });

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

app.post('/chatpage',function(req,res){
  res.sendFile(path.join(__dirname+'/html'+'/chatpage.html'));
});

http.listen(PORT,function(){
  console.log('listening on port 3000..');
});
