import './css/index.css'
import { domOn, domForEach } from './lib/domManipulator'
import {renderPostsSection, renderPostsUserSection, renderFavoritesPostesSection, renderPostsSectionDetails } from './sections/posts'
import { renderHomesSection } from './sections/home'

function toggleSection(section) {
  document.querySelector('section.active')?.classList.remove('active')
  document.querySelector(`${section}-section`)?.classList.add('active')
}

function toggleNav(section) {
  document.querySelector('nav a.active')?.classList.remove('active')
  document.querySelector(`nav a[href="${section}"]`)?.classList.add('active')
}

// Affichage d'une section
function displaySection() {
  const section = window.location.hash || '#home'
  const sectionSplit = section.split('-')

  toggleSection(sectionSplit[0])
  toggleNav(sectionSplit[0])

  switch(sectionSplit[0]) {
    case '#posts':
      // Est-ce qu'il y a un id ? typiquement: #artists-1234
      if(sectionSplit[1]) {
        toggleSection('#posts')
        renderPostsSectionDetails(sectionSplit[1])
      }
      else {
        renderPostsSection()
      }
      break;

      case '#users' :
        renderPostsUserSection
        if(sectionSplit[1]) {
        renderPostsUserSection(sectionSplit[1])}
        break;

      case '#likes':  
      toggleSection('#posts')
      // on décode la chaine de recherche pour l'afficher proprement
      renderFavoritesPostesSection()
    break;

    case '#home':
    toggleSection('#home')
    renderHomesSection()
    break;
  }

  


}

window.addEventListener('hashchange', displaySection)

displaySection()

window.addEventListener('favorites_updated', () => {
  if(window.location.hash == '#likes')
  renderFavoritesPostesSection()
})


// On enregistre le worker pour s'occuper de la mise en cache
navigator.serviceWorker.register('/workerCacheFetched.js')
