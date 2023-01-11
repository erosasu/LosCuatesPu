const fs = require('fs')
require('dotenv').config();

const port = 3000
const  mongoose  = require('mongoose');

uri =process.env.MONGODB

mongoose.connect(uri, async (err,)=>{
   //error-first callback
   if(err){
       console.log('No se pudo conectar a mi base de datos')
   }else{
       console.log('se conecto a base de datos '+port)    
   }
});

const Cotizacion = require('../src/models/cotizacion')


const {herrajes} = require('../core/precios')

const {composicion_producto } = require('../core/funciones/descomp_sub.js')

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
    
})

loscuates.initialize();

loscuates.on('disconnected', ()=>{
    loscuates.initialize();  
})

loscuates.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

loscuates.on('ready', () => {
    console.log('READY');
});

loscuates.on('message', async msg =>{
    console.log('MESSAGE RECEIVED:', msg.body);
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
if(/_id:/.test(msg.body)){
    let id = msg.body.substring(msg.body.search(/id:/)+5,msg.body.search(/¿aceptada?/)-3)
    console.log(id)
    let status = msg.body.substring(msg.body.search(/¿aceptada/)+12, msg.body.search(/¿aceptada/)+14)
    console.log(status)
    loscuates.sendMessage(msg.from, statusCotizacion(id, status))

}
    
for(i=0;i<submsg.length;i++){
    let cantidad = 1;
   
    let medidas;
    
    if(/\d+.?\d? x \d+.?\d?/.test(submsg[i])){


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

if(/\d+.?\d? x \d+.?\d?/.test(msg.body)){
        const cotizacion = new Cotizacion({
        cliente: msg.from,
        descripcion: msg.body,
        gasto: gasto,
        por_Ganancia: porcganacia,
        precio:preciocliente,
        })

cotizacion.save((err, document)=>{
    if(err)console.log(err);
    console.log(document)
})

    
   
    
    if(/otsoc/i.test(msg.body)&&((/vidrio/i.test(msg.body)||/espejo/i.test(msg.body)||/luna/i.test(msg.body))&&/\d+.?\d? x \d+.?\d?/.test(msg.body)
    &&(/6mm/.test(msg.body)||/3mm/.test(msg.body)||/4mm/.test(msg.body)||/9mm/.test(msg.body)))){
        loscuates.sendMessage(msg.from, `Este producto nos cuesta a nosotros: $${gasto.toFixed(0)}`)
    }


    if(/\d+.?\d? x \d+.?\d?/.test(msg.body)){

        loscuates.sendMessage(msg.from, `El precio de este producto es: $${preciocliente.toFixed(0)}`)
        loscuates.sendMessage(msg.from, `_id: ${(JSON.stringify(cotizacion._id))}, ¿aceptada?: `)
        
        
    }

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

    if(ack == 3) {
        // The message was read
    }
});

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
    console.log('CHANGE STATE', state )
});

// Change to false if you don't want to reject incoming calls
let rejectCalls = true;

loscuates.on('call', async (call) => {
    console.log('Call received, rejecting. GOTO Line 261 to disable', call);
    if (rejectCalls) await call.reject();
    await loscuates.sendMessage(call.from, `[${call.fromMe ? 'Outgoing' : 'Incoming'}] Phone call from ${call.from}, type ${call.isGroup ? 'group' : ''} ${call.isVideo ? 'video' : 'audio'} call. ${rejectCalls ? 'This call was automatically rejected by the script.' : ''}`);
});

loscuates.on('disconnected', (reason) => {
    loscuates.initialize();
    console.log('Client was logged out', reason);
});

