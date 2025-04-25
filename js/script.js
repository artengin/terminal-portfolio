function startTerminal() {
    const body = document.querySelector('body');
    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"]');
    const terminal = document.querySelector('#terminal-wrap');
    const inputField = document.querySelector('#terminal-input');
    const output = document.querySelector('#terminal-output');
    let lang;
    function setLang() {
        if (localStorage.getItem("lang") == "en") {
            lang = "en";
            title.innerHTML = "Portfolio Terminal of Artem Osepyan";
            description.setAttribute("content", "An interactive terminal-style portfolio that simulates a command-line interface with custom navigation commands.");
        } else {
            lang = "ru";
            title.innerHTML = "Портфолио Терминал Осепян Артема";
            description.setAttribute("content", "Интерактивный терминал-портфолио, имитирует работу командной строки с набором пользовательских команд для навигации.");
        }
    }
    setLang();

    window.addEventListener('load', () => {
        inputField.focus();
    });

    document.addEventListener('click', (event) => {
      if (event.target !== inputField) {
        inputField.focus();
      }
    });

    function setTheme() {
        if (localStorage.getItem("theme") != null) {
            body.id = localStorage.getItem("theme");
        } else {
            body.id = 'dark';
        }
    }
    setTheme();


    function commandHistory(value){
        return `<span><span class="styleOne">guest</span>@<span class="styleTwo">terminal.artengin</span>:~$ <span class="history-value">${value}</span></span>`;
    }

    function displayCommand(value){
        const command = document.createElement('div');
        command.classList.add("command-div");
        command.innerHTML = commandHistory(value);
        terminal.appendChild(command); 
    }
    
    function themesDark() {
        localStorage.setItem("theme", "dark");
        setTheme();
        displayCommand("themes set dark");
    }

    function themesLight() {
        localStorage.setItem("theme", "light");
        setTheme();
        displayCommand("themes set light");
    }

    function themesBlue() {
        localStorage.setItem("theme", "blue-matrix");
        setTheme();
        displayCommand("themes set blue-matrix");
    }

    function themesEspresso() {
        localStorage.setItem("theme", "espresso");
        setTheme();
        displayCommand("themes set espresso");
    }

    function themesGreen() {
        localStorage.setItem("theme", "green-goblin");
        setTheme();
        displayCommand("themes set green-goblin");
    }

    function themesUbuntu() {
        localStorage.setItem("theme", "ubuntu");
        setTheme();
        displayCommand("themes set ubuntu");
    }

    function clearInput() {
        inputField.value = "";
        inputField.focus();
        window.scrollTo(0, document.body.scrollHeight);
    }
    
    async function welcome() {
        const welcome = document.createElement('div');
        welcome.classList.add("command-div");
        let path;
        if (lang == "ru") {
            path = 'includes/welcome.html';
        } else {
            path = 'includes/welcome-en.html';
        }
        await fetch(path)
        .then(response => response.text())
        .then(html => {
            welcome.innerHTML = html;
        })
        .catch(error => {
            console.error('Ошибка загрузки welcome.html:', error);
        });
        terminal.appendChild(welcome); 
        inputField.focus();
        window.scrollTo(0, document.body.scrollHeight);
    }

    function help() {
        const help = document.createElement('div');
        help.classList.add("command-list");
        help.classList.add("command-div");
        help.innerHTML = `
        ${commandHistory("help")}
        <p><span class="command styleTwo">about</span> - ${lang == "ru" ? "об авторе" : "about the author"}</p>
        <p><span class="command styleTwo">clear</span> - ${lang == "ru" ? "очистить терминал" : "clear the terminal" }</p>
        <p><span class="command styleTwo">contacts</span> - ${lang == "ru" ? "просмотреть контакты автора" : "check contacts"}</p>
        <p><span class="command styleTwo">cowsay</span> - ${lang == "ru" ? "вывести сообщение в стиле cowsay" : "display a cowsay-style message"}</p>
        <p><span class="command styleTwo">help</span> -  ${lang == "ru" ? "посмотреть список доступных команд" : "check available commands"}</p>
        <p><span class="command styleTwo">history</span> - ${lang == "ru" ? "просмотреть историю команд" : "view command history"}</p>
        <p><span class="command styleTwo">language</span> - ${lang == "ru" ? "сменить язык интерфейса" : "change interface language"}</p>
        <p><span class="command styleTwo">projects</span> - ${lang == "ru" ? "просмотреть проекты автора" : "view projects"}</p>
        <p><span class="command styleTwo">themes</span> -  ${lang == "ru" ? "просмотреть доступные темы" : "check available themes"}</p>
        <p><span class="command styleTwo">welcome</span> -  ${lang == "ru" ? "показать блок приветствия" : "display a welcome screen"}</p>
        <p><span class="command styleTwo">whoami</span> -  ${lang == "ru" ? "информация о текущем пользователе" : "about current user"}</p>
        <p style="margin-top: 15px"><span class="command">Tab</span> =>  ${lang == "ru" ? "автоматически дополняет команду" : "autocompletes the command"}</p>
        <p><span class="command">${lang == "ru" ? "Стрелка вверх" : "Up Arrow"}</span> =>  ${lang == "ru" ? "вернуться к предыдущей команде" : "go back to previous command"}</p>
        `;
        terminal.appendChild(help);
    }

    function clear() {
        terminal.innerHTML = "";
        displayCommand("clear");
    }

    function whoami() {
        const whoami = document.createElement('div');
        whoami.classList.add("command-div");
        whoami.innerHTML = `
        ${commandHistory("whoami")}
        <p>guest</p>`;
        terminal.appendChild(whoami); 
    }

    let queryHistory = ["welcome"];
    function history() {
        const history = document.createElement('div');
        history.classList.add("command-div");
        history.classList.add("command-history");
        let result = commandHistory("history");
        for (let i=0; i < queryHistory.length; i++) {
            result += `<p>${queryHistory[i]}</p>`;
        }
        history.innerHTML = result;
        terminal.appendChild(history); 
    }

    function contacts() {
        const contacts = document.createElement('div');
        contacts.classList.add("command-div");
        contacts.classList.add("command-list");
        contacts.innerHTML = `
        ${commandHistory("contacts")}
        <p style="margin-bottom: 10px">${lang == "ru" ? "Контакты" : "Contacts"}:</p>
        <p><span class="command styleTwo">1. Github</span> - https://github.com/artengin/</p>
        <p><span class="command styleTwo">2. E-mail</span> - art@osepyan.ru</p>
        <p><span class="command styleTwo">3. Telegram</span> - https://t.me/artengin</p>
        <p style="margin: 15px 0 0">${lang == "ru" ? "Использование" : "Usage"}: contacts go &lt;contacts-number&gt; </p>
        <p style="margin: 0">${lang == "ru" ? "Пример" : "Example"}: contacts go 1</p>
        `;
       terminal.appendChild(contacts); 
    }

    function contactsGo() {
        const contacts = document.createElement('div');
        contacts.classList.add("command-div");
        contacts.classList.add("themes");
        contacts.innerHTML = `
        ${commandHistory("contacts go")}
        <p>${lang == "ru" ? "Использование" : "Usage"}: contacts go &lt;contacts-number&gt; </p>
        <p>${lang == "ru" ? "Пример" : "Example"}: contacts go 1</p>
        `;
       terminal.appendChild(contacts); 
    }

    function contacts1() {
        window.open('https://github.com/artengin/', '_blank');
        displayCommand("contacts go 1");
    }

    function contacts2() {
        window.open('mailto:art@osepyan.ru');
        displayCommand("contacts go 2");
    }

    function contacts3() {
        window.open('https://t.me/artengin', '_blank');
        displayCommand("contacts go 3");
    }

    function cowsay() {
        const cowsay = document.createElement('div');
        cowsay.classList.add("command-div");
        cowsay.classList.add("themes");
        cowsay.innerHTML = `
        ${commandHistory("cowsay")}
        <span class="pre">cowsay version 3.03, (c) 1999 Tony Monroe</span>
        <p>${lang == "ru" ? "Использование" : "Usage"}: cowsay &lt;anything&gt; </p>
        <p>${lang == "ru" ? "Пример" : "Example"}: cowsay Hello world</p>
        `;
       terminal.appendChild(cowsay); 
       inputField.focus();
       window.scrollTo(0, document.body.scrollHeight);
    }

    async function cowsayOutput(value) {
        const cowsay = document.createElement('div');
        cowsay.classList.add("command-div");
        cowsay.classList.add("cowsay");
        cowsayValue = "cowsay " + value;
        await fetch('includes/cowsay.html')
        .then(response => response.text())
        .then(html => {
            cowsay.innerHTML = `
            ${commandHistory(cowsayValue)}
            <p>________________________</p>
            <p>< ${value} ></p>
            ${html}`;
        })
        .catch(error => {
            console.error('Ошибка загрузки cowsay.html:', error);
        });
        terminal.appendChild(cowsay);
    }

    function themes() {
        const themes = document.createElement('div');
        themes.classList.add("command-div");
        themes.classList.add("themes");
        themes.innerHTML = `
        ${commandHistory('themes')}
        <span class="pre">dark  light  blue-matrix  espresso  green-goblin  ubuntu</span>
        <p>${lang == "ru" ? "Использование" : "Usage"}: themes set &lt;theme-name&gt; </p>
        <p>${lang == "ru" ? "Пример" : "Example"}: themes set espresso</p>
        `;
       terminal.appendChild(themes); 
    }

    function themesSet() {
        const themes = document.createElement('div');
        themes.classList.add("command-div");
        themes.classList.add("themes");
        themes.innerHTML = `
        ${commandHistory('themes set')}
        <p>${lang == "ru" ? "Использование" : "Usage"}: themes set &lt;theme-name&gt; </p>
        <p>${lang == "ru" ? "Пример" : "Example"}: themes set espresso</p>
        `;
       terminal.appendChild(themes); 
    }

    function projects() {
        const projects = document.createElement('div');
        projects.classList.add("command-div");
        projects.classList.add("projects");
        projects.classList.add("themes");
        projects.innerHTML = `
        ${commandHistory('projects')}
        <p>${lang == "ru" ? "Вот некоторые из моих проектов" : "Featured projects"}:</p>
        <div>
            <p><b><span class="styleTwo">1.</span> ${lang == "ru" ? "Интерактивные метки на изображении" : "Interactive image labels"}</b></p>
            <p>${lang == "ru" ? "Плагин для создания интерактивных тегов на изображении JS / CSS / HTML" : "A JavaScript plugin to add interactive tags/labels to images. Lightweight, customizable (HTML5/CSS3)"}</p>
        </div>
        <div>
            <p><b><span class="styleTwo">2.</span> ${lang == "ru" ? "Сортировка массивов" : "Array sorting"}</b></p>
            <p>${lang == "ru" ? "Интерактивная визуализация алгоритмов сортировки с помощью JavaScript и HTML Canvas" : "Interactive visualization of sorting algorithms using JavaScript and HTML Canvas"}</p>
        </div>
        <div>
            <p><b><span class="styleTwo">3.</span> ${lang == "ru" ? "Судоку" : "Sudoku"}</b></p>
            <p>${lang == "ru" ? "Реализация игры Судоку на JavaScript с возможностью выбора 6 уровней сложности и проверки решений (JS / CSS / HTML)" : "Implementation of the game Sudoku in JavaScript with the ability to choose 6 levels of complexity and check solutions (JS / CSS / HTML)"}</p>
        </div>
        <p>${lang == "ru" ? "Использование" : "Usage"}: projects go &lt;project-number&gt; </p>
        <p>${lang == "ru" ? "Пример" : "Example"}: projects go 1</p>
        `;
       terminal.appendChild(projects); 
    } 

    function projectsGo() {
        const projects = document.createElement('div');
        projects.classList.add("command-div");
        projects.classList.add("themes");
        projects.innerHTML = `
        ${commandHistory('projects go')}
        <p>${lang == "ru" ? "Использование" : "Usage"}: projects go &lt;project-number&gt; </p>
        <p>${lang == "ru" ? "Пример" : "Example"}: projects go 1</p>
        `;
       terminal.appendChild(projects); 
    }

    function projects1() {
        window.open("https://art.osepyan.ru/arpic/", '_blank');
        displayCommand("projects go 1");
    }

    function projects2() {
        window.open("https://art.osepyan.ru/array-sorting/", '_blank');
        displayCommand("projects go 2");
    }

    function projects3() {
        window.open("https://art.osepyan.ru/sudoku/", '_blank');
        displayCommand("projects go 3");
    }

    function about() {
        const about = document.createElement('div');
        about.classList.add("command-div");
        about.classList.add("about");
        about.innerHTML = `
        ${commandHistory('about')}
        <p>${lang == "ru" ? "Привет! Меня зовут Осепян Артем!" : "Hi! My name is Artyom Osepyan!"}</p>
        <p>${lang == "ru" ? "Я <b>Full-stack разработчик</b>, с большим опытом создания веб-приложений." : "I am a <b>Full-stack developer</b>, with extensive experience building web applications."}</p>
        <p>${lang == "ru" ? "Люблю, когда код чистый, интерфейс — понятный, а backend — как швейцарские часы." : "I love it when the code is clean, the interface is intuitive, and the backend runs like a Swiss watch."}</p>
        `;
       terminal.appendChild(about); 
    }

    function notFound(value) {
        let inValue;
        if (value.length > 24) {
            inValue = value.slice(0, 24) + "...";
        } else {
            inValue = value;
        }
        const notFound = document.createElement('div');
        notFound.classList.add("command-div");
        notFound.innerHTML = `
        ${commandHistory(inValue)}
        <p>${lang == "ru" ? "Команда не найдена" : "Command not found"}: ${inValue}</p>`;
        terminal.appendChild(notFound); 
    }

    function language() {
        const language = document.createElement('div');
        language.classList.add("command-div");
        language.classList.add("command-list");
        language.innerHTML = `
        ${commandHistory('language')}
        <p><span class="styleTwo">En</span> - ${lang == "ru" ? "Английский" : "English"}</p>
        <p><span class="styleTwo">Ru</span> - ${lang == "ru" ? "Русский" : "Russian"}</p>
        <p style="margin: 15px 0 0">${lang == "ru" ? "Использование" : "Usage"}: language set &lt;en|ru&gt; </p>
        <p style="margin: 0">${lang == "ru" ? "Пример" : "Example"}: language set en</p>`;
        terminal.appendChild(language); 
    } 
    
    function languageSet() {
        const language = document.createElement('div');
        language.classList.add("command-div");
        language.classList.add("command-list");
        language.innerHTML = `        
        ${commandHistory('language set')}
        <p style="margin: 0">${lang == "ru" ? "Использование" : "Usage"}: language set &lt;en|ru&gt; </p>
        <p style="margin: 0">${lang == "ru" ? "Пример" : "Example"}: language set en</p>`;
        terminal.appendChild(language); 
    }

    function languageEn() {
        localStorage.setItem("lang", "en");
        clear();
        setLang();
        displayCommand("language set en");
        welcome();
    }

    function languageRu() {
        localStorage.setItem("lang", "ru");
        clear();
        setLang();
        displayCommand("language set ru");
        welcome();
    }

    const commands = [
        ["welcome", welcome],
        ["help", help],
        ["clear", clear],
        ["whoami", whoami],
        ["cowsay", cowsay],
        ["history", history],
        ["language", language],
        ["language set", languageSet],
        ["language set en", languageEn],
        ["language set ru", languageRu],
        ["contacts", contacts],
        ["contacts go", contactsGo],
        ["contacts go 1", contacts1],
        ["contacts go 2", contacts2],
        ["contacts go 3", contacts3],
        ["themes", themes],
        ["themes set", themesSet],
        ["themes set dark", themesDark],
        ["themes set light", themesLight],
        ["themes set blue-matrix", themesBlue],
        ["themes set espresso", themesEspresso],
        ["themes set green-goblin", themesGreen],
        ["themes set ubuntu", themesUbuntu],
        ["projects", projects],
        ["projects go", projectsGo],
        ["projects go 1", projects1],
        ["projects go 2", projects2],
        ["projects go 3", projects3],
        ["about", about]
    ]
    let index = 1;
    inputField.addEventListener('keydown', function(event) {
        output.textContent = ''; 
        if (inputField.value == '') {
            index = 1;
        }
        if (event.key === 'ArrowUp') {
            let position = queryHistory.length - index;
            if (position == 0) {
                inputField.value = queryHistory[position]; 
                setTimeout(() => {
                    inputField.setSelectionRange(inputField.value.length, inputField.value.length);
                }, 0);
            } else if (position > 0) {
                inputField.value = queryHistory[position]; 
                index++;
                setTimeout(() => {
                    inputField.setSelectionRange(inputField.value.length, inputField.value.length);
                }, 0);
            };
        }
        if (event.key === 'ArrowDown') {
            if (index > 1) {
                index--;
                let position = queryHistory.length - index;
                inputField.value = queryHistory[position]; 
            } else {
                inputField.value = '';
            };
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            let value = inputField.value.trimEnd();
            if (value.slice(0, 7) == "cowsay " && value.length > 7) {
                let cowValue;
                if (value.length > 24) {
                    cowValue = value.slice(7, 24) + "...";
                } else {
                    cowValue = value.slice(7);
                }
                cowsayOutput(cowValue);
                queryHistory.push(value);
                clearInput();
                return;
            }
            const currentValue = value;
            const command = commands.find(cmd => cmd[0] === currentValue);
    
            if (command) {
                queryHistory.push(value);
                command[1]();
                clearInput();
            } else {
                queryHistory.push(value);
                notFound(value);
                clearInput();
            }
        }

        if (event.key === 'Tab') {
            event.preventDefault();
            
            const currentValue = inputField.value;
            
            searchMatches(commands, currentValue);
        
            function searchMatches(data, currentValue) {
                if (currentValue === '') { 
                    return;
                }

                if (currentValue == "themes set ") {
                    output.innerHTML = '<span>dark</span>  <span>light</span>  <span>blue-matrix</span>  <span>espresso</span>  <span>green-goblin</span>  <span>ubuntu</span>';
                    return;
                }

                if (currentValue == "contacts go ") {
                    output.innerHTML = '<span>1.Github</span>  <span>2.E-mail</span>  <span>3.Telegram</span>';
                    return;
                }

                if (currentValue == "projects go ") {
                    output.innerHTML = lang == "ru" ? "<span>1.Интерактивные метки</span>   <span>2.Сортировка массивов</span>  <span>3.Судоку</span>" : "<span>1.Interactive labels</span> <span>2.Array sorting</span> <span>3.Sudoku</span>";
                    return;
                }
                if (currentValue == "language set ") {
                    output.innerHTML = "en&nbsp;&nbsp;&nbsp;ru";
                    return;
                }
        
                const matches = data
                    .map(cmd => cmd[0])
                    .filter(name => name.startsWith(currentValue) && name !== currentValue);
            
                if (matches.length === 0) {
                    output.textContent = '';
                    return;
                }
            
                if (matches.length === 1) {
                    inputField.value = matches[0];
                    output.textContent = '';
                    return;
                }
            
                const commonPart = matches.reduce((prefix, name) => {
                    let i = 0;
                    while (i < prefix.length && i < name.length && prefix[i] === name[i]) {
                        i++;
                    }
                    return prefix.slice(0, i);
                }, matches[0]);
            
                if (commonPart && commonPart !== currentValue) {
                    inputField.value = commonPart;
                    output.textContent = '';
                } else {
                    const singleWordMatches = matches.filter(match => !match.includes(' '));
                    if (singleWordMatches.length > 0) {
                        output.textContent = singleWordMatches.join('\t');
                    } else {
                        output.textContent = '';
                    }
                }
            }
        }        
    });
    welcome();
}
startTerminal();