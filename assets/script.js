var infocon = document.getElementById("infocon");
var mobile = document.getElementById("mobile");
var mobileErrorMessage = document.querySelector(".mobile-error");
var upi = document.getElementById("upi");
var upierrormessage = document.querySelector(".upi-error");
var otpcon = document.getElementById("otp-con");
var wallet = document.getElementById("wallet");
var landing = document.getElementById("landing");
var usernumber = document.getElementById("usernumber");
var userupi = document.getElementById("userupi");
var offercard = document.querySelectorAll(".offer-card");
var lockicon = document.querySelectorAll(".fa-lock");
var line = document.getElementById("unlocked-line");
var timerElement = document.querySelector(".otp-timer");
var resend = document.getElementById("resend");
var body = document.querySelector(".body");
var loader = document.querySelector(".loader");
var bannerpopup = document.querySelector(".banner-popup");

const copyLinkButtons = document.querySelectorAll(".copy-link-button");
const whatsappButtons = document.querySelectorAll(".whatsapp-share");

function fadeOutEffect() {
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.classList.replace("d-flex", "d-none");
  }, 1000);
}

function closepopup() {
  bannerpopup.classList.replace("d-flex", "d-none");
  document.body.classList.remove("overflow-h");

  offercard.forEach(function (lock) {
    lock.classList.add("lock");
  });
}

if(bannerpopup.classList.contains('d-flex')){
  document.body.classList.add("overflow-h");

  offercard.forEach(function (lock) {
    lock.classList.remove("lock");
  });
} 

function showPreloader() {
  // Display the loader by replacing 'd-none' with 'd-flex'
  loader.classList.replace("d-none", "d-flex");
  loader.style.opacity = "1"; // Start the fade-out effect

  // Start fade out after 0.5 seconds
  setTimeout(() => {
    loader.style.opacity = "0"; // Start the fade-out effect
  }, 500); // Delay before starting fade-out for visibility

  // Hide the loader after 1.5 seconds (0.5s delay + 1s fade-out duration)
  setTimeout(() => {
    loader.classList.replace("d-flex", "d-none"); // Hide the loader
    loader.style.opacity = "1"; // Reset opacity for next use
  }, 1500); // Total duration to fully hide the loader
}

setTimeout(fadeOutEffect, 1000);

if (infocon.classList.contains("d-flex")) {
  body.classList.add("overflow-h");
  offercard.forEach(function (lock) {
    lock.classList.remove("lock");
  });
}

function infoclose() {
  infocon.classList.replace("d-flex", "d-none");
  body.classList.remove("overflow-h");
  offercard.forEach(function (lock) {
    lock.classList.add("lock");
  });
  mobile.focus();
}

function infoopen() {
  infocon.classList.replace("d-none", "d-flex");
  body.classList.add("overflow-h");
  offercard.forEach(function (lock) {
    lock.classList.remove("lock");
  });
}

function numbervalidation() {
  var v = mobile.value;

  var mobilepattern = /^[789]\d{9}$/;

  if (mobilepattern.test(v)) {
    mobileErrorMessage.classList.replace("d-flex", "d-none");
  } else {
    mobileErrorMessage.classList.replace("d-none", "d-flex");
  }
}

function upivalidation() {
  var u = upi.value;
  var upipattern = /^(?=.*\d{10})[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;

  if (upipattern.test(u)) {
    upierrormessage.classList.replace("d-flex", "d-none");
  } else {
    upierrormessage.classList.replace("d-none", "d-flex");
  }
}

function enterotp() {
  resendtimer(60);
  var v = mobile.value;
  var mobilepattern = /^[789]\d{9}$/;
  var vflag = false;

  var u = upi.value;
  var upipattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
  var uflag = false;

  if (mobilepattern.test(v)) {
    mobileErrorMessage.classList.replace("d-flex", "d-none");
    vflag = true;
  } else {
    mobileErrorMessage.classList.replace("d-none", "d-flex");
  }

  if (upipattern.test(u)) {
    upierrormessage.classList.replace("d-flex", "d-none");
    uflag = true;
  } else {
    upierrormessage.classList.replace("d-none", "d-flex");
  }

  if (vflag && uflag) {
    showPreloader();

    document.body.classList.add("overflow-h");

    offercard.forEach(function (lock) {
      lock.classList.remove("lock");
    });

    usernumber.innerHTML = v;
    userupi.value = u;
    otpcon.classList.replace("d-none", "d-flex");
  }
}

function otpclose() {
  otpcon.classList.replace("d-flex", "d-none");
  body.classList.remove("overflow-h");
  offercard.forEach(function (lock) {
    lock.classList.remove("lock");
  });
}

function verifyotp() {
  wallet.classList.replace("d-none", "d-flex");
  landing.classList.replace("d-flex", "d-none");
  line.classList.replace("text-danger", "text-success");
  line.innerHTML =
    "<i class='fab fa-whatsapp'></i> Start your earings by sharing your contacts";
  offercard.forEach(function (lock) {
    lock.classList.remove("lock");
  });
  lockicon.forEach(function (icon) {
    icon.classList.add("fab");
    icon.classList.add("fa-whatsapp");
  });
  otpclose();
  showPreloader();
}

function resendtimer(val) {
  //   resend.preventdefault();
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }

  let countdown = val;

  const timerInterval = setInterval(function () {
    timerElement.textContent = formatTime(countdown);

    countdown--;

    if (countdown < 0) {
      resend.disabled = false;
      resend.classList.replace("text-muted", "text-primary");
      clearInterval(timerInterval);
      timerElement.textContent = "00:00";
    }
  }, 1000);
}

function resendotp() {
  document.body.style.overflow = "hidden";

  resendtimer(60);
  resend.disabled = true;
  resend.classList.replace("text-primary", "text-muted");
}

copyLinkButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const link = button.getAttribute("data-link");

    // Use the Clipboard API to copy text
    navigator.clipboard
      .writeText(link)
      .then(() => {
        // Successful copy feedback (optional)
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  });
});

// Select all buttons with the class 'whatsapp-share'

// Loop through each button and add an event listener
whatsappButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Retrieve the data-message attribute value
    const message = encodeURIComponent(this.getAttribute("data-message"));

    // Create the WhatsApp share URL
    const whatsappUrl = `https://wa.me/?text=${message}`;

    // Open the WhatsApp share URL in a new tab
    window.open(whatsappUrl, "_blank");
  });
});
