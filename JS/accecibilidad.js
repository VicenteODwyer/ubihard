function applyColorBlindness() {
    const checkedRadio = document.querySelector('input[name="daltonismo"]:checked');
    const chosenVisionType = checkedRadio ? checkedRadio.value : 1;
    const img = document.getElementById('myImg');
    const originalImgUrl = img.src;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imgObj = new Image();
    imgObj.crossOrigin = 'Anonymous';
    imgObj.src = originalImgUrl;

    imgObj.onload = function() {
        canvas.width = imgObj.width;
        canvas.height = imgObj.height;
        ctx.drawImage(imgObj, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            let transformed = [r, g, b];

            switch (chosenVisionType) {
                case '1':
                    transformed = convertProtanopia(r, g, b);
                    break;
                case '2':
                    transformed = convertDeuteranopia(r, g, b);
                    break;
                case '3':
                    transformed = convertTritanopia(r, g, b);
                    break;
                case '4':
                    transformed = convertAchromatopsia(r, g, b);
                    break;
                case '5':
                    transformed = convertAchromatomaly(r, g, b);
                    break;
            }

            data[i] = transformed[0];
            data[i + 1] = transformed[1];
            data[i + 2] = transformed[2];
        }
    
        ctx.putImageData(imageData, 0, 0);
    }   
}
        //img.src = canvas.