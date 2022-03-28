import { getPosts, getPostsForUsers } from '../api'
import { getFavorites, toggleFavorite, isInFavorite } from './likes'



const postsSection = document.querySelector('#posts-section')
const postsSectionTitle = postsSection.querySelector('h4')
const postList = postsSection.querySelector('.post-list')
const postListItemTemplate = postsSection.querySelector('article.post-list-item')

function toggleFavoriteIcon(favoriteIcon, post) {
    if(isInFavorite(post)) {
      favoriteIcon.innerText = 'favorite'
    } else {
      favoriteIcon.innerText = 'favorite_border'
    }
  }

function renderPost(post) {
    const newPost = postList.content.cloneNode(true) 
    newPost.querySelector('a. post-list-item-user').href = '#users-' + post.id
    newPost.querySelector('a. post-list-item-user-image').href = '#posts-' + post.id
    

    newPost.querySelector('img').src = post.image_url
   newPost.querySelector('.post-list-item-header').innerText = post.name
    postList.append(newPost)

    newPost.querySelector('.like-button').addEventListener('click', (e) => {
        toggleFavorite(post)
        toggleFavoriteIcon(e.target, post) // on passe le target du click, à savoir l'icône
      })
      // A l'insertion, on met à jour l'icone, si la chanson est présente dans les favoris
      toggleFavoriteIcon(newPost.querySelector('.like-button .material-icons'), post)
}

function renderPosts(posts) {
    postList.replaceChildren()
    if(posts.length) {
        // On itère sur chaque élément
        for(const post of posts) {
          renderPost(post)
        }}
      else {
        const noResults = postListItemTemplate.content.cloneNode(true) // true pour cloner également les enfants du node
        noResults.querySelector('.post-list-item-header').innerText = 'Aucun résultat'
        // noResults.querySelector('.list-item-actions').remove() // on supprime les boutons
        postList.append(noResults) 
      }
}


 async function renderPostsUserSection(id) {
    const posts = await getPostsForUsers(id)
    postsSectionTitle.innerText = `Posts > Numéro ${posts[0].name}`
    renderPosts(posts)
  } 

  async function renderPostsSection () {
    const posts = await getPosts()
    postsSectionTitle.innerText = `Posts`
    renderPosts(posts)
  }

  function renderFavoritesPostesSection() {
    const posts = getFavorites()
    postsSectionTitle.innerText = 'Posts likés (${posts.length})'
    renderPosts(posts)
  }

  export {renderPostsSection, renderPostsUserSection, renderFavoritesPostesSection, renderPostsSectionDetails}







