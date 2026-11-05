module.exports = (tag) => {
    if (tag.length > 16 || tag.length < 2) {
        throw new TypeError('The displayName field must be between 2 and 16 characters.');
        return false;
    }
    if( !isAlphanumeric(tag)){
        throw new TypeError('The displayName field must be alphanumeric and must not contain consecutive spaces.');
    }


}
function isAlphanumeric (tag){
    const regexAlphanumeric = /^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/;
    if (typeof tag !== 'string') {
        console.log("No es un string")
        return false;
  }

  return regexAlphanumeric.test(tag.toLowerCase());    
}