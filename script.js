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
            if(href && !href.startsWith('#') && !link.hasAttribute('download') && link.getAttribute('target') !== '_blank') {
                e.preventDefault();
                document.body.classList.remove('page-loaded');
                document.body.classList.add('page-exiting');
                setTimeout(() => window.location.href = href, 350);
            }
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
            document.querySelectorAll('.profile-meta p:first-child').forEach(el => el.innerHTML = `<i class="ph ph-identification-card"></i> Codigo: ${CONFIG.studentCode}`);
        }
        if (CONFIG.studentEmail) {
            document.querySelectorAll('.profile-meta p:nth-child(2)').forEach(el => el.innerHTML = `<i class="ph ph-envelope"></i> ${CONFIG.studentEmail}`);
        }
        if (CONFIG.universityName) {
            document.querySelectorAll('.profile-meta p:nth-child(3)').forEach(el => el.innerHTML = `<i class="ph ph-buildings"></i> ${CONFIG.universityName}`);
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
        const weeks = CONFIG.weeks;
        const weeksPerUnit = 4;
        const totalUnits = Math.ceil(weeks.length / weeksPerUnit);
        let htmlContent = '';

        const numberToRoman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

        for(let u = 0; u < totalUnits; u++) {
            const unitNumeral = numberToRoman[u] || (u + 1);
            htmlContent += `<h2 class="unit-title">Unidad ${unitNumeral}</h2>`;
            htmlContent += `<div class="timeline">`;
            
            for(let w = u * weeksPerUnit; w < (u * weeksPerUnit) + weeksPerUnit; w++) {
                if(weeks[w]) {
                    const week = weeks[w];
                    // Si la semana tiene tareas reales
                    const totalT = week.tasks.length;
                    const sum = totalT > 0 ? (totalT === 1 ? '1 evidencia' : `${totalT} evidencias`) : 'Próximamente';
                    
                    htmlContent += `
                        <a href="semana.html#${week.id}" class="timeline-content">
                            <div class="timeline-node">${week.id}</div>
                            <h3>${week.title}</h3>
                            <p>${sum}</p>
                        </a>
                    `;
                }
            }
            htmlContent += `</div>`;
        }

        tareasContainer.innerHTML = htmlContent;
    }

    // --- LÓGICA SEMANA.HTML ---
    if(isLocalSemana) {
        // Extrae el ID del hash, ej: semana.html#4
        let weekId = parseInt(hashString) || 1;
        if(hashString.includes('id=')) {
            weekId = parseInt(new URLSearchParams(hashString).get('id')) || 1;
        }

        document.title = `Portafolio | Semana ${weekId}`;

        const weekData = CONFIG.weeks.find(w => w.id === weekId);
        const weekGrid = document.getElementById('week-tasks-grid');
        
        if(weekData) {
            document.getElementById('week-title').textContent = `${weekData.title}`;
            
            weekData.tasks.forEach(task => {
                let iconClass = 'ph-file';
                if(task.type==='documento') iconClass = 'ph-file-pdf';
                if(task.type==='codigo') iconClass = 'ph-code';
                if(task.type==='presentacion') iconClass = 'ph-presentation-chart';

                const html = `
                    <div class="task-card">
                        <div class="task-header">
                            <div class="task-icon"><i class="ph ${iconClass}"></i></div>
                            <span class="badge ${task.status.replace(' ','-')}">${task.status}</span>
                        </div>
                        <div class="task-body">
                            <h3 class="task-title">${task.title}</h3>
                        </div>
                        <div class="task-action">
                            <button class="btn" onclick="openVisor('${task.title}', '${task.file}')">
                                <i class="ph ph-eye"></i> Visualizar
                            </button>
                        </div>
                    </div>
                `;
                weekGrid.innerHTML += html;
            });
            if(weekData.tasks.length === 0) {
                weekGrid.innerHTML = `<p style="color:var(--text-muted); grid-column: span 12; text-align:center;">No hay tareas subidas en esta semana.</p>`;
            }
        } else {
             document.getElementById('week-title').textContent = "Semana No Registrada";
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
