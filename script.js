function toggleSolution(id) {
    const solutionDiv = document.getElementById(id);
    
    if (solutionDiv.classList.contains('hidden')) {
        solutionDiv.classList.remove('hidden');
    } else {
        solutionDiv.classList.add('hidden');
    }
}