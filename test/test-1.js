
// Оновлення кольорів блоків у реальному часі
document.getElementById('color1').addEventListener('input', function() {
    document.getElementById('block1').style.background = this.value;
});

document.getElementById('color2').addEventListener('input', function() {
    document.getElementById('block2').style.background = this.value;
});

document.getElementById('color3').addEventListener('input', function() {
    document.getElementById('block3').style.background = this.value;
});

function downloadElement() {
    // Отримуємо кольори блоків
    let color1 = document.getElementById('block1').style.background;
    let color2 = document.getElementById('block2').style.background;
    let color3 = document.getElementById('block3').style.background;
    // Створюємо HTML-код для збереження
    
    let content = `
        <!DOCTYPE html>
        <html lang="uk">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Збережений елемент</title>
            <style>
               .container {
                    display: flex;
                    flex-direction: column; 
                    align-items: center; 
                    gap: 1px; 
                    justify-content: center;
                    margin-top: 10px;
                }
                .block {
                    width: 100px;
                    height: 100px;
                    border: 1px solid #000;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="block" style="background: ${color1};"></div>
                <div class="block" style="background: ${color2};"></div>
                <div class="block" style="background: ${color3};"></div>
            </div>
        </body>
        </html>
    `;

    // Створюємо Blob-файл
    let blob = new Blob([content], { type: 'text/html' });
    // Створюємо посилання для завантаження
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'унікальний_елемент.html';
    // Імітуємо клік для завантаження
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    function insertSavedElement() {
        const fileInput = document.getElementById('fileInput');
        const container = document.getElementById('importedElementContainer');
    
        if (!fileInput.files || fileInput.files.length === 0) {
            alert('Будь ласка, виберіть файл.');
            return;
        }
    
        const file = fileInput.files[0];
    
        if (file.type !== "text/html") {
            alert('Файл повинен бути у форматі HTML.');
            return;
        }
    
        const reader = new FileReader();
    
        reader.onload = function(event) {
            const htmlContent = event.target.result;
    
            // Тимчасово створюємо елемент, щоб "витягнути" блоки
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
    
            // Знаходимо елемент з класом .container
            const savedContainer = tempDiv.querySelector('.container-1');
    
            if (savedContainer) {
                container.innerHTML = ''; // очищаємо попередній імпорт
                container.appendChild(savedContainer);
            } else {
                alert('Не знайдено дійсного елемента у файлі.');
            }
        };
    
        reader.readAsText(file);
    }
}
