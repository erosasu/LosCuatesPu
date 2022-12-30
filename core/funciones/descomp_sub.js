const {materiales} =require('../precios');
const { cot_vidrio, cot_mosquitero, cot_CorredizaNacional, cot_plegadiza,cot_cancelbaño, cot_Domo} = require('./cotizador');


const composicion_producto =(body, alto, ancho)=>{
let tipo_vidrio = 'claro';
let grosor_vidrio= '6mm';
let proceso_vidrio='crudo';
let lamina='plastico'
let tubo='2x1in'

let divi=2;

let in_vent_nacional='3in'
let coloralum='natural'
let piezas_en_objeto = 2;
let mosquitero = false
let pelicula = 0

console.log(body)

    if(/\d{1,2}mm/.test(body)){
    grosor_vidrio=body.substring(body.search(/mm/)-1,body.search(/mm/))+'mm'}
    //define el tipo de vidrio
    if(/tintex/.test(body)){
    tipo_vidrio = 'tintex'
    }else if(/espejo/.test(body)){
        tipo_vidrio='espejo'
    }else if(/filtrasol/.test(body)){
        tipo_vidrio='filtrasol'
    }else if(/satinado/.test(body)){
        tipo_vidrio='satinado'}

    //define el proceso del vidrio
    if(/templado/.test(body)){
        proceso_vidrio='templado'}

    //define el grueso de la ventana
    if(/ventana/i.test(body)&&/pulgadas/.test(body)){
    in_vent_nacional=body.substring(body.search(/pulgadas/)-2,body.search(/pulgadas/)-1)+'in'}
       

    if(/blanco/.test(body)){
        coloralum ='blanco';}
    else if(/natural/.test(body)){
        coloralum = 'natural'}
    else if(/negro/.test(body)){
        coloralum = 'negro'}
    else if(/electro 100/.test(body)||/champig?ne/.test(body)){
        coloralum = 'e100' }
    else if(/gris europa/.test(body)){
        coloralum = 'griseuro'}
    else if(/ madera /.test(body)){
        coloralum ='madera'}

    if(/ 3 piezas /.test(body)||/3 partes/.test(body)||/ tres piezas /.test(body)||/ 3 diviciones /.test(body)){
        divi = 3
        console.log('entro a tres diviciones')
    }
    else if(/una divic?ion/.test(body)){
        divi=2
    }
    else if(/ 4 piezas /.test(body)||/4 partes/.test(body)||/ cuatro piezas /.test(body)||/ 4 diviciones /.test(body)){
        divi = 4
    }
    else if(/ una pieza /.test(body)){
        divi = 1
    }
 


    if(/pelicula esmerilada/.test(body)){
       pelicula=materiales.peliculas.peliculaesmeril
    }
    else if(/pelicula reflecta/.test(body)){
        pelicula =materiales.peliculas.pelicureflecta
    }
    else if(/pelicula polarizada/.test(body)){
        pelicula =materiales.peliculas.pelicupolarizada
    }
    else if(/vidrio esmerilado/.test(body)){
        pelicula =materiales.peliculas.esmerilado
    }

    if(/con mosquitero/.test(body)){
        mosquitero= true
    }

    if(/acrilico/.test(body)){
        lamina='acrilico'
    }else if(/cancel de baño/i.test(body)&&/vidrio/.test(body)){
        lamina='vidrio'
    }else if(/cancel de baño/i.test(body)&&/policarbonato/.test(body)){
        lamina='policarbonato'
    }

    if(/tubo/.test(body)){
        tubo=body.substring(body.search(/tubo/)+5,body.search(/tubo/)+8)
        console.log('este tubo es de :'+tubo)
    }

    if((/vidrio/i.test(body)||/espejo/i.test(body))&&!(/ventana/i.test(body)||/puerta/i.test(body)||/domo/i.test(body)||/cancel de baño/i.test(body))){
        return cot_vidrio(tipo_vidrio, grosor_vidrio, proceso_vidrio, alto, ancho, pelicula)
    }
    else if(/mosquitero corredizo/i.test(body)){
        
        return cot_mosquitero(coloralum,alto,ancho, body)
    }
    else if(/plegadiza?/i.test(body)){
        let gastovidrio = cot_vidrio(tipo_vidrio, grosor_vidrio, proceso_vidrio, alto-10, ancho-10, pelicula)
        return cot_plegadiza(coloralum, alto, ancho, divi, gastovidrio)
    }
    else if (/corrediza/i.test(body)){
        
        let gastovidrio = cot_vidrio(tipo_vidrio, grosor_vidrio, proceso_vidrio, alto-10, ancho-10, pelicula)
        return cot_CorredizaNacional(coloralum, alto, ancho, in_vent_nacional, mosquitero, divi, gastovidrio, body)
    }
    else if(/cancel de baño/i.test(body)){
        console.log('entro a cancel')
        return cot_cancelbaño(coloralum, alto, ancho, lamina, pelicula)

    }
    else if(/domo/i.test(body)){
        let g_vidrio = 0;
        if(/vidrio/.test(body)){   
            g_vidrio= cot_vidrio(tipo_vidrio, grosor_vidrio, 'templado', alto+15, ancho+15, pelicula)
            lamina='vidrio' 
        }
        return cot_Domo(coloralum, alto, ancho, lamina, tubo, g_vidrio)
    }
    else{
        return cot_vidrio(tipo_vidrio, grosor_vidrio, proceso_vidrio, alto, ancho, pelicula)
    }


}

module.exports = {composicion_producto}







