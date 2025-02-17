from django.shortcuts import render, redirect

def indexView(request):
    return render(request, "index.html")

