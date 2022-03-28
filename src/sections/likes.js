import JsonStorage from '../lib/JsonStorage'

// Création d'un storage exprès pour les favoris
// L'idée est d'utiliser l'id de la chanson en tant que clé de stockage. Comme elle est unique dans toute l'app,
// pas de problème d'écrasement et cela permet de checker très facilement si une chanson est contenue ou non dans
// le storage. Exemple: favoritesStorage.getItem(post.id)
const favoritesStorage = new JsonStorage({ name: 'favorites', eventName: 'favorites_updated' })

// Cette fonction toggle une chanson au sein de la liste des favoris
function toggleFavorite(post) {
  if(isInFavorite(post)) {
    favoritesStorage.removeItem(post.id.toString())
  } else {
    favoritesStorage.setItem(post.id.toString(), post)
  }
}

// Vérifie si une chanson est dans les favoris (retourne l'entry si oui, undefined si non)
function isInFavorite(post) {
  return favoritesStorage.getItem(post.id.toString())
}

// Retourne la liste des favoris sous forme de tableau avec seulement la valeur (voir slides pour explication)
function getFavorites() {
  return favoritesStorage.toArray().map((e) => e[1])
}

export { toggleFavorite, isInFavorite, getFavorites }
