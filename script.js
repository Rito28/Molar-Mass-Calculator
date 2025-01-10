const translations = {
    ar: {
        title: "حاسبة الكتلة المولارية",
        labelCompound: "أدخل الصيغة الكيميائية:",
        placeholder: "مثل H2O أو CO2",
        calculateButton: "احسب",
        result: "الكتلة المولارية لـ {compound} هي: {mass} جم/مول",
        error: "العنصر {element} غير موجود.",
        elementInfoTitle: "معلومات عن العناصر:",
        elementInfoItem: "{element}: الكتلة الذرية = {mass} جم/مول"
    },
    en: {
        title: "Molar Mass Calculator",
        labelCompound: "Enter the chemical formula:",
        placeholder: "e.g., H2O or CO2",
        calculateButton: "Calculate",
        result: "The molar mass of {compound} is: {mass} g/mol",
        error: "The element {element} is not found.",
        elementInfoTitle: "Element Information:",
        elementInfoItem: "{element}: Atomic mass = {mass} g/mol"
    },
    fr: {
        title: "Calculateur de Masse Molaire",
        labelCompound: "Entrez la formule chimique:",
        placeholder: "ex. H2O ou CO2",
        calculateButton: "Calculer",
        result: "La masse molaire de {compound} est : {mass} g/mol",
        error: "L'élément {element} n'est pas trouvé.",
        elementInfoTitle: "Informations sur les éléments:",
        elementInfoItem: "{element} : Masse atomique = {mass} g/mol"
    }
};

let currentLanguage = 'ar';

function changeLanguage() {
    const language = document.getElementById('language-select').value;
    currentLanguage = language;

    // تغيير النصوص حسب اللغة المختارة
    document.getElementById('title').innerText = translations[language].title;
    document.getElementById('label-compound').innerText = translations[language].labelCompound;
    document.getElementById('compound').placeholder = translations[language].placeholder;
    document.getElementById('calculate-button').innerText = translations[language].calculateButton;
    document.getElementById('result').innerText = '';
    document.querySelector("#element-info h2").innerText = translations[language].elementInfoTitle;

    // تغيير اتجاه الصفحة (rtl أو ltr) بناءً على اللغة
    document.getElementById('html').setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
}

const atomicMasses = {
    H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81,
    C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.18,
    Na: 22.99, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974,
    S: 32.06, Cl: 35.45, K: 39.098, Ar: 39.948, Ca: 40.078,
    Fe: 55.845, Zn: 65.38
};

function calculateMolarMass() {
    const compound = document.getElementById('compound').value;
    const regex = /([A-Z][a-z]*)(\d*)/g;
    let match;
    let molarMass = 0;
    const elementsUsed = {};

    while ((match = regex.exec(compound)) !== null) {
        const element = match[1];
        const count = parseInt(match[2]) || 1;

        if (atomicMasses[element] !== undefined) {
            molarMass += atomicMasses[element] * count;
            elementsUsed[element] = atomicMasses[element];
        } else {
            document.getElementById('result').innerText = translations[currentLanguage].error.replace('{element}', element);
            return;
        }
    }

    document.getElementById('result').innerText = translations[currentLanguage].result
        .replace('{compound}', compound)
        .replace('{mass}', molarMass.toFixed(2));

    updateElementInfo(elementsUsed);
}

function updateElementInfo(elements) {
    const elementList = document.getElementById('element-list');
    elementList.innerHTML = '';

    for (const [element, mass] of Object.entries(elements)) {
        const li = document.createElement('li');
        li.textContent = translations[currentLanguage].elementInfoItem
            .replace('{element}', element)
            .replace('{mass}', mass);
        elementList.appendChild(li);
    }
}