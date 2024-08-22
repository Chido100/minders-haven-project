from django.urls import path
from .views import (
    SlotListAPIView,
    SlotCreateAPIView,
    SlotDeleteAPIView,
    SlotUpdateAPIView,
    MySlotsListAPIView,
    SlotDetailAPIView,
    AssignedSlotsListView,
)



urlpatterns = [
    path("", SlotListAPIView.as_view(), name="slot-list"),
    path("me/", MySlotsListAPIView.as_view(), name="my-slot-list"),
    path("assigned/", AssignedSlotsListView.as_view(), name="assigned-slots"),
    path("create/", SlotCreateAPIView.as_view(), name="create-slot"),
    path("update/<uuid:id>/", SlotUpdateAPIView.as_view(), name="update-slot"),
    path("<uuid:id>/", SlotDetailAPIView.as_view(), name="slot-detail"),
    path("delete/<uuid:id>/", SlotDeleteAPIView.as_view(), name="delete-slot"),
]
