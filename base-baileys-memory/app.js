const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

// Flujo principal
const flowPrincipal = addKeyword([EVENTS.WELCOME])
    .addAnswer('🙌 Hola, bienvenido al chat automatizado de la UTMA')
    .addAnswer('¿Eres usuario *interno* o *externo*?', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();
        if (!input.includes('interno') && !input.includes('externo')) {
            return fallBack();
        } else if (input === 'interno') {
            return gotoFlow(flowInterno);
        } else if (input === 'externo') {
            return gotoFlow(flowExterno);
        }
    });

const flowError = addKeyword([EVENTS.ACTION])
    .addAnswer('Respuesta no válida, por favor responde "interno" o "externo".', { capture: true }, async (ctx, { gotoFlow }) => {
        return gotoFlow(flowPrincipal);
    });

// Flujo para alumno interno
const flowInterno = addKeyword([EVENTS.ACTION])
    .addAnswer('¿Sobre qué te gustaría preguntar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n1. Cajas\n2. Comunicación\n3. Servicios Escolares\n4. Idiomas\n5. Internacionalización\n6. Psicología\n7. Biblioteca\n8. Carreras', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();

        switch (true) {
            case ['1', 'cajas', 'caja'].includes(input):
                return gotoFlow(flowCajasInt);
            case ['2', 'comunicación', 'comunicacion', 'comunicaciones'].includes(input):
                return gotoFlow(flowComunicacionInt);
            case ['3', 'servicios escolares', 'servicio', 'servicios', 'escolares', 'servicio escolar'].includes(input):
                return gotoFlow(flowServiciosEscolaresInt);
            case ['4', 'idiomas', 'idioma'].includes(input):
                return gotoFlow(flowIdiomasInt);
            case ['5', 'internacionalización', 'internacionalizacion'].includes(input):
                return gotoFlow(flowInternacionalizacionInt);
            case ['6', 'psicología', 'psicologia', 'sicologia'].includes(input):
                return gotoFlow(flowPsicologiaInt);
            case ['7', 'biblioteca'].includes(input):
                return gotoFlow(flowBibliotecaInt);
            case ['8', 'carreras', 'carrera'].includes(input):
                return gotoFlow(flowCarrerasInt);
            default:
                return fallBack('Opción no válida, por favor elige una opción del 1 al 8 o usa las palabras clave correspondientes.');
        }
    });

// Flujo para alumno externo
const flowExterno = addKeyword([EVENTS.ACTION])
    .addAnswer('¿Sobre qué te gustaría preguntar?')
    .addAnswer('Selecciona el *número* que corresponda a la opción que deseas:\n1. Cajas\n2. Comunicación\n3. Servicios Escolares\n4. Idiomas\n5. Internacionalización\n6. Carreras', { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
        const input = ctx.body.toLowerCase();

        switch (true) {
            case ['1', 'caja', 'cajas', 'costos'].includes(input):
                return gotoFlow(flowCajasExt);
            case ['2', 'comunicación', 'comunicacion', 'comunicaciones'].includes(input):
                return gotoFlow(flowComunicacionExt);
            case ['3', 'servicios escolares', 'servicio', 'servicios', 'escolares', 'servicio escolar'].includes(input):
                return gotoFlow(flowServiciosEscolaresExt);
            case ['4', 'idiomas', 'idioma'].includes(input):
                return gotoFlow(flowIdiomasExt);
            case ['5', 'internacionalización', 'internacionalizacion'].includes(input):
                return gotoFlow(flowInternacionalizacionExt);
            case ['6', 'carreras', 'carrera'].includes(input):
                return gotoFlow(flowCarrerasExt);
            default:
                return fallBack('Opción no válida, por favor elige una opción del 1 al 6 o usa las palabras clave correspondientes.');
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
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?', { capture: true }, async (ctx, { gotoFlow }) => {
        const input = ctx.body.toLowerCase();

        if (input === 'si') {
            return gotoFlow(flowInterno);
        } else {
            return gotoFlow(flowDespedida);
        }
    });


    const flowComunicacionInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Comunicaciones de la UTMA se dedica a gestionar y coordinar todas las actividades relacionadas con la comunicación interna y externa de la institución.')
    .addAnswer('¿En qué podemos ayudarte? \nSelecciona el *número* que corresponda a la opción que deseas:\n1. Calendario\n2. ITEP\n3. Créditos\n4. Talleres\n5. Redes Sociales\n6. Transporte', { capture: true }, async (ctx, { fallBack, flowDynamic }) => {
        const opcion = parseInt(ctx.body);
        if (![1, 2, 3, 4, 5, 6].includes(opcion)) {
            return fallBack('Opción no válida, por favor elige una opción del 1 al 6.');
        }

        switch (opcion) {
            case 1:
                return await flowDynamic('Calendario Escolar 2023-2024', {
                    media: 'https://drive.google.com/uc?export=view&id=1juASkf7U3wGY0q1oIeKNkdjkVrySl_cj',
                });
            case 2:
                return await flowDynamic('Estas son las fechas más próximas', {
                    media: 'https://drive.google.com/uc?export=view&id=1TAa4-tle2DFhtyz_5pVEiGUStPr5j5KY',
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
                return fallBack('Opción no válida, por favor elige una opción del 1 al 6 o usa las palabras clave correspondientes.');
        }
    })
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?', { capture: true }, async (ctx, { gotoFlow }) => {
        const input = ctx.body.toLowerCase();
        if (input === 'si') {
            return gotoFlow(flowInterno);
        } else {
            return gotoFlow(flowDespedida);
        }
    });


const flowServiciosEscolaresInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Servicios Escolares de la UTMA está disponible para apoyarte con tus trámites escolares. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 109.')
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?', { capture: true }, async (ctx, { gotoFlow }) => {
        const input = ctx.body.toLowerCase();

        if (input === 'si') {
            return gotoFlow(flowInterno);
        } else {
            return gotoFlow(flowDespedida);
        }
    });


const flowIdiomasInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Idiomas de la UTMA te brinda la oportunidad de aprender y mejorar tus habilidades en diferentes lenguas extranjeras. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 111.')
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?', { capture: true }, async (ctx, { gotoFlow }) => {
        const input = ctx.body.toLowerCase();

        if (input === 'si') {
            return gotoFlow(flowInterno);
        } else {
            return gotoFlow(flowDespedida);
        }
    });

const flowInternacionalizacionInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Internacionalización de la UTMA te ofrece oportunidades para participar en programas de intercambio, colaboraciones internacionales y más. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 112.')
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?', { capture: true }, async (ctx, { gotoFlow }) => {
        const input = ctx.body.toLowerCase();

        if (input === 'si') {
            return gotoFlow(flowInterno);
        } else {
            return gotoFlow(flowDespedida);
        }
    });

const flowPsicologiaInt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Psicología de la UTMA está disponible para apoyarte con tus necesidades de bienestar emocional y mental. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 113.')
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?', { capture: true }, async (ctx, { gotoFlow }) => {
        const input = ctx.body.toLowerCase();

        if (input === 'si') {
            return gotoFlow(flowInterno);
        } else {
            return gotoFlow(flowDespedida);
        }
    });

const flowBibliotecaInt = addKeyword([EVENTS.ACTION])
    .addAnswer('La biblioteca de la UTMA ofrece una amplia variedad de recursos y servicios para apoyar tus estudios e investigaciones. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 114.')
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?', { capture: true }, async (ctx, { gotoFlow }) => {
        const input = ctx.body.toLowerCase();

        if (input === 'si') {
            return gotoFlow(flowInterno);
        } else {
            return gotoFlow(flowDespedida);
        }
    });

const flowCarrerasInt = addKeyword([EVENTS.ACTION])
    .addAnswer('Las carreras que ofrece la UTMA están diseñadas para brindarte una formación integral y de calidad. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 115.')
    .addAnswer('Si quieres conocer tu Plan de Estudios selecciona el *número* que corresponda a la opción que deseas:\n1. Desarrollo de Software \n2. Inteligencia Artificial \n3. Negocios Internacionales\n4. Sistemas de Gestión de Calidad\n5. Materiales\n6. Robótica',{ capture: true }, async (ctx, {fallBack,flowDynamic }) => {
        const opcion = parseInt(ctx.body);
        if (![1, 2, 3, 4, 5, 6].includes(opcion)) {
            return fallBack('Opción no válida, por favor elige una opción del 1 al 6.');
        }

        switch (opcion) {
            case 1: return await flowDynamic('Este programa pertenece a la academia de Tecnologías de la Información', {
                media: 'https://drive.google.com/uc?export=view&id=1BbMhImD81ed1BHnFzpKu7wIcftfKLfUd',
            });
                break;
            case 2: return await flowDynamic('Este programa pertenece a la academia de Tecnologías de la Información', {
                media: 'https://drive.google.com/uc?export=view&id=1PR8nI8HtRjYpFt20aC4Ngc3Pv7s0AksL',
            });
                break;
            case 3: return await flowDynamic('Este programa pertenece a la academia de Operaciones Comerciales Internacionales', {
                media: 'https://drive.google.com/uc?export=view&id=1ORg7P1Euq06-HFzwzvrM6azsyG8vliph',
            });
                break;
            case 4: return await flowDynamic('Este programa pertenece a la academia de Procesos Industriales ', {
                media: 'https://drive.google.com/uc?export=view&id=1DNEiJ8XIqcldkUN7IFdLmTx6DUslZeSf',
            });
                break;
            case 5: return await flowDynamic('Este programa pertenece a la academia de Nanotecnología', {
                media: 'https://drive.google.com/uc?export=view&id=1GmI7n_Hu9VZxvWCwDALhVmeihb0FFnpg',
            });
                break;
            case 6: return await flowDynamic('Este programa pertenece a la academia de Mecatrónica', {
                media: 'https://drive.google.com/uc?export=view&id=1nc10kdmSFD3IFQEDgZyloT-wMeBluHYm',
            });
                break;
        }
    })
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?', { capture: true }, async (ctx, { gotoFlow }) => {
        const input = ctx.body.toLowerCase();

        if (input === 'si') {
            return gotoFlow(flowInterno);
        } else {
            return gotoFlow(flowDespedida);
        }
    });


// Flujos de respuestas externas específicas
const flowCajasExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Cajas de la UTMA está a su disposición para atender todos los trámites relacionados con pagos y asuntos financieros. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 108.')
    .addAnswer('Costos 2024', {
        media: 'https://drive.google.com/uc?export=view&id=1lkO--gbvelVaxCcTqsNn_J0YTJP_gZ-g',
    })
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?', { capture: true }, async (ctx, { gotoFlow }) => {
        const input = ctx.body.toLowerCase();

        if (input === 'si') {
            return gotoFlow(flowExterno);
        } else {
            return gotoFlow(flowDespedida);
        }
    });

const flowComunicacionExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Comunicaciones de la UTMA se dedica a gestionar y coordinar todas las actividades relacionadas con la comunicación interna y externa de la institución.')
    .addAnswer('¿En qué podemos ayudarte?\n Selecciona el *número* que corresponda a la opción que deseas:\n1. Calendario\n2. ITEP\n3. Créditos\n4. Talleres\n5. Redes Sociales\n6. Transporte',{ capture: true }, async (ctx, {fallBack,flowDynamic }) => {
        const opcion = parseInt(ctx.body);
        if (![1, 2, 3, 4, 5, 6].includes(opcion)) {
            return fallBack('Opción no válida, por favor elige una opción del 1 al 6.');
        }
        switch (opcion) {
            case 1: return await flowDynamic('Calendario Escolar 2023-2024', {
                media: 'https://drive.google.com/uc?export=view&id=1juASkf7U3wGY0q1oIeKNkdjkVrySl_cj',
            });
                break;
            case 2: return await flowDynamic('Estas son las fechas mas proximas', {
                media: 'https://drive.google.com/uc?export=view&id=1TAa4-tle2DFhtyz_5pVEiGUStPr5j5KY',
            });
                break;
            case 3: return await flowDynamic('Para consultar tus créditos ingresa a nuestra página web: https://utma.edu.mx/');
                break;
            case 4: return await flowDynamic('Estos son los talleres que ofrece la UTMA', {
                media: 'https://drive.google.com/uc?export=view&id=1WapWttXjNYKggGr6JeHvhmiAo_puyc5n',
            });
                break;
            case 5: return await flowDynamic(['¡No olvides seguirnos en todas nuestras Redes Sociales!', 'Facebook: https://www.facebook.com/UTMABiS/', 'Instagram: https://www.instagram.com/ut.metropolitana/', 'X: https://x.com/UTMetropolitana', 'Youtube: https://www.youtube.com/@utmetropolitana', 'TikTok: https://www.tiktok.com/@utmetropolitana', 'Teléfono: 449-925-3920 y 449-925-3921'
            ]);
                break;
            case 6: return await flowDynamic('A continuación, encontrarás las rutas de los transportes de la Universidad, así como las rutas de los autobuses que facilitan tu acceso al campus.', {
                media: 'https://drive.google.com/uc?export=view&id=1i4jX9M03toBf2Rd9Y1I9J6ccBCk-Vxt6'
            });
                break;
            default:
                return fallBack('Opción no válida, por favor elige una opción del 1 al 6 o usa las palabras clave correspondientes.');
        }
    })
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?', { capture: true }, async (ctx, { gotoFlow }) => {
        const input = ctx.body.toLowerCase();

        if (input === 'si') {
            return gotoFlow(flowExterno);
        } else {
            return gotoFlow(flowDespedida);
        }
    });

const flowServiciosEscolaresExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Servicios Escolares de la UTMA está disponible para apoyarte con tus trámites escolares. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 109.')
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?', { capture: true }, async (ctx, { gotoFlow }) => {
        const input = ctx.body.toLowerCase();

        if (input === 'si') {
            return gotoFlow(flowExterno);
        } else {
            return gotoFlow(flowDespedida);
        }
    });

const flowIdiomasExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Idiomas de la UTMA te brinda la oportunidad de aprender y mejorar tus habilidades en diferentes lenguas extranjeras. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 111.')
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?', { capture: true }, async (ctx, { gotoFlow }) => {
        const input = ctx.body.toLowerCase();

        if (input === 'si') {
            return gotoFlow(flowExterno);
        } else {
            return gotoFlow(flowDespedida);
        }
    });


const flowInternacionalizacionExt = addKeyword([EVENTS.ACTION])
    .addAnswer('El área de Internacionalización de la UTMA te ofrece oportunidades para participar en programas de intercambio, colaboraciones internacionales y más. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 112.')
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?', { capture: true }, async (ctx, { gotoFlow }) => {
        const input = ctx.body.toLowerCase();

        if (input === 'si') {
            return gotoFlow(flowExterno);
        } else {
            return gotoFlow(flowDespedida);
        }
    });

const flowCarrerasExt = addKeyword([EVENTS.ACTION])
    .addAnswer('Las carreras que ofrece la UTMA están diseñadas para brindarte una formación integral y de calidad. Para más información te invitamos a comunicarte al teléfono 449 925 3920 ext 115.')
    .addAnswer('Si quieres conocer tu Plan de Estudios selecciona el *número* que corresponda a la opción que deseas:\n1. Desarrollo de Software \n2. Inteligencia Artificial \n3. Negocios Internacionales\n4. Sistemas de Gestión de Calidad\n5. Materiales\n6. Robótica',{ capture: true }, async (ctx, {fallBack,flowDynamic }) => {
        const opcion = parseInt(ctx.body);
        if (![1, 2, 3, 4, 5, 6].includes(opcion)) {
            return fallBack('Opción no válida, por favor elige una opción del 1 al 6.');
        }
        switch (opcion) {
            case 1: return await flowDynamic('Este programa pertenece a la academia de Tecnologías de la Información', {
                media: 'https://drive.google.com/uc?export=view&id=1BbMhImD81ed1BHnFzpKu7wIcftfKLfUd',
            });
                break;
            case 2: return await flowDynamic('Este programa pertenece a la academia de Tecnologías de la Información', {
                media: 'https://drive.google.com/uc?export=view&id=1PR8nI8HtRjYpFt20aC4Ngc3Pv7s0AksL',
            });
                break;
            case 3: return await flowDynamic('Este programa pertenece a la academia de Operaciones Comerciales Internacionales', {
                media: 'https://drive.google.com/uc?export=view&id=1ORg7P1Euq06-HFzwzvrM6azsyG8vliph',
            });
                break;
            case 4: return await flowDynamic('Este programa pertenece a la academia de Procesos Industriales ', {
                media: 'https://drive.google.com/uc?export=view&id=1DNEiJ8XIqcldkUN7IFdLmTx6DUslZeSf',
            });
                break;
            case 5: return await flowDynamic('Este programa pertenece a la academia de Nanotecnología', {
                media: 'https://drive.google.com/uc?export=view&id=1GmI7n_Hu9VZxvWCwDALhVmeihb0FFnpg',
            });
                break;
            case 6: return await flowDynamic('Este programa pertenece a la academia de Mecatrónica', {
                media: 'https://drive.google.com/uc?export=view&id=1nc10kdmSFD3IFQEDgZyloT-wMeBluHYm',
            });
                break;
        }
    })
    .addAnswer('¿Hay algo más en lo que te podamos ayudar?', { capture: true }, async (ctx, { gotoFlow }) => {
        const input = ctx.body.toLowerCase();

        if (input === 'si') {
            return gotoFlow(flowExterno);
        } else {
            return gotoFlow(flowDespedida);
        }
    });

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal, flowError, flowInterno, flowExterno, flowDespedida, flowCajasInt, flowComunicacionInt, flowServiciosEscolaresInt, flowIdiomasInt, flowInternacionalizacionInt, flowPsicologiaInt, flowBibliotecaInt, flowCarrerasInt, flowCajasExt, flowComunicacionExt, flowServiciosEscolaresExt, flowIdiomasExt, flowInternacionalizacionExt, flowCarrerasExt]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();