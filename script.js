document.addEventListener('DOMContentLoaded', () => {
    // Donation Progress Configuration
    const targetAmount = 3800000;
    const collectedAmount = 1425000; // Simulated collected amount

    // Calculate percentage
    const percentage = Math.min((collectedAmount / targetAmount) * 100, 100);

    // Animate Progress Bar Elements After a slight delay for visual effect
    setTimeout(() => {
        const progressBar = document.getElementById('progress-bar');
        const percentageText = document.getElementById('percentage-text');

        // Setup Progress Width
        progressBar.style.width = `${percentage}%`;

        // Counter Animation for Percentage
        let currentPercent = 0;
        const duration = 1500; // 1.5s
        const steps = 60;
        const stepTime = duration / steps;
        const increment = percentage / steps;

        const timer = setInterval(() => {
            currentPercent += increment;
            if (currentPercent >= percentage) {
                percentageText.innerText = percentage.toFixed(1);
                clearInterval(timer);
            } else {
                percentageText.innerText = currentPercent.toFixed(1);
            }
        }, stepTime);

    }, 300); // 300ms delay after load

    // Web Share API implementation for the Share button
    const shareButton = document.getElementById('shareAction');

    shareButton.addEventListener('click', async () => {
        const shareData = {
            title: 'Donasi Kamera MS - Wakafkan Suara Dakwah',
            text: 'Bantu kami menghadirkan alat Mic Wireless Saramonic Ultra untuk live streaming kajian Islam agar ilmu tersebar luas. Raih pahala jariyah bersama kami!',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                console.log('Campaign shared successfully');
            } else {
                // Fallback for browsers that do not support Web Share API
                await navigator.clipboard.writeText(shareData.url);

                // Show a brief toast or change button text
                const originalText = shareButton.querySelector('span').innerText;
                shareButton.querySelector('span').innerText = 'Tersalin!';

                setTimeout(() => {
                    shareButton.querySelector('span').innerText = originalText;
                }, 2000);
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    });
});
