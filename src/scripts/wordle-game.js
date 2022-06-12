import 'flowbite';
import WORDS from '../assets/words.json';
import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const spinner = document.getElementById('spinner');
  const targetEl = document.getElementById('toast-default');
  const messageEl = document.getElementById('toast-message');
  const triggerEl = document.getElementById('toast-button');
  const btnRestart = document.getElementById('btn-restart');
  const buttonsKeyboardEl = document.querySelectorAll('.keyboard__button');

  const MAX_TRIES = 6;
  const WORD_LENGTH = 5;

  let guessedWords = [[]];
  let availableSpace = 0;
  let guessedWordCount = 0;
  let secretWord;
  let ending = false;

  function createSquares() {
    const gameboard = document.createElement('div');
    gameboard.setAttribute('id', 'gameboard');
    gameboard.classList.add('gameboard');

    const size = MAX_TRIES * WORD_LENGTH;

    for (let index = 0; index < size; index++) {
      let square = document.createElement('div');
      square.setAttribute('id', index);
      square.classList.add('gameboard__square');
      gameboard.appendChild(square);
    }

    root.appendChild(gameboard);
  }

  function createListeners() {
    document.addEventListener('keyup', (ev) => pushLetter(ev.key));

    buttonsKeyboardEl.forEach((btn) => {
      btn.addEventListener('click', ({ target }) => pushLetter(target.getAttribute('data-key')));
    });
  }

  function pushLetter(letter) {
    if (ending) return;

    const key = letter.toLowerCase();
    const isLetter = /^[a-zñ]{0,1}$/.test(letter);
    const isEnter = key === 'enter';
    const isBackSpace = key === 'backspace';
    const isEmpty = getCurrentWordArr().length === 0;

    isEnter && checkWord();
    isBackSpace && !isEmpty && removeLetter();

    const isValidWord = isLetter && isIncompleteWord();
    isValidWord && addLetter(key);
  }

  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  function getCurrentFirstId() {
    return guessedWordCount * WORD_LENGTH;
  }

  function addLetter(letter) {
    const currentWordArr = getCurrentWordArr();
    currentWordArr.push(letter);

    const availableSpaceEl = document.getElementById(String(availableSpace));

    availableSpace = availableSpace + 1;
    availableSpaceEl.textContent = letter;
    availableSpaceEl.classList.add('pop', 'used');
  }

  function removeLetter() {
    const currentWordArr = getCurrentWordArr();
    currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(String(availableSpace - 1));

    availableSpace = availableSpace - 1;
    lastLetterEl.textContent = '';
    lastLetterEl.classList.remove('pop', 'used');
  }

  function isIncompleteWord() {
    const currentWord = getCurrentWordArr();
    return currentWord.length < WORD_LENGTH;
  }

  function checkWord() {
    if (isIncompleteWord()) {
      toast('La palabra debe tener 5 letras 💥');
      return;
    }

    const currentWord = getCurrentWordArr();
    const word = currentWord.join('');
    const existentWord = WORDS.includes(word);
    if (!existentWord) {
      toast('No existe esta palabra en el diccionario');
      return;
    }

    const solved = resolve();
    if (!solved) {
      toast('Has fallado... Sigue intentándolo! 👊');
      nextWord();
      return;
    }

    win();
  }

  function resolve() {
    const currentWord = getCurrentWordArr();
    let secretWordCopy = secretWord;
    let delay = 0;

    currentWord.forEach((letter, index) => {
      const isExactLetter = letter === secretWord[index];
      const isExistLetter = secretWordCopy.includes(letter);

      if (isExactLetter) {
        setColorLetter(letter, index, delay, 'exact');
      } else if (isExistLetter) {
        setColorLetter(letter, index, delay, 'exist');
        secretWordCopy = secretWordCopy.replaceAll(letter, '');
      } else {
        setColorLetter(letter, index, delay, 'not-exist');
      }
      delay += 0.2;
    });

    guessedWordCount++;

    const isSolved = currentWord.join('') === secretWord;
    return isSolved;
  }

  function setColorLetter(letter, index, delay, classname) {
    const letterId = getCurrentFirstId() + index;
    const letterEl = document.getElementById(letterId);

    letterEl.style.animationDelay = `${delay}s`;
    letterEl.classList.add('grow', classname);

    const buttonEl = document.querySelector(`[data-key="${letter}"]`);
    const isButtonExact = buttonEl.classList.contains('exact');

    !isButtonExact && buttonEl.classList.add(classname);
  }

  function nextWord() {
    const nextFirstLetterEl = document.getElementById(getCurrentFirstId());

    if (nextFirstLetterEl) {
      guessedWords.push([]);
      return;
    }

    lose();
  }

  function toast(message) {
    targetEl.classList.add('transition-opacity', 'duration-300', 'ease-in-out');
    targetEl.classList.remove('opacity-0', 'invisible');
    messageEl.innerHTML = message;
    const options = {
      triggerEl,
      timing: 'ease-in-out',

      onHide: function (_, el) {
        setTimeout(() => {
          el.classList.add('invisible');
          el.classList.remove('hidden');
        }, 500);
      },
    };
    new Dismiss(targetEl, options);
  }

  function win() {
    toast('Enhorabuena! Has ganado! 🔥');
    confetti();
    setAnimationPlayAgain();
    ending = true;
  }

  function lose() {
    toast(`Has perdido...😞. La palabra era <strong> "${setRAELink()}" </strong>.`);
    setAnimationPlayAgain();
    ending = true;
  }

  function setRAELink() {
    const link = document.createElement('a');
    link.setAttribute('href', `https://dle.rae.es/${secretWord}`);
    link.setAttribute('title', `Ver significado de ${secretWord}`);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.classList.add('link');
    link.textContent = secretWord;
    return link.outerHTML;
  }

  function generateNewWord() {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    secretWord = WORDS[randomIndex];
  }

  function toggleSpinner() {
    spinner.classList.toggle('hidden');
  }

  function setAnimationPlayAgain() {
    btnRestart.classList.add('again');
  }

  function setThemeModeOn() {
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn.addEventListener('click', () => {
      themeToggleDarkIcon.classList.toggle('hidden');
      themeToggleLightIcon.classList.toggle('hidden');

      const htmlElement = document.documentElement;
      htmlElement.classList.contains('dark') ? htmlElement.classList.remove('dark') : htmlElement.classList.add('dark');
    });
  }

  function startWithDelay(delay) {
    setTimeout(start, delay);
  }

  function start() {
    setThemeModeOn();
    generateNewWord();
    createSquares();
    createListeners();
    toggleSpinner();
  }

  startWithDelay(1000);
});
