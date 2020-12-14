const currentPage =  location.pathname
const menuItems = document.querySelectorAll("header .navbar  a")



for (item of menuItems) {
    if(currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}


const Mask = {
    apply(input, func) {
        setTimeout(() => {
          input.value = Mask[func](input.value);
        }, 1);
      },
    
      formatBRL(value) {
        value = value.replace(/\D/g, "");
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(value / 100);
      }
}

// gerenciamento de fotos no front end

const PhotosUpload = {
  input: "",
  preview: document.querySelector('#photos-preview'),
  uploadLimit: 6,
  files: [],

    handleFileInput(event) {
      const {files: fileList } = event.target
      PhotosUpload.input = event.target

      if(PhotosUpload.hasLimit(event)) return

      Array.from(fileList).forEach(file => {

        PhotosUpload.files.push(file)

        const reader = new FileReader()

        reader.onload = () => {
          const image = new Image() //Mesma coisa <image>
          image.src = String(reader.result)
          const div = PhotosUpload.getContainer(image)
          PhotosUpload.preview.appendChild(div)
        }

        reader.readAsDataURL(file)
      })

     PhotosUpload.input.files = PhotosUpload.getAllFiles()
      
    }, 

    getContainer(image) {
      const div = document.createElement('div')
      div.classList.add('photo')

      div.onclick =  PhotosUpload.removePhoto

      div.appendChild(image)

      div.appendChild(PhotosUpload.getRemoveButton())

      return div
    }, 

    hasLimit(event) {
      const {uploadLimit, input, preview} = PhotosUpload
      const {files: fileList} = input
      

      if(fileList.lenght > uploadLimit) { 
          alert(`Envia no máximo ${uploadLimit} fotos`)
          event.preventDefault()
          return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
          if (item.classList && item.classList.value == "photo")
            photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > uploadLimit) {
          alert("Limite maximo de 6 fotos")
          event.preventDefault()
          return true
        }

        return false
    },

    getAllFiles() {
      //clipboar - Firefox
      //Data transfer - CHROME
      const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

      PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

      return dataTransfer.files
    },

    getRemoveButton() {
      const button = document.createElement('i')
      button.classList.add('material-icons')
      button.innerHTML = 'close'
      return button
    },

    removePhoto(event) {
      const photoDiv = event.target.parentNode // <div class="photo">
      const photosArray = Array.from(PhotosUpload.preview.children)
      const index = photosArray.indexOf(photoDiv)

      PhotosUpload.files.splice(index, 1)
      PhotosUpload.input.files = PhotosUpload.getAllFiles()

      photoDiv.remove()
    }
    

}
