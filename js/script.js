const maxMoveDistance = 3;

const calculateMove = (mouseX, mouseY, centerX, centerY) => {
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance === 0) return { x: 0, y: 0 };

    const scaleFactor = Math.min(distance / 200, 1);
    const moveX = (deltaX / distance) * maxMoveDistance * scaleFactor;
    const moveY = (deltaY / distance) * maxMoveDistance * scaleFactor;

    return { x: moveX, y: moveY };
};

document.addEventListener('DOMContentLoaded', () => {
    const profilePicture = document.querySelector("#profile-picture");
    const leftEye = document.querySelector("#left-eye");
    const rightEye = document.querySelector("#right-eye");

    if (!profilePicture) {
        console.error("Profile picture not found!");
        return;
    }

    document.addEventListener('mousemove', e => {
        const rect = profilePicture.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const move = calculateMove(e.clientX, e.clientY, centerX, centerY);

        if (leftEye) {
            leftEye.style.transform = `translate(${move.x}px, ${move.y}px)`;
        }
        if (rightEye) {
            rightEye.style.transform = `translate(${move.x}px, ${move.y}px)`;
        }
    });
});
