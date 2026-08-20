// Lógica para alternar Abas de Soluções
function openTab(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    contents.forEach(content => content.classList.remove('active'));
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Lógica para o Quiz de Hábitos Digitais
function calcularResultado() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const resultDiv = document.getElementById('quiz-result');

    if (!q1 || !q2) {
        resultDiv.style.color = '#f87171';
        resultDiv.innerText = 'Por favor, responda a todas as perguntas.';
        return;
    }

    const pontuacao = parseInt(q1.value) + parseInt(q2.value);

    resultDiv.style.color = '#38bdf8';
   
    if (pontuacao <= 1) {
        resultDiv.innerText = 'Resultado: Alto risco de hiperconexão. Considere adotar regras estritas de desintoxicação digital.';
    } else if (pontuacao <= 3) {
        resultDiv.innerText = 'Resultado: Uso moderado. Você tem alguma conscientização, mas ainda pode melhorar certos limites.';
    } else {
        resultDiv.innerText = 'Resultado: Excelente equilíbrio! Você demonstra boa autonomia e controle no uso das redes.';
    }
}