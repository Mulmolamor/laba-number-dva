const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
const leftPanel = document.getElementById('left-panel');
const rightPanel = document.getElementById('right-panel');

let isProcessing = false;

terminalInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !isProcessing) {
        
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
                printLine('  whoami    - print user profile info');
                printLine('  skills    - list technical skills');
                printLine('  contacts  - display social media links');
                printLine('  clear     - clear terminal and panels');
                break;
                
            case 'whoami':
                runWithLoading('Fetching profile data', () => {
                    initRightPanel();
                    rightPanel.classList.add('show');
                    rightPanel.classList.add('blur-bg');
                    
                    const newBlock = document.createElement('div');
                    newBlock.className = 'info-block';
                    newBlock.innerHTML = `
                        <h3>PROFILE_DATA</h3>
                        <p><strong>NAME:</strong> Nikolay Syrovatskii</p>
                        <p><strong>STATUS:</strong> Student (SP)</p>
                        <p><strong>Email:</strong> syrovatskiinp@gmail.com</p>
                    `;
                    document.getElementById('right-content').appendChild(newBlock);
                    printLine('Profile data loaded successfully.', 'success');
                });
                break;
                
            case 'skills':
                runWithLoading('Analyzing skills', () => {
                    initRightPanel();
                    rightPanel.classList.add('show');
                    rightPanel.classList.add('blur-bg');
                    
                    const newBlock = document.createElement('div');
                    newBlock.className = 'info-block';
                    newBlock.innerHTML = `
                        <h3>SKILLS_DATA</h3>
                        <p><strong>STACK:</strong></p>
                        <p> > HTML5 / CSS3</p>
                        <p> > C++</p>
                        <p> > Python</p>
                        <p> > Rust</p>
                    `;  
                    document.getElementById('right-content').appendChild(newBlock);
                    printLine('Skills data retrieved.', 'success');
                });
                break;
                
            case 'contacts':
                runWithLoading('Searching for contacts', () => {
                    initLeftPanel();
                    leftPanel.classList.add('show');
                    
                    const leftContent = document.getElementById('left-content');
                    if (leftContent.children.length === 0) {
                        leftContent.innerHTML = `
                            <a href="https://t.me/Mulmolamor" target="_blank" class="btn">
                                <i class="fa-brands fa-telegram"></i> TELEGRAM
                            </a>
                            <a href="https://vk.com/mulmolamor" target="_blank" class="btn">
                                <i class="fa-brands fa-vk"></i> VK
                            </a>
                            <a href="https://github.com/Mulmolamor" target="_blank" class="btn">
                                <i class="fa-brands fa-github"></i> GITHUB
                            </a>
                        `;
                    }
                    printLine('Links displayed on the left panel.', 'success');
                });
                break;

            case 'clear':
                terminalOutput.innerHTML = ''; 
                leftPanel.classList.remove('show');
                rightPanel.classList.remove('show');
                rightPanel.classList.remove('blur-bg');
                leftPanel.innerHTML = '';
                rightPanel.innerHTML = '';
                break;
                
            default:
                printLine(`Command not found: ${command}. Type 'help' for a list of commands.`, 'error');
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

function initLeftPanel() {
    if (!document.getElementById('left-content')) {
        leftPanel.innerHTML = `
            <h2 class="panel-title">NET_LINKS</h2>
            <div id="left-content"></div>
        `;
    }
}

function initRightPanel() {
    if (!document.getElementById('right-content')) {
        rightPanel.innerHTML = `
            <h2 class="panel-title">DATA_OUTPUT</h2>
            <div id="right-content"></div>
        `;
    }
}

function runWithLoading(message, callback) {
    isProcessing = true;
    let dots = 0;
    const line = document.createElement('div');
    line.className = 'terminal-line loading';
    terminalOutput.appendChild(line);

    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        line.textContent = `${message}${'.'.repeat(dots)}`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }, 300);

    setTimeout(() => {
        clearInterval(interval);
        line.textContent = `${message}... DONE.`;
        line.classList.remove('loading');
        line.classList.add('success');
        isProcessing = false;
        callback();
        terminalInput.focus();
    }, 1500);
}
