from django.urls import path

from .views import HomePage, LoginPage, ImcPage

urlpatterns = [
    path('', HomePage.as_view(), name="homepage"),
    path('login/', LoginPage.as_view(), name="loginpage"),
    path('imc/', ImcPage.as_view(), name="imcpage")

]