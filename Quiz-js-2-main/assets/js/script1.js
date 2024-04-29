function storeData() {
    let name = document.getElementById('nom').value; // Get value from input with id 'nom'
    let prenom = document.getElementById('prenom').value; // Get value from input with id 'prenom'
    
    // Store name and prenom in localStorage
    localStorage.setItem('nom', name);
    localStorage.setItem('prenom', prenom);
    
    return true; // Return true (the purpose of this return value is not utilized here)
}