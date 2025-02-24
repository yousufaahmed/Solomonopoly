# import cv2
# import numpy as np
from django.shortcuts import render
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt

def indexView(request):
    return render(request, "index.html")

# @csrf_exempt  # Disable CSRF protection for testing (enable it in production)
# def scan_qrcode(request):
#     if request.method == "GET":
#         return render(request, "qrcode.html")  # Load the page

#     elif request.method == "POST":
#         try:
#             img_array = np.frombuffer(request.body, np.uint8)  # Read image from request
#             img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

#             detector = cv2.QRCodeDetector()
#             data, bbox, _ = detector.detectAndDecode(img)

#             if data:
#                 return JsonResponse({"qrcode_data": data})
#             else:
#                 return JsonResponse({"error": "No QR Code detected"})

#         except Exception as e:
#             return JsonResponse({"error": str(e)})

#     return JsonResponse({"error": "Invalid request method"})

