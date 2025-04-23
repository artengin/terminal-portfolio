function startTerminal() {
    const terminal = document.querySelector('#terminal-wrap');
    const inputField = document.querySelector('#terminal-input');
    const output = document.querySelector('#terminal-output');

    window.addEventListener('load', () => {
        inputField.focus();
    });

    document.addEventListener('click', (event) => {
      if (event.target !== inputField) {
        inputField.focus();
      }
    });

    function clearInput() {
        inputField.value = "";
        inputField.focus();
        window.scrollTo(0, document.body.scrollHeight);
    }
    
    function welcome() {
        const welcome = document.createElement('div');
        fetch('welcome.html')
        .then(response => response.text())
        .then(html => {
            welcome.innerHTML = html;
        })
        .catch(error => {
            console.error('Ошибка загрузки welcome.html:', error);
        });
        terminal.appendChild(welcome); 
    }

    function help() {
        console.log("help");
    }

    function clear() {
        console.log("clear");
    }

    function pwd() {
        console.log("pwd");
    }

    function whoami() {
        console.log("whoami");
    }

    function history() {
        console.log("history");
    }

    function socials() {
        console.log("socials");
    }

    function cowsay() {
        console.log("cowsay");
    }

    function themes() {
        console.log("themes");
    }

    function projects() {
        console.log("projects");
    }

    function about() {
        console.log("about");
    }

    const commands = [
        ["welcome", welcome],
        ["help", help],
        ["clear", clear],
        ["whoami", whoami],
        ["history", history],
        ["socials", socials],
        ["socials go 1", projects],
        ["socials go 2", projects],
        ["cowsay", cowsay],
        ["themes", themes],
        ["themes set ubuntu", themes],
        ["themes set dark", themes],
        ["projects", projects],
        ["projects go 1", projects],
        ["projects go 2", projects],
        ["about", about]
    ]
    inputField.addEventListener('keydown', function(event) {
        output.textContent = ''; 
        if (event.key === 'Enter') {
            event.preventDefault();
            const currentValue = inputField.value;
            const command = commands.find(cmd => cmd[0] === currentValue);
    
            if (command) {
                command[1]();
                clearInput();
            } else {
                console.log('not found');
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

            // Получаем все команды, которые начинаются с текущего ввода
            const matches = data
                .map(cmd => cmd[0])
                .filter(name => name.startsWith(currentValue) && name !== currentValue);
        
            if (matches.length === 0) {
                output.textContent = '';
                return;
            }
        
            // Если существует ровно одно совпадение, подставляем его полностью
            if (matches.length === 1) {
                inputField.value = matches[0]; // автоматически дополняем
                output.textContent = '';
                return;
            }
        
            // Проверяем, все ли совпадения имеют общую часть
            const commonPart = matches.reduce((prefix, name) => {
                let i = 0;
                while (i < prefix.length && i < name.length && prefix[i] === name[i]) {
                    i++;
                }
                return prefix.slice(0, i);
            }, matches[0]);
        
            // Если общая часть существует и она отличается от текущего ввода, подставляем общую часть
            if (commonPart && commonPart !== currentValue) {
                inputField.value = commonPart;
                output.textContent = ''; // очищаем вывод
            } else {
                // Если общая часть совпадает с текущим значением, выводим все совпадения
                output.textContent = matches.join('\t');
            }
            }
        }
    });
    welcome();
}
startTerminal();