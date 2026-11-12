document.addEventListener('DOMContentLoaded', () => {
    // SPA-like Page Transitions
    setTimeout(() => document.body.classList.add('page-loaded'), 50);

    // BFCache
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            document.body.classList.remove('page-exiting');
            setTimeout(() => document.body.classList.add('page-loaded'), 50);
        }
    });

    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || link.hasAttribute('download') ||
                link.getAttribute('target') === '_blank' || e.defaultPrevented ||
                e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            const destination = new URL(link.href, window.location.href);
            if (destination.origin !== window.location.origin ||
                destination.protocol !== window.location.protocol) return;

            e.preventDefault();
            document.body.classList.remove('page-loaded');
            document.body.classList.add('page-exiting');
            setTimeout(() => window.location.href = destination.href, 350);
        });
    });

    // Nav Active State
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.dock-link').forEach(link => {
        if(path.includes('semana.html') && link.getAttribute('href') === 'tareas.html') {
            link.classList.add('active');
        } else if(link.getAttribute('href') === path) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Theme Toggle Minimal
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    if(btn) {
        const icon = btn.querySelector('i');
        let isLight = localStorage.getItem('themeLight') === 'true';
        if(isLight) { root.setAttribute('data-theme', 'light'); icon.className = 'ph ph-moon'; }
        
        btn.addEventListener('click', () => {
            isLight = !isLight;
            if(isLight) {
                root.setAttribute('data-theme', 'light');
                localStorage.setItem('themeLight', 'true');
                icon.className = 'ph ph-moon';
            } else {
                root.removeAttribute('data-theme');
                localStorage.setItem('themeLight', 'false');
                icon.className = 'ph ph-sun';
            }
        });
    } else {
        // En Visor Aplicar Tema Silenciosamente
        if(localStorage.getItem('themeLight') === 'true') { root.setAttribute('data-theme', 'light'); }
    }

    // Reactividad Data
    if (typeof CONFIG !== 'undefined') {
        const allTasks = (CONFIG.units || []).reduce((tasks, unit) => {
            unit.activities.forEach(activity => tasks.push(...activity.tasks));
            return tasks;
        }, []);
        const deliveredCount = allTasks.filter(task =>
            String(task.status).toLowerCase() === 'entregado'
        ).length;
        document.querySelectorAll('.stat-number').forEach(el => {
            el.textContent = deliveredCount;
        });

        if (CONFIG.studentName) {
            document.querySelectorAll('.profile-name').forEach(el => el.textContent = CONFIG.studentName);
        }
        if (CONFIG.shortName) {
            document.querySelectorAll('.box-career h3').forEach(el => el.textContent = CONFIG.shortName);
        } else if (CONFIG.studentName) {
            document.querySelectorAll('.box-career h3').forEach(el => el.textContent = CONFIG.studentName);
        }
        if (CONFIG.studentImage) {
            document.querySelectorAll('.profile-pic').forEach(el => el.src = CONFIG.studentImage);
        }
        if (CONFIG.shortCareer) {
            document.querySelectorAll('.hero-career').forEach(el => el.textContent = CONFIG.shortCareer);
        } else if (CONFIG.career) {
            document.querySelectorAll('.hero-career').forEach(el => el.textContent = CONFIG.career);
        }
        if (CONFIG.career) {
            document.querySelectorAll('.profile-career').forEach(el => el.textContent = CONFIG.career);
            const indexSub = document.querySelector('.box-career p');
            if(indexSub && CONFIG.studentCode) indexSub.textContent = CONFIG.studentCode;
        }
        if (CONFIG.studentCode) {
            document.querySelectorAll('.profile-meta p:first-child').forEach(el => el.innerHTML = `<i class="ph ph-identification-card"></i> Código: ${escapeHTML(CONFIG.studentCode)}`);
        }
        if (CONFIG.studentEmail) {
            document.querySelectorAll('.profile-meta p:nth-child(2)').forEach(el => el.innerHTML = `<i class="ph ph-envelope"></i> ${escapeHTML(CONFIG.studentEmail)}`);
        }
        if (CONFIG.universityName) {
            document.querySelectorAll('.profile-meta p:nth-child(3)').forEach(el => el.innerHTML = `<i class="ph ph-buildings"></i> ${escapeHTML(CONFIG.universityName)}`);
            document.querySelectorAll('.hero-university').forEach(el => el.textContent = CONFIG.universityName);
        }
        if (CONFIG.aboutMe) document.querySelectorAll('.profile-aboutme').forEach(el => el.textContent = CONFIG.aboutMe);
        if (CONFIG.aboutUniversity) document.querySelectorAll('.profile-aboutuni').forEach(el => el.textContent = CONFIG.aboutUniversity);
        if (CONFIG.universityLogo) {
            document.querySelectorAll('.profile-unilogo').forEach(el => {
                el.src = CONFIG.universityLogo;
                el.style.display = 'block';
            });
        }
        
        if (CONFIG.course) document.querySelectorAll('.hero-course').forEach(el => el.textContent = CONFIG.course);
        if (CONFIG.semester) document.querySelectorAll('.hero-semester').forEach(el => el.textContent = CONFIG.semester);

        if (CONFIG.footerText) {
            let footerStr = CONFIG.footerText;
            if(CONFIG.universityName) footerStr = footerStr.replace('[UNIVERSITY_NAME]', CONFIG.universityName);
            if(CONFIG.studentName) footerStr = footerStr.replace('[NAME_STUDENT]', CONFIG.studentName);
            document.querySelectorAll('footer p').forEach(el => el.textContent = footerStr);
        }
    }

    
    // Router de Funcionalidades SEGUN PAGINA (Compatible con file:// local usando Hash)
    const hashString = window.location.hash.substring(1); // Elimina el #
    const isLocalVisor = document.getElementById('visorContainer') !== null;
    const isLocalSemana = document.getElementById('week-tasks-grid') !== null;
    

    // --- LÓGICA TAREAS.HTML (Directorio Dinámico por Unidad) ---
    const tareasContainer = document.getElementById('tareas-container');
    if(tareasContainer && typeof CONFIG !== 'undefined') {
        const units = CONFIG.units || [];
        const activities = units.reduce((all, unit) => all.concat(unit.activities || []), []);
        const weekCount = activities.length;
        const completedWeeks = activities.filter(activity =>
            (activity.tasks || []).some(task => String(task.status).toLowerCase() === 'entregado')
        ).length;
        const progress = weekCount ? Math.round((completedWeeks / weekCount) * 100) : 0;
        const progressTrack = document.querySelector('.progress-track');

        document.getElementById('unit-count').textContent = units.length;
        document.getElementById('week-count').textContent = weekCount;
        document.getElementById('progress-count').textContent = `${completedWeeks} / ${weekCount} semanas`;
        progressTrack.setAttribute('aria-valuemax', weekCount);
        progressTrack.setAttribute('aria-valuenow', completedWeeks);
        progressTrack.querySelector('.progress-fill').style.width = `${progress}%`;

        tareasContainer.innerHTML = units.map(unit => {
            const firstWeek = unit.activities[0].id;
            const lastWeek = unit.activities[unit.activities.length - 1].id;
            const unitId = `unit-${unit.id}`;
            const weeks = unit.activities.map(activity => {
                const weekNumber = String(activity.id).padStart(2, '0');
                const files = new Set(
                    (activity.materials || [])
                        .map(item => item.file)
                        .filter(file => file && file !== '#' && file !== 'null')
                );
                const tasks = activity.tasks || [];
                const taskSummary = tasks.length
                    ? tasks.map(task => `<span>${escapeHTML(task.title)}</span>`).join('')
                    : '<span>Sin actividades registradas</span>';

                return `
                    <a class="week-card" href="semana.html#${activity.id}">
                        <div class="week-card-heading">
                            <span class="week-number">${weekNumber}</span>
                            <span class="week-label">SEMANA ${weekNumber}</span>
                        </div>
                        <h3>${escapeHTML(activity.title)}</h3>
                        <p class="week-description">${escapeHTML(activity.description || '')}</p>
                        <div class="week-material-count">
                            <i class="ph ph-files"></i>
                            <strong>Materiales</strong>
                            <span>${files.size} ${files.size === 1 ? 'archivo' : 'archivos'}</span>
                        </div>
                        <div class="week-activity">
                            <span class="activity-kicker">ACTIVIDAD / EVIDENCIA</span>
                            <strong>${taskSummary}</strong>
                            <span class="activity-count">${tasks.length} ${tasks.length === 1 ? 'actividad' : 'actividades'}</span>
                        </div>
                    </a>
                `;
            }).join('');

            return `
                <article class="unit-card">
                    <button class="unit-toggle" type="button" aria-expanded="false" aria-controls="${unitId}">
                        <span class="unit-number">${String(unit.id).padStart(2, '0')}</span>
                        <span class="unit-summary">
                            <span class="unit-label">${escapeHTML(unit.title)}</span>
                            <strong>${escapeHTML(unit.subtitle)}</strong>
                            <span class="unit-range">Semanas ${String(firstWeek).padStart(2, '0')} — ${String(lastWeek).padStart(2, '0')}</span>
                        </span>
                        <i class="ph ph-plus unit-toggle-icon" aria-hidden="true"></i>
                    </button>
                    <div class="unit-content" id="${unitId}" hidden>
                        <div class="week-grid">${weeks}</div>
                    </div>
                </article>
            `;
        }).join('');

        tareasContainer.querySelectorAll('.unit-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', String(!isExpanded));
                document.getElementById(button.getAttribute('aria-controls')).hidden = isExpanded;
            });
        });
    }

    // --- LÓGICA SEMANA.HTML ---
    if(isLocalSemana) {
        // Extrae el ID del hash, ej: semana.html#4
        let activityId = parseInt(hashString) || 1;
        if(hashString.includes('id=')) {
            activityId = parseInt(new URLSearchParams(hashString).get('id')) || 1;
        }

        document.title = `Portafolio | Semana ${String(activityId).padStart(2, '0')}`;

        // Buscar la actividad en todas las unidades
        let activityData = null;
        for(let unit of CONFIG.units) {
            activityData = unit.activities.find(a => a.id === activityId);
            if(activityData) break;
        }
        
        const weekGrid = document.getElementById('week-tasks-grid');
        
        if(activityData) {
            const weekNumber = String(activityData.id).padStart(2, '0');
            const materialsGrid = document.getElementById('week-materials-grid');
            const materials = activityData.materials || [];
            const tasks = activityData.tasks || [];
            const fileCount = new Set(
                materials
                    .map(item => item.file)
                    .filter(file => file && file !== '#' && file !== 'null')
            ).size;

            document.getElementById('week-label').textContent = `SEMANA ${weekNumber}`;
            document.getElementById('week-title').textContent = activityData.title;
            document.getElementById('week-description').textContent = activityData.description || '';
            document.getElementById('week-material-count').textContent =
                `${fileCount} ${fileCount === 1 ? 'archivo' : 'archivos'}`;
            
            materialsGrid.innerHTML = materials.length
                ? materials.map(material => {
                    const isArchive = isArchiveFile(material.file);
                    const iconClass = material.type === 'image' ? 'ph-image' : isArchive ? 'ph-file' : 'ph-file-pdf';
                    const action = isArchive
                        ? `<a class="btn" href="${escapeHTML(material.file)}" download><i class="ph ph-download-simple"></i> Descargar</a>`
                        : `<button class="btn" type="button" data-title="${escapeHTML(material.title)}" data-file="${escapeHTML(material.file)}"><i class="ph ph-eye"></i> Visualizar</button>`;

                    return `
                        <article class="material-card">
                            <div class="task-icon"><i class="ph ${iconClass}"></i></div>
                            <div class="material-card-copy">
                                <span class="activity-kicker">${isArchive ? 'PROYECTO DESCARGABLE' : 'MATERIAL DE ESTUDIO'}</span>
                                <h3>${escapeHTML(material.title)}</h3>
                            </div>
                            ${action}
                        </article>
                    `;
                }).join('')
                : '<p class="empty-week-state">Aún no hay materiales cargados para esta semana.</p>';

            const taskCards = tasks.map(task => {
                let iconClass = 'ph-file';
                if(task.type==='documento') iconClass = 'ph-file-pdf';
                if(task.type==='codigo') iconClass = 'ph-code';
                if(task.type==='presentacion') iconClass = 'ph-presentation-chart';
                const status = String(task.status || 'pendiente');
                const statusClass = status.trim().toLowerCase().replace(/\s+/g, '-');
                const action = isArchiveFile(task.file)
                    ? `<a class="btn" href="${escapeHTML(task.file)}" download><i class="ph ph-download-simple"></i> Descargar proyecto</a>`
                    : `<button class="btn" type="button" data-title="${escapeHTML(task.title)}" data-file="${escapeHTML(task.file || '#')}"><i class="ph ph-eye"></i> Visualizar</button>`;

                return `
                    <div class="task-card">
                        <div class="task-header">
                            <div class="task-icon"><i class="ph ${iconClass}"></i></div>
                            <span class="badge ${escapeHTML(statusClass)}">${escapeHTML(status)}</span>
                        </div>
                        <div class="task-body">
                            <h3 class="task-title">${escapeHTML(task.title)}</h3>
                        </div>
                        <div class="task-action">
                            ${action}
                        </div>
                    </div>
                `;
            });

            weekGrid.innerHTML = taskCards.length
                ? taskCards.join('')
                : '<p class="empty-week-state">Aún no hay actividades o evidencias registradas para esta semana.</p>';
            document.querySelectorAll('.week-materials-grid button, .task-action button').forEach(button => {
                button.addEventListener('click', () => {
                    window.openVisor(button.dataset.title, button.dataset.file);
                });
            });
        } else {
             document.getElementById('week-label').textContent = '';
             document.getElementById('week-title').textContent = "Semana no registrada";
             document.getElementById('week-description').textContent = "No encontramos esta semana en el programa del curso.";
             document.getElementById('week-materials-grid').innerHTML = '';
             weekGrid.innerHTML = '';
        }
    }

    // --- LÓGICA VISOR.HTML ---
    if(isLocalVisor) {
        const hashParams = new URLSearchParams(hashString);
        const title = hashParams.get('title') || 'Documento';
        const file = hashParams.get('file');
        
        document.getElementById('visorTitle').textContent = title;
        document.title = `Visor | ${title}`;

        
        if(!file || file === '#' || file==='null') {
            document.getElementById('visorFrame').style.display = 'none';
            document.getElementById('visorError').style.display = 'flex';
            document.getElementById('visorDownloadBtn').style.display = 'none';
        } else {
            document.getElementById('visorFrame').src = file;
            document.getElementById('visorDownloadBtn').style.display = 'inline-flex';
        }

    }
});

function escapeHTML(value) {
    const text = value === null || value === undefined ? '' : String(value);
    return text.replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[character]);
}

function isArchiveFile(file) {
    return typeof file === 'string' && /\.zip$/i.test(file);
}

// Función central para redirigir al Visor Dedicado usando URL localmente segura (Hash)
window.openVisor = function(title, fileUrl) {
    const paramTitle = encodeURIComponent(title);
    const paramFile = encodeURIComponent(fileUrl || '#');
    document.body.classList.remove('page-loaded');
    document.body.classList.add('page-exiting');
    setTimeout(() => {
        window.location.href = `visor.html#title=${paramTitle}&file=${paramFile}`;
    }, 350);
}

// Función maestra para forzar la descarga en una pestaña auxiliar y evitar redireccionar el portafolio
window.downloadVisorFile = function() {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const fileUrl = hashParams.get('file');
    const title = hashParams.get('title') || 'Descarga_Portafolio';
    
    if(fileUrl && fileUrl !== '#') {
        fetch(fileUrl).then(resp => resp.blob()).then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = blobUrl;
            a.download = title;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(blobUrl);
            document.body.removeChild(a);
        }).catch(err => {
            // Fallback en local file:// si el fetch es bloqueado por CORS
            const fallbackLink = document.createElement('a');
            fallbackLink.href = fileUrl;
            fallbackLink.download = title;
            fallbackLink.target = '_blank';
            document.body.appendChild(fallbackLink);
            fallbackLink.click();
            document.body.removeChild(fallbackLink);
        });
    }
}
