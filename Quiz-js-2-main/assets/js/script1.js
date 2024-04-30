function storeData() {
    let name = document.getElementById('nom').value; // Obtenir la valeur de l'entrée avec l'identifiant 'nom'.
    let prenom = document.getElementById('prenom').value; // Obtenir la valeur de l'entrée avec l'identifiant 'prenom'.

    // Enregistrer le nom et le prénom dans localStorage.
    localStorage.setItem('nom', name);
    localStorage.setItem('prenom', prenom);
    
    return true; // Retourne true (la valeur de retour n'est pas utilisée ici).
}
