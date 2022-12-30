const {materiales} = require('../precios.js')


const cot_vidrio=(tipo_vidrio, grosor_vidrio, proceso_vidrio, alto, ancho, pelicula)=>{

    return (alto/100*ancho/100)*(materiales.cristal[tipo_vidrio][grosor_vidrio][proceso_vidrio]+pelicula)
    
}

const cot_mosquitero=(coloralum, alto, ancho, body)=>{
    let total;
    console.log(materiales.mosquitero[coloralum].vertical460, alto, ancho)
    if(/sin rieles/.test(body)||/con mosquitero/.test(body)){
    let gastoverticales =((materiales.mosquitero[coloralum].vertical460)/4.60)*(alto/100)*2
    let gastohorizontales=((materiales.mosquitero[coloralum].horizontal)/6.05)*(ancho/100)*2
    let gastotela= (alto/100)*(ancho/100)*40
    let gastoherrajes = 2*materiales.herrajes.carre_mosqui+2*materiales.herrajes.fleje+2*materiales.herrajes.plana12
    total = gastohorizontales+gastoverticales+gastotela+gastoherrajes
    return total
    }else{
    let gastorieles=(materiales.mosquitero[coloralum].adaptador/6.05)*(ancho/100)*2+materiales.mosquitero[coloralum].silla/605*(ancho/100)*2
    console.log(gastorieles)
    let gastoverticales =((materiales.mosquitero[coloralum].vertical460)/4.60)*(alto/100)*2
    console.log(gastoverticales)
    let gastohorizontales=((materiales.mosquitero[coloralum].horizontal)/6.05)*(ancho/100)*2
    console.log(gastohorizontales)
    let gastotela= (alto/100)*(ancho/100)*40
    let gastoherrajes = 2*materiales.herrajes.carre_mosqui+2*materiales.herrajes.fleje+2*materiales.herrajes.plana12
    total= gastohorizontales+gastoverticales+gastotela+gastoherrajes+gastorieles
    return total
    } 
}

const cot_plegadiza=(coloralum, alto, ancho, divi, gastovidrio)=>{
    let gastoverticales
    let gastohorizontales
    let gastosjuquillos
    let gastocontrmarco
    let gastoherrajes
    let total
    if(alto>205&&alto<305){
        gastoverticales=materiales.puerta_unatrescuartos[coloralum].remate*divi
    }
    else if(alto<205){
        gastoverticales=materiales.puerta_unatrescuartos[coloralum].remate*(divi*2/3)
    }else{
        gastoverticales=materiales.puerta_unatrescuartos[coloralum].remate*divi*2
    }

    gastohorizontales=materiales.puerta_unatrescuartos[coloralum].cabezal*((ancho-(5*divi*2))*2/607)
    gastosjuquillos=(((ancho-(5*divi*2))*2+(alto*divi*2))*2/607)*materiales.puerta_unatrescuartos[coloralum].junquillo
    gastoherrajes=materiales.herrajes.carrito*divi*2+materiales.herrajes.chapatetra+materiales.herrajes.vinil11*3+materiales.selladores.acrilastic*2
    if(ancho<305){
    gastocontrmarco=materiales.puerta_unatrescuartos[coloralum].medioriel+materiales.tubular[coloralum].tub2x1}
    else{
    gastocontrmarco=materiales.puerta_unatrescuartos[coloralum].rielpesado+materiales.tubular[coloralum].tub2x1} 
    total=gastocontrmarco+gastoherrajes+gastohorizontales+gastosjuquillos+gastoverticales+gastovidrio
    return total
}

const cot_CorredizaNacional = (coloralum, alto, ancho, tipo, mosquitero, divi, g_vidrio, body )=>{
    let g_perimetros
    let g_hojas
    let g_herrajes
    let g_mosquitero = 0
    let total
    
   
    if(mosquitero==true){
        g_mosquitero=cot_mosquitero(coloralum, alto, ancho, body)
        if((alto*2+ancho)>607){
            g_perimetros= materiales.corrediza[tipo][coloralum].jamba_c_mosq*1.5+materiales.corrediza[tipo][coloralum].riel_c_mos*(ancho/607)
            console.log('perimetros 1')
            if(alto<230){
                if(divi==3){
                    g_hojas=materiales.corrediza[tipo][coloralum].cerco460+materiales.corrediza[tipo][coloralum].traslape460*2+((ancho-20)/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
                    g_herrajes= materiales.herrajes.carreitlla3*4+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic*2
                }else if(divi==4){
                    g_hojas=(materiales.corrediza[tipo][coloralum].cerco460*2)+(materiales.corrediza[tipo][coloralum].traslape460*2)+((ancho-(divi*5))/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
                    g_herrajes= materiales.herrajes.carreitlla3*2+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic*2
                }else{
                    g_hojas=(materiales.corrediza[tipo][coloralum].cerco460)+(materiales.corrediza[tipo][coloralum].traslape460)+((ancho-(divi*5))/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
                    g_herrajes= materiales.herrajes.carreitlla3*2+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic*2
                }
            }else{

                if(divi==3){
                    g_hojas=materiales.corrediza[tipo][coloralum].cerco610+materiales.corrediza[tipo][coloralum].traslape610*2+((ancho-20)/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
                    g_herrajes= materiales.herrajes.carreitlla3*4+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic*2
                }else if(divi==4){
                    g_hojas=(materiales.corrediza[tipo][coloralum].cerco610*2)+(materiales.corrediza[tipo][coloralum].traslape610*2)+((ancho-(divi*5))/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
                    g_herrajes= materiales.herrajes.carreitlla3*2+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic*2
                }else{
                    g_hojas=(materiales.corrediza[tipo][coloralum].cerco610)+(materiales.corrediza[tipo][coloralum].traslape610)+((ancho-(divi*5))/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
                    g_herrajes= materiales.herrajes.carreitlla3*2+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic*2
                }   
            }
        
        }else{
            g_perimetros=((alto*2+ancho)/607)*materiales.corrediza[tipo][coloralum].jamba_c_mosq+(ancho/607)*materiales.corrediza[tipo][coloralum].riel_c_mos
            console.log('perimetros 2')
            if(divi==3){
            g_hojas=(alto/607)*((materiales.corrediza[tipo][coloralum].cerco610*2)+(materiales.corrediza[tipo][coloralum].traslape610*4))+((ancho-20)/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
            g_herrajes= materiales.herrajes.carreitlla3*4+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic
            }else{
            g_hojas=(alto/607)*((materiales.corrediza[tipo][coloralum].cerco610*divi)+(materiales.corrediza[tipo][coloralum].traslape610*divi))+((ancho-(divi*5))/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
            g_herrajes= materiales.herrajes.carreitlla3*2+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic
            }
        }
    
    }else{
        if((alto*2+ancho)>607){
            g_perimetros= materiales.corrediza[tipo][coloralum].jamba_s_mosq*1.5+materiales.corrediza[tipo][coloralum].riel_s_mos*(ancho/607)
            console.log('perimetros 3')
            if(alto<230){
                if(divi==3){
                    g_hojas=materiales.corrediza[tipo][coloralum].cerco460+materiales.corrediza[tipo][coloralum].traslape460*2+((ancho-20)/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
                    g_herrajes= materiales.herrajes.carreitlla3*4+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic*2
                }else if(divi==4){
                    g_hojas=(materiales.corrediza[tipo][coloralum].cerco460*2)+(materiales.corrediza[tipo][coloralum].traslape460*2)+((ancho-(divi*5))/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
                    g_herrajes= materiales.herrajes.carreitlla3*2+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic*2
                }else{
                    g_hojas=(materiales.corrediza[tipo][coloralum].cerco460)+(materiales.corrediza[tipo][coloralum].traslape460)+((ancho-(divi*5))/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
                    g_herrajes= materiales.herrajes.carreitlla3*2+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic*2
                }
            }else{
                if(divi==3){
                    g_hojas=materiales.corrediza[tipo][coloralum].cerco610+materiales.corrediza[tipo][coloralum].traslape610*2+((ancho-20)/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
                    g_herrajes= materiales.herrajes.carreitlla3*4+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic*2
                }else if(divi==4){
                    g_hojas=(materiales.corrediza[tipo][coloralum].cerco610*2)+(materiales.corrediza[tipo][coloralum].traslape610*2)+((ancho-(divi*5))/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
                    g_herrajes= materiales.herrajes.carreitlla3*2+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic*2
                }else{
                    g_hojas=(materiales.corrediza[tipo][coloralum].cerco610)+(materiales.corrediza[tipo][coloralum].traslape610)+((ancho-(divi*5))/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
                    g_herrajes= materiales.herrajes.carreitlla3*2+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic*2
                }   
            }
        
        }else{
            
            g_perimetros=((alto*2+ancho)/607)*materiales.corrediza[tipo][coloralum].jamba_s_mosq+(ancho/607)*materiales.corrediza[tipo][coloralum].riel_s_mos
            console.log('perimetros 4')
            if(divi==3){
            g_hojas=(alto/607)*((materiales.corrediza[tipo][coloralum].cerco610*2)+(materiales.corrediza[tipo][coloralum].traslape610*4))+((ancho-20)/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
            g_herrajes= materiales.herrajes.carreitlla3*4+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic
            }else{
            g_hojas=(alto/607)*((materiales.corrediza[tipo][coloralum].cerco610*divi)+(materiales.corrediza[tipo][coloralum].traslape610*divi))+((ancho-(divi*5))/607)*(materiales.corrediza[tipo][coloralum].zoclo2venas+materiales.corrediza[tipo][coloralum].cabezal)
            g_herrajes= materiales.herrajes.carreitlla3*2+materiales.herrajes.embutir3pulgadas+materiales.herrajes.vinil11+materiales.selladores.acrilastic
            }
        }
        
    }

    console.log(g_perimetros)
    console.log(g_vidrio)
    total= g_perimetros+g_hojas+g_herrajes+g_mosquitero+g_vidrio
    return total;
}

const cot_cancelbaño = (coloralum, alto, ancho, lamina, pelicula)=>{
    let g_aluminio
    let g_laminas
    let g_herrajes
    let total
    console.log('lamina es :'+lamina)
    if(lamina=='policarbonato'){
        g_laminas=(alto/100)*(ancho/100)*materiales.laminas['policarbonato'] }
    else if(lamina=='vidrio'){
        console.log('entro a vidrio')
        g_laminas= cot_vidrio('claro','6mm','templado',alto,ancho,pelicula)}

    else if(lamina=='plastico'&&ancho<66&&alto<190){
        g_laminas=materiales.laminas['plastico'].pla60x180}

    else if(lamina=='plastico'&&ancho<106&&alto<190){
        g_laminas=materiales.laminas['plastico'].pla100x180}

    else if(lamina=='plastico'&&ancho<126&&alto<190){
            console.log('entro a plastico 120x180')
        g_laminas=materiales.laminas['plastico'].pla120x180}

    else if(lamina=='plastico'&&ancho<156&&alto<190){
        g_laminas=materiales.laminas['plastico'].pla150x180}

        else if(lamina=='acrilico'&&ancho<96&&alto<190){
            g_laminas=materiales.laminas[lamina].acri90x180}
    
        else if(lamina=='acrilico'&&ancho<126&&alto<190){
            g_laminas=materiales.laminas[lamina].acri120x180}
    
        else if(lamina=='acrilico'&&ancho<156&&alto<190){
            g_laminas=materiales.laminas[lamina].acri150x180}
    
        else if(this.lamina==='acrilico'&&(ancho<186&&alto<250)||(ancho<246&&alto<190)){
            console.log('entro a arilico de 180 x 240')
            g_laminas=materiales.laminas['acrilico'].acri180x240}

    g_aluminio=(alto/550)*(materiales.cancel_baño[coloralum].marco_semiluejo*4+materiales.cancel_baño[coloralum].jambabaño*2)+
    (ancho/607)*(materiales.cancel_baño[coloralum].riel+materiales.cancel_baño[coloralum].guia+materiales.cancel_baño[coloralum].marco_semiluejo*2)
    g_herrajes=materiales.herrajes.carrecancel*4+materiales.herrajes.tornillo*8+materiales.selladores.silicon
    console.log('gasto alumini:'+g_aluminio)
    console.log('gasto lamina:'+g_laminas)
    console.log('gasto herrajes:'+g_herrajes)
    total=g_aluminio+g_laminas+g_herrajes
    return total
}

const cot_Domo=(coloralum, largo, ancho, lamina, tubo, g_vidrio)=>{

    let largueros = 2
    let ancheros= 2

    let g_aluminio
    let g_lamina
    let g_herrajes
    let total=0
    
    largueros+=(Math.round(ancho/90)-1)
    ancheros+=(Math.round(largo/90)-1)

    console.log('el tubo es '+tubo)
    

    if(lamina=='vidrio'){
        g_lamina=g_vidrio
    }else{
    g_lamina=materiales.laminas['policarbonato']*((largo+15)/100)*((ancho+15)/100)}

    g_aluminio=materiales.tubular[coloralum][tubo]*(largo/607)*largueros+materiales.tubular[coloralum][tubo]*(ancho/607)*ancheros
    
    if(lamina=='policarbonato'){
    g_herrajes=50+materiales.selladores.duretan
    }else{
    g_herrajes=(largo/100)*largueros*(materiales.selladores.norton/30)+(ancho/100)*ancheros*(materiales.selladores.norton/30)+materiales.selladores.duretan
    }

    console.log('gasto aluminio:'+g_aluminio)
    console.log('gasto lamina:'+g_lamina)
    console.log('gasto herrajes'+g_herrajes)
    total=g_aluminio+g_lamina+g_herrajes

    return total

}



module.exports = {cot_vidrio, cot_mosquitero, cot_plegadiza, cot_CorredizaNacional, cot_cancelbaño, cot_Domo}
