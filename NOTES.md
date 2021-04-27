## Przetestowane przeglądarki:
* Google Chrome 89.0.4389.128
* Firefox 87.0
* Edge 90.0.818.46

## Przetestowane urządzenia:
* Notebook Dell Vostro 5370, Windows 10

## Kompromisy, uwagi
* Pierwsze pełne odwrócenie kolorów w Chrome następuje po około 5 - 15 sekundach, natomiast każde następne wykonuje się natychmiastowo. W Firefox nie następuje odwrócenie kolorów tła.
* Testowane funkcje musiałam skopiować, aby móc je eksportować za pomocą `module.exports` - nie działało takie eksportowanie dla pliku 'index.js', natomiast `export function` nie działało w przypadku Jest (możliwe, że potrzebny jest tu boundler).
