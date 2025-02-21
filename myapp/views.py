from django.shortcuts import render, redirect
import cv2
from django.http import JsonResponse
# Create your views here.

def indexView(request):
    return render(request, "index.html")

def scan_qrcode(request):
    cap = cv2.VideoCapture(0)  # Open the webcam
    detector = cv2.QRCodeDetector()
    
    while True:
        success, img = cap.read()
        if not success:
            break
        
        data, bbox, _ = detector.detectAndDecode(img)  # Detect QR Code
        
        if data:  # If QR Code is found
            cap.release()  # Release camera
            return JsonResponse({"qrcode_data": data})  # Return QR data as JSON

    cap.release()  # Release camera if no QR found
    return JsonResponse({"error": "No QR Code detected"})

