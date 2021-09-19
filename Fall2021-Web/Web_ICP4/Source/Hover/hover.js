function upDate(previewPic) {
    // Getting the src and alt of the image
    let selectedImgURL = previewPic.src;
    let selectedImgText = previewPic.alt;
    // Using the backgroundImage style property to add the image to the Div element
    document.getElementById("image").style.backgroundImage = `url(${selectedImgURL})`;
    // Changing the text of the Div element
    document.getElementById("image").innerText = selectedImgText;
}

function unDo() {
    // Using the backgroundImage style property to remove the image
    document.getElementById("image").style.backgroundImage = "none";
    // Changing the text of the Div element to the previous value
    document.getElementById("image").innerText = "Hover over an image below to display here.";
}
