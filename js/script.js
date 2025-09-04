const MAX_MOVE_DISTANCE = 3;
const MODAL_IDS = ['aboutModal', 'contactModal', 'blogModal'];

function calculateEyeMove(mouseX, mouseY, centerX, centerY) {
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance === 0) return {x: 0, y: 0};

    const scaleFactor = Math.min(distance / 200, 1);
    const moveX = (deltaX / distance) * MAX_MOVE_DISTANCE * scaleFactor;
    const moveY = (deltaY / distance) * MAX_MOVE_DISTANCE * scaleFactor;

    return {x: moveX, y: moveY};
}

function initEyeTracking() {
    const profilePicture = document.querySelector("#profile-picture");
    const leftEye = document.querySelector("#left-eye");
    const rightEye = document.querySelector("#right-eye");

    if (!profilePicture) return;

    document.addEventListener('mousemove', (e) => {
        const rect = profilePicture.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const move = calculateEyeMove(e.clientX, e.clientY, centerX, centerY);

        const transform = `translate(${move.x}px, ${move.y}px)`;
        if (leftEye) leftEye.style.transform = transform;
        if (rightEye) rightEye.style.transform = transform;
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const modalContent = modal.querySelector('.modal-content');
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    setTimeout(() => {
        if (modalContent) modalContent.style.transform = 'scale(1)';
    }, 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) modalContent.style.transform = 'scale(0.95)';

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
}

function initModalListeners() {
    window.onclick = (event) => {
        MODAL_IDS.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) closeModal(modalId);
        });
    };

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            MODAL_IDS.forEach(modalId => {
                const modal = document.getElementById(modalId);
                if (modal && !modal.classList.contains('hidden')) {
                    closeModal(modalId);
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initEyeTracking();
    initModalListeners();
});
