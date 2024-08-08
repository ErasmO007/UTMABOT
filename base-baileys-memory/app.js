const { createBot, createProvider, createFlow, addKeyword, EVENTS, addAnswer } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
//const i18next = require('./i18n');
//i18next.on('initialized', () => {
//    console.log('i18next is fully initialized and ready to use.', i18next.t('test'));

    
const handleFlow = (flow, input) => {

    if (flow[input]) {
        return flow[input]();
    }

    return false;

}


// Flujo idioma
// const flowIdioma = addKeyword([EVENTS.WELCOME])
//     .addAnswer('¿En qué idioma prefieres continuar?')
//     .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Español\n*2*. Ingles', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
//         const input = parseInt(ctx.body);
//         const FLOW_IDIOMA_OPTIONS = {
//             1: () => {
//                 i18next.changeLanguage('es', (err, t) => {
//                     if (err) return console.error(err);
//                     console.log('i18next initialized');
//                     return gotoFlow(flowPrincipal);
//                 }
//                 );
//             },
//             2: () => {
//                 i18next.changeLanguage('en', (err, t) => {
//                     if (err) return console.error(err);
//                     console.log('i18next initialized');
//                     return gotoFlow(flowPrincipal);
//                 }
//                 );

//             },
//         }

//         if (input === 1 || input === 2) {
//             FLOW_IDIOMA_OPTIONS[input]();

//         } else {
//             return fallBack('Respuesta no válida, por favor responde *1* o *2*.');
//         }



//     });


// Flujo principal
const flowPrincipal = addKeyword([EVENTS.WELCOME])
    //.addAnswer(i18next.t('test'))
    .addAnswer("🙌 Hola, bienvenido al chat automatizado de la Universidad Tecnológica Metropolitana de Aguascalientes.")
    .addAnswer('Antes de continuar, dinos ¿qué tipo de usuario eres?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*.Interno\n*2*.Externo', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();

        const FLOW_PRINCIPAL_OPTIONS = {
            1: () => { return gotoFlow(flowInterno) },
            2: () => { return gotoFlow(flowExterno) },

        }

        //console.log('i18next', i18next.t('test'));
        const flow = handleFlow(FLOW_PRINCIPAL_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*');
    });


// Flujo para alumno interno
const flowInterno = addKeyword([EVENTS.ACTION])
    .addAnswer('¿Sobre qué te gustaría preguntar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Becas\n*2*. Biblioteca\n*3*. Cajas\n*4*. Carreras\n*5*. Comunicación\n*6*. Cultura y Deportes\n*7*. Educación Continua\n*8*. Enfermería\n*9*. Estadías\n*10*. Idiomas\n*11*. Internacionalización\n*12*. Psicología\n*13*. Servicios Escolares\n*14*. Tutoria\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);

        const FLOW_INTERNO_OPTIONS = {
            0: () => { return gotoFlow(flowPrincipal) },
            1: () => { return gotoFlow(flowBecasInt) },
            2: () => { return gotoFlow(flowBibliotecaInt) },
            3: () => { return gotoFlow(flowCajasInt) },
            4: () => { return gotoFlow(flowCarrerasInt) },
            5: () => { return gotoFlow(flowComunicacionInt) },
            6: () => { return gotoFlow(flowCulturaDeportesInt) },
            7: () => { return gotoFlow(flowEducacionContinuaInt) },
            8: () => { return gotoFlow(flowEnfermeriaInt) },
            9: () => { return gotoFlow(flowEstadiasInt) },
            10: () => { return gotoFlow(flowIdiomasInt) },
            11: () => { return gotoFlow(flowInternacionalizacionInt) },
            12: () => { return gotoFlow(flowPsicologiaInt) },
            13: () => { return gotoFlow(flowServiciosEscolaresInt) },
            14: () => { return gotoFlow(flowTutoriaInt) },
        }

        const flow = handleFlow(FLOW_INTERNO_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *14* o *0* para volver al menú anterior.');
        
        return flow
    });


// Flujo para alumno externo
const flowExterno = addKeyword([EVENTS.ACTION])
    .addAnswer('¿Sobre qué te gustaría preguntar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Becas\n*2*. Cajas\n*3*. Carreras\n*4*. Comunicación\n*5*. Educación Continua\n*6*. Idiomas\n*7*. Internacionalización\n*8*. Servicios Escolares\n*9*. Tutoria\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);

        const FLOW_EXTERNO_OPTIONS = {
            0: () => { return gotoFlow(flowPrincipal) },
            1: () => { return gotoFlow(flowBecasExt) },
            2: () => { return gotoFlow(flowCajasExt) },
            3: () => { return gotoFlow(flowCarrerasExt) },
            4: () => { return gotoFlow(flowComunicacionExt) },
            5: () => { return gotoFlow(flowEducacionContinuaExt) },
            6: () => { return gotoFlow(flowIdiomasExt) },
            7: () => { return gotoFlow(flowInternacionalizacionExt) },
            8: () => { return gotoFlow(flowServiciosEscolaresExt) },
            9: () => { return gotoFlow(flowTutoriaExt) },
        }

        const flow = handleFlow(FLOW_EXTERNO_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *9* o *0* para volver al menú anterior.');

        return flow;
    });

const flowDespedida = addKeyword([EVENTS.ACTION])
.addAnswer('¡Gracias por contactarnos! Si tienes alguna otra pregunta en el futuro, no dudes en ponerte en contacto con nosotros. ¡Que tengas un excelente día!',{
     media: 'https://ucarecdn.com/7fa95f00-825c-4430-b8d1-292156b08477/utmabot.gif'});
    
    //https://ucarecdn.com/7fa95f00-825c-4430-b8d1-292156b08477/gif2video/-/preview/-/format/mp4/-/quality/normal/', capture: true});

// Flujos de respuestas internas específicas
const flowCajasInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Cajas de la UTMA está a tu disposición para atender todos los trámites relacionados con pagos y asuntos financieros. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 108 en un horario de 8 a.m. a 4 p.m. o de 12 p.m a 7 p.m.')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Costos\n*2*. Métodos de pago\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
        const input = parseInt(ctx.body);

        const FLOW_CAJASINT_OPTIONS = {
            0: () => { return gotoFlow(flowInterno) },
            1: async () => {
                return await flowDynamic('Estos son los costos de la universidad que detallan las tarifas de colegiaturas, exámenes y otros servicios educativos.', {
                    media: 'https://ucarecdn.com/a6f6eef4-c2b6-4fe1-9cbc-040f06b7b27f/-/format/auto/-/quality/smart/',
                });
            },
            2: async () => {
                return await flowDynamic('Estos son los métodos de pago de la universidad que detallan las opciones y procedimientos para realizar tus pagos.', {
                    media: 'https://ucarecdn.com/41cd9dd0-b8a8-4991-9d1d-e9e5c722c5f1/-/format/auto/-/quality/smart/',
                });
            },
        };
        const flow = handleFlow(FLOW_CAJASINT_OPTIONS, input);

        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *2* o *0* para volver al menú anterior.');
        
        return flow;
    })

.addAnswer('¿Hay algo más en lo que te podamos ayudar?')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const input = parseInt(ctx.body);
    const FLOW_PREGUNTA_OPTIONS = {
        1: () => { return gotoFlow(flowInterno) },
        2: () => { return gotoFlow(flowDespedida) },
    }

    const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')
  
});

const flowComunicacionInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Comunicaciones de la UTMA se dedica a gestionar y coordinar todas las actividades relacionadas con la comunicación interna y externa de la institución.')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Calendario\n*2*. Créditos\n*3*. Talleres\n*4*. Redes Sociales\n*5*. Transporte\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        const input = parseInt(ctx.body);

        const FLOW_COMUNICACIONINT_OPTIONS = {
            0: () => { return gotoFlow(flowInterno) },
            1: async () => {
                return await flowDynamic('Calendario Escolar 2023-2024', {
                    media: 'https://ucarecdn.com/9e2dab70-5555-4310-84e8-6a95b1d1911f/-/format/auto/-/quality/smart/',
                })
            },
            2: async () => {
                return await flowDynamic('Para consultar tus créditos ingresa a nuestra página web: https://utma.edu.mx/');
            },
            3: async () => {
                return await flowDynamic('Estos son los talleres que ofrece la UTMA.', {
                    media: 'https://ucarecdn.com/d1e79aa1-32ad-4816-832b-6e306ba589ef/-/format/auto/-/quality/smart/',
                });
            },
            4: async () => {
                return await flowDynamic(['¡No olvides seguirnos en todas nuestras Redes Sociales!',
                    'Facebook: https://www.facebook.com/UTMABiS/',
                    'Instagram: https://www.instagram.com/ut.metropolitana/',
                    'X: https://x.com/UTMetropolitana',
                    'Youtube: https://www.youtube.com/@utmetropolitana',
                    'TikTok: https://www.tiktok.com/@utmetropolitana',
                    'Teléfono: 449-925-3920 y 449-925-3921'
                ]);
            },
            5: async () => {
                return await flowDynamic('A continuación, encontrarás las rutas de los transportes de la Universidad, así como las rutas de los autobuses que facilitan tu acceso al campus.', {
                    media: 'https://ucarecdn.com/6c07a44a-98f9-4179-8cff-29a6e8c69a01/-/format/auto/-/quality/smart/',
                });
            },
        }
        const flow = handleFlow(FLOW_COMUNICACIONINT_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *5* o *0* para volver al menú anterior.');

        return flow
    })

.addAnswer('¿Hay algo más en lo que te podamos ayudar?')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const input = parseInt(ctx.body);
    const FLOW_PREGUNTA_OPTIONS = {
        1: () => { return gotoFlow(flowInterno) },
        2: () => { return gotoFlow(flowDespedida) },
    }

    const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

});


const flowServiciosEscolaresInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Servicios Escolares de la UTMA está disponible para apoyarte con tus trámites escolares. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 110.')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Constancias\n*2*. Reinscripción\n*3*. Reingreso\n*4*. Bajas\n*5*. Titulación\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
        const input = parseInt(ctx.body);

        const FLOW_SERVICIOSESCOLARESINT_OPTIONS = {
            0: () => { return gotoFlow(flowInterno) },
            1: async () => {
                return await flowDynamic('Estos son los pasos para solicitar una Constancia, Historial o Certificado.', {
                    media: 'https://ucarecdn.com/5d530bcd-3cd1-4320-a0fe-919999c6c11b/-/format/auto/-/quality/smart/',
                });
            },
            2: async () => {
                return await flowDynamic('Estos son los pasos a seguir para realizar tu Proceso de Reinscripción.', {
                    media: 'https://ucarecdn.com/420fe602-5250-47de-bc44-a6e59c2bfcd5/-/format/auto/-/quality/smart/',
                });
            },
            3: async () => {
                return await flowDynamic('Estos son los pasos a seguir para realizar tu Proceso de Reingreso.', {
                    media: 'https://ucarecdn.com/6d803c08-90f4-4536-baf1-81aecb493aff/-/format/auto/-/quality/smart/',
                });
            },
            4: async () => {
                return await flowDynamic('Si deseas iniciar el proceso de baja estudiantil, el primer paso es consultar a tu jefe de carrera para que te asesore en este trámite.');
            },
            5: async () => {
                return await flowDynamic('Estos son los requisitos para llevar a cabo tu trámite de titulación.', {
                    media: 'https://ucarecdn.com/ea5891f8-1b0a-4fe5-b03c-eaa8b1ccafea/-/format/auto/-/quality/smart/',
                });
            },
        }
        const flow = handleFlow(FLOW_SERVICIOSESCOLARESINT_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *5* o *0* para volver al menú anterior.');

        return flow;
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowInterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });


const flowIdiomasInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Idiomas de la UTMA te brinda la oportunidad de aprender y mejorar tus habilidades en diferentes lenguas extranjeras. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 202.')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Nivel de inglés necesario por cuatrimestre \n*2*. Fechas de aplicación de ITEP \n*3*. Oferta de idiomas\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
        const input = parseInt(ctx.body);

        const FLOW_IDIOMASINT_OPTIONS = {
            0: () => { return gotoFlow(flowInterno) },
            1: async () => {
                return await flowDynamic('Este es el nivel de inglés requerido según el cuatrimestre que estés cursando.', {
                    media: 'https://ucarecdn.com/7ad0478b-eb4f-41a1-98f5-21ff0d9d8a1f/-/format/auto/-/quality/smart/',
                });
            },
            2: async () => {
                return await flowDynamic('Estas son las fechas más próximas para presentar tu examen.', {
                    media: 'https://ucarecdn.com/4980ca14-c95e-4d02-88bd-13c7a72ed314/-/format/auto/-/quality/smart/',
                });
            },
            3: async () => {
                return await flowDynamic('Actualmente, la universidad ofrece cursos de alemán y francés. Para determinar si cumples con el nivel requerido para inscribirte en alguno de estos cursos, te recomendamos que te acerques a tu maestro de idiomas.')
            }
        }
        const flow = handleFlow(FLOW_IDIOMASINT_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *3* o *0* para volver al menú anterior.');
    
        return flow;
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowInterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });


const flowInternacionalizacionInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Internacionalización de la UTMA te ofrece oportunidades para participar en programas de intercambio, colaboraciones internacionales y más. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 112.')

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowInterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });


const flowPsicologiaInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Psicología de la UTMA está disponible para apoyarte con tus necesidades de bienestar emocional y mental. Para más información te invitamos a comunicarte con nosotros.', {
        media: 'https://ucarecdn.com/dfc6ffaf-499f-4301-8ed9-dd394b2d7c67/-/format/auto/-/quality/smart/', 
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowInterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });


const flowBibliotecaInt = addKeyword([EVENTS.ACTION])
    .addAnswer('La biblioteca de la UTMA ofrece una amplia variedad de recursos y servicios para apoyar tus estudios e investigaciones. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 114.')

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowInterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });


const flowCarrerasInt = addKeyword([EVENTS.ACTION])
    .addAnswer('Las carreras que ofrece la UTMA están diseñadas para brindarte una formación integral y de calidad. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 115.')
    .addAnswer('Si quieres conocer tu Plan de Estudios selecciona el *número* que corresponda a la opción que deseas:\n*1*. Desarrollo de Software \n*2*. Inteligencia Artificial \n*3*. Negocios Internacionales\n*4*. Sistemas de Gestión de Calidad\n*5*. Materiales\n*6*. Robótica\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
        const input = parseInt(ctx.body);

        const FLOW_CARRERASINT_OPTIONS = {
            0: () => { return gotoFlow(flowInterno) },
            1: async () => {
                return await flowDynamic('Este programa pertenece a la academia de Tecnologías de la Información.', {
                    media: 'https://ucarecdn.com/f5c52e59-ac14-4e4e-8e42-0477e6833b34/-/format/auto/-/quality/smart/',
                });
            },
            2: async () => {
                return await flowDynamic('Este programa pertenece a la academia de Tecnologías de la Información.', {
                    media: 'https://ucarecdn.com/c6b2b8ae-9bfb-4772-8097-9b824b5edb7c/-/format/auto/-/quality/smart/',
                });
            },
            3: async () => {
                return await flowDynamic('Este programa pertenece a la academia de Operaciones Comerciales Internacionales.', {
                    media: 'https://ucarecdn.com/89b880a5-ed53-4c85-87b9-125f4b46af6d/-/format/auto/-/quality/smart/',
                });
            },
            4: async () => {
                return await flowDynamic('Este programa pertenece a la academia de Procesos Industriales.', {
                    media: 'https://ucarecdn.com/491216dc-c3dd-4374-8fa2-c4bf7290404c/-/format/auto/-/quality/smart/',
                });
            },
            5: async () => {
                return await flowDynamic('Este programa pertenece a la academia de Nanotecnología.', {
                    media: 'https://ucarecdn.com/f90546c2-2837-4ed3-abaa-d1e12f15864f/-/format/auto/-/quality/smart/',
                });
            },
            6: async () => {
                return await flowDynamic('Este programa pertenece a la academia de Mecatrónica.', {
                    media: 'https://ucarecdn.com/e7e5eaf5-a1cf-40ce-bca9-508e6732ac7f/-/format/auto/-/quality/smart/',
                });
            }
        }
        const flow = handleFlow(FLOW_CARRERASINT_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *6* o *0* para volver al menú anterior.');
    
        return flow;
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowInterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });


const flowCulturaDeportesInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Cultura y Deportes de la UTMA promueve la participación en actividades culturales y deportivas para fomentar el bienestar y la convivencia entre los estudiantes. Si deseas consultar tus créditos ingresa a nuestra página web: https://utma.edu.mx/ ')
    .addAnswer('Estos son los talleres que ofrece la UTMA.', {
        media: 'https://ucarecdn.com/d1e79aa1-32ad-4816-832b-6e306ba589ef/-/format/auto/-/quality/smart/',
    })
 
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowInterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    }); 

const flowBecasInt = addKeyword([EVENTS.ACTION])
.addAnswer('El área de Becas de la UTMA te ofrece diversas oportunidades para obtener apoyo financiero en tu educación. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 301.')
.addAnswer('Por el momento, estas son las becas con las que cuenta la UTMA:')
.addAnswer('Beca Comedor.',{
    media: 'https://ucarecdn.com/a22ca718-d4ba-412e-94d0-16a4f9f061a7/-/format/auto/-/quality/smart/'
})
.addAnswer('Beca Vulnerabilidad.',{
    media: 'https://ucarecdn.com/e129d8e8-9f93-4e90-8f7a-2eb5fc14eb1c/-/format/auto/-/quality/smart/'
})
.addAnswer('Beca Académica.',{
    media: 'https://ucarecdn.com/9a8c15b5-0031-419e-85b2-db516ed609aa/-/format/auto/-/quality/smart/'
})

.addAnswer('¿Hay algo más en lo que te podamos ayudar?')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const input = parseInt(ctx.body);
    const FLOW_PREGUNTA_OPTIONS = {
        1: () => { return gotoFlow(flowInterno) },
        2: () => { return gotoFlow(flowDespedida) },
    }

    const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

});

const flowEducacionContinuaInt = addKeyword([EVENTS.ACTION])
.addAnswer('El área de Educación Continua de la UTMA te ofrece una amplia variedad de cursos y diplomados para complementar tu formación académica. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 301 o al correo educacioncontinua@utma.edu.mx.')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Centro de Capacitación\n*2*. Centro de Idiomas\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
    const input = parseInt(ctx.body);

    const FLOW_EDUCACIONCONTINUAINT_OPTIONS = {
        0: () => { return gotoFlow(flowInterno) },
        1: () => { return gotoFlow(flowCCapacitacionInt) },
        2: () => { return gotoFlow(flowCIdiomasInt) },
    }
    const flow = handleFlow(FLOW_EDUCACIONCONTINUAINT_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *2* o *0* para volver al menú anterior.');

    return flow;
})

.addAnswer('¿Hay algo más en lo que te podamos ayudar?')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const input = parseInt(ctx.body);
    const FLOW_PREGUNTA_OPTIONS = {
        1: () => { return gotoFlow(flowInterno) },
        2: () => { return gotoFlow(flowDespedida) },
    }

    const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

});

const flowCCapacitacionInt= addKeyword([EVENTS.ACTION])
.addAnswer('El Centro de Capacitación de la UTMA te ofrece diversas oportunidades para mejorar tus habilidades y conocimientos a través de nuestros cursos y talleres.')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Oferta\n*2*. Proceso de Inscripción\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
    const input = parseInt(ctx.body);

    const FLOW_CCAPACITACIONINT_OPTIONS = {
        0: () => { return gotoFlow(flowInterno) },
        1: () => { return gotoFlow(flowOfertaCapacitacionInterno) },
        2: async () => {
            return await flowDynamic('Para conocer los pasos de inscripción, escanea el código QR.', {
                media: 'https://www.dropbox.com/scl/fi/rzypsa3ezx22lf1kuiy41/FOLLETOS-DE-CURSOS-INNOVA-LEARNING.pdf?rlkey=fht07m29783wv4ykn1d34im4q&st=vw46j9r4&raw=1',
            });
        },
    }
    const flow = handleFlow(FLOW_CCAPACITACIONINT_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *2* o *0* para volver al menú anterior.');

    return flow;
})

.addAnswer('¿Hay algo más en lo que te podamos ayudar?')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const input = parseInt(ctx.body);
    const FLOW_PREGUNTA_OPTIONS = {
        1: () => { return gotoFlow(flowInterno) },
        2: () => { return gotoFlow(flowDespedida) },
    }

    const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

});

const flowOfertaCapacitacionInterno = addKeyword([EVENTS.ACTION])
    .addAnswer('Te ofrecemos diversas oportunidades para mejorar tus habilidades y conocimientos a través de nuestros cursos y talleres.', {
        media: 'https://ucarecdn.com/b1f4843f-b213-4067-a08e-a6f47c2e3c0c/-/format/auto/-/quality/smart/',
    })
    .addAnswer('Aquí están los cursos más próximos a comenzar en la universidad.')
    .addAnswer('Engagement Power: Mantén a tu equipo motivado', {
        media: 'https://ucarecdn.com/99b6721b-8c4f-4333-a4bd-13803c3924d2/-/format/auto/-/quality/smart/'
    })
    .addAnswer('Aplicación Estratégica de la IA en Recursos Humanos', {
        media: 'https://ucarecdn.com/c5116d7b-df2c-46d7-b885-f1914d244798/-/format/auto/-/quality/smart/'
    })
    .addAnswer('Manejo del estrés laboral.', {
        media: 'https://ucarecdn.com/6fbc6144-84cc-4364-b9d2-11e0e01cd7db/-/format/auto/-/quality/smart/'
})

.addAnswer('¿Hay algo más en lo que te podamos ayudar?')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const input = parseInt(ctx.body);
    const FLOW_PREGUNTA_OPTIONS = {
        1: () => { return gotoFlow(flowInterno) },
        2: () => { return gotoFlow(flowDespedida) },
    }

    const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

});

const flowCIdiomasInt= addKeyword([EVENTS.ACTION])
.addAnswer('El Centro de Idiomas de la UTMA te ofrece diversas oportunidades para mejorar tus habilidades lingüísticas a través de nuestros cursos y talleres.la UTMA te ofrece diversas oportunidades para mejorar tus habilidades y conocimientos a través de nuestros cursos y talleres.')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Oferta\n*2*. Proceso de Inscripción\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
    const input = parseInt(ctx.body);

    const FLOW_CIDIOMASINT_OPTIONS = {
        0: () => { return gotoFlow(flowInterno) },
        1: async () => {
            return await flowDynamic('Te ofrecemos diversas oportunidades para mejorar tus habilidades lingüísticas a través de nuestros cursos.', {
                media: 'https://ucarecdn.com/36dde50a-c37e-47be-826e-8e2d7cc87d2a/-/format/auto/-/quality/smart/',
            });
        },
        2: async () => {
            return await flowDynamic('Para conocer los pasos de inscripción, escanea el código QR.', {
                media: 'https://ucarecdn.com/b8c05ccf-12fc-4c08-a527-6535313ff965/-/format/auto/-/quality/smart/',
            });
        },
    }
    const flow = handleFlow(FLOW_CIDIOMASINT_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *2* o *0* para volver al menú anterior.');

    return flow;
})

.addAnswer('¿Hay algo más en lo que te podamos ayudar?')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const input = parseInt(ctx.body);
    const FLOW_PREGUNTA_OPTIONS = {
        1: () => { return gotoFlow(flowInterno) },
        2: () => { return gotoFlow(flowDespedida) },
    }

    const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

});

const flowEstadiasInt= addKeyword([EVENTS.ACTION])
.addAnswer('El área de Estadías de la UTMA está a tu disposición para atender todos los trámites relacionados con prácticas profesionales y estancias académicas. Para más información, te invitamos a comunicarte al correo dalonso@utma.edu.mx')
.addAnswer('A continuación, te proporcionaremos toda la información necesaria para iniciar el proceso de tus estadías.')
.addAnswer('Este es el Procedimiento para las Estadías.',{
    media: 'https://ucarecdn.com/5847bf90-ab00-401c-8e6f-deb2120cb398/-/format/auto/-/quality/smart/'
})
.addAnswer('Estas son las Características que debes cumplir para realizar tus Estadías.',{
    media: 'https://ucarecdn.com/f4506777-ce86-4ff5-8f24-d07045a20eb1/-/format/auto/-/quality/smart/'
})
.addAnswer('Este es el Directorio de Empresas con las que puedes realizar tus Estadías.',{
    media: 'https://ucarecdn.com/5847bf90-ab00-401c-8e6f-deb2120cb398/-/format/auto/-/quality/smart/'
})
.addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowInterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });

const flowTutoriaInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Tutorías de la UTMA está aquí para ayudarte con tus dudas académicas y brindarte el apoyo necesario para tu éxito estudiantil. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 111.')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Faltas\n*2*. Reglamento\n*3*. Código de vestimenta\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
        const input = parseInt(ctx.body);

        const FLOW_TUTORIAINT_OPTIONS = {
            0: () => { return gotoFlow(flowInterno) },
            1: async () => {
                return await flowDynamic('Esta tabla te ayudará a calcular tus faltas permitidas por materia.', {
                    media: 'https://ucarecdn.com/0eefd507-694b-4043-abcc-32fef143a9b5/-/format/auto/-/quality/smart/',
                });
            },
            2: () => { return gotoFlow(flowReglamentoInt) },
            3: async () => {
                return await flowDynamic('Este es el código de vestimenta que detalla las reglas sobre la ropa apropiada para usar dentro de la universidad.', {
                    media: 'https://ucarecdn.com/92563fa3-f821-4731-ba5b-70894bf34a3e/-/format/auto/-/quality/smart/',
                });
            },
        }
        const flow = handleFlow(FLOW_TUTORIAINT_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *3* o *0* para volver al menú anterior.');

        return flow;
    })
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowInterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });

const flowReglamentoInt = addKeyword([EVENTS.ACTION])
    .addAnswer('Este es el Reglamento. En él encontrarás las normas y procedimientos que debes seguir, así como los derechos y responsabilidades de los estudiantes.')
    .addAnswer('Selecciona el *número* que corresponda al capítulo que te gustaría explorar:\n*1*. Disposiciones Generales\n*2*. Derechos y Obligaciones\n*3*. Períodos Escolares\n*4*. Evaluación del Aprendizaje\n*5*. Bajas\n*6*. Distinciones Académicas\n*7*. Títulos y Reconocimientos\n*8*. Becas\n*9*. Sanciones\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        const input = parseInt(ctx.body);

        const FLOW_REGLAMENTOINT_OPTIONS = {
            0: () => { return gotoFlow(flowTutoriaInt) },
            1: async () => {
                return await flowDynamic('Disposiciones Generales', {
                    media: 'https://ucarecdn.com/1abfe0b0-cd42-4107-a031-54cb2d7adc7a/-/format/auto/-/quality/smart/',
                });
            },
            2: async () => {
                return await flowDynamic('Derechos y Obligaciones', {
                    media: 'https://ucarecdn.com/966837fc-949a-4cca-a960-d0ec19379d2d/-/format/auto/-/quality/smart/',
                });
            },
            3: async () => {
                return await flowDynamic('Períodos Escolares', {
                    media: 'https://ucarecdn.com/06bb50a7-3664-4c34-bd7f-fe4625666bd1/-/format/auto/-/quality/smart/',
                });
            },
            4: async () => {
                return await flowDynamic('Evaluación del Aprendizaje', {
                    media: 'https://ucarecdn.com/733d5155-b8ca-443e-9d3c-6780ae7d791c/-/format/auto/-/quality/smart/',
                });
            },
            5: async () => {
                return await flowDynamic('Bajas', {
                    media: 'https://ucarecdn.com/feb07bd7-dc63-45e5-93f1-1d63c646f05b/-/format/auto/-/quality/smart/',
                });
            },
            6: async () => {
                return await flowDynamic('Distinciones Académicas', {
                    media: 'https://ucarecdn.com/f167687e-0cf6-42ef-9c41-d55fdc27ce09/-/format/auto/-/quality/smart/',
                });
            },
            7: async () => {
                return await flowDynamic('Títulos y Reconocimientos', {
                    media: 'https://ucarecdn.com/5df3a542-a180-42de-a5b4-f50c59df77bc/-/format/auto/-/quality/smart/',
                });
            },
            8: async () => {
                return await flowDynamic('Becas', {
                    media: 'https://ucarecdn.com/b423ea6e-ce76-4ba8-80f2-f052dc879f92/-/format/auto/-/quality/smart/',
                });
            },
            9: async () => {
                return await flowDynamic('Sanciones', {
                    media: 'https://ucarecdn.com/2740dc6e-d5c6-4957-937b-a74aab563390/-/format/auto/-/quality/smart/',
                });
            },

        }

        const flow = handleFlow(FLOW_REGLAMENTOINT_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *9* o *0* para volver al menú anterior.')

            return flow;

    })
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowInterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });

const flowEnfermeriaInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Enfermería de la UTMA está disponible para brindarte atención médica y apoyo en el cuidado de tu salud. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 308 o al correo jcordero@utma.edu.mx en un horario de 10 a.m. a 6 p.m.')

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowInterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });


// Flujos de respuestas externas específicas
const flowCajasExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Cajas de la UTMA está a tu disposición para atender todos los trámites relacionados con pagos y asuntos financieros. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 108 en un horario de 8 a.m. a 4 p.m. o de 12 p.m a 8 p.m.')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Costos\n*2*. Métodos de pago\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
        const input = parseInt(ctx.body);

        const FLOW_CAJASEXT_OPTIONS = {
            0: () => { return gotoFlow(flowExterno) },
            1: async () => {
                return await flowDynamic('Estos son los costos de la universidad que detallan las tarifas de colegiaturas, exámenes y otros servicios educativos.', {
                    media: 'https://ucarecdn.com/c5b12e46-770a-415e-af0c-fbb478581d81/-/format/auto/-/quality/smart/',
                });
            },
            2: async () => {
                return await flowDynamic('Estos son los métodos de pago de la universidad que detallan las opciones y procedimientos para realizar tus pagos.', {
                    media: 'https://ucarecdn.com/8f9819f5-9115-4afb-af7e-009bbc871e7f/-/format/auto/-/quality/smart/',
                })
            },
        }
        const flow = handleFlow(FLOW_CAJASEXT_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *2* o *0* para volver al menú anterior.');

        return flow;
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowExterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });

const flowComunicacionExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Comunicaciones de la UTMA se dedica a gestionar y coordinar todas las actividades relacionadas con la comunicación interna y externa de la institución.')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Redes Sociales\n*2*. Transporte\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        const input = parseInt(ctx.body);

        const FLOW_COMUNICACIONEXT_OPTIONS = {
            0: () => { return gotoFlow(flowExterno) },
            1: async () => {
                return await flowDynamic(['¡No olvides seguirnos en todas nuestras Redes Sociales!',
                    'Facebook: https://www.facebook.com/UTMABiS/',
                    'Instagram: https://www.instagram.com/ut.metropolitana/',
                    'X: https://x.com/UTMetropolitana',
                    'Youtube: https://www.youtube.com/@utmetropolitana',
                    'TikTok: https://www.tiktok.com/@utmetropolitana',
                    'Teléfono: 449-925-3920 y 449-925-3921'
                ]);
            },
            2: async () => {
                return await flowDynamic('A continuación, encontrarás las rutas de los transportes de la Universidad, así como las rutas de los autobuses que facilitan tu acceso al campus.', {
                    media: 'https://ucarecdn.com/6c07a44a-98f9-4179-8cff-29a6e8c69a01/-/format/auto/-/quality/smart/',
                });
            },
        }
        const flow = handleFlow(FLOW_COMUNICACIONEXT_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *2* o *0* para volver al menú anterior.');

        return flow;
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowExterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });

const flowServiciosEscolaresExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Servicios Escolares de la UTMA está disponible para apoyarte con tus trámites escolares. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 110.')
    .addAnswer('Estos son los pasos a seguir para realizar tu Proceso de Inscripción.', {
        media: 'https://ucarecdn.com/c2d1b0b4-b102-43c0-a0f8-4f49e4b43759/-/format/auto/-/quality/smart/',
    })
    .addAnswer('¡Felicidades! En caso de haber sido aceptado sigue los siguientes pasos para la entrega de documentos.', {
        media: 'https://ucarecdn.com/058e7e78-6b98-455d-9157-4a43589deb0a/-/format/auto/-/quality/smart/',
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowExterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });


const flowIdiomasExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Idiomas de la UTMA te brinda la oportunidad de aprender y mejorar tus habilidades en diferentes lenguas extranjeras. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 111.')
    .addAnswer('Por el momento, no hay clases disponibles para personas externas a la UTMA. Sin embargo, no es necesario tener un nivel de inglés alto para ingresar a nuestra universidad. A continuación, te dejamos un diagrama con el nivel de inglés requerido según el cuatrimestre que estés cursando.', {
        media: 'https://ucarecdn.com/7ad0478b-eb4f-41a1-98f5-21ff0d9d8a1f/-/format/auto/-/quality/smart/',
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowExterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });

const flowInternacionalizacionExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Internacionalización de la UTMA te ofrece oportunidades para participar en programas de intercambio, colaboraciones internacionales y más. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 112.')

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowExterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });

const flowCarrerasExt = addKeyword([EVENTS.ACTION])
    .addAnswer('Las carreras que ofrece la UTMA están diseñadas para brindarte una formación integral y de calidad. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 115.')
    .addAnswer('Si quieres conocer tu Plan de Estudios selecciona el *número* que corresponda a la opción que deseas:\n*1*. Desarrollo de Software \n*2*. Inteligencia Artificial \n*3*. Negocios Internacionales\n*4*. Sistemas de Gestión de Calidad\n*5*. Materiales\n*6*. Robótica\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
        const input = parseInt(ctx.body);

        const FLOW_CARRERASEXT_OPTIONS = {
            0: () => { return gotoFlow(flowExterno) },
            1: async () => {
                return await flowDynamic('Este programa pertenece a la academia de Tecnologías de la Información.', {
                    media: 'https://ucarecdn.com/f5c52e59-ac14-4e4e-8e42-0477e6833b34/-/format/auto/-/quality/smart/',
                });
            },
            2: async () => {
                return await flowDynamic('Este programa pertenece a la academia de Tecnologías de la Información.', {
                    media: 'https://ucarecdn.com/c6b2b8ae-9bfb-4772-8097-9b824b5edb7c/-/format/auto/-/quality/smart/',
                });
            },
            3: async () => {
                return await flowDynamic('Este programa pertenece a la academia de Operaciones Comerciales Internacionales.', {
                    media: 'https://ucarecdn.com/89b880a5-ed53-4c85-87b9-125f4b46af6d/-/format/auto/-/quality/smart/',
                });
            },
            4: async () => {
                return await flowDynamic('Este programa pertenece a la academia de Procesos Industriales.', {
                    media: 'https://ucarecdn.com/491216dc-c3dd-4374-8fa2-c4bf7290404c/-/format/auto/-/quality/smart/',
                });
            },
            5: async () => {
                return await flowDynamic('Este programa pertenece a la academia de Nanotecnología.', {
                    media: 'https://ucarecdn.com/f90546c2-2837-4ed3-abaa-d1e12f15864f/-/format/auto/-/quality/smart/',
                });
            },
            6: async () => {
                return await flowDynamic('Este programa pertenece a la academia de Mecatrónica.', {
                    media: 'https://ucarecdn.com/e7e5eaf5-a1cf-40ce-bca9-508e6732ac7f/-/format/auto/-/quality/smart/',
                });
            }
        }
        const flow = handleFlow(FLOW_CARRERASEXT_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *6* o *0* para volver al menú anterior.');
        
        return flow;
    })
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowExterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });

const flowBecasExt= addKeyword([EVENTS.ACTION])
.addAnswer('El área de Becas de la UTMA te ofrece diversas oportunidades para obtener apoyo financiero en tu educación. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 301.')
.addAnswer('Por el momento, estas son las becas con las que cuenta la UTMA.', {
    media: 'https://ucarecdn.com/17bf5ac1-f808-43e9-ab61-c749b1a9fb69/-/format/auto/-/quality/smart/'});

const flowEducacionContinuaExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Educación Continua de la UTMA te ofrece una amplia variedad de cursos y diplomados para complementar tu formación académica. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 301 o al correo educacioncontinua@utma.edu.mx.')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Centro de Capacitación\n*2*. Centro de Idiomas\n*3*. Centro de Evaluación\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
        const input = parseInt(ctx.body);
    
        const FLOW_EDUCACIONCONTINUAEXT_OPTIONS = {
            0: () => { return gotoFlow(flowInterno) },
            1: () => { return gotoFlow(flowCCapacitacionExt) },
            2: () => { return gotoFlow(flowCIdiomasExt) },
            3: () => { return gotoFlow(flowCEvaluacionExt) },
        }
        const flow = handleFlow(FLOW_EDUCACIONCONTINUAEXT_OPTIONS, input)
    
        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *2* o *0* para volver al menú anterior.');
    
        return flow;
    })
    
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowExterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }
    
        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)
    
        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')
    
    });
    
    const flowCCapacitacionExt= addKeyword([EVENTS.ACTION])
.addAnswer('El Centro de Capacitación de la UTMA te ofrece diversas oportunidades para mejorar tus habilidades y conocimientos a través de nuestros cursos y talleres.')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Oferta\n*2*. Proceso de Inscripción\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
    const input = parseInt(ctx.body);

    const FLOW_CCAPACITACIONEXT_OPTIONS = {
        0: () => { return gotoFlow(flowExterno) },
        1: () => { return gotoFlow(flowOfertaCapacitacionExt) },
        2: async () => {
            return await flowDynamic('Para conocer los pasos de inscripción, escanea el código QR.', {
                media: 'https://www.dropbox.com/scl/fi/rzypsa3ezx22lf1kuiy41/FOLLETOS-DE-CURSOS-INNOVA-LEARNING.pdf?rlkey=fht07m29783wv4ykn1d34im4q&st=vw46j9r4&raw=1',
            });
        },
    }
    const flow = handleFlow(FLOW_CCAPACITACIONEXT_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *2* o *0* para volver al menú anterior.');

    return flow;
})

.addAnswer('¿Hay algo más en lo que te podamos ayudar?')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const input = parseInt(ctx.body);
    const FLOW_PREGUNTA_OPTIONS = {
        1: () => { return gotoFlow(flowExterno) },
        2: () => { return gotoFlow(flowDespedida) },
    }

    const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

});

const flowOfertaCapacitacionExt = addKeyword([EVENTS.ACTION])
    .addAnswer('Te ofrecemos diversas oportunidades para mejorar tus habilidades y conocimientos a través de nuestros cursos y talleres.', {
        media: 'https://ucarecdn.com/b1f4843f-b213-4067-a08e-a6f47c2e3c0c/-/format/auto/-/quality/smart/',
    })
    .addAnswer('Aquí están los cursos más próximos a comenzar en la universidad.')
    .addAnswer('Engagement Power: Mantén a tu equipo motivado', {
        media: 'https://ucarecdn.com/99b6721b-8c4f-4333-a4bd-13803c3924d2/-/format/auto/-/quality/smart/'
    })
    .addAnswer('Aplicación Estratégica de la IA en Recursos Humanos', {
        media: 'https://ucarecdn.com/c5116d7b-df2c-46d7-b885-f1914d244798/-/format/auto/-/quality/smart/'
    })
    .addAnswer('Manejo del estrés laboral.', {
        media: 'https://ucarecdn.com/6fbc6144-84cc-4364-b9d2-11e0e01cd7db/-/format/auto/-/quality/smart/'
})

.addAnswer('¿Hay algo más en lo que te podamos ayudar?')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const input = parseInt(ctx.body);
    const FLOW_PREGUNTA_OPTIONS = {
        1: () => { return gotoFlow(flowExterno) },
        2: () => { return gotoFlow(flowDespedida) },
    }

    const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

});

const flowCIdiomasExt= addKeyword([EVENTS.ACTION])
.addAnswer('El Centro de Idiomas de la UTMA te ofrece diversas oportunidades para mejorar tus habilidades lingüísticas a través de nuestros cursos y talleres.la UTMA te ofrece diversas oportunidades para mejorar tus habilidades y conocimientos a través de nuestros cursos y talleres.')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Oferta\n*2*. Proceso de Inscripción\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
    const input = parseInt(ctx.body);

    const FLOW_CIDIOMASEXT_OPTIONS = {
        0: () => { return gotoFlow(flowInterno) },
        1: async () => {
            return await flowDynamic('Te ofrecemos diversas oportunidades para mejorar tus habilidades lingüísticas a través de nuestros cursos.', {
                media: 'https://ucarecdn.com/36dde50a-c37e-47be-826e-8e2d7cc87d2a/-/format/auto/-/quality/smart/',
            });
        },
        2: async () => {
            return await flowDynamic('Para conocer los pasos de inscripción, escanea el código QR.', {
                media: 'https://ucarecdn.com/b8c05ccf-12fc-4c08-a527-6535313ff965/-/format/auto/-/quality/smart/',
            });
        },
    }
    const flow = handleFlow(FLOW_CIDIOMASEXT_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *2* o *0* para volver al menú anterior.');

    return flow;
})

.addAnswer('¿Hay algo más en lo que te podamos ayudar?')
.addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const input = parseInt(ctx.body);
    const FLOW_PREGUNTA_OPTIONS = {
        1: () => { return gotoFlow(flowExterno) },
        2: () => { return gotoFlow(flowDespedida) },
    }

    const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

    if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

});
    
    const flowCEvaluacionExt= addKeyword([EVENTS.ACTION])
    .addAnswer('Te ofrecemos diversas oportunidades para mejorar tus habilidades a través de nuestras evaluaciones y certificaciones. Para conocer nuestra oferta de cursos te invitamos a ponerte en contacto al numero 449 925 3920 ext. 301 o al correo educacioncontinua@utma.edu.mx')
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowExterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }
    
        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)
    
        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')
    
    });

const flowTutoriaExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Tutorías de la UTMA está aquí para ayudarte con tus dudas académicas y brindarte el apoyo necesario para tu éxito estudiantil. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext. 111.')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Faltas\n*2*. Reglamento\n*3*. Código de vestimenta\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
        const input = parseInt(ctx.body);

        const FLOW_TUTORIAEXT_OPTIONS = {
            0: () => { return gotoFlow(flowExterno) },
            1: async () => {
                return await flowDynamic('Esta tabla te ayudará a calcular tus faltas permitidas por materia.', {
                    media: 'https://ucarecdn.com/0eefd507-694b-4043-abcc-32fef143a9b5/-/format/auto/-/quality/smart/',
                });
            },
            2: () => { return gotoFlow(flowReglamentoExt) },
            3: async () => {
                return await flowDynamic('Este es el código de vestimenta que detalla las reglas sobre la ropa apropiada para usar dentro de la universidad.', {
                    media: 'https://ucarecdn.com/92563fa3-f821-4731-ba5b-70894bf34a3e/-/format/auto/-/quality/smart/',
                });
            },
        }
        const flow = handleFlow(FLOW_TUTORIAEXT_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *3* o *0* para volver al menú anterior.');
    
        return flow;
    })


    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowExterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });

const flowReglamentoExt = addKeyword([EVENTS.ACTION])
    .addAnswer('Este es el Reglamento. En él encontrarás las normas y procedimientos que debes seguir, así como los derechos y responsabilidades de los estudiantes.')
    .addAnswer('Selecciona el *número* que corresponda al capítulo que te gustaría explorar:\n*1*. Disposiciones Generales\n*2*. Derechos y Obligaciones\n*3*. Períodos Escolares\n*4*. Evaluación del Aprendizaje\n*5*. Bajas\n*6*. Distinciones Académicas\n*7*. Títulos y Reconocimientos\n*8*. Becas\n*9*. Sanciones\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        const input = parseInt(ctx.body);

        const FLOW_REGLAMENTOEXT_OPTIONS = {
            0: () => { return gotoFlow(flowTutoriaExt) },
            1: async () => {
                return await flowDynamic('Disposiciones Generales', {
                    media: 'https://ucarecdn.com/1abfe0b0-cd42-4107-a031-54cb2d7adc7a/-/format/auto/-/quality/smart/',
                });
            },
            2: async () => {
                return await flowDynamic('Derechos y Obligaciones', {
                    media: 'https://ucarecdn.com/966837fc-949a-4cca-a960-d0ec19379d2d/-/format/auto/-/quality/smart/',
                });
            },
            3: async () => {
                return await flowDynamic('Períodos Escolares', {
                    media: 'https://ucarecdn.com/06bb50a7-3664-4c34-bd7f-fe4625666bd1/-/format/auto/-/quality/smart/',
                });
            },
            4: async () => {
                return await flowDynamic('Evaluación del Aprendizaje', {
                    media: 'https://ucarecdn.com/733d5155-b8ca-443e-9d3c-6780ae7d791c/-/format/auto/-/quality/smart/',
                });
            },
            5: async () => {
                return await flowDynamic('Bajas', {
                    media: 'https://ucarecdn.com/feb07bd7-dc63-45e5-93f1-1d63c646f05b/-/format/auto/-/quality/smart/',
                });
            },
            6: async () => {
                return await flowDynamic('Distinciones Académicas', {
                    media: 'https://ucarecdn.com/f167687e-0cf6-42ef-9c41-d55fdc27ce09/-/format/auto/-/quality/smart/',
                });
            },
            7: async () => {
                return await flowDynamic('Títulos y Reconocimientos', {
                    media: 'https://ucarecdn.com/5df3a542-a180-42de-a5b4-f50c59df77bc/-/format/auto/-/quality/smart/',
                });
            },
            8: async () => {
                return await flowDynamic('Becas', {
                    media: 'https://ucarecdn.com/b423ea6e-ce76-4ba8-80f2-f052dc879f92/-/format/auto/-/quality/smart/',
                });
            },
            9: async () => {
                return await flowDynamic('Sanciones', {
                    media: 'https://ucarecdn.com/2740dc6e-d5c6-4957-937b-a74aab563390/-/format/auto/-/quality/smart/',
                });
            },

        }

        const flow = handleFlow(FLOW_REGLAMENTOEXT_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor elige una opción del *1* al *9* o *0* para volver al menú anterior.')

            return flow;
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n*1*. Si\n*2*. No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        const FLOW_PREGUNTA_OPTIONS = {
            1: () => { return gotoFlow(flowExterno) },
            2: () => { return gotoFlow(flowDespedida) },
        }

        const flow = handleFlow(FLOW_PREGUNTA_OPTIONS, input)

        if (!flow) return fallBack('Opción no válida, por favor responde *1* o *2*')

    });

const main = async () => {
    const adapterDB = new MockAdapter();
    //flowIdioma
    const adapterFlow = createFlow([flowPrincipal, 
        flowInterno, 
        flowExterno, 
        flowDespedida, 

        flowCajasInt, 
        flowComunicacionInt, 
        flowServiciosEscolaresInt, 
        flowIdiomasInt, 
        flowInternacionalizacionInt, 
        flowPsicologiaInt, 
        flowBibliotecaInt, 
        flowCarrerasInt, 
        flowCulturaDeportesInt, 
        flowTutoriaInt, 
        flowEstadiasInt, 
        flowBecasInt, 
        flowEnfermeriaInt, 
        flowReglamentoInt,
        flowEducacionContinuaInt, 
        flowCCapacitacionInt, 
        flowOfertaCapacitacionInterno, 
        flowCIdiomasInt, 

        flowCajasExt, 
        flowComunicacionExt, 
        flowServiciosEscolaresExt, 
        flowIdiomasExt, 
        flowInternacionalizacionExt, 
        flowCarrerasExt, 
        flowBecasExt, 
        flowTutoriaExt, 
        flowEducacionContinuaExt, 
        flowCCapacitacionExt, 
        flowCIdiomasExt, 
        flowCEvaluacionExt,
        flowOfertaCapacitacionExterno, 
        flowReglamentoExt]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();
// });

// i18next.on('languageChanged', () => {
    
// }
// );
