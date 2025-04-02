// let data = [23, 34, 4, 5, 6, 7, 8, 3, 2, 45, 0, 68];
const data=[1,23,2,24,5,6,7,9,45,0];
function mergeSort(arr, l, r) {
    if (l >= r) {
        return;
    }
    let mid = parseInt((l + r) / 2);
    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, r);
    merge(arr, l, mid, r);
}

function merge(arr, l1, m1, r1) {
    let n1 = m1 - l1 + 1;
    let n2 = r1 - m1;

    let arrL = new Array(n1);
    let arrR = new Array(n2);
    for (let i = 0; i < n1; i++) {
        arrL[i] = arr[l1+i];
    }
    for (let j = 0; j < n2; j++) {
        arrR[j] = arr[m1 + 1+j];
    }

    let i1 = 0;
    let j1 = 0;
    let k = l1;
    while (i1 < n1 && j1 < n2) {
        if (arrL[i1] <= arrR[j1]) {
            arr[k] = arrL[i1];
            i1++;
        }
        else {
            arr[k] = arrR[j1];
            j1++
        }
        k++;
    }

    while (i1 < n1) {
        arr[k] = arrL[i1];
        i1++;
        k++;
    }
    while (j1 < n2) {
        arr[k] = arrR[j1];
        j1++;
        k++;
    }
}

console.log("Unsorted Array ", data);
mergeSort(data, 0, data.length-1);
console.log("sorted by merge Array ", data);





