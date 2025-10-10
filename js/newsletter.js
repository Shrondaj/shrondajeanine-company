import { supabase } from './supabase-client.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newsletter-form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = form.querySelector('input[type="email"]');
            const submitButton = form.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();

            if (!email) return;

            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';

            try {
                const { data, error } = await supabase
                    .from('newsletter_subscribers')
                    .insert([{ email: email }])
                    .select();

                if (error) {
                    if (error.code === '23505') {
                        form.innerHTML = '<p style="color: var(--gold); text-align: center; font-size: 1.1rem;"><i class="fas fa-check-circle"></i> You\'re already subscribed!</p>';
                    } else {
                        throw error;
                    }
                } else {
                    form.innerHTML = '<p style="color: var(--gold); text-align: center; font-size: 1.1rem;"><i class="fas fa-check-circle"></i> Thank you for subscribing!</p>';
                }
            } catch (error) {
                console.error('Error subscribing:', error);
                submitButton.disabled = false;
                submitButton.textContent = 'Subscribe';

                const errorMsg = document.createElement('p');
                errorMsg.style.color = '#c04847';
                errorMsg.style.textAlign = 'center';
                errorMsg.style.marginTop = '1rem';
                errorMsg.textContent = 'Something went wrong. Please try again later.';
                form.appendChild(errorMsg);

                setTimeout(() => errorMsg.remove(), 3000);
            }
        });
    }
});
