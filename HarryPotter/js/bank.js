//CONVERTER-------------------------------------------------------------
const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const galleon = document.querySelector('#galleon');

const converter = async (element, targetElement1, targetElement2, current) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json');
            const data = await response.json();

            switch (current) {
                case 'som':
                    targetElement1.value = (element.value / data.usd).toFixed(2);
                    targetElement2.value = (element.value / data.galleon).toFixed(2);
                    break;
                case 'usd':
                    targetElement1.value = (element.value * data.usd).toFixed(2);
                    targetElement2.value = (element.value / data.usdGalleon).toFixed(2);
                    break;
                case 'galleon':
                    targetElement1.value = (element.value * data.galleon).toFixed(2);
                    targetElement2.value = (element.value * data.usdGalleon).toFixed(2);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
};

converter(som, usd, galleon, 'som');
converter(usd, som, galleon, 'usd');
converter(galleon, som, usd, 'galleon');
