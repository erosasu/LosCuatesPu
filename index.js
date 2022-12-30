const fs = require('fs')
const qrcode = require('qrcode-terminal')
const port = 3000
const  mongoose  = require('mongoose');


uri ='mongodb+srv://ernierous:cuantum47@cluster0.3m7828i.mongodb.net/clientes?retryWrites=true&w=majority'



mongoose.connect(uri, async (err,)=>{
   //error-first callback
   if(err){
       console.log('No se pudo conectar a mi base de datos')
   }else{
       console.log('se conecto a base de datos '+port)
      
   }
});
// Define a schema for your data
const dataSchema = new mongoose.Schema({
    field1: String,
    field2: String
  });

const Data = mongoose.model('conversaciones', dataSchema);

const {herrajes} = require('./core/precios')

const {composicion_producto } = require('./core/funciones/descomp_sub.js')

const {Client, Location, List, Buttons, LocalAuth, } = require('whatsapp-web.js')
const Chat = require('whatsapp-web.js/src/structures/Chat');

const SESSION_FILE_PATH = "./session.js"

const country_code ="521";
const number = "3331184802"
const msg = "hola mundo"

let sessionData
if(fs.existsSync(SESSION_FILE_PATH)){
    sessionData = require(SESSION_FILE_PATH);
}
const loscuates = new Client({
    authStrategy: new LocalAuth(),
    session: sessionData,
})

loscuates.initialize();

loscuates.on('qr', qr=>{
    qrcode.generate(qr,{small: true});
})

loscuates.on('ready', () =>{
    console.log('El cliente esta listo');

    let chatId = country_code + number + "@c.us";

    loscuates.sendMessage(chatId, msg)
                    .then(response =>{
                        if(response.id.fromMe){
                            console.log('El mensaje fue enviado')
                        }
                    })
})

loscuates.on('authenticated', session => {
    sessionData = session;
})

loscuates.on('auth_failure', msg =>{
    console.error('hubo un fallo en la autenticacion')
})

const { MessageMedia } = require('whatsapp-web.js');


let msglist = []


var peliculaesmeril= 100
var pelicureflecta = 100
var pelicupolarizada = 100

function sendDataToDB(err, msg) {
    if (err) {
      console.log(err);
    } else {
      // Create a new document using the Data model
      const newData = new Data({
        field1: msg.body,
        field2: msg.from
      });
  
      // Save the document to the database
      newData.save((error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Data saved to database');
        }
      });
    }
  }

loscuates.on('message', async msg=>{
//especificaciones de vidrio por default


let producto
let productos = []
let gastos_unitarios = []; 
let submsg = [];
//medidas del producto
let alto
let ancho
let gasto = 0;
let preciocliente;

let porcganacia=2.5;

    submsg = msg.body.split(/, /)
    console.log(submsg)
    
for(i=0;i<submsg.length;i++){
    let cantidad = 1;
   
    let medidas;
    
    if(/\d+.?\d? x \d+.?\d?/.test(submsg[i])){
        //define el grosor del vidrio
       

        

        alto=parseFloat(submsg[i].substring(submsg[i].search(/\d+.?\d? x \d+.?\d?/),submsg[i].search(/ x /)))
        console.log('el alto es de: '+alto)
        ancho=parseFloat(submsg[i].substring(submsg[i].search(/ x /)+3,submsg[i].search(/ x /)+8))
        console.log('el ancho es de:'+ancho)
        medidas = submsg[i].match(/\d+.?\d?/g)

        if(submsg[i].search(/\d{1,2}/)==0){
          cantidad = medidas.shift()   
        }
        console.log('la cantidad es: '+cantidad)
        
        if(/corrediza/i.test(submsg[i])&&!/pulgadas/.test(submsg[i])){
            loscuates.sendMessage(msg.from, 'Falto especificar las pulgadas del aluminio de la ventana, se cotizará con 3 pulgadas')
        }

        if(/mosquitero/i.test(submsg[i])&&!/corredizo?/i.test(submsg[i])){
            loscuates.sendMessage(msg.from, 'Falto especificar si es corredizo o fijo el mosquitero ')
        }
        
    
    
        //añadir gastos unitarios a lista de costos de materiales
    gastos_unitarios.push(cantidad*composicion_producto(submsg[i], alto, ancho))
    

    
}  }
//sumar gastos unitarios
for(let i=0;i< gastos_unitarios.length;i++){
    gasto+=gastos_unitarios[i]
}

console.log(gasto)

    if(/instalado/.test(msg.body)&&gasto<200){
        porcganacia = 4.5
    }
    else if(/instalado/.test(msg.body)&&gasto>200&&gasto<1000){
        porcganacia = 3.7
    }
    else if(/instalado/.test(msg.body)&&gasto>1000&&gasto<4000){
        porcganacia = 3
    }
    else if(/instalado/.test(msg.body)&&gasto>4000&&gasto<15000){
        porcganacia = 2.4
    }
    else if(/instalado/.test(msg.body)&&gasto>15000){
        porcganacia = 2
    }
    else if((/sin instalacion/.test(msg.body)||/al corte/.test(msg.body)||/sin instalar/.test(msg.body))){
        porcganacia = 2.5
    }
    else if((/sin instalacion/.test(msg.body)||/al corte/.test(msg.body)||/sin instalar/.test(msg.body))&&gasto>1000){
        porcganacia = 2
    }

    preciocliente = gasto*porcganacia
    console.log(`precio al cliente es ${preciocliente}`)
   
    
    if(/otsoc/i.test(msg.body)&&((/vidrio/i.test(msg.body)||/espejo/i.test(msg.body)||/luna/i.test(msg.body))&&/\d+.?\d? x \d+.?\d?/.test(msg.body)
    &&(/6mm/.test(msg.body)||/3mm/.test(msg.body)||/4mm/.test(msg.body)||/9mm/.test(msg.body)))){
        loscuates.sendMessage(msg.from, `Este producto nos cuesta a nosotros: $${gasto.toFixed(0)}`)
    }


    if(/\d+.?\d? x \d+.?\d?/.test(msg.body)){

        loscuates.sendMessage(msg.from, `El precio de este producto es: $${preciocliente.toFixed(0)}`)
        loscuates.sendMessage(msg.from, "¿El cliente acepta la cotizacion?")
        
    }
    else if((/cuanto/i.test(msg.body)||/cotizar/i.test(msg.body))&&/vidrio/.test(msg.body)&&!(/6mm/.test(msg.body)||/3mm/.test(msg.body)||/4mm/.test(msg.body))
    &&/\d+.?\d? x \d+.?\d?/.test(msg.body)&&(/instalado/.test(msg.body)||/sin instalacion/.test(msg.body)||/al corte/.test(msg.body))){

        loscuates.sendMessage(msg.from, "Falto especificar el grosor del vidrio, favor de ingresar la informacion incluyendo si el vidrio es de 6mm, 4mm, o 3mm")
    }
    else if((/vidrio/i.test(msg.body)||/espejo/i.test(msg.body)||/luna/i.test(msg.body))&&(/6mm/.test(msg.body)||/3mm/.test(msg.body)||/4mm/.test(msg.body)||/9mm/.test(msg.body))
    &&/\d+.?\d? x \d+.?\d?/.test(msg.body)&&!/instalado]/.test(msg.body)&&!/sin instalacion/.test(msg.body)&&!/al corte/.test(msg.body)&&!/sin instalar/.test(msg.body)){
          loscuates.sendMessage(msg.from, "Falta especificar si el vidrio va instalado o al corte favor de volver a introducir toda la informacion")
      }
    else if(!(/vidrio/i.test(msg.body)||/espejo/i.test(msg.body)||/luna/i.test(msg.body))&&(/6mm/.test(msg.body)||/3mm/.test(msg.body)||/4mm/.test(msg.body)||/9mm/.test(msg.body))
    &&/\d+.?\d? x \d+.?\d?/.test(msg.body)&&!(/instalado]/.test(msg.body)||/sin instalacion/.test(msg.body)||/al corte/.test(msg.body)||/sin instalar/.test(msg.body))){
            loscuates.sendMessage(msg.from, "La informacion está bien introducida, sin embargo, le hizo falta hacernos saber si lo que necesita es un vidrio, un espejo, una ventana, un domo u algun otro servicio")
        }
    else if((/vidrio/i.test(msg.body)||/espejo/i.test(msg.body)||/luna/i.test(msg.body))&&(/6mm/.test(msg.body)||/3mm/.test(msg.body)||/4mm/.test(msg.body)||/9mm/.test(msg.body))
    &&!/\d+.?\d? x \d+.?\d?/.test(msg.body)&&!(/instalado]/.test(msg.body)||/sin instalacion/.test(msg.body)||/al corte/.test(msg.body)||/sin instalar/.test(msg.body))){
          loscuates.sendMessage(msg.from, "La informacion está bien introducida, sin embargo, le hizo falta introducir las medidas en el formato <AA.A x LL.L> expresado en centimetros, y tambien mencionar si lo requiere instalado o al corte, ¿podría ingresar de nuevo la informacion completa porfavor?")
        }
    else if((/vidrio/i.test(msg.body)||/espejo/i.test(msg.body)||/luna/i.test(msg.body))&&!(/6mm/.test(msg.body)||/3mm/.test(msg.body)||/4mm/.test(msg.body)||/9mm/.test(msg.body))
    &&/\d+.?\d? x \d+.?\d?/.test(msg.body)&&!(/instalado]/.test(msg.body)||/sin instalacion/.test(msg.body)||/al corte/.test(msg.body)||/sin instalar/.test(msg.body))){
                loscuates.sendMessage(msg.from, "Porfavor podría ingresar de nuevo la informacion pero esta vez agregando el grosor del vidrio, es decir, 3mm, 4mm, 6mm o 9mm, a demas de mencionar si lo requiere instalado o al corte")
            }
     else if((/vidrio/i.test(msg.body)||/espejo/i.test(msg.body)||/luna/i.test(msg.body))&&!(/6mm/.test(msg.body)||/3mm/.test(msg.body)||/4mm/.test(msg.body)||/9mm/.test(msg.body))
    &&!/\d+.?\d? x \d+.?\d?/.test(msg.body)&&!(/instalado]/.test(msg.body)||/sin instalacion/.test(msg.body)||/al corte/.test(msg.body)||/sin instalar/.test(msg.body))){
                loscuates.sendMessage(msg.from, "La informacion está bien introducida, sin embargo, le hizo falta introducir las medidas en el formato <AA.A x LL.L>, ¿pdría volver a ingresar la informacion agregando este formato por favor?")
            }
    
    if(msg.body.search("te deposito")>0||/tran?sferencia/.test(msg.body)||msg.body.search("depositar")>0||/tran?sferir/.test(msg.body||msg.body.search("cuenta de banco")>0||/tran?sfiero/.test(msg.body)||msg.body.search("tu cuenta")>0)){
        loscuates.sendMessage(msg.from, "Si. Banco BBVA\nclave interbancaria: 012320004828656106\nErnesto Rosas Uriarte")}
    
    if(msg.body.search("estas ubicado")>0||msg.body.search("tu taller")>0||msg.body.search("tu local")>0||msg.body.search("te encuentras")>0||
    msg.body.search("te localizas")>0||msg.body.search("tu domicilio")>0||msg.body.search("su domicilio")>0||msg.body.search("tu ubicacion")>0
    ||msg.body.search("tu direccion")>0||/estan ubicados/.test(msg.body)||/se localizan/.test(msg.body)){
            loscuates.sendMessage(msg.from, "Estamos ubicados en Av valdepeñas 2565, esquina con tolosa en Lomas de Zapopan.")
    }
   
    if(msg.body.search("mosquitero")>0&&/boreales/i.test(msg.body)){
        loscuates.sendMessage(msg.from, "Hola si claro te comparto los precios de los mosquiteros en boreales: Mosquitero de Recamara: $1000c/u,\nMosquitero sala: $800c/u\nMosquitero baño $200")
    }


})

/*

loscuates.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

    if (msg.body === '!ping reply') {
        // Send a new message as a reply to the current one
        msg.reply('pong');

    } else if (msg.body === '!ping') {
        // Send a new message to the same chat
        loscuates.sendMessage(msg.from, 'pong');

    } else if (msg.body.startsWith('!sendto ')) {
        // Direct send a new message to specific id
        let number = msg.body.split(' ')[1];
        let messageIndex = msg.body.indexOf(number) + number.length;
        let message = msg.body.slice(messageIndex, msg.body.length);
        number = number.includes('@c.us') ? number : `${number}@c.us`;
        let chat = await msg.getChat();
        chat.sendSeen();
        loscuates.sendMessage(number, message);

    } else if (msg.body.startsWith('!subject ')) {
        // Change the group subject
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newSubject = msg.body.slice(9);
            chat.setSubject(newSubject);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body.startsWith('!echo ')) {
        // Replies with the same message
        msg.reply(msg.body.slice(6));
    } else if (msg.body.startsWith('!desc ')) {
        // Change the group description
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newDescription = msg.body.slice(6);
            chat.setDescription(newDescription);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body === '!leave') {
        // Leave the group
        let chat = await msg.getChat();
        if (chat.isGroup) {
            chat.leave();
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body.startsWith('!join ')) {
        const inviteCode = msg.body.split(' ')[1];
        try {
            await loscuates.acceptInvite(inviteCode);
            msg.reply('Joined the group!');
        } catch (e) {
            msg.reply('That invite code seems to be invalid.');
        }
    } else if (msg.body === '!groupinfo') {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            msg.reply(`
                *Group Details*
                Name: ${chat.name}
                Description: ${chat.description}
                Created At: ${chat.createdAt.toString()}
                Created By: ${chat.owner.user}
                Participant count: ${chat.participants.length}
            `);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body === '!chats') {
        const chats = await loscuates.getChats();
        loscuates.sendMessage(msg.from, `The bot has ${chats.length} chats open.`);
    } else if (msg.body === '!info') {
        let info = loscuates.info;
        loscuates.sendMessage(msg.from, `
            *Connection info*
            User name: ${info.pushname}
            My number: ${info.wid.user}
            Platform: ${info.platform}
        `);
    } else if (msg.body === '!mediainfo' && msg.hasMedia) {
        const attachmentData = await msg.downloadMedia();
        msg.reply(`
            *Media info*
            MimeType: ${attachmentData.mimetype}
            Filename: ${attachmentData.filename}
            Data (length): ${attachmentData.data.length}
        `);
    } else if (msg.body === '!quoteinfo' && msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();

        quotedMsg.reply(`
            ID: ${quotedMsg.id._serialized}
            Type: ${quotedMsg.type}
            Author: ${quotedMsg.author || quotedMsg.from}
            Timestamp: ${quotedMsg.timestamp}
            Has Media? ${quotedMsg.hasMedia}
        `);
    } else if (msg.body === '!resendmedia' && msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();
        if (quotedMsg.hasMedia) {
            const attachmentData = await quotedMsg.downloadMedia();
            loscuates.sendMessage(msg.from, attachmentData, { caption: 'Here\'s your requested media.' });
        }
    } else if (msg.body === '!location') {
        msg.reply(new Location(37.422, -122.084, 'Googleplex\nGoogle Headquarters'));
    } else if (msg.location) {
        msg.reply(msg.location);
    } else if (msg.body.startsWith('!status ')) {
        const newStatus = msg.body.split(' ')[1];
        await loscuates.setStatus(newStatus);
        msg.reply(`Status was updated to *${newStatus}*`);
    } else if (msg.body === '!mention') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendMessage(`Hi @${contact.number}!`, {
            mentions: [contact]
        });
    } else if (msg.body === '!delete') {
        if (msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            if (quotedMsg.fromMe) {
                quotedMsg.delete(true);
            } else {
                msg.reply('I can only delete my own messages');
            }
        }
    } else if (msg.body === '!pin') {
        const chat = await msg.getChat();
        await chat.pin();
    } else if (msg.body === '!archive') {
        const chat = await msg.getChat();
        await chat.archive();
   
    

    
    } else if (msg.body === '!jumpto') {
        if (msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            loscuates.interface.openChatWindowAt(quotedMsg.id._serialized);
        }
    } else if (msg.body === '!buttons') {
        let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
        loscuates.sendMessage(msg.from, button);
   
    } else if (msg.body === '!reaction') {
        msg.react('👍');
    }
});

loscuates.on('message_create', (msg) => {
    // Fired on all message creations, including your own
    if (msg.fromMe) {
        // do stuff here
    }
});

loscuates.on('message_revoke_everyone', async (after, before) => {
    // Fired whenever a message is deleted by anyone (including you)
    console.log(after); // message after it was deleted.
    if (before) {
        console.log(before); // message before it was deleted.
    }
});

loscuates.on('message_revoke_me', async (msg) => {
    // Fired whenever a message is only deleted in your own view.
    console.log(msg.body); // message before it was deleted.
});
*/

/*
loscuates.on('message_ack', (msg, ack) => {
    /*
        == ACK VALUES ==
        ACK_ERROR: -1
        ACK_PENDING: 0
        ACK_SERVER: 1
        ACK_DEVICE: 2
        ACK_READ: 3
        ACK_PLAYED: 4
    */


loscuates.on('group_join', (notification) => {
    // User has joined or been added to the group.
    console.log('join', notification);
    notification.reply('User joined.');
});

loscuates.on('group_leave', (notification) => {
    // User has left or been kicked from the group.
    console.log('leave', notification);
    notification.reply('User left.');
});

loscuates.on('group_update', (notification) => {
    // Group picture, subject or description has been updated.
    console.log('update', notification);
});

loscuates.on('change_state', state => {
    console.log('CHANGE STATE', state );
});

loscuates.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});

