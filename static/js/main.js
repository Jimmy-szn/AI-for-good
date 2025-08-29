// static/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('farmForm');
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    const generateBtn = document.getElementById('generateBtn');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        loading.classList.remove('hidden');
        results.classList.add('hidden');
        generateBtn.disabled = true;
        generateBtn.textContent = '🔄 Generating Plan...';
        
        // Collect form data
        const formData = {
            location: document.getElementById('location').value,
            size: document.getElementById('size').value,
            crops: document.getElementById('crops').value,
            soil_type: document.getElementById('soil_type').value,
            experience: document.getElementById('experience').value,
            goals: document.getElementById('goals').value
        };
        
        try {
            const response = await fetch('/generate-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Display weather info
                const weather = result.weather;
                document.getElementById('weatherDetails').innerHTML = `
                    <div class="flex flex-wrap gap-4">
                        <span>🌡️ ${weather.temperature}°C</span>
                        <span>💧 ${weather.humidity}% humidity</span>
                        <span>☁️ ${weather.description}</span>
                    </div>
                `;
                
                // Display the generated plan
                document.getElementById('planContent').innerHTML = formatPlan(result.plan);
                
                // Show results
                loading.classList.add('hidden');
                results.classList.remove('hidden');
                
                // Scroll to results
                results.scrollIntoView({ behavior: 'smooth' });
                
            } else {
                throw new Error(result.error);
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('Sorry, there was an error generating your plan. Please try again.');
            loading.classList.add('hidden');
        }
        
        // Reset button
        generateBtn.disabled = false;
        generateBtn.textContent = '🧠 Generate My Regenerative Plan';
    });
});

function formatPlan(planText) {
    // Convert markdown-style headers to HTML
    let formatted = planText
        .replace(/## (.*$)/gm, '<h2 class="text-xl font-bold text-green-700 mt-6 mb-3">$1</h2>')
        .replace(/### (.*$)/gm, '<h3 class="text-lg font-semibold text-green-600 mt-4 mb-2">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/• (.*$)/gm, '<li class="ml-4">$1</li>')
        .replace(/\n\n/g, '</p><p class="mb-3">')
        .replace(/\n/g, '<br>');
    
    return `<div class="formatted-plan">${formatted}</div>`;
}

function generateNewPlan() {
    document.getElementById('results').classList.add('hidden');
    document.querySelector('form').scrollIntoView({ behavior: 'smooth' });
}