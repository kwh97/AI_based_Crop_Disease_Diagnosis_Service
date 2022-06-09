const fileInput = document.querySelector("#fileUpload");
const fileButton = document.querySelector("#fileBtn");
const imagePreview = document.querySelector("#imagePreview");
const checkBtn = document.querySelector("#checkBtn");

function handleBtnClick() {
  fileInput.click();
}

function removeFirstImage() {
  const firstImgElement = imagePreview.firstChild;
  firstImgElement.remove();
}

function checkElementCount() {
  let eleCount = imagePreview.childElementCount;
  if(eleCount > 1) {
    removeFirstImage();
  }
}

function getImageFile(e) {
  const file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = function(e) { 
    const img = document.createElement('img');
    img.setAttribute("src", e.target.result);
    imagePreview.appendChild(img);
    img.id = "uploadedImage";
    checkElementCount();
  }
  reader.readAsDataURL(file);
  checkBtn.classList.add("uploded");
  fileButton.classList.add("blocked");
}

fileButton.addEventListener("click", handleBtnClick); // button이 눌리면 input이 눌리게힘.
fileInput.addEventListener("change", getImageFile); //input에 사진이 업로드될 경우 change event발생.