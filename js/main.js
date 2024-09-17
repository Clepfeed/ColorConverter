let colorPicker = document.getElementById("colorSpace");

let HEX = colorPicker.value.substring(1);
let RGB_v;
let XYZ_v;
let CMYK_v;

let inputs = [RGB, XYZ, CMYK, rounding];

inputs[3].addEventListener('keyup', () => {
    console.log("A");
    RGB_Changed();
});

inputs[3].addEventListener('input', () => {
    RGB_Changed();
});

inputs[0].addEventListener('keyup', function(event) {
    RGB_Changed();
});

colorPicker.addEventListener('focus', function(event) {
    console.log("color picker: ", colorPicker.value);
    HEX_Changed();
});

function RGB_Changed()
{
    RGB_v = RGB.value;
    rgbToHex();
    rgbToXYZ();
    rgbToCMYK();
}

function HEX_Changed()
{
    HEX = colorPicker.value.substring(1);
    hexToRgb();
    RGB_Changed();
}

function convertFromBaseToBase(number, from, to)
{
    let decimal = parseInt(number, from);
    if (decimal > 255) 
    {
        info.textContent = "Некорректный ввод";
        info.style.color = "red";    
    }
    else
    {
        info.textContent = "Измените поле или нажмите на цветной прямоугольник";
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

    let K = Math.max(...rgb_parced);
}

hexToRgb();
rgbToHex();
rgbToXYZ();
rgbToCMYK();