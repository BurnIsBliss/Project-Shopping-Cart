function setVal(key, value) {
	sessionStorage.setItem(key, value);
}

function getVal(key) {
	return sessionStorage.getItem(key);
}

export { setVal, getVal };
