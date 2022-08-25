const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-btn");
  if (saveBtn) {
    saveBtn.remove();
  }
};

const createSaveBtn = (saveUrl) => {
  const saveBtn = document.createElement("a");
  saveBtn.id = "save-btn";
  saveBtn.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  saveBtn.href = saveUrl;
  saveBtn.download = "qrcode";
  saveBtn.innerHTML = "Save QR Code";
  document.getElementById("generated").appendChild(saveBtn);
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
