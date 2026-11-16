// Base de datos enriquecida de ayudas y prestaciones para personas con discapacidad y sus familias
const ayudasData = [
  {
    id: "dependencia-cuidados-entorno",
    titulo: "Prestación Económica para Cuidados en el Entorno Familiar (PECEF)",
    organismo: "Sistema para la Autonomía y Atención a la Dependencia (SAAD)",
    discapacidad: "todas",
    categoria: "economica",
    gradoMinimo: "dependencia",
    cuantia: "Hasta 455 €/mes (según grado y capacidad económica)",
    cuantiaAnualEstimada: 5460, // Para la calculadora
    resumen: "Ayuda económica mensual directa para que un familiar conviviente atienda a la persona dependiente en el hogar.",
    detalles: "Destinada a apoyar económicamente la labor de los cuidadores no profesionales (familiares) que atienden en el hogar a personas valoradas con Grado I (dependencia moderada), Grado II (severa) o Grado III (gran dependencia). Además, el cuidador tiene derecho a cotización a la Seguridad Social a cargo del Estado.",
    lecturaFacil: "Dinero cada mes para la familia que cuida en casa a una persona dependiente. La persona que cuida también cotiza a la Seguridad Social.",
    requisitos: [
      "Tener reconocido formalmente el Grado I, II o III de Dependencia en el PIA (Programa Individual de Atención).",
      "Que la persona dependiente esté siendo atendida por un familiar hasta el 4º grado de parentesco o cónyuge.",
      "Convivencia continuada con la persona en situación de dependencia.",
      "Cumplir las condiciones de habitabilidad en la vivienda."
    ],
    documentacion: [
      "Resolución del Grado de Dependencia.",
      "Certificado de empadronamiento conjunto histórico.",
      "Libro de familia o justificante de parentesco.",
      "Número de cuenta bancaria del beneficiario (IBAN)."
    ],
    destacada: true
  },
  {
    id: "deduccion-irpf-discapacidad",
    titulo: "Deducción de IRPF por Descendiente o Ascendiente a Cargo",
    organismo: "Agencia Tributaria (Hacienda)",
    discapacidad: "todas",
    categoria: "fiscal",
    gradoMinimo: "33",
    cuantia: "1.200 € / año (100 €/mes) o hasta 2.400 € si el grado es ≥ 65%",
    cuantiaAnualEstimada: 1200,
    resumen: "Deducción directa en la declaración de la renta o cobro anticipado de 100€ a 200€ al mes por cada familiar con discapacidad.",
    detalles: "Beneficio fiscal estatal para contribuyentes que trabajen o perciban prestaciones contributivas y tengan a su cargo un hijo o progenitor con discapacidad igual o superior al 33%. Si el grado es del 65% o más, la cuantía anual asciende a 2.400 €.",
    lecturaFacil: "Hacienda te devuelve 100 euros al mes o 1.200 euros al año si tienes a tu cuidado a un hijo o padre con discapacidad del 33% o más.",
    requisitos: [
      "Estar dado de alta en la Seguridad Social o mutualidad, o percibir pensión/prestación por desempleo.",
      "Tener a cargo a un descendiente o ascendiente con grado de discapacidad mínimo del 33%.",
      "Que el familiar con discapacidad no tenga rentas anuales superiores a 8.000 €."
    ],
    documentacion: [
      "Modelo 140 de la Agencia Tributaria (para cobro anticipado mes a mes).",
      "Certificado del Grado de Discapacidad en vigor.",
      "Libro de familia."
    ],
    destacada: true
  },
  {
    id: "tarjeta-estacionamiento-movilidad",
    titulo: "Tarjeta Europea de Estacionamiento para Movilidad Reducida (PMR)",
    organismo: "Ayuntamientos y Consejerías de Políticas Sociales",
    discapacidad: "fisica",
    categoria: "movilidad",
    gradoMinimo: "33",
    cuantia: "Aparcamiento gratuito o bonificado y reserva de plaza personalizada",
    cuantiaAnualEstimada: 350,
    resumen: "Permite aparcar en plazas reservadas en toda la Unión Europea y exención de parquímetros/zona azul en la mayoría de ciudades.",
    detalles: "Otorga el derecho a estacionar en plazas reservadas PMR y en zonas de carga y descarga o estacionamiento regulado. Es personal e intransferible, y se puede usar en cualquier vehículo en el que viaje la persona con movilidad reducida.",
    lecturaFacil: "Una tarjeta azul para aparcar en plazas reservadas y no pagar parquímetros en la calle cuando viajas en coche.",
    requisitos: [
      "Tener reconocido el dictamen favorable de 'baremo de movilidad reducida' (al menos 7 puntos o letra A, B, C).",
      "Haber sido valorado por el centro base de discapacidad correspondiente."
    ],
    documentacion: [
      "Resolución oficial de discapacidad con baremo de movilidad.",
      "Fotografía reciente tamaño carnet del titular.",
      "DNI del solicitante o representante legal."
    ],
    destacada: false
  },
  {
    id: "becas-neae-educacion",
    titulo: "Becas y Ayudas para Alumnado con Necesidad Específica de Apoyo Educativo (NEAE)",
    organismo: "Ministerio de Educación y Formación Profesional",
    discapacidad: "todas",
    categoria: "educacion",
    gradoMinimo: "33",
    cuantia: "Hasta 2.500 € - 3.500 €/curso + Subsidio universal de 400 €",
    cuantiaAnualEstimada: 2800,
    resumen: "Subvención directa para comedor, transporte escolar, logopedia, estimulación psicopedagógica y material escolar adaptado.",
    detalles: "Destinada a estudiantes desde segundo ciclo de infantil hasta bachillerato o FP que presenten discapacidad de al menos 25%, TEA, o TDAH y precisen apoyo educativo o terapias externas extraescolares.",
    lecturaFacil: "Ayuda de dinero para pagar el colegio, el comedor, el autobús y los profesores especiales o logopedas que necesita tu hijo.",
    requisitos: [
      "Estar escolarizado en centro ordinario o de educación especial.",
      "Acreditar la necesidad de apoyos específicos mediante informe del equipo de orientación psicopedagógica.",
      "Memoria justificativa del terapeuta o gabinete privado que imparte la reeducación."
    ],
    documentacion: [
      "Solicitud telemática en la sede del Ministerio de Educación.",
      "Informe psicopedagógico oficial del colegio/instituto.",
      "Presupuesto y acreditación profesional del logopeda o terapeuta."
    ],
    destacada: true
  },
  {
    id: "subvencion-adaptacion-vivienda",
    titulo: "Subvenciones para Accesibilidad y Supresión de Barreras en la Vivienda",
    organismo: "Planes Estatales de Vivienda y Comunidades Autónomas",
    discapacidad: "fisica",
    categoria: "movilidad",
    gradoMinimo: "33",
    cuantia: "Hasta el 80% - 100% del coste de la obra (máx. 15.000 €)",
    cuantiaAnualEstimada: 4500,
    resumen: "Ayudas públicas a fondo perdido para instalar duchas a cota cero, salvaescaleras, rampas, ensanche de puertas o grúas de techo.",
    detalles: "Financia obras en el interior de la vivienda o en las zonas comunes del edificio para facilitar la accesibilidad universal a personas con discapacidad o mayores de 65 años.",
    lecturaFacil: "Dinero público para cambiar la bañera por plato de ducha llano, poner rampas o un ascensor para entrar a casa sin barreras.",
    requisitos: [
      "Que en la vivienda resida una persona con discapacidad motora o movilidad reducida.",
      "Presentar proyecto técnico o memoria valorada de la reforma.",
      "Vivienda habitual y permanente."
    ],
    documentacion: [
      "Presupuesto detallado de las reformas o instalación del ascensor/salvaescaleras.",
      "Título de propiedad o contrato de alquiler con autorización.",
      "Certificado de discapacidad con baremo de movilidad."
    ],
    destacada: false
  },
  {
    id: "pension-no-contributiva-invalidez",
    titulo: "Pensión No Contributiva de Invalidez (PNC)",
    organismo: "IMSERSO / Consejerías Autonómicas",
    discapacidad: "todas",
    categoria: "economica",
    gradoMinimo: "65",
    cuantia: "517,90 €/mes (14 pagas: 7.250,60 €/año) + 50% si requiere 3ª persona",
    cuantiaAnualEstimada: 7250,
    resumen: "Prestación económica vitalicia para personas de 18 a 65 años con discapacidad ≥ 65% que carezcan de ingresos suficientes.",
    detalles: "Garantiza una pensión económica, asistencia médico-farmacéutica gratuita y servicios sociales complementarios a personas que no hayan cotizado el tiempo suficiente para una pensión contributiva ordinaria.",
    lecturaFacil: "Pensión de dinero todos los meses y medicinas gratis para personas mayores de 18 años con discapacidad del 65% o más que no tienen trabajo.",
    requisitos: [
      "Tener entre 18 y 65 años de edad.",
      "Residir legalmente en territorio español al menos 5 años.",
      "Grado de discapacidad reconocido igual o superior al 65%.",
      "Carecer de rentas personales superiores a los límites legales."
    ],
    documentacion: [
      "Certificado del Grado de Discapacidad (65% o superior).",
      "Certificado de empadronamiento y residencia fiscal.",
      "Declaración de ingresos de la unidad económica de convivencia."
    ],
    destacada: true
  },
  {
    id: "exencion-impuesto-matriculacion-ivtm",
    titulo: "Exención del Impuesto de Circulación (IVTM) e Impuesto de Matriculación",
    organismo: "Ayuntamiento Local y Agencia Tributaria",
    discapacidad: "todas",
    categoria: "fiscal",
    gradoMinimo: "33",
    cuantia: "100% de ahorro anual en el sello del coche e IVA reducido al 4%",
    cuantiaAnualEstimada: 250,
    resumen: "Exención total del pago del impuesto municipal de vehículos (IVTM) y aplicación del tipo superreducido del 4% de IVA en la compra de coche.",
    detalles: "Beneficio aplicable a vehículos matriculados a nombre de personas con discapacidad o destinados a su transporte habitual. Aplica para cualquier grado igual o superior al 33%.",
    lecturaFacil: "No tienes que pagar el impuesto anual del coche a tu ayuntamiento y pagas menos impuestos si compras un coche nuevo.",
    requisitos: [
      "Vehículo matriculado a nombre de la persona con discapacidad.",
      "Destinado a su uso exclusivo o para su traslado por parte de familiares autorizados."
    ],
    documentacion: [
      "Ficha técnica del vehículo y permiso de circulación.",
      "Certificado de grado de discapacidad (33% o superior).",
      "Formulario municipal de bonificación tributaria."
    ],
    destacada: false
  },
  {
    id: "bono-social-electrico-termico",
    titulo: "Bono Social Eléctrico y Térmico para Familias con Discapacidad",
    organismo: "Ministerio para la Transición Ecológica / Comercializadoras Reguladas",
    discapacidad: "todas",
    categoria: "economica",
    gradoMinimo: "33",
    cuantia: "Descuento del 40% al 80% en la factura eléctrica y cheque anual térmico",
    cuantiaAnualEstimada: 420,
    resumen: "Rebaja directa en la factura de la luz y gas para hogares donde algún miembro tenga discapacidad de al menos 33%.",
    detalles: "Las unidades de convivencia con discapacidad reconocida tienen un límite de ingresos mucho más generoso para acceder a los descuentos en la luz.",
    lecturaFacil: "Descuento grande en los recibos de la luz y del gas para gastar mucho menos dinero cada mes.",
    requisitos: [
      "Tener contratada la tarifa PVPC (mercado regulado) con potencia ≤ 10 kW.",
      "Que el titular o algún miembro familiar tenga al menos 33% de discapacidad."
    ],
    documentacion: [
      "Última factura eléctrica.",
      "Certificado de empadronamiento de la unidad familiar.",
      "Certificado oficial de discapacidad."
    ],
    destacada: false
  },
  {
    id: "audifonos-protesis-catalogo-ortoprotesico",
    titulo: "Ayudas para Audífonos, Implantes Cocleares y Material Óptico Especial",
    organismo: "Servicio Público de Salud y Consejerías de Sanidad",
    discapacidad: "sensorial",
    categoria: "movilidad",
    gradoMinimo: "33",
    cuantia: "Subvención de hasta 1.200 € por audífono o financiación íntegra según edad",
    cuantiaAnualEstimada: 1200,
    resumen: "Financiación pública para adquisición y renovación de audífonos, prótesis auditivas y dispositivos de ayuda visual para baja visión.",
    detalles: "Cubre la prescripción médica de audífonos bilaterales, procesadores de implante coclear y lupas electrónicas prescritas por especialistas del servicio público de salud.",
    lecturaFacil: "Dinero para pagar los aparatos del oído (audífonos) o lupas especiales para ver y oír mejor.",
    requisitos: [
      "Prescripción médica de médico especialista del Sistema Nacional de Salud (ORL u Oftalmólogo).",
      "Pérdida auditiva bilateral o agudeza visual reducida."
    ],
    documentacion: [
      "Documento de prescripción ortoprotésica (DPO) del médico especialista.",
      "Factura detallada de la ortopedia u óptica homologada.",
      "Tarjeta sanitaria del beneficiario."
    ],
    destacada: false
  },
  {
    id: "empleo-protegido-cuota-reserva",
    titulo: "Acceso a Empleo Protegido en Centros Especiales de Empleo (CEE) y Reserva 2%",
    organismo: "Servicios Públicos de Empleo (SEPE) y Fundaciones Sociales",
    discapacidad: "intelectual",
    categoria: "empleo",
    gradoMinimo: "33",
    cuantia: "Contratos adaptados, preparadores laborales y bonificaciones salariales",
    cuantiaAnualEstimada: 0,
    resumen: "Itinerarios de inserción laboral con preparadores laborales y reserva legal del 2% de puestos en empresas de más de 50 trabajadores.",
    detalles: "Las personas con discapacidad intelectual, autismo o daño cerebral cuentan con programas de Empleo con Apoyo y adaptación de puestos de trabajo.",
    lecturaFacil: "Ayuda para encontrar trabajo con un monitor de apoyo que enseña las tareas y acompaña a la persona trabajadora.",
    requisitos: [
      "Grado de discapacidad mínimo del 33%.",
      "Inscripción como demandante de empleo en el servicio público autonómico."
    ],
    documentacion: [
      "Resolución de grado y dictamen técnico facultativo.",
      "Demanda de empleo en vigor.",
      "Currículum vitae o perfil de capacidades."
    ],
    destacada: false
  },
  {
    id: "asistente-personal-autonomia",
    titulo: "Prestación de Asistencia Personal para Vida Independiente",
    organismo: "Ley de Dependencia / Comunidades Autónomas",
    discapacidad: "todas",
    categoria: "economica",
    gradoMinimo: "dependencia",
    cuantia: "Hasta 715 €/mes para contratación de un profesional de asistencia",
    cuantiaAnualEstimada: 8580,
    resumen: "Financiación para contratar a una persona de apoyo que acompaña al usuario en estudios, empleo, ocio y vida autónoma.",
    detalles: "Promueve la vida independiente permitiendo al usuario contratar un asistente personal según sus propias directrices y horarios.",
    lecturaFacil: "Dinero para pagar a una persona de apoyo que te acompaña al instituto, al trabajo, al médico o a salir con amigos.",
    requisitos: [
      "Estar valorado en cualquier grado de la Ley de Dependencia.",
      "Presentar un proyecto de vida independiente o contrato de asistencia homologada."
    ],
    documentacion: [
      "Contrato con entidad acreditada de asistencia personal.",
      "Resolución de Grado de Dependencia.",
      "Presupuesto mensual del servicio."
    ],
    destacada: false
  }
];

// Directorio autonómico de servicios sociales de referencia
const ccaaData = {
  andalucia: {
    nombre: "Andalucía",
    telefono: "900 55 55 64",
    webSocial: "Agencia de Servicios Sociales y Dependencia de Andalucía (ASSDA)",
    oficina: "Calle Luis Montoto 89, Sevilla"
  },
  madrid: {
    nombre: "Comunidad de Madrid",
    telefono: "012 / 900 44 45 55",
    webSocial: "Dirección General de Atención a Personas con Discapacidad",
    oficina: "Calle O'Donnell 50, Madrid"
  },
  cataluna: {
    nombre: "Catalunya",
    telefono: "900 30 05 00",
    webSocial: "Departament de Drets Socials (Generalitat)",
    oficina: "Passeig del Taulat 266, Barcelona"
  },
  valencia: {
    nombre: "Comunitat Valenciana",
    telefono: "900 10 08 80",
    webSocial: "Vicepresidència i Conselleria de Serveis Socials",
    oficina: "Carrer de la Democràcia 77, València"
  },
  galicia: {
    nombre: "Galicia",
    telefono: "900 33 36 66",
    webSocial: "Consellería de Política Social e Xuventude (Xunta)",
    oficina: "Edificio Administrativo San Caetano, Santiago de Compostela"
  },
  otra: {
    nombre: "Resto del territorio nacional",
    telefono: "900 100 200",
    webSocial: "Red SAAD e IMSERSO Estatal",
    oficina: "Coordinación telefónica y telemática en toda España"
  }
};

window.ayudasData = ayudasData;
window.ccaaData = ccaaData;
