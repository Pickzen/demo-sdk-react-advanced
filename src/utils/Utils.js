class Utils {
     haveSameElements(l1, l2){
        if (l1.length!==l2.length) return false;

        for (let el of l2) {
            if (l1.indexOf(el)===-1) return false
        }

        return true;
    }

    isEmpty(obj) {
         if (obj === null ) {
             return true
         } else if (Array.isArray(obj)) {
             return obj.length===0;
         } else if (typeof obj === 'object') {
             return Object.keys(obj).length===0;
         } else if (typeof obj === 'string') {
             return obj==='';
         } else {
             throw new Error("Invalid object");
         }
    }
}

export default new Utils()