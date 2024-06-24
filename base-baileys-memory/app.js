const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

// Flujo principal
const flowPrincipal = addKeyword([EVENTS.WELCOME])
    .addAnswer('🙌 Hola, bienvenido al chat automatizado de la Universidad Tecnológica Metropolitana de Aguascalientes')
    .addAnswer('¿Eres usuario Interno o Externo?', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();

        switch (input) {
            case 'interno':
                return gotoFlow(flowInterno);
            case 'externo':
                return gotoFlow(flowExterno);
            default:
                return fallBack('Respuesta no válida, por favor responde Interno o Externo.');
        }
    });


// Flujo para alumno interno
const flowInterno = addKeyword([EVENTS.ACTION])
    .addAnswer('¿Sobre qué te gustaría preguntar?')
    .addAnswer('Selecciona el número que corresponda a la opción que deseas:\n*1*. Cajas\n*2*. Comunicación\n*3*. Servicios Escolares\n*4*. Idiomas\n*5*. Internacionalización\n*6*. Psicología\n*7*. Biblioteca\n*8*. Carreras\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        switch (input) {
            case 0:
                return gotoFlow(flowPrincipal);
            case 1:
                return gotoFlow(flowCajasInt);
            case 2:
                return gotoFlow(flowComunicacionInt);
            case 3:
                return gotoFlow(flowServiciosEscolaresInt);
            case 4:
                return gotoFlow(flowIdiomasInt);
            case 5:
                return gotoFlow(flowInternacionalizacionInt);
            case 6:
                return gotoFlow(flowPsicologiaInt);
            case 7:
                return gotoFlow(flowBibliotecaInt);
            case 8:
                return gotoFlow(flowCarrerasInt);
            default:
                return fallBack('Opción no válida, por favor elige una opción del 1 al 8 o 0 para volver al menú anterior.');
        }
    });

// Flujo para alumno externo
const flowExterno = addKeyword([EVENTS.ACTION])
    .addAnswer('¿Sobre qué te gustaría preguntar?')
    .addAnswer('Selecciona el número que corresponda a la opción que deseas:\n*1*. Cajas\n*2*. Comunicación\n*3*. Servicios Escolares\n*4*. Idiomas\n*5*. Internacionalización\n*6*. Carreras\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = parseInt(ctx.body);
        switch (input) {
            case 0:
                return gotoFlow(flowPrincipal);
            case 1:
                return gotoFlow(flowCajasExt);
            case 2:
                return gotoFlow(flowComunicacionExt);
            case 3:
                return gotoFlow(flowServiciosEscolaresExt);
            case 4:
                return gotoFlow(flowIdiomasExt);
            case 5:
                return gotoFlow(flowInternacionalizacionExt);
            case 6:
                return gotoFlow(flowCarrerasExt);
            default:
                return fallBack('Opción no válida, por favor elige una opción del 1 al 6 o 0 para volver al menú anterior.');
        }
    });


const flowDespedida = addKeyword([EVENTS.ACTION])
    .addAnswer('¡Gracias por contactarnos! Si tienes alguna otra pregunta en el futuro, no dudes en ponerte en contacto con nosotros. ¡Que tengas un excelente día!');


// Flujos de respuestas internas específicas
const flowCajasInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Cajas de la UTMA está a tu disposición para atender todos los trámites relacionados con pagos y asuntos financieros. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 108.')
    .addAnswer('Costos 2024', {
        media: 'https://drive.google.com/uc?export=view&id=1lkO--gbvelVaxCcTqsNn_J0YTJP_gZ-g',
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?\nResponde con Si o No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        switch (input) {
            case 'si':
                return gotoFlow(flowInterno);
            case 'no':
                return gotoFlow(flowDespedida);
            default:
                return fallBack('Respuesta no válida, por favor responde Si o No.');
        }
    });


const flowComunicacionInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Comunicaciones de la UTMA se dedica a gestionar y coordinar todas las actividades relacionadas con la comunicación interna y externa de la institución.')
    .addAnswer('Selecciona el número que corresponda a la opción que deseas:\n*1*. Calendario\n*2*. ITEP\n*3*. Créditos\n*4*. Talleres\n*5*. Redes Sociales\n*6*. Transporte\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        const input = parseInt(ctx.body);
        switch (input) {
            case 0:
                return gotoFlow(flowInterno);
            case 1:
                return await flowDynamic('Calendario Escolar 2023-2024', {
                    media: 'https://drive.google.com/uc?export=view&id=1juASkf7U3wGY0q1oIeKNkdjkVrySl_cj',
                });
            case 2:
                return await flowDynamic('Estas son las fechas más próximas', {
                    media: 'https://drive.google.com/uc?export=view&id=1ay0RtrrYkJGaa4-aWzhwpNPkHYG7Nx37',
                });
            case 3:
                return await flowDynamic('Para consultar tus créditos ingresa a nuestra página web: https://utma.edu.mx/');
            case 4:
                return await flowDynamic('Estos son los talleres que ofrece la UTMA', {
                    media: 'https://drive.google.com/uc?export=view&id=1WapWttXjNYKggGr6JeHvhmiAo_puyc5n',
                });
            case 5:
                return await flowDynamic(['¡No olvides seguirnos en todas nuestras Redes Sociales!',
                    'Facebook: https://www.facebook.com/UTMABiS/',
                    'Instagram: https://www.instagram.com/ut.metropolitana/',
                    'X: https://x.com/UTMetropolitana',
                    'Youtube: https://www.youtube.com/@utmetropolitana',
                    'TikTok: https://www.tiktok.com/@utmetropolitana',
                    'Teléfono: 449-925-3920 y 449-925-3921'
                ]);
            case 6:
                return await flowDynamic('A continuación, encontrarás las rutas de los transportes de la Universidad, así como las rutas de los autobuses que facilitan tu acceso al campus.', {
                    media: 'https://drive.google.com/uc?export=view&id=1i4jX9M03toBf2Rd9Y1I9J6ccBCk-Vxt6',
                });
            default:
                return fallBack('Opción no válida, por favor elige una opción del 1 al 6 o 0 para volver al menú anterior.');
        }
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?\nResponde con Si o No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        switch (input) {
            case 'si':
                return gotoFlow(flowInterno);
            case 'no':
                return gotoFlow(flowDespedida);
            default:
                return fallBack('Respuesta no válida, por favor responde Si o No.');
        }
    });


const flowServiciosEscolaresInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Servicios Escolares de la UTMA está disponible para apoyarte con tus trámites escolares. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 110.')
    .addAnswer('Selecciona el número que corresponda a la opción que deseas:\n*1*. Constancias\n*2*. Reinscripción\n*3*. Reingreso\n*4*. Bajas\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
        const input = parseInt(ctx.body);
        switch (input) {
            case 0:
                return gotoFlow(flowInterno);
            case 1:
                return await flowDynamic('Estos son los pasos para solicitar una Constancia, Historial o Certificado', {
                    media: 'https://drive.google.com/uc?export=view&id=1i04XqYWwh_r-TSeDbypXdXytnkQBm-8b',
                });
            case 2:
                return await flowDynamic('Estos son los pasos a seguir para realizar tu Proceso de Reinscripción', {
                    media: 'https://drive.google.com/uc?export=view&id=1SBIQXtyw4F2NYZyd5ykeehZCjPEObBDG',
                });
            case 3:
                return await flowDynamic('Estos son los pasos a seguir para realizar tu Proceso de Reingreso', {
                    media: 'https://drive.google.com/uc?export=view&id=160pVipNeEB7CcRQ_gHSjyUh__5auxW6m',
                });
            case 4:
                return await flowDynamic('Si deseas iniciar el proceso de baja estudiantil, el primer paso es consultar a tu jefe de carrera para que te asesore en este trámite.');
            default:
                return fallBack('Opción no válida, por favor elige una opción del 1 al 4 o 0 para volver al menú anterior.');
        }
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?\nResponde con Si o No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        switch (input) {
            case 'si':
                return gotoFlow(flowInterno);
            case 'no':
                return gotoFlow(flowDespedida);
            default:
                return fallBack('Respuesta no válida, por favor responde Si o No.');
        }
    });


const flowIdiomasInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Idiomas de la UTMA te brinda la oportunidad de aprender y mejorar tus habilidades en diferentes lenguas extranjeras. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 111.')

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?\nResponde con Si o No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        switch (input) {
            case 'si':
                return gotoFlow(flowInterno);
            case 'no':
                return gotoFlow(flowDespedida);
            default:
                return fallBack('Respuesta no válida, por favor responde Si o No.');
        }
    });


const flowInternacionalizacionInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Internacionalización de la UTMA te ofrece oportunidades para participar en programas de intercambio, colaboraciones internacionales y más. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 112.')

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?\nResponde con Si o No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        switch (input) {
            case 'si':
                return gotoFlow(flowInterno);
            case 'no':
                return gotoFlow(flowDespedida);
            default:
                return fallBack('Respuesta no válida, por favor responde Si o No.');
        }
    });


const flowPsicologiaInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Psicología de la UTMA está disponible para apoyarte con tus necesidades de bienestar emocional y mental. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 113.')

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?\nResponde con Si o No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        switch (input) {
            case 'si':
                return gotoFlow(flowInterno);
            case 'no':
                return gotoFlow(flowDespedida);
            default:
                return fallBack('Respuesta no válida, por favor responde Si o No.');
        }
    });


const flowBibliotecaInt = addKeyword([EVENTS.ACTION])
    .addAnswer('La biblioteca de la UTMA ofrece una amplia variedad de recursos y servicios para apoyar tus estudios e investigaciones. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 114.')

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?\nResponde con Si o No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        switch (input) {
            case 'si':
                return gotoFlow(flowInterno);
            case 'no':
                return gotoFlow(flowDespedida);
            default:
                return fallBack('Respuesta no válida, por favor responde Si o No.');
        }
    });


const flowCarrerasInt = addKeyword([EVENTS.ACTION])
    .addAnswer('Las carreras que ofrece la UTMA están diseñadas para brindarte una formación integral y de calidad. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 115.')
    .addAnswer('Si quieres conocer tu Plan de Estudios selecciona el número que corresponda a la opción que deseas:\n*1*. Desarrollo de Software \n*2*. Inteligencia Artificial \n*3*. Negocios Internacionales\n*4*. Sistemas de Gestión de Calidad\n*5*. Materiales\n*6*. Robótica\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
        const input = parseInt(ctx.body);
        switch (input) {
            case 0: return gotoFlow(flowInterno);
            case 1:
                return await flowDynamic('Este programa pertenece a la academia de Tecnologías de la Información', {
                    media: 'https://drive.google.com/uc?export=view&id=1BbMhImD81ed1BHnFzpKu7wIcftfKLfUd',
                });
            case 2:
                return await flowDynamic('Este programa pertenece a la academia de Tecnologías de la Información', {
                    media: 'https://drive.google.com/uc?export=view&id=1PR8nI8HtRjYpFt20aC4Ngc3Pv7s0AksL',
                });
            case 3:
                return await flowDynamic('Este programa pertenece a la academia de Operaciones Comerciales Internacionales', {
                    media: 'https://drive.google.com/uc?export=view&id=1ORg7P1Euq06-HFzwzvrM6azsyG8vliph',
                });
            case 4:
                return await flowDynamic('Este programa pertenece a la academia de Procesos Industriales ', {
                    media: 'https://drive.google.com/uc?export=view&id=1DNEiJ8XIqcldkUN7IFdLmTx6DUslZeSf',
                });
            case 5:
                return await flowDynamic('Este programa pertenece a la academia de Nanotecnología', {
                    media: 'https://drive.google.com/uc?export=view&id=1GmI7n_Hu9VZxvWCwDALhVmeihb0FFnpg',
                });
            case 6:
                return await flowDynamic('Este programa pertenece a la academia de Mecatrónica', {
                    media: 'https://drive.google.com/uc?export=view&id=1nc10kdmSFD3IFQEDgZyloT-wMeBluHYm',
                });
            default:
                return fallBack('Opción no válida, por favor elige una opción del 1 al 6 o 0 para volver al menú anterior.');
        }
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?\nResponde con Si o No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        switch (input) {
            case 'si':
                return gotoFlow(flowInterno);
            case 'no':
                return gotoFlow(flowDespedida);
            default:
                return fallBack('Respuesta no válida, por favor responde Si o No.');
        }
    });


// Flujos de respuestas externas específicas
const flowCajasExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Cajas de la UTMA está a su disposición para atender todos los trámites relacionados con pagos y asuntos financieros. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 108.')
    .addAnswer('Costos 2024', {
        media: 'https://drive.google.com/uc?export=view&id=1lkO--gbvelVaxCcTqsNn_J0YTJP_gZ-g',
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?\nResponde con Si o No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        switch (input) {
            case 'si':
                return gotoFlow(flowExterno);
            case 'no':
                return gotoFlow(flowDespedida);
            default:
                return fallBack('Respuesta no válida, por favor responde Si o No.');
        }
    });

const flowComunicacionExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Comunicaciones de la UTMA se dedica a gestionar y coordinar todas las actividades relacionadas con la comunicación interna y externa de la institución.')
    .addAnswer('Selecciona el número que corresponda a la opción que deseas:\n*1*. Calendario\n*2*. ITEP\n*3*. Créditos\n*4*. Talleres\n*5*. Redes Sociales\n*6*. Transporte\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        const input = parseInt(ctx.body);
        switch (input) {
            case 0:
                return gotoFlow(flowExterno);
            case 1:
                return await flowDynamic('Calendario Escolar 2023-2024', {
                    media: 'https://drive.google.com/uc?export=view&id=1juASkf7U3wGY0q1oIeKNkdjkVrySl_cj',
                });
            case 2:
                return await flowDynamic('Estas son las fechas más próximas', {
                    media: 'https://drive.google.com/uc?export=view&id=1ay0RtrrYkJGaa4-aWzhwpNPkHYG7Nx37',
                });
            case 3:
                return await flowDynamic('Para consultar tus créditos ingresa a nuestra página web: https://utma.edu.mx/');
            case 4:
                return await flowDynamic('Estos son los talleres que ofrece la UTMA', {
                    media: 'https://drive.google.com/uc?export=view&id=1WapWttXjNYKggGr6JeHvhmiAo_puyc5n',
                });
            case 5:
                return await flowDynamic(['¡No olvides seguirnos en todas nuestras Redes Sociales!',
                    'Facebook: https://www.facebook.com/UTMABiS/',
                    'Instagram: https://www.instagram.com/ut.metropolitana/',
                    'X: https://x.com/UTMetropolitana',
                    'Youtube: https://www.youtube.com/@utmetropolitana',
                    'TikTok: https://www.tiktok.com/@utmetropolitana',
                    'Teléfono: 449-925-3920 y 449-925-3921'
                ]);
            case 6:
                return await flowDynamic('A continuación, encontrarás las rutas de los transportes de la Universidad, así como las rutas de los autobuses que facilitan tu acceso al campus.', {
                    media: 'https://drive.google.com/uc?export=view&id=1i4jX9M03toBf2Rd9Y1I9J6ccBCk-Vxt6',
                });
            default:
                return fallBack('Opción no válida, por favor elige una opción del 1 al 6 o 0 para volver al menú anterior.');
        }
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?\nResponde con Si o No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        switch (input) {
            case 'si':
                return gotoFlow(flowExterno);
            case 'no':
                return gotoFlow(flowDespedida);
            default:
                return fallBack('Respuesta no válida, por favor responde Si o No.');
        }
    });

const flowServiciosEscolaresExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Servicios Escolares de la UTMA está disponible para apoyarte con tus trámites escolares. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 110.')
    .addAnswer('Estos son los pasos a seguir para realizar tu Proceso de Inscripción', {
        media: 'https://drive.google.com/uc?export=view&id=1zETFlrGO2CZpNJn1oiMzC9c2yc-38q3r',
    })
    .addAnswer('¡Felicidades! En caso de haber sido aceptado sigue los siguientes pasos para la entrega de documentos', {
        media: 'https://drive.google.com/uc?export=view&id=1COVfPNZUR0W8iNA-j82hCqWFSF3C1_nC',
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?\nResponde con Si o No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        switch (input) {
            case 'si':
                return gotoFlow(flowExterno);
            case 'no':
                return gotoFlow(flowDespedida);
            default:
                return fallBack('Respuesta no válida, por favor responde Si o No.');
        }
    });


const flowIdiomasExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Idiomas de la UTMA te brinda la oportunidad de aprender y mejorar tus habilidades en diferentes lenguas extranjeras. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 111.')

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?\nResponde con Si o No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        switch (input) {
            case 'si':
                return gotoFlow(flowExterno);
            case 'no':
                return gotoFlow(flowDespedida);
            default:
                return fallBack('Respuesta no válida, por favor responde Si o No.');
        }
    });


const flowInternacionalizacionExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Internacionalización de la UTMA te ofrece oportunidades para participar en programas de intercambio, colaboraciones internacionales y más. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 112.')

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?\nResponde con Si o No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        switch (input) {
            case 'si':
                return gotoFlow(flowExterno);
            case 'no':
                return gotoFlow(flowDespedida);
            default:
                return fallBack('Respuesta no válida, por favor responde Si o No.');
        }
    });

const flowCarrerasExt = addKeyword([EVENTS.ACTION])
    .addAnswer('Las carreras que ofrece la UTMA están diseñadas para brindarte una formación integral y de calidad. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 115.')
    .addAnswer('Si quieres conocer tu Plan de Estudios selecciona el número que corresponda a la opción que deseas:\n*1*. Desarrollo de Software \n*2*. Inteligencia Artificial \n*3*. Negocios Internacionales\n*4*. Sistemas de Gestión de Calidad\n*5*. Materiales\n*6*. Robótica\n*0*. Volver al menú anterior', { capture: true }, async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
        const input = parseInt(ctx.body);
        switch (input) {
            case 0:
                return gotoFlow(flowExterno);
            case 1:
                return await flowDynamic('Este programa pertenece a la academia de Tecnologías de la Información', {
                    media: 'https://drive.google.com/uc?export=view&id=1BbMhImD81ed1BHnFzpKu7wIcftfKLfUd',
                });
            case 2:
                return await flowDynamic('Este programa pertenece a la academia de Tecnologías de la Información', {
                    media: 'https://drive.google.com/uc?export=view&id=1PR8nI8HtRjYpFt20aC4Ngc3Pv7s0AksL',
                });
            case 3:
                return await flowDynamic('Este programa pertenece a la academia de Operaciones Comerciales Internacionales', {
                    media: 'https://drive.google.com/uc?export=view&id=1ORg7P1Euq06-HFzwzvrM6azsyG8vliph',
                });
            case 4:
                return await flowDynamic('Este programa pertenece a la academia de Procesos Industriales ', {
                    media: 'https://drive.google.com/uc?export=view&id=1DNEiJ8XIqcldkUN7IFdLmTx6DUslZeSf',
                });
            case 5:
                return await flowDynamic('Este programa pertenece a la academia de Nanotecnología', {
                    media: 'https://drive.google.com/uc?export=view&id=1GmI7n_Hu9VZxvWCwDALhVmeihb0FFnpg',
                });
            case 6:
                return await flowDynamic('Este programa pertenece a la academia de Mecatrónica', {
                    media: 'https://drive.google.com/uc?export=view&id=1nc10kdmSFD3IFQEDgZyloT-wMeBluHYm',
                });
            default:
                return fallBack('Opción no válida, por favor elige una opción del 1 al 6 o 0 para volver al menú anterior.');
        }
    })

    .addAnswer('¿Hay algo más en lo que te podamos ayudar?\nResponde con Si o No', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        switch (input) {
            case 'si':
                return gotoFlow(flowExterno);
            case 'no':
                return gotoFlow(flowDespedida);
            default:
                return fallBack('Respuesta no válida, por favor responde Si o No.');
        }
    });

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal, flowInterno, flowExterno, flowDespedida, flowCajasInt, flowComunicacionInt, flowServiciosEscolaresInt, flowIdiomasInt, flowInternacionalizacionInt, flowPsicologiaInt, flowBibliotecaInt, flowCarrerasInt, flowCajasExt, flowComunicacionExt, flowServiciosEscolaresExt, flowIdiomasExt, flowInternacionalizacionExt, flowCarrerasExt]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();
