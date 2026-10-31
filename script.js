const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

terminalInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        
        const click = new Audio('click.mp3');
        click.volume = 0.05;
        click.play();

        const command = terminalInput.value.trim().toLowerCase();
        terminalInput.value = ''; 

        if (command === '') return;
        
        printLine(`root@system:~$ ${command}`, 'user-cmd');

        // обработка команд
        switch (command) {
            case 'help':
                printLine('Available commands:');
                printLine('  whoami - print user profile info');
                printLine('  clear  - clear terminal screen');
                break;
            case 'whoami':
                printLine('NAME: Nikolay Syrovatskii');
                printLine('ROLE: Student');
                break;
            case 'clear':
                terminalOutput.innerHTML = ''; 
                break;
            default:
                printLine(`Command not found: ${command}`, 'error');
        }
    }
});

// вывод текста в терминал
function printLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.textContent = text;
    terminalOutput.appendChild(line);
    // Автоскролл вниз
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}