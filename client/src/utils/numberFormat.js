// funcion para estilizar cifras grandes
// recibe 4 parametros
// 1. el numero - obligatorio
// 2. la notacion - opcional - compact por defecto, tambien puedes pasar 'standard'
// 3. estilo - opcional - moneda por defecto, tambien puedes pasar 'decimal'
// 4. currency - opcional - especifica la moneda - USD por defecto, puedes pasar la adecuada
export default function numberFormat(number, notation='compact', style='currency', currency='USD') {
    return Intl.NumberFormat('en', {
        notation,
        style,
        currency,
    }).format(number)
}