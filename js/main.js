let colorPicker = document.getElementById("colorSpace");

let HEX = colorPicker.value.substring(1);
let RGB_v;
let XYZ_v;
let CMYK_v;

// RGB, XYZ, CMYK, rounding

let sliders = document.getElementsByClassName("sliders");
let wrongDecimal = false;

slider_r.addEventListener('input', () => {
    RGB.value = slider_r.value + RGB.value.substring(RGB.value.indexOf(","));
    RGB_Changed();
});
slider_g.addEventListener('input', () => {
    RGB.value = RGB.value.substring(0, RGB.value.indexOf(",") + 2) + slider_g.value + RGB.value.substring(RGB.value.lastIndexOf(","));
    RGB_Changed();
});
slider_b.addEventListener('input', () => {
    RGB.value = RGB.value.substring(0, RGB.value.lastIndexOf(",") + 2) + slider_b.value;
    RGB_Changed();
});


// изменения округления
rounding.addEventListener('keyup', () => {
    RGB_Changed();
});
rounding.addEventListener('input', () => {
    RGB_Changed();
});

// изменение поля RGB
RGB.addEventListener('keyup', function(event) {
    RGB_Changed();
}); 

XYZ.addEventListener('keyup', function(event) {
    XYZ_Changed();
}); 

CMYK.addEventListener('keyup', function(event) {
    CMYK_Changed();
}); 

// изменение colorPicker
colorPicker.addEventListener('focus', function(event) {
    console.log("color picker: ", colorPicker.value);
    HEX_Changed();
}); 

// поменять все остальное относительно RGB
function RGB_Changed()
{
    RGB_v = RGB.value;
    rgbToHex();
    rgbToXYZ();
    rgbToCMYK();
    rgbToSliders();
} 

// поменять все остальное относительно HEX
function HEX_Changed()
{
    HEX = colorPicker.value.substring(1);
    hexToRgb();
    RGB_Changed();
} 

// поменять все остальное относительно XYZ
function XYZ_Changed()
{
    XYZ_v = XYZ.value;
    XYZToRgb();
    rgbToCMYK();
    rgbToHex();
    rgbToSliders();
}

function CMYK_Changed()
{
    CMYK_v = CMYK.value;
    CMYKToRgb();
    rgbToXYZ();
    rgbToHex();
    rgbToSliders();
}

// конвентор систем счисления
function convertFromBaseToBase(number, from, to) 
{
    let decimal = parseInt(number, from);
    if (decimal > 255) 
    {
        info.textContent = "Некорректный ввод";
        info.style.color = "red";
        console.log(info);
        wrongDecimal = true;
        return 0;
    }
    if (isNaN(decimal)) 
    {
        console.log("INCORRECT VALUE");
        return 0;
    }
    return decimal.toString(to);
}
function hexToRgb()
{
    RGB_v = `${convertFromBaseToBase(HEX.substring(0, 2), 16, 10)}, ${convertFromBaseToBase(HEX.substring(2, 4), 16, 10)}, ${convertFromBaseToBase(HEX.substr(4), 16, 10)}`;
    RGB.value = RGB_v;
}

function rgbToHex()
{
    wrongDecimal = false;
    HEX = "#";
    let temp = RGB_v + ",";
    for (let i = 0; i < 3; i++) 
    {
        if (convertFromBaseToBase(temp.substring(0, temp.indexOf(",")), 10, 16).length < 2) 
        {
            HEX += "0";
        }
        HEX += convertFromBaseToBase(temp.substring(0, temp.indexOf(",")), 10, 16);
        temp = temp.substring(temp.indexOf(",") + 1);
    }
    colorPicker.value = HEX;
    info.style.color = HEX;
    if (!wrongDecimal)
    {
        info.textContent = "Измените поле или нажмите на цветной прямоугольник";
    }
}

function rgbToXYZ()
{
    let temp = RGB_v + ",";
    let rgb_parced = [];
    for (let i = 0; i < 3; i++) 
    {
        rgb_parced.push(parseInt(temp.substring(0, temp.indexOf(","))));
        temp = temp.substring(temp.indexOf(",") + 1);
    }
    for(i in rgb_parced)
    {
        rgb_parced[i] /= 255;
        rgb_parced[i] = (rgb_parced[i]<= 0.04045) ? (rgb_parced[i]/ 12.92) : Math.pow((rgb_parced[i]+ 0.055) / 1.055, 2.4);
    }
    
    XYZ_v = "";
    temp = rgb_parced[0] * 0.4124564 + rgb_parced[1] * 0.3575761 + rgb_parced[2] * 0.1804375;
    XYZ_v += temp.toFixed(parseInt(rounding.value)).toString() + ", ";

    temp = rgb_parced[0] * 0.2126729 + rgb_parced[1] * 0.7151522 + rgb_parced[2] * 0.0721750;
    XYZ_v += temp.toFixed(parseInt(rounding.value)).toString() + ", ";

    temp = rgb_parced[0] * 0.0193339 + rgb_parced[1] * 0.1191920 + rgb_parced[2] * 0.9503041;
    XYZ_v += temp.toFixed(parseInt(rounding.value)).toString();

    XYZ.value = XYZ_v;    
}

function rgbToCMYK()
{
    let temp = RGB_v + ",";
    let rgb_parced = [];
    for(let i = 0; i < 3; i++) 
    {
        rgb_parced.push(parseInt(temp.substring(0, temp.indexOf(","))));
        temp = temp.substring(temp.indexOf(",") + 1);
    }
    for(i in rgb_parced)
    {
        rgb_parced[i] /= 255;
    }

    let K = 1 - Math.max(...rgb_parced);

    if(K == 1) CMYK_v = "0, 0, 0, 1";
    else
    {
        CMYK_v = "";
        CMYK_v += ((1 - rgb_parced[0] - K) / (1 - K)).toFixed(parseInt(rounding.value)).toString() + ", ";
        CMYK_v += ((1 - rgb_parced[1] - K) / (1 - K)).toFixed(parseInt(rounding.value)).toString() + ", ";
        CMYK_v += ((1 - rgb_parced[2] - K) / (1 - K)).toFixed(parseInt(rounding.value)).toString() + ", ";
        CMYK_v += K.toFixed(parseInt(rounding.value)).toString();
    }

    CMYK.value = CMYK_v;
}

function rgbToSliders() 
{
    let temp = RGB_v + ",";
    for(let i = 0; i < 3; i++) 
    {
        sliders[i].value = parseInt(temp.substring(0, temp.indexOf(",")));
        temp = temp.substring(temp.indexOf(",") + 1);
    }
}

function XYZToRgb()
{
    let temp = XYZ_v + ",";
    let XYZ_parced = [];
    for(let i = 0; i < 3; i++) 
    {
        XYZ_parced.push(parseFloat(temp.substring(0, temp.indexOf(","))));
        temp = temp.substring(temp.indexOf(",") + 1);
    }
    let newRgb = [];
    newRgb.push(XYZ_parced[0] * 3.2406 + XYZ_parced[1] * -1.5372 + XYZ_parced[2] * -0.4986);
    newRgb.push(XYZ_parced[0] * -0.9689 + XYZ_parced[1] * 1.8758 + XYZ_parced[2] * 0.0415);
    newRgb.push(XYZ_parced[0] * 0.0557 + XYZ_parced[1] * -0.2040 + XYZ_parced[2] * 1.0570);

    for(let i in newRgb)
    {
        if(newRgb[i] <= 0.0031308)
        {
            newRgb[i] *= 12.92;
        }
        else
        {
            newRgb[i] = 1.055 * Math.pow(newRgb[i], 1/2.4) - 0.055;
        }

        newRgb[i] = Math.round(Math.max(0, Math.min(1, newRgb[i])) * 255);
    }

    RGB_v = "";
    for(let i in newRgb)
    {
        if(i != newRgb.length - 1) RGB_v += newRgb[i] + ", ";
        else RGB_v += newRgb[i];
    }

    RGB.value = RGB_v;
}

function CMYKToRgb()
{
    let temp = CMYK_v + ",";
    let CMYK_parced = [];
    for(let i = 0; i < 4; i++) 
    {
        CMYK_parced.push(parseFloat(temp.substring(0, temp.indexOf(","))));
        temp = temp.substring(temp.indexOf(",") + 1);
    }

    RGB_v = "";
    for(let i = 0; i < CMYK_parced.length - 2; i++)
    {
        RGB_v += `${Math.round(255 * (1 - CMYK_parced[i]) * (1 - CMYK_parced[3]))}, `;
    }
    RGB_v += `${Math.round(255 * (1 - CMYK_parced[2]) * (1 - CMYK_parced[3]))}`;
    RGB.value = RGB_v;
}

hexToRgb();
rgbToHex();
rgbToXYZ();
rgbToCMYK();
rgbToSliders();