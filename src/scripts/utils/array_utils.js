// Dado un array, devuelve el numero de elementos concretos que contiene ese array
// Devuelve un integer
export function countElements(arr, element) {
    return arr.reduce((acc, value) => {
        return acc += (value === element ? 1 : 0)
    }, 0)
}

export function updateElement(matrix, index, newValue) {
    let newarr = [...matrix];
    newarr[index] = newValue;
    return newarr;
}