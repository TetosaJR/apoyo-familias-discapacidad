/**
 * APOYOFAMILIAS - LÓGICA INTERACTIVA, CALCULADORA Y ACCESIBILIDAD AVANZADA (app.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar iconos de Lucide
  function renderLucide() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  renderLucide();

  // =========================================================================
  // 1. HERRAMIENTAS DE ACCESIBILIDAD (A11Y) & MODO LECTURA FÁCIL
  // =========================================================================
  const body = document.body;
  const btnFontIncrease = document.getElementById('btn-font-increase');
  const btnFontDecrease = document.getElementById('btn-font-decrease');
  const btnFontNormal = document.getElementById('btn-font-normal');
  const btnHighContrast = document.getElementById('btn-high-contrast');
  const btnDyslexicFont = document.getElementById('btn-dyslexic-font');
  const btnLecturaFacil = document.getElementById('btn-lectura-facil');
  const btnAudioReader = document.getElementById('btn-audio-reader');
  const audioReaderLabel = document.getElementById('audio-reader-label');

  // Tamaños de fuente permitidos
  const fontSizes = ['text-size-sm', 'text-size-md', 'text-size-lg', 'text-size-xl'];
  let currentFontIndex = 1; // Default: text-size-md

  function updateFontSizeClass() {
    fontSizes.forEach(cls => body.classList.remove(cls));
    body.classList.add(fontSizes[currentFontIndex]);
    localStorage.setItem('a11y_font_size', currentFontIndex);
  }

  // Cargar preferencias guardadas
  const savedFont = localStorage.getItem('a11y_font_size');
  if (savedFont !== null) {
    currentFontIndex = parseInt(savedFont, 10);
    updateFontSizeClass();
  }

  if (localStorage.getItem('a11y_high_contrast') === 'true') {
    body.classList.add('theme-high-contrast');
    btnHighContrast?.classList.add('active');
  }

  if (localStorage.getItem('a11y_dyslexic') === 'true') {
    body.classList.add('font-dyslexic');
    btnDyslexicFont?.classList.add('active');
  }

  if (localStorage.getItem('a11y_lectura_facil') === 'true') {
    body.classList.add('modo-lectura-facil');
    btnLecturaFacil?.classList.add('active');
  }

  // Eventos de fuente
  btnFontIncrease?.addEventListener('click', () => {
    if (currentFontIndex < fontSizes.length - 1) {
      currentFontIndex++;
      updateFontSizeClass();
    }
  });

  btnFontDecrease?.addEventListener('click', () => {
    if (currentFontIndex > 0) {
      currentFontIndex--;
      updateFontSizeClass();
    }
  });

  btnFontNormal?.addEventListener('click', () => {
    currentFontIndex = 1;
    updateFontSizeClass();
  });

  // Alto Contraste
  btnHighContrast?.addEventListener('click', () => {
    const isContrast = body.classList.toggle('theme-high-contrast');
    btnHighContrast.classList.toggle('active', isContrast);
    localStorage.setItem('a11y_high_contrast', isContrast);
  });

  // Fuente legible para dislexia
  btnDyslexicFont?.addEventListener('click', () => {
    const isDyslexic = body.classList.toggle('font-dyslexic');
    btnDyslexicFont.classList.toggle('active', isDyslexic);
    localStorage.setItem('a11y_dyslexic', isDyslexic);
  });

  // Modo Lectura Fácil (UNE 153101 EX)
  btnLecturaFacil?.addEventListener('click', () => {
    const isFacil = body.classList.toggle('modo-lectura-facil');
    btnLecturaFacil.classList.toggle('active', isFacil);
    localStorage.setItem('a11y_lectura_facil', isFacil);
    filtrarAyudas(); // Re-renderizar para ajustar textos
  });

  // =========================================================================
  // 2. LECTOR DE PANTALLA Y AUDIO (WEB SPEECH SYNTHESIS API)
  // =========================================================================
  let isSpeaking = false;

  function hablarTexto(texto, callbackOnEnd) {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta síntesis de voz automática.');
      return;
    }

    window.speechSynthesis.cancel(); // Detener cualquier locución previa

    if (!texto) {
      detenerVoz();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95; // Velocidad ligeramente pausada para máxima claridad

    utterance.onstart = () => {
      isSpeaking = true;
      if (btnAudioReader) {
        btnAudioReader.classList.add('audio-playing');
        if (audioReaderLabel) audioReaderLabel.textContent = 'Detener';
      }
    };

    utterance.onend = () => {
      detenerVoz();
      if (callbackOnEnd) callbackOnEnd();
    };

    utterance.onerror = () => {
      detenerVoz();
    };

    window.speechSynthesis.speak(utterance);
  }

  function detenerVoz() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isSpeaking = false;
    if (btnAudioReader) {
      btnAudioReader.classList.remove('audio-playing');
      if (audioReaderLabel) audioReaderLabel.textContent = 'Escuchar';
    }
  }

  btnAudioReader?.addEventListener('click', () => {
    if (isSpeaking) {
      detenerVoz();
    } else {
      // Locución introductoria accesible del portal
      const resumenHero = "Bienvenido a Apoyo Familias. Plataforma integral de ayudas, prestaciones de dependencia y servicios para familias con personas con discapacidad. Puedes usar la calculadora económica, explorar el catálogo de ayudas o llamarnos gratis al novecientos, cien, doscientos.";
      hablarTexto(resumenHero);
    }
  });

  // =========================================================================
  // 3. SELECTOR DE COMUNIDAD AUTÓNOMA (CCAA)
  // =========================================================================
  const ccaaSelect = document.getElementById('ccaa-quick-select');
  const regionalBanner = document.getElementById('regional-banner');
  const regName = document.getElementById('reg-name');
  const regOrganism = document.getElementById('reg-organism');
  const regPhoneVal = document.getElementById('reg-phone-val');
  const regCallBtn = document.getElementById('reg-call-btn');
  const cardPhoneLink = document.getElementById('card-phone-link');
  const floatPhoneLabel = document.getElementById('float-phone-label');
  const floatPhoneBtn = document.getElementById('float-phone-btn');
  const footerPhoneLabel = document.getElementById('footer-phone-label');
  const footerAddressLabel = document.getElementById('footer-address-label');
  const cardOfficeAddress = document.getElementById('card-office-address');

  function aplicarCCAA(claveCCAA) {
    const dataCCAA = window.ccaaData || {};
    const info = dataCCAA[claveCCAA] || dataCCAA['otra'];

    if (claveCCAA === 'otra') {
      if (regionalBanner) regionalBanner.style.display = 'none';
    } else {
      if (regionalBanner) regionalBanner.style.display = 'block';
      if (regName) regName.textContent = info.nombre;
      if (regOrganism) regOrganism.textContent = info.webSocial;
      if (regPhoneVal) regPhoneVal.textContent = info.telefono;
      if (regCallBtn) regCallBtn.href = `tel:${info.telefono.replace(/\s+/g, '')}`;
    }

    // Actualizar teléfonos y direcciones visibles
    const telLimpio = info.telefono.replace(/\s+/g, '');
    if (cardPhoneLink) {
      cardPhoneLink.textContent = info.telefono;
      cardPhoneLink.href = `tel:${telLimpio}`;
    }
    if (floatPhoneLabel) floatPhoneLabel.textContent = info.telefono;
    if (floatPhoneBtn) floatPhoneBtn.href = `tel:${telLimpio}`;
    if (footerPhoneLabel) footerPhoneLabel.textContent = info.telefono;
    if (footerAddressLabel) footerAddressLabel.textContent = info.oficina;
    if (cardOfficeAddress) cardOfficeAddress.textContent = info.oficina;

    localStorage.setItem('user_ccaa', claveCCAA);
    renderLucide();
  }

  ccaaSelect?.addEventListener('change', (e) => {
    aplicarCCAA(e.target.value);
  });

  const savedCCAA = localStorage.getItem('user_ccaa');
  if (savedCCAA && ccaaSelect) {
    ccaaSelect.value = savedCCAA;
    aplicarCCAA(savedCCAA);
  }

  // =========================================================================
  // 4. MIS AYUDAS GUARDADAS (FAVORITOS / DRAWER LATERAL)
  // =========================================================================
  let savedAidsIds = JSON.parse(localStorage.getItem('saved_aids_ids') || '[]');

  const savedCounter = document.getElementById('saved-counter');
  const drawerCount = document.getElementById('drawer-count');
  const floatBadgeCount = document.getElementById('float-badge-count');
  const savedDrawer = document.getElementById('saved-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const savedItemsContainer = document.getElementById('saved-items-container');
  const btnOpenSaved = document.getElementById('btn-open-saved');
  const floatSavedBtn = document.getElementById('float-saved-btn');
  const btnCloseDrawer = document.getElementById('btn-close-drawer');
  const btnSolicitarGuardadas = document.getElementById('btn-solicitar-todas-guardadas');
  const btnImprimirGuardadas = document.getElementById('btn-imprimir-guardadas');

  function actualizarContadoresGuardadas() {
    const count = savedAidsIds.length;
    if (savedCounter) savedCounter.textContent = count;
    if (drawerCount) drawerCount.textContent = count;
    if (floatBadgeCount) floatBadgeCount.textContent = count;
    localStorage.setItem('saved_aids_ids', JSON.stringify(savedAidsIds));
  }

  function toggleGuardarAyuda(id) {
    const index = savedAidsIds.indexOf(id);
    if (index > -1) {
      savedAidsIds.splice(index, 1);
    } else {
      savedAidsIds.push(id);
    }
    actualizarContadoresGuardadas();
    renderSavedDrawer();
    filtrarAyudas(); // Actualizar el botón de la tarjeta
  }

  function renderSavedDrawer() {
    if (!savedItemsContainer) return;
    const rawData = window.ayudasData || [];
    const guardadas = rawData.filter(a => savedAidsIds.includes(a.id));

    if (guardadas.length === 0) {
      savedItemsContainer.innerHTML = '<p class="empty-saved-msg">No has guardado ninguna ayuda todavía. Haz clic en el icono del marcador de cualquier tarjeta para añadirla a tu carpeta.</p>';
      return;
    }

    savedItemsContainer.innerHTML = '';
    guardadas.forEach(ayuda => {
      const card = document.createElement('div');
      card.className = 'saved-item-card';
      card.innerHTML = `
        <button class="saved-item-remove" data-id="${ayuda.id}" title="Eliminar de guardadas" aria-label="Eliminar ${ayuda.titulo}">&times;</button>
        <span class="saved-item-title">${ayuda.titulo}</span>
        <span class="saved-item-amount">${ayuda.cuantia}</span>
      `;
      savedItemsContainer.appendChild(card);
    });

    savedItemsContainer.querySelectorAll('.saved-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        toggleGuardarAyuda(id);
      });
    });
  }

  function abrirDrawer() {
    renderSavedDrawer();
    savedDrawer?.classList.add('open');
    if (drawerOverlay) drawerOverlay.style.display = 'block';
    savedDrawer?.setAttribute('aria-hidden', 'false');
  }

  function cerrarDrawer() {
    savedDrawer?.classList.remove('open');
    if (drawerOverlay) drawerOverlay.style.display = 'none';
    savedDrawer?.setAttribute('aria-hidden', 'true');
  }

  btnOpenSaved?.addEventListener('click', abrirDrawer);
  floatSavedBtn?.addEventListener('click', abrirDrawer);
  btnCloseDrawer?.addEventListener('click', cerrarDrawer);
  drawerOverlay?.addEventListener('click', cerrarDrawer);

  // Solicitar estudio conjunto de todas las ayudas guardadas
  btnSolicitarGuardadas?.addEventListener('click', () => {
    cerrarDrawer();
    const rawData = window.ayudasData || [];
    const guardadas = rawData.filter(a => savedAidsIds.includes(a.id));
    const titulos = guardadas.map(a => `• ${a.titulo}`).join('\n');

    const textarea = document.getElementById('form-mensaje');
    if (textarea) {
      textarea.value = `Hola, he revisado las ayudas y me gustaría recibir estudio conjunto de las siguientes ${guardadas.length} opciones guardadas:\n\n${titulos}\n\nRuego me indiquen documentación a recopilar y fechas de trámite.`;
    }

    const formSection = document.getElementById('formulario-contacto');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => document.getElementById('form-nombre')?.focus(), 600);
    }
  });

  // Imprimir Lista de Documentación de las ayudas guardadas
  btnImprimirGuardadas?.addEventListener('click', () => {
    prepararEImprimirGuardadas();
  });

  function prepararEImprimirGuardadas() {
    const printArea = document.getElementById('print-items-content');
    const rawData = window.ayudasData || [];
    const guardadas = rawData.filter(a => savedAidsIds.includes(a.id));

    if (!printArea) return;
    if (guardadas.length === 0) {
      alert('Guarda al menos una ayuda antes de imprimir tu dossier.');
      return;
    }

    printArea.innerHTML = `<h3>Listado de ${guardadas.length} Ayudas Seleccionadas para Trámite:</h3>`;

    guardadas.forEach(ayuda => {
      const box = document.createElement('div');
      box.className = 'print-item-box';
      const reqList = ayuda.requisitos.map(r => `<li>${r}</li>`).join('');
      const docList = ayuda.documentacion.map(d => `<li>${d}</li>`).join('');

      box.innerHTML = `
        <h3>${ayuda.titulo}</h3>
        <p><strong>Organismo Gestor:</strong> ${ayuda.organismo} | <strong>Cuantía / Estimación:</strong> ${ayuda.cuantia}</p>
        <h4>Requisitos Clave:</h4>
        <ul>${reqList}</ul>
        <h4>Documentación Necesaria:</h4>
        <ul>${docList}</ul>
      `;
      printArea.appendChild(box);
    });

    window.print();
  }

  actualizarContadoresGuardadas();

  // =========================================================================
  // 5. CALCULADORA Y SIMULADOR FINANCIERO DE AYUDAS
  // =========================================================================
  const calcGradoDisc = document.getElementById('calc-grado-disc');
  const calcGradoDep = document.getElementById('calc-grado-dep');
  const calcConvivencia = document.getElementById('calc-convivencia');
  const calcHijosEscolar = document.getElementById('calc-hijos-escolar');
  const calcVehiculo = document.getElementById('calc-vehiculo');
  const calcReforma = document.getElementById('calc-reforma');

  const calcTotalDisplay = document.getElementById('calc-total-display');
  const calcMonthlyDisplay = document.getElementById('calc-monthly-display');
  const valDep = document.getElementById('val-dep');
  const valIrpf = document.getElementById('val-irpf');
  const valNeae = document.getElementById('val-neae');
  const valCoche = document.getElementById('val-coche');
  const valBono = document.getElementById('val-bono');
  const valReforma = document.getElementById('val-reforma');
  const itemReforma = document.getElementById('item-reforma');

  function recalcularSimulacion() {
    const gradoDisc = parseInt(calcGradoDisc.value, 10);
    const gradoDep = parseInt(calcGradoDep.value, 10);
    const convive = calcConvivencia.checked;
    const escolar = calcHijosEscolar.checked;
    const vehiculo = calcVehiculo.checked;
    const reforma = calcReforma.checked;

    let totalAnual = 0;

    // 1. Prestación por dependencia (PECEF)
    let cuantiaDep = 0;
    if (convive) {
      if (gradoDep === 1) cuantiaDep = 2160; // 180 €/mes
      else if (gradoDep === 2) cuantiaDep = 3780; // 315 €/mes
      else if (gradoDep === 3) cuantiaDep = 5460; // 455 €/mes
    }
    valDep.textContent = cuantiaDep > 0 ? `${cuantiaDep.toLocaleString('es-ES')} €/año (${Math.round(cuantiaDep / 12)} €/mes)` : '0 €/año';
    totalAnual += cuantiaDep;

    // 2. Deducción IRPF (Hacienda)
    let cuantiaIrpf = 0;
    if (gradoDisc >= 65) {
      cuantiaIrpf = 2400;
    } else if (gradoDisc >= 33) {
      cuantiaIrpf = 1200;
    }
    valIrpf.textContent = cuantiaIrpf > 0 ? `${cuantiaIrpf.toLocaleString('es-ES')} €/año (100-200 €/mes)` : '0 €/año';
    totalAnual += cuantiaIrpf;

    // 3. Becas NEAE
    let cuantiaNeae = 0;
    if (escolar && gradoDisc >= 33) {
      cuantiaNeae = 2800; // beca media más subsidio
    }
    valNeae.textContent = cuantiaNeae > 0 ? `${cuantiaNeae.toLocaleString('es-ES')} €/curso` : '0 €/año';
    totalAnual += cuantiaNeae;

    // 4. Ahorro Vehículo (IVTM + Tarjeta PMR)
    let cuantiaCoche = 0;
    if (vehiculo && gradoDisc >= 33) {
      cuantiaCoche = 350; // exención impuesto + ahorro zona regulada
    }
    valCoche.textContent = cuantiaCoche > 0 ? `${cuantiaCoche} €/año aprox.` : '0 €/año';
    totalAnual += cuantiaCoche;

    // 5. Bono Social Eléctrico / Térmico
    let cuantiaBono = 0;
    if (gradoDisc >= 33) {
      cuantiaBono = 420; // 35€/mes descuento medio regulado
    }
    valBono.textContent = cuantiaBono > 0 ? `${cuantiaBono} €/año aprox.` : '0 €/año';
    totalAnual += cuantiaBono;

    // 6. Subvención Obras Vivienda (pago único)
    let cuantiaReforma = 0;
    if (reforma && gradoDisc >= 33) {
      cuantiaReforma = 4500;
      itemReforma.style.display = 'flex';
      valReforma.textContent = `Hasta ${cuantiaReforma.toLocaleString('es-ES')} € (a fondo perdido)`;
    } else {
      itemReforma.style.display = 'none';
    }

    // Totales
    calcTotalDisplay.textContent = `${totalAnual.toLocaleString('es-ES')} € / año`;
    const mensualEstimado = Math.round(totalAnual / 12);
    calcMonthlyDisplay.textContent = `Aproximadamente ${mensualEstimado.toLocaleString('es-ES')} € al mes en apoyos y deducciones`;
  }

  [calcGradoDisc, calcGradoDep, calcConvivencia, calcHijosEscolar, calcVehiculo, calcReforma].forEach(input => {
    input?.addEventListener('change', recalcularSimulacion);
  });

  recalcularSimulacion();

  // Botón Solicitar Asesoramiento para este pack de la calculadora
  document.getElementById('btn-solicitar-calculo')?.addEventListener('click', () => {
    const total = calcTotalDisplay.textContent;
    const textarea = document.getElementById('form-mensaje');
    if (textarea) {
      textarea.value = `Hola, he utilizado el simulador económico de la web con una estimación de ${total}. Ruego asesoramiento profesional para verificar los requisitos de la Ley de Dependencia, deducción IRPF y demás ayudas calculadas.`;
    }
    const formSection = document.getElementById('formulario-contacto');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => document.getElementById('form-nombre')?.focus(), 600);
    }
  });

  // Botón Imprimir Informe de la calculadora
  document.getElementById('btn-print-checklist')?.addEventListener('click', () => {
    const printArea = document.getElementById('print-items-content');
    if (!printArea) return;

    printArea.innerHTML = `
      <h3>Resumen del Estudio Económico Estimado:</h3>
      <p><strong>Total Estimado Anual:</strong> ${calcTotalDisplay.textContent}</p>
      <ul>
        <li><strong>Prestación por Dependencia:</strong> ${valDep.textContent}</li>
        <li><strong>Deducción IRPF Familiar:</strong> ${valIrpf.textContent}</li>
        <li><strong>Becas y Terapias Educativas:</strong> ${valNeae.textContent}</li>
        <li><strong>Ahorro Vehículo y Transporte:</strong> ${valCoche.textContent}</li>
        <li><strong>Bono Social Energía:</strong> ${valBono.textContent}</li>
      </ul>
      <p><em>Para solicitar la tramitación formal de cualquiera de estos conceptos, contacta gratuitamente con el equipo de trabajadoras sociales en el 900 100 200.</em></p>
    `;
    window.print();
  });

  // =========================================================================
  // 6. CATÁLOGO DE AYUDAS Y FILTROS INTERACTIVOS
  // =========================================================================
  const ayudasContainer = document.getElementById('ayudas-cards-container');
  const countNumber = document.getElementById('count-number');
  const noResultsMsg = document.getElementById('no-results-msg');
  const filterDisability = document.getElementById('filter-disability-select');
  const filterCategory = document.getElementById('filter-category-select');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  const pillBtns = document.querySelectorAll('.pill-btn');
  const resetFiltersBtn = document.getElementById('reset-all-filters');

  let currentDisability = 'todas';
  let currentCategory = 'todas';
  let searchQuery = '';

  function getCategoryLabel(cat) {
    switch (cat) {
      case 'economica': return 'Económica';
      case 'fiscal': return 'Fiscal / IRPF';
      case 'movilidad': return 'Movilidad & Hogar';
      case 'educacion': return 'Educación & Becas';
      case 'empleo': return 'Empleo Inclusivo';
      default: return 'General';
    }
  }

  function getDisabilityLabel(dis) {
    switch (dis) {
      case 'fisica': return 'Física / Motora';
      case 'intelectual': return 'Intelectual / TEA';
      case 'sensorial': return 'Visual / Auditiva';
      case 'mental': return 'Salud Mental';
      case 'organica': return 'Orgánica / Raras';
      default: return 'Todas las discapacidades';
    }
  }

  function renderAyudas(items) {
    if (!ayudasContainer) return;
    ayudasContainer.innerHTML = '';

    if (items.length === 0) {
      noResultsMsg.style.display = 'block';
      countNumber.textContent = '0';
      return;
    }

    noResultsMsg.style.display = 'none';
    countNumber.textContent = items.length;

    const esLecturaFacil = body.classList.contains('modo-lectura-facil');

    items.forEach(ayuda => {
      const card = document.createElement('article');
      card.className = `ayuda-card ${ayuda.destacada ? 'featured' : ''}`;
      card.setAttribute('data-id', ayuda.id);

      const categoryClass = `tag-${ayuda.categoria}`;
      const disabilityLabel = getDisabilityLabel(ayuda.discapacidad);
      const categoryLabel = getCategoryLabel(ayuda.categoria);
      const isSaved = savedAidsIds.includes(ayuda.id);

      // Texto según modo lectura fácil
      const textoAMostrar = (esLecturaFacil && ayuda.lecturaFacil) ? `📖 ${ayuda.lecturaFacil}` : ayuda.resumen;

      card.innerHTML = `
        <div class="card-top">
          <span class="card-category-tag ${categoryClass}">${categoryLabel}</span>
          <div class="card-actions-top">
            <span class="card-disability-tag"><i data-lucide="tag"></i> ${disabilityLabel}</span>
            <button type="button" class="card-bookmark-btn ${isSaved ? 'saved' : ''}" data-id="${ayuda.id}" title="${isSaved ? 'Quitar de guardadas' : 'Guardar en mi lista'}" aria-label="Guardar ${ayuda.titulo}">
              <i data-lucide="bookmark"></i>
            </button>
          </div>
        </div>

        <h3>${ayuda.titulo}</h3>
        <p class="ayuda-organismo"><i data-lucide="landmark"></i> ${ayuda.organismo}</p>
        
        <div class="ayuda-cuantia-box">
          <span class="cuantia-label">Cuantía / Beneficio estimado:</span>
          <span class="cuantia-val">${ayuda.cuantia}</span>
        </div>

        <p class="ayuda-resumen">${textoAMostrar}</p>

        <div class="card-footer-btns">
          <button type="button" class="btn btn-outline-primary btn-ver-detalle" data-id="${ayuda.id}">
            <i data-lucide="eye"></i> Requisitos y Trámite
          </button>
          <button type="button" class="btn-card-audio" data-id="${ayuda.id}" title="Escuchar resumen de esta ayuda" aria-label="Escuchar ${ayuda.titulo}">
            <i data-lucide="volume-2"></i>
          </button>
        </div>
      `;

      ayudasContainer.appendChild(card);
    });

    renderLucide();

    // Eventos de botones dentro de las tarjetas
    ayudasContainer.querySelectorAll('.btn-ver-detalle').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        abrirModalAyuda(id);
      });
    });

    ayudasContainer.querySelectorAll('.card-bookmark-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        toggleGuardarAyuda(id);
      });
    });

    ayudasContainer.querySelectorAll('.btn-card-audio').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const rawData = window.ayudasData || [];
        const ayuda = rawData.find(a => a.id === id);
        if (ayuda) {
          const locucion = `${ayuda.titulo}. Cuantía: ${ayuda.cuantia}. ${ayuda.resumen}`;
          hablarTexto(locucion);
        }
      });
    });
  }

  function filtrarAyudas() {
    const rawData = window.ayudasData || [];
    
    const filtradas = rawData.filter(item => {
      const matchDisability = currentDisability === 'todas' || 
                              item.discapacidad === 'todas' || 
                              item.discapacidad === currentDisability;

      const matchCategory = currentCategory === 'todas' || item.categoria === currentCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch = q === '' ||
                          item.titulo.toLowerCase().includes(q) ||
                          item.resumen.toLowerCase().includes(q) ||
                          item.detalles.toLowerCase().includes(q) ||
                          item.organismo.toLowerCase().includes(q) ||
                          item.cuantia.toLowerCase().includes(q);

      return matchDisability && matchCategory && matchSearch;
    });

    renderAyudas(filtradas);

    const hayFiltroActivo = currentDisability !== 'todas' || currentCategory !== 'todas' || searchQuery !== '';
    if (resetFiltersBtn) {
      resetFiltersBtn.style.display = hayFiltroActivo ? 'inline-block' : 'none';
    }
  }

  // Eventos de selección de filtros
  filterDisability?.addEventListener('change', (e) => {
    currentDisability = e.target.value;
    sincronizarPills(currentDisability);
    filtrarAyudas();
  });

  filterCategory?.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    filtrarAyudas();
  });

  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    filtrarAyudas();
  });

  clearSearchBtn?.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    filtrarAyudas();
    searchInput.focus();
  });

  function sincronizarPills(disValue) {
    pillBtns.forEach(btn => {
      if (btn.getAttribute('data-pill-disability') === disValue) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  pillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-pill-disability');
      currentDisability = val;
      if (filterDisability) filterDisability.value = val;
      sincronizarPills(val);
      filtrarAyudas();
    });
  });

  resetFiltersBtn?.addEventListener('click', () => {
    currentDisability = 'todas';
    currentCategory = 'todas';
    searchQuery = '';
    if (filterDisability) filterDisability.value = 'todas';
    if (filterCategory) filterCategory.value = 'todas';
    if (searchInput) searchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';
    sincronizarPills('todas');
    filtrarAyudas();
  });

  filtrarAyudas();

  // Enlaces directos desde Hero o Footer
  document.querySelectorAll('[data-filter-disability]').forEach(el => {
    el.addEventListener('click', () => {
      const dis = el.getAttribute('data-filter-disability');
      const cat = el.getAttribute('data-filter-category');
      if (dis) {
        currentDisability = dis;
        if (filterDisability) filterDisability.value = dis;
        sincronizarPills(dis);
      }
      if (cat) {
        currentCategory = cat;
        if (filterCategory) filterCategory.value = cat;
      }
      filtrarAyudas();
    });
  });

  document.querySelectorAll('[data-footer-disability]').forEach(el => {
    el.addEventListener('click', () => {
      const dis = el.getAttribute('data-footer-disability');
      if (dis) {
        currentDisability = dis;
        if (filterDisability) filterDisability.value = dis;
        sincronizarPills(dis);
        filtrarAyudas();
      }
    });
  });

  // =========================================================================
  // 7. MODAL DE DETALLE DE AYUDA Y AUDIO EN MODAL
  // =========================================================================
  const modal = document.getElementById('modal-ayuda');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalOrganism = document.getElementById('modal-organism');
  const modalDesc = document.getElementById('modal-desc');
  const modalReqs = document.getElementById('modal-requirements');
  const modalDocs = document.getElementById('modal-docs');
  const modalBtnSolicitar = document.getElementById('modal-btn-solicitar');
  const modalBtnAudio = document.getElementById('modal-btn-audio');
  const modalEasyBox = document.getElementById('modal-easy-box');
  const modalEasyText = document.getElementById('modal-easy-text');

  let ayudaActualSeleccionada = null;

  function abrirModalAyuda(id) {
    const rawData = window.ayudasData || [];
    const ayuda = rawData.find(a => a.id === id);
    if (!ayuda || !modal) return;

    ayudaActualSeleccionada = ayuda;

    modalTitle.textContent = ayuda.titulo;
    modalCategory.textContent = getCategoryLabel(ayuda.categoria);
    modalCategory.className = `badge-pill modal-badge tag-${ayuda.categoria}`;
    modalOrganism.textContent = `Organismo: ${ayuda.organismo}`;
    modalDesc.textContent = ayuda.detalles;

    if (ayuda.lecturaFacil) {
      modalEasyBox.style.display = 'block';
      modalEasyText.textContent = ayuda.lecturaFacil;
    } else {
      modalEasyBox.style.display = 'none';
    }

    modalReqs.innerHTML = '';
    ayuda.requisitos.forEach(req => {
      const li = document.createElement('li');
      li.textContent = req;
      modalReqs.appendChild(li);
    });

    modalDocs.innerHTML = '';
    ayuda.documentacion.forEach(doc => {
      const li = document.createElement('li');
      li.textContent = doc;
      modalDocs.appendChild(li);
    });

    modal.style.display = 'flex';
    modalClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function cerrarModal() {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      detenerVoz();
    }
  }

  modalClose?.addEventListener('click', cerrarModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) cerrarModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
      cerrarModal();
    }
  });

  modalBtnAudio?.addEventListener('click', () => {
    if (!ayudaActualSeleccionada) return;
    const texto = `${ayudaActualSeleccionada.titulo}. Organismo gestor: ${ayudaActualSeleccionada.organismo}. Cuantía: ${ayudaActualSeleccionada.cuantia}. Explicación: ${ayudaActualSeleccionada.lecturaFacil || ayudaActualSeleccionada.resumen}`;
    hablarTexto(texto);
  });

  modalBtnSolicitar?.addEventListener('click', () => {
    if (!ayudaActualSeleccionada) return;
    cerrarModal();
    
    const textarea = document.getElementById('form-mensaje');
    const selectServicio = document.getElementById('form-servicio-interes');
    
    if (textarea) {
      textarea.value = `Hola, me interesa tramitar la ayuda: "${ayudaActualSeleccionada.titulo}". Ruego información sobre los siguientes pasos y documentación requerida.`;
    }
    if (selectServicio) {
      selectServicio.value = 'tramite_dependencia';
    }

    const contactSection = document.getElementById('formulario-contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => document.getElementById('form-nombre')?.focus(), 600);
    }
  });

  // =========================================================================
  // 8. ASISTENTE WIZARD INTERACTIVO (ORIENTADOR EN 3 PASOS)
  // =========================================================================
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');
  const wizardResult = document.getElementById('wizard-result');
  const summaryText = document.getElementById('wizard-summary-text');
  const indicators = document.querySelectorAll('.step-indicator');
  
  let wizardRespuestas = {
    discapacidad: 'todas',
    grado: '33',
    necesidad: 'economica'
  };

  function setWizardStep(activeStepNum) {
    [step1, step2, step3, wizardResult].forEach(el => {
      if (el) el.style.display = 'none';
    });

    indicators.forEach(ind => {
      const stepVal = parseInt(ind.getAttribute('data-step'), 10);
      if (stepVal === activeStepNum) ind.classList.add('active');
      else ind.classList.remove('active');
    });

    if (activeStepNum === 1 && step1) step1.style.display = 'block';
    if (activeStepNum === 2 && step2) step2.style.display = 'block';
    if (activeStepNum === 3 && step3) step3.style.display = 'block';
    if (activeStepNum === 4 && wizardResult) wizardResult.style.display = 'block';
  }

  step1?.querySelectorAll('.wizard-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      wizardRespuestas.discapacidad = btn.getAttribute('data-value');
      setWizardStep(2);
    });
  });

  step2?.querySelectorAll('.wizard-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      wizardRespuestas.grado = btn.getAttribute('data-value');
      setWizardStep(3);
    });
  });

  document.getElementById('wizard-prev-2')?.addEventListener('click', () => setWizardStep(1));

  step3?.querySelectorAll('.wizard-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      wizardRespuestas.necesidad = btn.getAttribute('data-value');
      finalizarWizard();
    });
  });

  document.getElementById('wizard-prev-3')?.addEventListener('click', () => setWizardStep(2));

  function finalizarWizard() {
    setWizardStep(4);
    if (summaryText) {
      summaryText.textContent = `Hemos seleccionado prestaciones prioritarias para: Discapacidad ${getDisabilityLabel(wizardRespuestas.discapacidad)}, con enfoque en ayudas de tipo ${getCategoryLabel(wizardRespuestas.necesidad)}.`;
    }
  }

  document.getElementById('wizard-go-results')?.addEventListener('click', (e) => {
    e.preventDefault();
    currentDisability = wizardRespuestas.discapacidad;
    currentCategory = wizardRespuestas.necesidad === 'respiro' ? 'todas' : wizardRespuestas.necesidad;

    if (filterDisability) filterDisability.value = currentDisability;
    if (filterCategory) filterCategory.value = currentCategory;
    sincronizarPills(currentDisability);
    filtrarAyudas();

    const ayudasSection = document.getElementById('ayudas');
    if (ayudasSection) ayudasSection.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('wizard-reset')?.addEventListener('click', () => {
    wizardRespuestas = { discapacidad: 'todas', grado: '33', necesidad: 'economica' };
    setWizardStep(1);
  });

  // =========================================================================
  // 9. SERVICIOS Y CONTACTO
  // =========================================================================
  document.querySelectorAll('.service-cta-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service-name');
      const selectServicio = document.getElementById('form-servicio-interes');
      const textarea = document.getElementById('form-mensaje');

      if (selectServicio) {
        if (serviceName.includes('Legal')) selectServicio.value = 'tramite_dependencia';
        else if (serviceName.includes('Respiro')) selectServicio.value = 'respiro_familiar';
        else if (serviceName.includes('Terapias')) selectServicio.value = 'terapias';
        else if (serviceName.includes('Psicológica')) selectServicio.value = 'apoyo_psicologico';
        else if (serviceName.includes('Accesibilidad')) selectServicio.value = 'adaptacion_vivienda';
        else if (serviceName.includes('Educativa')) selectServicio.value = 'educacion_becas';
      }

      if (textarea) {
        textarea.value = `Deseo recibir información y condiciones sobre el servicio: "${serviceName}".`;
      }

      const formSection = document.getElementById('formulario-contacto');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => document.getElementById('form-nombre')?.focus(), 500);
      }
    });
  });

  // Validación y envío amigable del formulario
  const form = document.getElementById('contact-form');
  const feedbackMsg = document.getElementById('form-feedback-message');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const nombre = document.getElementById('form-nombre');
    const telefono = document.getElementById('form-telefono');
    const email = document.getElementById('form-email');
    const privacidad = document.getElementById('form-privacidad');

    const errNombre = document.getElementById('error-nombre');
    const errTelefono = document.getElementById('error-telefono');
    const errEmail = document.getElementById('error-email');
    const errPrivacidad = document.getElementById('error-privacidad');

    [errNombre, errTelefono, errEmail, errPrivacidad].forEach(el => {
      if (el) el.textContent = '';
    });

    if (!nombre.value.trim()) {
      errNombre.textContent = 'Por favor, introduce tu nombre.';
      isValid = false;
    }

    if (!telefono.value.trim() || telefono.value.trim().length < 9) {
      errTelefono.textContent = 'Introduce un teléfono de contacto válido (mínimo 9 dígitos).';
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
      errEmail.textContent = 'Introduce una dirección de correo válida.';
      isValid = false;
    }

    if (!privacidad.checked) {
      errPrivacidad.textContent = 'Es necesario aceptar la política de confidencialidad para tramitar la ayuda.';
      isValid = false;
    }

    if (!isValid) {
      if (feedbackMsg) {
        feedbackMsg.className = 'feedback-box error';
        feedbackMsg.textContent = 'Por favor, revisa los campos señalados en rojo antes de enviar.';
        feedbackMsg.style.display = 'block';
      }
      return;
    }

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i data-lucide="loader"></i> Enviando expediente...';
      renderLucide();
    }

    setTimeout(() => {
      if (feedbackMsg) {
        feedbackMsg.className = 'feedback-box success';
        feedbackMsg.innerHTML = `
          <strong>¡Solicitud de asesoramiento enviada con éxito!</strong><br>
          Muchas gracias, <strong>${nombre.value}</strong>. Una trabajadora social de nuestro equipo revisará tu caso y te contactará al teléfono <strong>${telefono.value}</strong> o por email en un plazo máximo de 24 horas laborables.<br><br>
          <a href="https://wa.me/34600000000?text=Hola,%20acabo%20de%20enviar%20el%20formulario%20de%20ayuda%20para%20${encodeURIComponent(nombre.value)}" target="_blank" rel="noopener" class="link-inline">
            <i data-lucide="message-circle"></i> ¿Tienes urgencia? Haz clic aquí para avisar por WhatsApp directo
          </a>
        `;
        feedbackMsg.style.display = 'block';
        feedbackMsg.scrollIntoView({ behavior: 'smooth' });
      }

      form.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i data-lucide="check"></i> Solicitud Enviada Correctamente';
        renderLucide();
      }
    }, 1000);
  });

  // =========================================================================
  // 10. MENÚ MÓVIL Y ACORDEÓN FAQ
  // =========================================================================
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

});
