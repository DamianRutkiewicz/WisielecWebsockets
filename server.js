// Wykorzystujemy framework Express, który umożliwi nam obsługę protokołu HTTP oraz Socket.IO
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.listen(http);

var count = 0;
var nr = 0;
var bads = 0;
var users = [];

var pytania = ["Do rzęs lub do drukarki","Nie jje , nie pije, a chodzi i bije","Świąteczne drzewko","wyświetla  zawartośc stron internetowych",
"przenośne urzadzenie do przehcowywania danych","Za kości rzucone dziękuje ogonem","Bywa siwy, gniady, kary, wozi ludzi i towary",
"Grecki bóg wojny","Na polu dzwoni, w żniwiarza dłoni","Izraelska waluta"];
var odpowiedzi = ["tusz","zegar","choinka","przeglądarka","pendrive","pies","koń","ares","kosa","szekel"];

function person(id,name){
	this.id = id;
	this.name = name;
	this.pkt = 0;
}

var person = {
	id:'45678',
	name:'Damian',
	pkt:'3'
}




// Definiujemy nasz route i wskazujemy mu plik, z którego ma korzystać - w naszym przypadku index.html
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// Nasłuchujemy eventu 'connection', który jest automatycznie wysyłany przez klienta (nie musimy go definiować)
io.on('connection', function(socket){
	count+=1;

    socket.on('load', function(msg) {
        io.emit('load', [pytania[nr],"http://damianrutkiewicz.pl/images/s"+bads+".jpg"]);
      });

    // Nasłuchujemy eventu 'chat message', który zostaje wysłany przez klienta w momencie wysyłania wiadomości
    socket.on('chat message', function(msg) {

        if(msg==odpowiedzi[nr]){
            nr+=1;
            if(nr!=pytania.length){
                
                io.emit('chat message', [msg,pytania[nr]]);
            }
            else{
                io.emit('win', [msg,"Koniec gry"]);
            }
        }
        else{
            bads+=1;
            if(bads>=9){
                io.emit('bad', [msg,"http://damianrutkiewicz.pl/images/s9.jpg"]);
            }
            else{
                io.emit('bad', [msg,"http://damianrutkiewicz.pl/images/s"+bads+".jpg"]);
            }
            
        }


        
      });
});

// Wskazujemy serwerowi, na który porcie ma nasłuchiwać
http.listen(3300, function() {
      console.log('Listening on *:3300');
});