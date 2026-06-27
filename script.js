// Zaman dilimi verileri
const timezones = {
    'istanbul': { offset: 3, canvas: 'canvas-istanbul', digital: 'clock-istanbul', name: 'Istanbul' },
    'london': { offset: 0, canvas: 'canvas-london', digital: 'clock-london', name: 'London' },
    'newyork': { offset: -5, canvas: 'canvas-newyork', digital: 'clock-newyork', name: 'New York' },
    'tokyo': { offset: 9, canvas: 'canvas-tokyo', digital: 'clock-tokyo', name: 'Tokyo' },
    'sydney': { offset: 11, canvas: 'canvas-sydney', digital: 'clock-sydney', name: 'Sydney' },
    'dubai': { offset: 4, canvas: 'canvas-dubai', digital: 'clock-dubai', name: 'Dubai' },
    'saopaulo': { offset: -3, canvas: 'canvas-saopaulo', digital: 'clock-saopaulo', name: 'São Paulo' },
    'hongkong': { offset: 8, canvas: 'canvas-hongkong', digital: 'clock-hongkong', name: 'Hong Kong' }
};

// Saati güncelle
function updateTime() {
    const now = new Date();
    
    for (const [key, tz] of Object.entries(timezones)) {
        // Dijital saat
        const localTime = new Date(now.getTime() + (tz.offset - now.getTimezoneOffset() / 60) * 60 * 60 * 1000);
        const hours = String(localTime.getHours()).padStart(2, '0');
        const minutes = String(localTime.getMinutes()).padStart(2, '0');
        const seconds = String(localTime.getSeconds()).padStart(2, '0');
        
        document.getElementById(tz.digital).textContent = `${hours}:${minutes}:${seconds}`;
        
        // Analog saat
        const canvas = document.getElementById(tz.canvas);
        if (canvas) {
            drawAnalogClock(canvas, localTime);
        }
    }
}

// Analog saat çiz
function drawAnalogClock(canvas, time) {
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;
    const centerX = radius;
    const centerY = radius;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Arkaplan
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Saat işaretleri
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30) * Math.PI / 180;
        const x1 = centerX + Math.sin(angle) * (radius - 15);
        const y1 = centerY - Math.cos(angle) * (radius - 15);
        const x2 = centerX + Math.sin(angle) * (radius - 8);
        const y2 = centerY - Math.cos(angle) * (radius - 8);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    
    // Saat ibresi
    const hourAngle = (hours * 30 + minutes * 0.5) * Math.PI / 180;
    drawHand(ctx, hourAngle, radius * 0.5, 5, '#333', centerX, centerY);
    
    // Dakika ibresi
    const minuteAngle = (minutes * 6 + seconds * 0.1) * Math.PI / 180;
    drawHand(ctx, minuteAngle, radius * 0.7, 4, '#666', centerX, centerY);
    
    // Saniye ibresi
    const secondAngle = seconds * 6 * Math.PI / 180;
    drawHand(ctx, secondAngle, radius * 0.7, 2, '#ff6b6b', centerX, centerY);
    
    // Merkez nokta
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fill();
}

// İbre çiz
function drawHand(ctx, angle, length, width, color, centerX, centerY) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
        centerX + Math.sin(angle) * length,
        centerY - Math.cos(angle) * length
    );
    ctx.stroke();
}

// Her saniye güncelle
setInterval(updateTime, 1000);

// İlk güncelleme
updateTime();
