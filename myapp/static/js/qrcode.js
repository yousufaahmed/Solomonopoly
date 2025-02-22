const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const result = document.getElementById('result');
const context = canvas.getContext('2d');
let scanning = true;  // Flag to control scanning

// Access the webcam
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => console.error("Error accessing camera: ", err));

function scanQRCode() {
    if (!scanning) return;  // Stop scanning if a QR code was found

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
        fetch("/qrcode/", {
            method: "POST",
            body: blob
        })
        .then(response => response.json())
        .then(data => {
            if (data.qrcode_data) {
                result.innerText = "QR Code: " + data.qrcode_data;
                stopCamera();  // Stop camera once QR code is found
            } else {
                result.innerText = "No QR Code detected";
                setTimeout(scanQRCode, 1500);  // Continue scanning
            }
        })
        .catch(error => console.error("Error scanning QR code:", error));
    }, "image/jpeg");
}

function stopCamera() {
    scanning = false;  // Stop further scans
    let stream = video.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach(track => track.stop());  // Stop the camera
    video.style.display = "none";  // Hide the video feed
}

video.addEventListener('loadeddata', scanQRCode);