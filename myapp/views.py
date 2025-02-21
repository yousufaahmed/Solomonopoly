from django.shortcuts import render
import cv2
from django.http import JsonResponse
# Create your views here.

def indexView(request):
    return render(request, "index.html")


def scan_qrcode(request):
    # Initialize webcam
    cap = cv2.VideoCapture(0)
    detector = cv2.QRCodeDetector()

    scanned_data = None

    while True:
        _, img = cap.read()
        data, bbox, _ = detector.detectAndDecode(img)

        if data:
            scanned_data = data
            break

        cv2.imshow("QR Code Scanner", img)
        if cv2.waitKey(1) == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()

    if scanned_data:
        return JsonResponse({"qrcode_data": scanned_data})  # Return scanned text as JSON

    return JsonResponse({"error": "No QR code detected"}, status=400)
