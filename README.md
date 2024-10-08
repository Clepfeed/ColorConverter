Руководство запуска:

Варианты:
1. Скачать архив, распаковать, запустить index.html, открыв его в любом браузере
2. Посетить сайт https://clepfeed.github.io/

Функционал:
1. Переключение между цветными пространствами: При нажатии на соответствующую кнопку (RGB, XYZ или CMYK) отображаются соответствующие слайдеры, а остальные скрываются.
2. Слайдеры RGB, XYZ и CMYK. При изменении значений слайдеров для RGB (красный, зелёный, синий), XYZ и CMYK обновляются соответствующие текстовые поля, и вызываются функции обработки изменений (например, RGB_Changed(), XYZ_Changed(), CMYK_Changed()). Это обеспечивает синхронизацию значений между слайдерами и текстовыми полями для всех цветовых систем.
3. Проверка и обработка ввода: Ввод значений в текстовые поля RGB, XYZ и CMYK также обновляет соответствующие значения и вызывает функции для конвертации между форматами.
4. Конвертация между цветными пространствами:
HEX → RGB: Функция hexToRgb() преобразует выбранный цвет в формате HEX в RGB.
RGB → HEX: Функция rgbToHex() преобразует RGB в HEX.
RGB → XYZ: Функция rgbToXYZ() преобразует RGB в XYZ.
RGB → CMYK: Функция rgbToCMYK() преобразует RGB в CMYK.
XYZ → RGB: Функция XYZToRgb() преобразует XYZ обратно в RGB.
CMYK → RGB: Функция CMYKToRgb() преобразует CMYK в RGB.
5. Ограничения ввода: Код проверяет, чтобы вводимые значения находились в допустимых пределах (например, 0-255 для RGB и 0-1 для CMYK и XYZ). Если ввод некорректен, пользователь получает сообщение об ошибке.
6. Управление округлением: Пользователь может задавать уровень округления, который используется в конверсиях.
