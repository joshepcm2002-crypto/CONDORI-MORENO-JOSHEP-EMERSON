(() => {
    const normalizeText = value => String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();

    const topics = [
        {
            title: 'estructuras de datos',
            week: null,
            keywords: ['estructura de datos', 'estructuras de datos'],
            answer: 'Una estructura de datos organiza y relaciona información para facilitar operaciones como insertar, eliminar, buscar o recorrer. En el curso se estudian arreglos, listas, pilas, colas, árboles y grafos.'
        },
        {
            title: 'algoritmo',
            week: 1,
            keywords: ['algoritmo', 'pseudocodigo'],
            answer: 'Un algoritmo es una secuencia finita y ordenada de pasos para resolver un problema. Debe tener datos de entrada, un proceso definido y un resultado.'
        },
        {
            title: 'arreglos bidimensionales',
            week: 1,
            keywords: ['arreglo bidimensional', 'matriz', 'fila', 'columna'],
            answer: 'Un arreglo bidimensional organiza elementos en filas y columnas. En Java se accede a cada elemento con dos índices, por ejemplo matriz[fila][columna].'
        },
        {
            title: 'arreglos paralelos y objetos',
            week: 2,
            keywords: ['arreglos paralelos', 'arreglo paralelo', 'arreglo de objetos', 'objetos'],
            answer: 'Los arreglos paralelos guardan datos relacionados en arreglos distintos, usando el mismo índice para asociarlos. Un arreglo de objetos agrupa los datos relacionados en cada objeto.'
        },
        {
            title: 'ArrayList',
            week: 5,
            keywords: ['arraylist'],
            answer: 'ArrayList es una lista dinámica de Java que permite agregar y quitar elementos. Ofrece acceso rápido por índice; las inserciones o eliminaciones en medio pueden desplazar otros elementos.'
        },
        {
            title: 'Vector',
            week: 3,
            keywords: ['vector'],
            answer: 'Vector es una colección dinámica indexada de Java, similar a ArrayList. Su API sincroniza muchas operaciones; para uso habitual de un solo hilo, ArrayList suele ser la opción preferida.'
        },
        {
            title: 'LinkedList',
            week: 4,
            keywords: ['linkedlist', 'lista doblemente enlazada'],
            answer: 'LinkedList es una colección enlazada de Java. Permite insertar o quitar en los extremos con facilidad; acceder a una posición requiere recorrer nodos.'
        },
        {
            title: 'pilas',
            week: 6,
            keywords: ['pila', 'lifo'],
            answer: 'Una pila sigue LIFO: el último elemento en entrar es el primero en salir. Sus operaciones usuales son push (apilar), pop (desapilar) y peek (consultar la cima).'
        },
        {
            title: 'colas',
            week: 7,
            keywords: ['cola', 'fifo'],
            answer: 'Una cola sigue FIFO: el primer elemento en entrar es el primero en salir. Se agrega al final y se retira desde el frente.'
        },
        {
            title: 'recursividad',
            week: 8,
            keywords: ['recursividad', 'recursion'],
            answer: 'La recursividad ocurre cuando un método se llama a sí mismo. Necesita un caso base que detenga las llamadas y un paso recursivo que acerque el problema a ese caso.'
        },
        {
            title: 'Ackermann',
            week: 9,
            keywords: ['ackermann'],
            answer: 'La función de Ackermann es una función matemática definida mediante recursión anidada. En el Proyecto 01 se usa para estudiar llamadas recursivas profundas; sus valores crecen muy rápido.'
        },
        {
            title: 'dependencias de tareas',
            week: 9,
            keywords: ['dependencia de tareas', 'dependencias', 'prerrequisito'],
            answer: 'En el Proyecto 02, las dependencias representan qué tareas deben completarse antes que otras. La profundidad recursiva permite analizar cadenas de prerrequisitos y detectar ciclos.'
        },
        {
            title: 'expresiones comerciales',
            week: 9,
            keywords: ['expresion', 'parentesis', 'evaluador'],
            answer: 'El Proyecto 03 evalúa expresiones comerciales respetando paréntesis, precedencia y operadores. La recursividad permite resolver una expresión interna antes de continuar con la externa.'
        },
        {
            title: 'costos de productos',
            week: 9,
            keywords: ['costo', 'costos', 'producto', 'composicion'],
            answer: 'El Proyecto 04 calcula costos de productos compuestos a partir de sus componentes. La recursividad permite calcular cada parte y acumular sus costos.'
        },
        {
            title: 'listas simplemente enlazadas',
            week: 10,
            keywords: ['lista simplemente enlazada', 'lista enlazada simple', 'lista enlazada', 'nodo'],
            answer: 'Una lista simplemente enlazada está formada por nodos. Cada nodo guarda un dato y una referencia al siguiente; el último apunta a null. En Semana 10 se practican inserción, eliminación, búsqueda y ordenamiento de alumnos.'
        },
        {
            title: 'listas circulares simples',
            week: 11,
            keywords: ['lista circular', 'listas circulares'],
            answer: 'En una lista circular simple, el último nodo apunta de nuevo al primero. El recorrido debe detenerse al regresar al nodo inicial para evitar un ciclo infinito.'
        },
        {
            title: 'listas doblemente enlazadas',
            week: 12,
            keywords: ['lista doblemente enlazada', 'listas doblemente enlazadas'],
            answer: 'Cada nodo de una lista doblemente enlazada mantiene referencias al nodo siguiente y al anterior. Esto permite recorrerla en ambos sentidos, a cambio de mantener dos enlaces.'
        },
        {
            title: 'arboles',
            week: 13,
            keywords: ['arbol', 'arboles', 'raiz', 'hoja'],
            answer: 'Un árbol es una estructura jerárquica de nodos. La raíz inicia la estructura; los nodos pueden tener hijos y las hojas no tienen hijos.'
        },
        {
            title: 'grafos',
            week: 14,
            keywords: ['grafo', 'grafos', 'vertice', 'arista'],
            answer: 'Un grafo modela relaciones con vértices (o nodos) y aristas. Puede ser dirigido o no dirigido, y representar redes, rutas o conexiones.'
        },
        {
            title: 'ordenacion y busqueda',
            week: 15,
            keywords: ['ordenacion', 'ordenamiento', 'busqueda', 'busqueda binaria', 'busqueda lineal'],
            answer: 'La ordenación organiza datos según un criterio; la búsqueda localiza un elemento. La búsqueda binaria es eficiente, pero requiere que los datos estén ordenados.'
        },
        {
            title: 'complejidad',
            week: null,
            keywords: ['complejidad', 'big o', 'o(n)', 'o(1)', 'o(log n)', 'o(n^2)'],
            answer: 'La notación O describe cómo crece el trabajo de un algoritmo al aumentar los datos. O(1) es constante, O(n) crece linealmente y O(n²) suele aparecer con dos recorridos anidados.'
        }
    ];

    const weekTenMethods = [
        {
            keywords: ['insertar', 'inserto', 'inserta', 'insercion', 'agregar', 'agrego'],
            answer: 'En la lista de Semana 10: insertar al inicio actualiza la cabeza; insertar al final recorre hasta el último nodo; insertar en posición valida el rango y enlaza el nuevo nodo entre sus vecinos; insertar por referencia lo coloca después del alumno encontrado.'
        },
        {
            keywords: ['eliminar', 'elimino', 'elimina', 'borrar', 'borro', 'retirar'],
            answer: 'Para eliminar en Semana 10: al inicio se mueve la cabeza al siguiente nodo; al final se enlaza el penúltimo con null; por posición o referencia se localiza el nodo anterior y se conecta con el sucesor del nodo retirado.'
        },
        {
            keywords: ['buscar', 'busco', 'busqueda', 'encontrar', 'encuentra'],
            answer: 'La búsqueda por código recorre los nodos desde el inicio y compara los códigos. Si encuentra coincidencia, devuelve el alumno; si llega a null, no existe.'
        },
        {
            keywords: ['mostrar', 'muestro', 'imprimir', 'imprime', 'listar', 'lista todos'],
            answer: 'Para mostrar todos los alumnos, se recorre la lista desde el primer nodo hasta null y se agrega cada alumno a la salida, normalmente con un contador de posición.'
        },
        {
            keywords: ['ordenar', 'ordeno', 'ordena', 'ordenamiento'],
            answer: 'La Semana 10 incluye ordenamiento por código y por promedio. Se comparan alumnos vecinos y se intercambian sus datos según el criterio, repitiendo pasadas hasta ordenar la lista.'
        },
        {
            keywords: ['intercambiar', 'intercambio', 'cambiar', 'cambio'],
            answer: 'Para intercambiar dos alumnos, primero se localizan por código. Si ambos existen, se permutan sus datos usando una variable temporal; los enlaces de la lista permanecen iguales.'
        },
        {
            keywords: ['modificar', 'modifico', 'modifica', 'actualizar', 'actualiza'],
            answer: 'Para modificar un alumno, se busca por código, se validan los nuevos datos y se actualizan sus atributos. Si no se encuentra el código, la operación no modifica la lista.'
        },
        {
            keywords: ['cantidad', 'tamano', 'tamaño'],
            answer: 'La lista mantiene un contador de alumnos: aumenta al insertar y disminuye al eliminar. Consultar ese contador permite obtener la cantidad en O(1), sin recorrer los nodos.'
        },
        {
            keywords: ['vacia', 'vacio', 'vacía', 'vacío'],
            answer: 'La lista está vacía cuando la referencia al primer nodo es null. En ese caso no hay nodos que recorrer.'
        }
    ];

    const courseTerms = [
        'algoritmo', 'estructura', 'dato', 'java', 'programacion', 'arreglo', 'array',
        'vector', 'lista', 'nodo', 'pila', 'cola', 'recurs', 'ackermann', 'dependencia',
        'expresion', 'costo', 'producto', 'arbol', 'grafo', 'orden', 'busqueda',
        'complejidad', 'semana', 'alumno', 'insertar', 'eliminar'
    ];

    function findWeek(question) {
        const match = question.match(/\b(?:semana|week)\s*(0?[1-9]|1[0-6])\b/);
        if (!match || typeof CONFIG === 'undefined') return null;

        const weekNumber = Number(match[1]);
        const activities = (CONFIG.units || []).flatMap(unit => unit.activities || []);
        return activities.find(activity => activity.id === weekNumber) || null;
    }

    function getWeekAnswer(activity) {
        const materials = (activity.materials || []).map(item => item.title);
        const tasks = (activity.tasks || []).map(task => task.title);
        const details = [];

        if (materials.length) details.push(`Materiales: ${materials.join('; ')}.`);
        if (tasks.length) details.push(`Actividades: ${tasks.join('; ')}.`);
        if (!details.length) details.push('Todavía no hay materiales o actividades cargados.');

        return `Semana ${String(activity.id).padStart(2, '0')}: ${activity.title}. ${activity.description || ''} ${details.join(' ')}`;
    }

    function getCourseAnswer(message) {
        const question = normalizeText(message);
        const greeting = /^(hola|buenas|buenos dias|buenas tardes|buenas noches|ayuda|que puedes hacer)[!.? ]*$/.test(question);
        if (greeting) {
            return `¡Hola! Soy la guía del curso ${CONFIG.course}. Puedo ayudarte con sus temas y semanas, del 1 al 16. Por ejemplo: “¿Qué es una pila?” o “¿Qué materiales hay en la semana 10?”.`;
        }

        if (/^(gracias|muchas gracias|ok|listo)[!. ]*$/.test(question)) {
            return '¡De nada! Cuando quieras, pregúntame sobre un tema o una semana del curso.';
        }

        const activity = findWeek(question);
        const hasLinkedListContext = /alumno|lista|nodo|linkedlist/.test(question);
        if (activity && activity.id === 10) {
            const method = weekTenMethods.find(item =>
                item.keywords.some(keyword => question.includes(normalizeText(keyword)))
            );
            if (method) return method.answer;
        }
        if (activity) return getWeekAnswer(activity);

        if (question.includes('arraylist') && (question.includes('linkedlist') || question.includes('lista enlazada'))) {
            return 'ArrayList guarda elementos en un arreglo dinámico y ofrece acceso rápido por índice. LinkedList conecta nodos y facilita cambios en los extremos, pero acceder a una posición requiere recorrer la lista.';
        }

        if (hasLinkedListContext) {
            const method = weekTenMethods.find(item =>
                item.keywords.some(keyword => question.includes(normalizeText(keyword)))
            );
            if (method) return method.answer;
        }

        const topic = topics.find(item =>
            item.keywords.some(keyword => question.includes(normalizeText(keyword)))
        );
        if (topic) {
            const activityForTopic = (CONFIG.units || [])
                .flatMap(unit => unit.activities || [])
                .find(item => item.id === topic.week);
            const weekReference = topic.week
                ? ` Corresponde a la semana ${String(topic.week).padStart(2, '0')}${activityForTopic ? ` (${activityForTopic.title})` : ''}.`
                : '';
            return `${topic.answer}${weekReference}`;
        }

        if (courseTerms.some(term => question.includes(normalizeText(term)))) {
            return 'Puedo ayudarte con algoritmos, arreglos, listas, pilas, colas, recursividad, árboles, grafos, ordenamiento y búsqueda. ¿Qué concepto o semana quieres revisar?';
        }

        return 'Solo puedo responder preguntas relacionadas con el curso de Algoritmos y Estructura de Datos. Pregúntame por uno de sus temas, métodos o semanas.';
    }

    function initializeCourseChat() {
        if (typeof CONFIG === 'undefined' || document.getElementById('course-chat')) return;

        const widget = document.createElement('div');
        widget.id = 'course-chat';
        widget.className = 'course-chat';
        widget.innerHTML = `
            <section class="course-chat-window" id="course-chat-window" aria-label="Chat del curso" hidden>
                <header class="course-chat-header">
                    <div>
                        <strong>Asistente del curso</strong>
                        <span>Algoritmos y Estructura de Datos</span>
                    </div>
                    <button class="course-chat-close" type="button" aria-label="Cerrar chat">
                        <i class="ph ph-x" aria-hidden="true"></i>
                    </button>
                </header>
                <div class="course-chat-messages" id="course-chat-messages" role="log" aria-live="polite" aria-relevant="additions"></div>
                <div class="course-chat-suggestions" aria-label="Preguntas sugeridas">
                    <button type="button" data-question="¿Qué es una pila?">¿Qué es una pila?</button>
                    <button type="button" data-question="¿Qué materiales hay en la semana 10?">Semana 10</button>
                </div>
                <form class="course-chat-form" id="course-chat-form">
                    <label class="sr-only" for="course-chat-input">Escribe una pregunta sobre el curso</label>
                    <input id="course-chat-input" name="question" type="text" maxlength="500" autocomplete="off" placeholder="Pregunta sobre el curso..." required>
                    <button type="submit" aria-label="Enviar pregunta">
                        <i class="ph ph-paper-plane-tilt" aria-hidden="true"></i>
                    </button>
                </form>
                <p class="course-chat-note">Respuestas locales basadas en el programa; no usa IA externa.</p>
            </section>
            <button class="course-chat-launcher" type="button" aria-label="Abrir asistente del curso" aria-controls="course-chat-window" aria-expanded="false">
                <i class="ph ph-chat-circle-dots" aria-hidden="true"></i>
            </button>
        `;
        document.body.appendChild(widget);

        const panel = widget.querySelector('#course-chat-window');
        const launcher = widget.querySelector('.course-chat-launcher');
        const closeButton = widget.querySelector('.course-chat-close');
        const messages = widget.querySelector('#course-chat-messages');
        const form = widget.querySelector('#course-chat-form');
        const input = widget.querySelector('#course-chat-input');

        const addMessage = (role, text) => {
            const message = document.createElement('div');
            message.className = `course-chat-message course-chat-message--${role}`;
            message.textContent = text;
            messages.appendChild(message);
            messages.scrollTop = messages.scrollHeight;
        };

        const submitQuestion = question => {
            const text = question.trim().slice(0, 500);
            if (!text) return;
            addMessage('user', text);
            addMessage('assistant', getCourseAnswer(text));
        };

        addMessage('assistant', `¡Hola! Soy la guía del curso ${CONFIG.course}. Respondo preguntas sobre sus temas y semanas.`);

        launcher.addEventListener('click', () => {
            panel.hidden = false;
            launcher.setAttribute('aria-expanded', 'true');
            input.focus();
        });

        closeButton.addEventListener('click', () => {
            panel.hidden = true;
            launcher.setAttribute('aria-expanded', 'false');
            launcher.focus();
        });

        widget.querySelectorAll('[data-question]').forEach(button => {
            button.addEventListener('click', () => submitQuestion(button.dataset.question));
        });

        form.addEventListener('submit', event => {
            event.preventDefault();
            submitQuestion(input.value);
            input.value = '';
            input.focus();
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !panel.hidden) {
                panel.hidden = true;
                launcher.setAttribute('aria-expanded', 'false');
                launcher.focus();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCourseChat, { once: true });
    } else {
        initializeCourseChat();
    }
})();
