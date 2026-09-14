export const img = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

// Puestos de docs/puestos (Departamento de Redes); documentos pre-renderizados en public/puestos (npm run puestos)
export const PUESTOS = [
  { clave: 'coordinador', codigo: 'TIC-RED-001', denominacion: 'Scrum Master / Coordinador de Redes', categoria: 'Directivo', color: 'yellow', icon: '◎' },
  { clave: 'administrador', codigo: 'TIC-RED-002', denominacion: 'Administrador de Redes', categoria: 'Profesional / Técnico especializado', color: 'blue', icon: '⇄' },
  { clave: 'seguridad', codigo: 'TIC-RED-003', denominacion: 'Especialista en Seguridad de Redes', categoria: 'Profesional / Técnico especializado', color: 'pink', icon: '⛨' },
  { clave: 'soporte', codigo: 'TIC-RED-004', denominacion: 'Soporte y Monitoreo de Redes', categoria: 'Técnico / Operativo', color: 'green', icon: '◷' },
]

export const POSITIONS = [
  {
    id: 'ceo', title: 'Directora General', area: 'Dirección', reportsTo: null, person: 'Laura Méndez', photo: '1494790108377-be9c29b29330', mbti: 'ENTJ', color: 'yellow',
    summary: 'Define la estrategia de IATECH, representa a la empresa y asegura el crecimiento sostenible.',
    duties: ['Fijar la estrategia y los objetivos anuales', 'Aprobar presupuestos e inversiones', 'Relación con socios y clientes clave'],
    reqs: ['10+ años liderando empresas de tecnología', 'MBA o afín', 'Visión de negocio en telecomunicaciones'],
    goals: [['Crecer 25% en facturación', 62], ['Abrir 2 nuevas regiones', 50]],
  },
  {
    id: 'cto', title: 'Gerente de Tecnología y Redes', area: 'Redes', reportsTo: 'ceo', person: 'Carlos Ríos', photo: '1507003211169-0a1dd7228f2d', mbti: 'INTJ', color: 'blue',
    summary: 'Lidera el área de redes: arquitectura, operación, seguridad y hoja de ruta tecnológica.',
    duties: ['Definir la hoja de ruta tecnológica', 'Supervisar proyectos de infraestructura', 'Garantizar SLA de disponibilidad'],
    reqs: ['Ing. en Telecomunicaciones o Sistemas', 'CCNP / CCIE deseable', '7+ años en redes empresariales'],
    goals: [['Disponibilidad de red 99.95%', 80], ['Migrar 60% de clientes a SD-WAN', 45]],
  },
  {
    id: 'cfo', title: 'Gerente de Administración y Finanzas', area: 'Administración', reportsTo: 'ceo', person: 'Ana Torres', photo: '1438761681033-6461ffad8d80', mbti: 'ESTJ', color: 'green',
    summary: 'Gestiona finanzas, compras, contratos y talento humano de la empresa.',
    duties: ['Control presupuestario y flujo de caja', 'Compras de equipamiento', 'Gestión de personal y nómina'],
    reqs: ['Lic. en Finanzas o Contabilidad', '5+ años en cargos similares'],
    goals: [['Reducir costos operativos 10%', 70], ['Cierre contable en 5 días', 90]],
  },
  {
    id: 'com', title: 'Gerente Comercial', area: 'Comercial', reportsTo: 'ceo', person: 'Diego Paz', photo: '1500648767791-00dcc994a43e', mbti: 'ENFJ', color: 'pink',
    summary: 'Impulsa las ventas de soluciones de conectividad y la relación con clientes.',
    duties: ['Plan comercial y metas de venta', 'Preventa junto al área técnica', 'Fidelización de clientes'],
    reqs: ['Experiencia en venta consultiva B2B', 'Conocimiento de soluciones TIC'],
    goals: [['30 nuevos clientes corporativos', 55], ['NPS mayor a 60', 75]],
  },
  {
    id: 'arq', title: 'Arquitecta de Redes', area: 'Redes', reportsTo: 'cto', person: 'Sofía Vargas', photo: '1573164713714-d95e436ab8d6', mbti: 'INTP', color: 'lilac',
    summary: 'Diseña redes LAN, WAN, Wi-Fi y data center escalables y seguras.',
    duties: ['Diseño de topologías y direccionamiento', 'Evaluar nuevas tecnologías', 'Documentación técnica'],
    reqs: ['CCNP Enterprise', 'Experiencia en SD-WAN y Wi-Fi 6/7'],
    goals: [['Plantilla estándar SD-WAN', 65], ['Certificación CCIE (escrito)', 40]],
  },
  {
    id: 'sec', title: 'Especialista en Ciberseguridad', area: 'Redes', reportsTo: 'cto', person: 'Javier Soto', photo: '1535713875002-d1d0cf377fde', mbti: 'ISTJ', color: 'peach',
    summary: 'Protege la infraestructura: firewalls, Zero Trust, monitoreo de amenazas y respuesta a incidentes.',
    duties: ['Políticas de firewall y segmentación', 'Gestión de vulnerabilidades', 'Respuesta a incidentes'],
    reqs: ['Security+ / CISSP', 'Experiencia con NGFW y SIEM'],
    goals: [['0 incidentes críticos', 85], ['Implementar Zero Trust interno', 35]],
  },
  {
    id: 'noc', title: 'Coordinadora NOC', area: 'Redes', reportsTo: 'cto', person: 'Mariana Cruz', photo: '1580489944761-15a19d654956', mbti: 'ISTP', color: 'green',
    summary: 'Coordina el centro de operaciones de red 24/7 y la atención de incidentes.',
    duties: ['Turnos y guardias del NOC', 'Monitoreo y escalamiento', 'Reportes de SLA'],
    reqs: ['CCNA', 'ITIL Foundation', 'Experiencia en herramientas de monitoreo'],
    goals: [['MTTR menor a 2 h', 72], ['Automatizar 50% de alertas', 48]],
  },
  {
    id: 'sm', title: 'Scrum Master / PMO', area: 'Redes', reportsTo: 'cto', person: 'Andrés León', mbti: 'ENFP', color: 'yellow',
    summary: 'Facilita Scrum en los proyectos de red y elimina impedimentos del equipo.',
    duties: ['Facilitar eventos Scrum', 'Mantener el tablero Kanban', 'Métricas de entrega'],
    reqs: ['PSM I o CSM', 'Experiencia en proyectos de infraestructura'],
    goals: [['Velocidad estable ±10%', 68], ['100% retros con acciones', 90]],
  },
  {
    id: 'tec', title: 'Técnico de Soporte e Instalaciones', area: 'Redes', reportsTo: 'noc', person: 'Pablo Rojas', mbti: 'ISFJ', color: 'blue',
    summary: 'Instala, configura y da soporte en sitio a equipos de red de clientes.',
    duties: ['Instalación de cableado y equipos', 'Soporte de primer y segundo nivel', 'Mantenimiento preventivo'],
    reqs: ['Técnico en redes', 'CCNA deseable', 'Licencia de conducir'],
    goals: [['Aprobar CCNA', 60], ['95% de visitas resueltas', 82]],
  },
  {
    id: 'cont', title: 'Contadora', area: 'Administración', reportsTo: 'cfo', person: 'Elena Gil', mbti: 'ISTJ', color: 'green',
    summary: 'Registra operaciones contables y cumple obligaciones tributarias.',
    duties: ['Estados financieros', 'Impuestos y declaraciones', 'Conciliaciones'],
    reqs: ['Contadora titulada', '3+ años de experiencia'],
    goals: [['Digitalizar 100% de facturas', 88]],
  },
  {
    id: 'ven', title: 'Ejecutiva de Cuentas', area: 'Comercial', reportsTo: 'com', person: 'Lucía Ortiz', mbti: 'ESFP', color: 'pink',
    summary: 'Gestiona la cartera de clientes y detecta nuevas oportunidades.',
    duties: ['Prospección y visitas', 'Propuestas comerciales', 'Seguimiento postventa'],
    reqs: ['Experiencia en ventas TIC', 'Excelente comunicación'],
    goals: [['Cuota trimestral de ventas', 58]],
  },
]

export const VIDEOS = [
  { id: 'keeqnciDVOo', title: 'Redes de computadoras en 100 segundos', tag: 'Fundamentos' },
  { id: '3QhU9jd03a0', title: 'Computer Networks — Crash Course', tag: 'Historia' },
  { id: 'AEaKrq3SpW8', title: 'Cómo funciona Internet — Crash Course', tag: 'Internet' },
  { id: '_IOZ8_cPgu8', title: 'Switch, router, subred, firewall y DMZ', tag: 'Infraestructura' },
  { id: 'vv4y_uOneC0', title: 'Modelo OSI animado', tag: 'Protocolos' },
]
