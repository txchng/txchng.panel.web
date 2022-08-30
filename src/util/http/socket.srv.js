export default class SocketRestResource { 
    register(token,socket){
        console.log(token)
        console.log(socket)
        console.log('connectinf from services to socket');
        if(token){
            socket.ioSocket.io.opts.query = { token };
            socket.connect();
        }
    }
}