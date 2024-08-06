// Variáveis globais
let isLinkClick = false;
const idiomaBtn = document.getElementById('idioma-btn');
const idiomaImg = document.getElementById('idioma-img');
let currentLanguage = 'pt-br'; // Idioma padrão

// Função para atualizar a visibilidade dos elementos com base no idioma
function updateLanguageVisibility(newLanguage) {
    console.log(`Atualizando visibilidade para o idioma: ${newLanguage}`);
    document.querySelectorAll('[data-lang]').forEach(el => {
        if (el.dataset.lang === newLanguage) {
            el.classList.remove('hidden');
            console.log(`Mostrando elemento: ${el}`);
        } else {
            el.classList.add('hidden');
            console.log(`Ocultando elemento: ${el}`);
        }
    });
}

// Função para alternar o idioma
function switchLanguage() {
    const newLanguage = currentLanguage === 'pt-br' ? 'en' : 'pt-br';
    idiomaImg.src = newLanguage === 'pt-br' ? './src/imagens/brasil.png' : './src/imagens/usa.png';
    idiomaImg.alt = newLanguage === 'pt-br' ? 'Português' : 'English';

    idiomaBtn.classList.toggle('clicked');
    currentLanguage = newLanguage;

    updateLanguageVisibility(newLanguage);
    // Atualiza a visibilidade após trocar o idioma
    handleScroll();
}

// Função para gerenciar o estado de clique dos links do menu
function setupMenuLinks() {
    document.querySelectorAll('.menu a').forEach(anchor => {
        anchor.addEventListener('click', (event) => {
            // Previne o comportamento padrão para aplicar o efeito de rolagem suave
            event.preventDefault();

            // Obtém o ID da seção de destino a partir do atributo href do link
            const targetId = anchor.getAttribute('href').replace('#', '');
            const targetSection = document.getElementById(targetId);

            // Rolagem suave para o elemento
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Define um pequeno atraso para que a visibilidade seja atualizada após a rolagem
                isLinkClick = true;
                setTimeout(() => isLinkClick = false, 500);
            }
        });
    });
}

// Função para gerenciar a visibilidade ao rolar a página
function handleScroll() {
    if (isLinkClick) return;

    const sections = document.querySelectorAll('.sobre-mim, .techs, .projetos');

    sections.forEach(section => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const windowHeight = window.innerHeight;
        const elementTop = section.getBoundingClientRect().top + scrollTop;
        const elementBottom = elementTop + section.offsetHeight;

        // Verifica se a seção está visível na janela de visualização
        if (scrollTop + windowHeight > elementTop && scrollTop < elementBottom) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
}

// Função para rolar para o topo ao carregar a página
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Função para inicializar os eventos após o carregamento do DOM
function initialize() {
    setupMenuLinks();

    document.addEventListener('DOMContentLoaded', () => {
        // Garante que a página role para o topo ao carregar
        scrollToTop();

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Atualiza a visibilidade ao carregar a página

        idiomaBtn.addEventListener('click', switchLanguage);
    });

    // Adiciona um listener para atualizar a visibilidade ao trocar de idioma
    window.addEventListener('popstate', () => {
        handleScroll();
    });
}

// Inicializa a configuração
initialize();
