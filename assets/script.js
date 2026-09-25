const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const cardToggles = document.querySelectorAll('.card-toggle');

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mainNav.classList.toggle('open', !isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('open');
    });
});

function closeCard(cardToggle) {
    const card = cardToggle.closest('.card');
    const details = document.getElementById(cardToggle.getAttribute('aria-controls'));
    const indicator = cardToggle.querySelector('.indicator');

    card.classList.remove('active');
    cardToggle.setAttribute('aria-expanded', 'false');
    details.hidden = true;
    indicator.textContent = '+';
}

function openCard(cardToggle) {
    const card = cardToggle.closest('.card');
    const details = document.getElementById(cardToggle.getAttribute('aria-controls'));
    const indicator = cardToggle.querySelector('.indicator');

    card.classList.add('active');
    cardToggle.setAttribute('aria-expanded', 'true');
    details.hidden = false;
    indicator.textContent = '−';
}

cardToggles.forEach((cardToggle) => {
    cardToggle.addEventListener('click', () => {
        const isOpen = cardToggle.getAttribute('aria-expanded') === 'true';

        cardToggles.forEach((otherToggle) => {
            if (otherToggle !== cardToggle) {
                closeCard(otherToggle);
            }
        });

        if (isOpen) {
            closeCard(cardToggle);
        } else {
            openCard(cardToggle);
        }
    });
});

const quizOptions = document.querySelectorAll('.quiz-option');
const quizReset = document.querySelector('#quiz-reset');

const feedbacks = [
    '✅ Muito bem! Confira informações em sites confiáveis antes de acreditar ou compartilhar.',
    '✅ Muito bem! Lojas oficiais ajudam a reduzir os riscos ao instalar aplicativos.',
    '✅ Muito bem! Mensagens que pedem senhas ou prometem prêmios podem ser golpes. Na dúvida, não clique e peça ajuda.'
];

quizOptions.forEach((option) => {
    option.addEventListener('click', () => {
        const questionNumber = option.dataset.question;
        const feedback = document.querySelector(`#feedback-${questionNumber}`);
        const options = document.querySelectorAll(
            `.quiz-option[data-question="${questionNumber}"]`
        );
        const isCorrect = option.dataset.answer === 'correct';

        options.forEach((item) => {
            item.disabled = true;

            if (item.dataset.answer === 'correct') {
                item.classList.add('correct');
            }
        });

        if (isCorrect) {
            feedback.textContent = feedbacks[questionNumber];
            feedback.className = 'quiz-feedback correct';
        } else {
            const incorrectFeedbacks = [
                '⚠️ Cuidado! Nem toda informação encontrada na internet é confiável. Antes de compartilhar algo, procure confirmar a informação em sites confiáveis.',
                '⚠️ Cuidado! Baixar aplicativos de links desconhecidos pode trazer riscos. Prefira sempre lojas oficiais, como a Google Play Store ou a App Store.',
                '⚠️ Cuidado! Nunca informe sua senha para receber prêmios ou vantagens. Mensagens desse tipo podem ser tentativas de golpe.'
            ];

            option.classList.add('incorrect');
            feedback.textContent = incorrectFeedbacks[questionNumber];
            feedback.className = 'quiz-feedback incorrect';
        }
    });
});

quizReset.addEventListener('click', () => {
    quizOptions.forEach((option) => {
        option.disabled = false;
        option.classList.remove('correct', 'incorrect');
    });

    document.querySelectorAll('.quiz-feedback').forEach((feedback) => {
        feedback.textContent = '';
        feedback.className = 'quiz-feedback';
    });
});