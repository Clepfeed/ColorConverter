let colorPicker = document.getElementById("colorSpace");
let HEX = colorPicker.value.substring(1);

// RGB, XYZ, CMYK, rounding

let wrongDecimal = false;

RGB_change_button.addEventListener('click', () => {
    RGB_Sliders_Div.style.display = "block";
    XYZ_Sliders_Div.style.display = "none";
    CMYK_Sliders_Div.style.display = "none";
});
XYZ_change_button.addEventListener('click', () => {
    RGB_Sliders_Div.style.display = "none";
    XYZ_Sliders_Div.style.display = "block";
    CMYK_Sliders_Div.style.display = "none";
});
CMYK_change_button.addEventListener('click', () => {
    RGB_Sliders_Div.style.display = "none";
    XYZ_Sliders_Div.style.display = "none";
    CMYK_Sliders_Div.style.display = "block";
});


// rgb sliders
slider_r.addEventListener('input', () => {
    RGB_R.value = slider_r.value;
    RGB_Changed();
});
slider_g.addEventListener('input', () => {
    RGB_G.value = slider_g.value;
    RGB_Changed();
});
slider_b.addEventListener('input', () => {
    RGB_B.value = slider_b.value;
    RGB_Changed();
});

// xyz sliders
slider_x.addEventListener('input', () => {
    XYZ_X.value = slider_x.value / 100;
    XYZ_Changed();
});
slider_y.addEventListener('input', () => {
    XYZ_Y.value = slider_y.value / 100;
    XYZ_Changed();
});
slider_z.addEventListener('input', () => {
    XYZ_Z.value = slider_z.value / 100;
    XYZ_Changed();
});

// cmyk sliders
slider_c.addEventListener('input', () => {
    CMYK_C.value = slider_c.value / 100;
    CMYK_Changed();
});
slider_m.addEventListener('input', () => {
    CMYK_M.value = slider_m.value / 100;
    CMYK_Changed();
});
slider_y_cmyk.addEventListener('input', () => {
    CMYK_Y.value = slider_y_cmyk.value / 100;
    CMYK_Changed();
});
slider_k.addEventListener('input', () => {
    CMYK_K.value = slider_k.value / 100;
    CMYK_Changed();
});

// изменения округления
rounding.addEventListener('keyup', () => {
    RGB_Changed();
});
rounding.addEventListener('input', () => {
    RGB_Changed();
});

// изменение поля RGB

let RGB_inputs = document.querySelectorAll(".RGB_Input");
RGB_inputs.forEach(input => {
    input.addEventListener('keyup', (event) => {
        RGB_Changed();
    });
});


let XYZ_inputs = document.querySelectorAll(".XYZ_Input");
XYZ_inputs.forEach(input => {
    input.addEventListener('keyup', (event) => {
        XYZ_Changed();
    });
});


let CMYK_inputs = document.querySelectorAll(".CMYK_Input");
CMYK_inputs.forEach(input => {
    input.addEventListener('keyup', (event) => {
        CMYK_Changed();
    });
});


// изменение colorPicker
colorPicker.addEventListener('focus', function(event) {
    console.log("color picker: ", colorPicker.value);
    HEX_Changed();
}); 

// поменять все остальное относительно RGB
function RGB_Changed()
{
    rgbToHex();
    rgbToXYZ();
    rgbToCMYK();
    rgbToSliders();
    XYZToSliders();
    CMYKToSliders();
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
    if(XYZToRgb() == 0)
    {
        rgbToCMYK();
        rgbToHex();
        rgbToSliders();
        XYZToSliders();
        CMYKToSliders();
    }
}

function CMYK_Changed()
{
    if(CMYKToRgb() == 0)
    {
        rgbToXYZ();
        rgbToHex();
        rgbToSliders();
        CMYKToSliders();
    }
}

// конвентор систем счисления
function convertFromBaseToBase(number, from, to) 
{
    let decimal = parseInt(number, from);
    if (decimal > 255 || decimal < 0 || isNaN(decimal)) 
    {
        info.textContent = "Некорректный ввод";
        info.style.color = "red";
        wrongDecimal = true;
        return 0;
    }
    return decimal.toString(to);
}
function hexToRgb()
{
    RGB_R.value = convertFromBaseToBase(HEX.substring(0, 2), 16, 10);
    RGB_G.value = convertFromBaseToBase(HEX.substring(2, 4), 16, 10);
    RGB_B.value = convertFromBaseToBase(HEX.substr(4), 16, 10);
}

function rgbToHex()
{
    wrongDecimal = false;
    let rgb_v = [RGB_R.value, RGB_G.value, RGB_B.value];
    HEX = "#";
    for (let i = 0; i < 3; i++) 
    {
        if (convertFromBaseToBase(rgb_v[i], 10, 16).length < 2) 
        {
            HEX += "0";
        }
        HEX += convertFromBaseToBase(rgb_v[i], 10, 16);
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
    let rgb_parced = [RGB_R.value, RGB_G.value, RGB_B.value];
    let temp = 0;
    for(i in rgb_parced)
    {
        rgb_parced[i] /= 255;
        rgb_parced[i] = (rgb_parced[i]<= 0.04045) ? (rgb_parced[i]/ 12.92) : Math.pow((rgb_parced[i]+ 0.055) / 1.055, 2.4);
    }
    
    temp = rgb_parced[0] * 0.4124564 + rgb_parced[1] * 0.3575761 + rgb_parced[2] * 0.1804375;
    XYZ_X.value = temp.toFixed(parseInt(rounding.value));

    temp = rgb_parced[0] * 0.2126729 + rgb_parced[1] * 0.7151522 + rgb_parced[2] * 0.0721750;
    XYZ_Y.value = temp.toFixed(parseInt(rounding.value));

    temp = rgb_parced[0] * 0.0193339 + rgb_parced[1] * 0.1191920 + rgb_parced[2] * 0.9503041;
    XYZ_Z.value = temp.toFixed(parseInt(rounding.value));  
}

function rgbToCMYK()
{
    let rgb_parced = [parseFloat(RGB_R.value), parseFloat(RGB_G.value), parseFloat(RGB_B.value)];
    for(i in rgb_parced)
    {
        rgb_parced[i] /= 255;
    }

    let K = 1 - Math.max(...rgb_parced);

    if(K == 1)
    {
        CMYK_C = 0;
        CMYK_M = 0;
        CMYK_Y = 0;
        CMYK_K = 1;
    }
    else
    {
        CMYK_C.value = ((1 - rgb_parced[0] - K) / (1 - K)).toFixed(parseInt(rounding.value));
        CMYK_M.value = ((1 - rgb_parced[1] - K) / (1 - K)).toFixed(parseInt(rounding.value));
        CMYK_Y.value = ((1 - rgb_parced[2] - K) / (1 - K)).toFixed(parseInt(rounding.value));
        CMYK_K.value = K.toFixed(parseInt(rounding.value));
    }
}

function rgbToSliders() 
{
    slider_r.value = RGB_R.value;
    slider_g.value = RGB_G.value;
    slider_b.value = RGB_B.value;
}

function XYZToSliders() 
{
    slider_x.value = XYZ_X.value * 100;
    slider_y.value = XYZ_Y.value * 100;
    slider_z.value = XYZ_Z.value * 100;
}

function CMYKToSliders()
{
    slider_c.value = CMYK_C.value * 100;
    slider_m.value = CMYK_M.value * 100;
    slider_y_cmyk.value = CMYK_Y.value * 100;
    slider_k.value = CMYK_K.value * 100;
}

function XYZToRgb()
{
    let XYZ_parced = [parseFloat(XYZ_X.value), parseFloat(XYZ_Y.value), parseFloat(XYZ_Z.value)];
    let newRgb = [];

    let wrongDia = false;
    for(i in XYZ_parced)
    {
        if(XYZ_parced[i] < 0 || XYZ_parced[i] > 1 || isNaN(XYZ_parced[i]))
        {
            wrongDia = true;
        }
    }
    if (wrongDia)
    {
        info.textContent = "Некорректный ввод";
        info.style.color = "red";
        return 1;
    }
   
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

    RGB_R.value = newRgb[0];
    RGB_G.value = newRgb[1];
    RGB_B.value = newRgb[2];

    return 0;
}

function CMYKToRgb()
{
    let CMYK_parced = [
        parseFloat(CMYK_C.value),
        parseFloat(CMYK_M.value),
        parseFloat(CMYK_Y.value),
        parseFloat(CMYK_K.value)];

    let wrongDia = false;
    for(i in CMYK_parced)
    {
        if(CMYK_parced[i] < 0 || CMYK_parced[i] > 1 || isNaN(CMYK_parced[i]))
        {
            wrongDia = true;
        }
    }
    if(wrongDia)
    {
        info.textContent = "Некорректный ввод";
        info.style.color = "red";
        return 1;
    } 

    RGB_R.value = Math.round(255 * (1 - CMYK_parced[0]) * (1 - CMYK_parced[3]));
    RGB_G.value = Math.round(255 * (1 - CMYK_parced[1]) * (1 - CMYK_parced[3]));
    RGB_B.value = Math.round(255 * (1 - CMYK_parced[2]) * (1 - CMYK_parced[3]));

    return 0;
}

hexToRgb();
rgbToHex();
rgbToXYZ();
rgbToCMYK();
rgbToSliders();