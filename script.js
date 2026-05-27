(() => {
  const terminal = document.getElementById('terminal');
  const form = document.getElementById('inputForm');
  const input = document.getElementById('cmdInput');
  const choices = document.getElementById('choiceButtons');
  const acceptBtn = document.getElementById('acceptBtn');
  const declineBtn = document.getElementById('declineBtn');

  let state = 'start';
  const challenges = [
    'Quick challenge: Name a number between 1 and 10.',
    'Quick challenge: Type the word "echo".',
    'Quick challenge: Say your favorite color.'
  ];

  function appendLine(text, cls){
    const el = document.createElement('div');
    el.className = 'line' + (cls ? ' '+cls : '');
    el.textContent = text;
    terminal.appendChild(el);
    terminal.scrollTop = terminal.scrollHeight;
    return el;
  }

  function showWelcome(){
    terminal.innerHTML = '';
    appendLine('Welcome to the terminal chat.');
    appendLine("Please type 'ready' to begin.", 'prompt');
    state = 'start';
    input.value='';
    input.focus();
    choices.classList.add('hidden');
  }

  function presentChallenge(){
    const c = challenges[Math.floor(Math.random()*challenges.length)];
    appendLine('Challenge: ' + c, 'prompt');
    appendLine('Do you Accept or Decline? Use the buttons below.');
    choices.classList.remove('hidden');
    state = 'challenge';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if(!value) return;
    appendLine('> ' + value);
    input.value='';

    if(state === 'start'){
      if(value.toLowerCase() === 'ready'){
        presentChallenge();
      } else {
        appendLine("Type 'ready' when you're ready to begin.", 'prompt');
      }
    }
  });

  acceptBtn.addEventListener('click', ()=>{
    if(state !== 'challenge') return;
    appendLine('You accepted the challenge. Returning to start...');
    choices.classList.add('hidden');
    setTimeout(showWelcome, 1200);
  });

  declineBtn.addEventListener('click', ()=>{
    if(state !== 'challenge') return;
    appendLine('You declined. Maybe next time. Returning to start...');
    choices.classList.add('hidden');
    setTimeout(showWelcome, 1200);
  });

  // initialize
  showWelcome();

})();
