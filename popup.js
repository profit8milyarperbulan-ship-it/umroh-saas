const div = document.createElement("div");
div.className = "card";

const title = document.createElement("b");
title.innerText = ad.brand;

const body = document.createElement("div");
body.innerText = ad.body;

div.appendChild(title);
div.appendChild(document.createElement("br"));
div.appendChild(body);

// IMAGE SAFE
if (ad.image && ad.image.startsWith("http")) {
  const img = document.createElement("img");
  img.src = ad.image;
  img.style.width = "100%";
  img.style.marginTop = "5px";
  div.appendChild(img);
}

list.appendChild(div);