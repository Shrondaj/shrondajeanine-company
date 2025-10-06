import { supabase } from './supabase-client.js';

async function loadFAQs() {
    const loading = document.getElementById('faq-loading');
    const faqContainer = document.getElementById('faq-container');

    try {
        const { data: faqs, error } = await supabase
            .from('faqs')
            .select('*')
            .eq('active', true)
            .order('order_position', { ascending: true });

        if (error) throw error;

        loading.style.display = 'none';

        if (!faqs || faqs.length === 0) {
            faqContainer.innerHTML = '<p style="text-align: center; color: var(--text-light);">No FAQs available at this time.</p>';
            return;
        }

        faqContainer.innerHTML = faqs.map(faq => `
            <div class="faq-item">
                <div class="faq-question">${faq.question}</div>
                <div class="faq-answer">${faq.answer}</div>
            </div>
        `).join('');

        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');

                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });

                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });

    } catch (error) {
        console.error('Error loading FAQs:', error);
        loading.innerHTML = `
            <p style="color: var(--text-light);">
                <i class="fas fa-exclamation-circle"></i>
                Unable to load FAQs. Please try again later.
            </p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', loadFAQs);
