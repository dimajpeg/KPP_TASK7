// Находим наибольшее нечетное число в массиве
function findLargestOdd(array) {
    const oddNumbers = array.filter(num => num % 2 !== 0); // Оставляем только нечетные числа
    return oddNumbers.length > 0 ? Math.max(...oddNumbers) : null; // Возвращаем максимум или null
}

// Выполняем циклический сдвиг массива
function cyclicShift(array, shiftBy) {
    const length = array.length;
    const actualShift = shiftBy % length; // Убираем лишние обороты
    return [...array.slice(-actualShift), ...array.slice(0, -actualShift)];
}

module.exports = { findLargestOdd, cyclicShift };

