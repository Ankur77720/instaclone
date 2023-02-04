async function likeIt(postId, element) {
  let res = await fetch(`/like/${postId}`)
  res = await res.json()
  let id = element
  element = document.querySelector('#' + 'i' + element)
  if (res) {
    document.querySelector(`#likes${id}`).innerText =
      parseInt(document.querySelector(`#likes${id}`).innerText) + 1
    element.classList.remove('ri-heart-3-line')
    element.classList.add('ri-heart-3-fill', 'text-danger')
    document.querySelector(`#like${id}`).classList.add('like')
  } else {
    document.querySelector(`#likes${id}`).innerText =
      parseInt(document.querySelector(`#likes${id}`).innerText) - 1
    element.classList.add('ri-heart-3-line')
    element.classList.remove('ri-heart-3-fill', 'text-danger')
    document.querySelector(`#like${id}`).classList.remove('like')
  }
}
async function follow(userId) {
  let res = await fetch(`/follow/${userId}`)
  res = await res.json()

  let followButtons = document.querySelectorAll(`.follow${userId}`)
  followButtons.forEach((button) => {
    if (res) {
      button.classList.remove('btn-outline-success')
      button.classList.add('btn-outline-warning')
      button.innerText = 'Following'
    } else {
      button.classList.add('btn-outline-success')
      button.classList.remove('btn-outline-warning')
      button.innerText = 'Follow'
    }
  })
  if (res) {
    document.querySelector('#following').innerText =
      parseInt(document.querySelector('#following').innerText) + 1
  } else {
    document.querySelector('#following').innerText =
      parseInt(document.querySelector('#following').innerText) - 1
  }
}
