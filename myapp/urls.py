from django.urls import path
from . import views


urlpatterns = [
    path('', views.indexView),
    # path("qrcode/", views.scan_qrcode, name="qrcode")
]