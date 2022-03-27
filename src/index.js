import './css/index.css'
import { domOn, domForEach } from './lib/domManipulator'


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
}

window.addEventListener('hashchange', displaySection)

displaySection()
