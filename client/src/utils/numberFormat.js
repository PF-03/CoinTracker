// funcion para estilizar cifras grandes
// recibe 4 parametros
// 1. el numero - obligatorio
// 2. la notacion - opcional - compact por defecto, tambien puedes pasar 'standard'
// 3. estilo - opcional - moneda por defecto, tambien puedes pasar 'decimal'
// 4. currency - opcional - especifica la moneda - USD por defecto, puedes pasar la adecuada
// ----------------
// Examples:
// numberFormat(12238489, 'compact') => $12M
// numberFormat(12238489, 'standard') => $12,238,489.00
// numberFormat(12238489, 'standard', 'decimal') => 12,238,489
// numberFormat(12238489, 'standard', 'currency', 'MXN') => MX$12,238,489
export default function numberFormat(number, notation='compact', style='currency', currency='USD') {
    return Intl.NumberFormat('en', {
        notation,
        style,
        currency,
    }).format(number)
}