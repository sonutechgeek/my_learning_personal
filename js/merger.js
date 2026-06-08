const data = [1, 23, 2, 24, 5, 6, 7, 9, 45, 0];
const mergShort = (arr, l, h) => {
  if (l >= h) {
    return;
  }
  let mid = parseInt((l + h) / 2);
  mergShort(arr, l, mid);
  mergShort(arr, mid + 1, h);
  console.log(arr[mid]);
  merge(arr, l, mid, h);
};
const merge = (arr, low, mid, high) => {
//   let n1 = mid - low + 1;
//   let n2 = high - mid;
  let n1=mid-low+1;
  let n2=high-mid;
  let arrL=new Array(n1);
  let arrR=new Array(n2);
  for(let i=0;i<n1;i++){
    arrL[i]=arr[low+i];
  }
  for(let i=0;i<n2;i++){
    arrR[i]=arr[mid+i+1];
  }

  let i1 = 0;
  let j1 = 0;
  let k = low;
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



  //    const arrL2=new Array(n1);
  //    const arrR2=new Array(n2);

  //    for (let i = 0; i < arrL2.length; i++) {
  // arrL2[i] = arr[low+i];

  //    }
  //    for(let j=0;j<arrR2.length;j++){
  //        arrR2[j]=arr[mid+1+j]
  //    }

  //    let l2=0;
  //    let r2=0
  //    let k2=0;
  //    while(l2<n1 && r2<n2){
  //        if(arrL2[l2] <= arrR2[r2]){
  //            arr[k2]=arrL2[l2];
  //            l2++;
  //            k2++;
  //        }else{
  //            arr[k2]=arrR2[r2];
  //            r2++;
  //            k2++;
  //        }
  //    }
  //    while(l2<n1){
  //        arr[k2]=arrL2[l2];
  //        l2++;
  //        k2++;
  //    }
  //    while(r2<n2){
  //        arr[k2]=arrR2[r2];
  //        r2++;
  //        k2++;
  //    }
};
console.log(data);

console.log(mergShort(data, 0, data.length));

console.log(data);
