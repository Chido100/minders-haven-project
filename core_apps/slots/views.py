import logging
from typing import Any
from django.conf import settings

from django.http import Http404
from django.utils import timezone
from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.request import Request
from rest_framework.response import Response
from django.contrib.contenttypes.models import ContentType

from core_apps.common.models import ContentView
from core_apps.common.renderers import GenericJSONRenderer
from .emails import send_slot_confirmation_email, send_slot_completed_email, send_broadcast_email
from .models import Slot
from .serializers import SlotSerializer, SlotStatusUpdateSerializer






logger = logging.getLogger(__name__)



class IsStaffOrSuperUser(permissions.BasePermission):
    def __init__(self) -> None:
        self.message = None

    def has_permission(self, request, view):
        is_authorized = (
            request.user
            and request.user.is_authenticated
            and (request.user.is_staff or request.user.is_superuser)
        )
        if not is_authorized:
            self.message = (
                "Access to this information is restricted to staff and admin users only!"
            )
        return is_authorized



class SlotListAPIView(generics.ListAPIView):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    renderer_classes = [GenericJSONRenderer]
    permission_classes = [IsStaffOrSuperUser]
    object_label = "slots"


class AssignedSlotsListView(generics.ListAPIView):
    serializer_class = SlotSerializer
    renderer_classes = [GenericJSONRenderer]
    #object_label = "assigned_slots"

    def get_queryset(self):
        user = self.request.user
        return Slot.objects.filter(assigned_to=user)


class MySlotsListAPIView(generics.ListAPIView):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    renderer_classes = [GenericJSONRenderer]
    object_label = "my_slots"

    def get_queryset(self):
        user = self.request.user
        return Slot.objects.filter(created_by=user)


#class SlotCreateAPIView(generics.CreateAPIView):
#    queryset = Slot.objects.all()
#    serializer_class = SlotSerializer
#    renderer_classes = [GenericJSONRenderer]
#    object_label = "slot"

#    def perform_create(self, serializer: SlotSerializer) -> None:
#        slot = serializer.save(created_by=self.request.user)
#        send_slot_confirmation_email(slot)
        


class SlotDetailAPIView(generics.RetrieveAPIView):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    lookup_field = "id"
    renderer_classes = [GenericJSONRenderer]
    object_label = "slot"

    def get_object(self) -> Slot:
        slot = super().get_object()

        user = self.request.user
        if not (
            user == slot.created_by or user.is_staff or user == slot.assigned_to
        ):
            raise PermissionDenied("You do not have permission to view this slot.")
        self.record_slot_view(slot)
        return slot

    def record_slot_view(self, slot):
        content_type = ContentType.objects.get_for_model(slot)
        viewer_ip = self.get_client_ip()
        user = self.request.user

        obj, created = ContentView.objects.update_or_create(
            content_type=content_type,
            object_id=slot.pk,
            user=user,
            viewer_ip=viewer_ip,
            defaults={"last_viewed": timezone.now()},
        )

    def get_client_ip(self) -> str:
        x_forwared_for = self.request.META.get("HTTP_X_FORWARED_FOR")
        if x_forwared_for:
            ip = x_forwared_for.split(",")[0]
        else:
            ip = self.request.META.get("REMOTE_ADDR")
        return ip


class SlotUpdateAPIView(generics.UpdateAPIView):
    queryset = Slot.objects.all()
    lookup_field = "id"
    serializer_class = SlotStatusUpdateSerializer
    renderer_classes = [GenericJSONRenderer]
    object_label = "slot"

    def get_object(self) -> Slot:
        slot = super().get_object()
        user = self.request.user

        if not (user.is_staff or user == slot.assigned_to):
            logger.warning(
                f"Unauthorized slot status update attempt by user {user.get_full_name} on slot {slot.slot_date}"
            )
            raise PermissionDenied("You do not have permission to update the slot")
        send_slot_resolved_email(slot)
        return slot


class SlotDeleteAPIView(generics.DestroyAPIView):
    queryset = Slot.objects.all()
    lookup_field = "id"
    serializer_class = SlotSerializer

    def get_object(self) -> Slot:
        try:
            slot = super().get_object()
        except Http404:
            raise Http404("Slot not found") from None
        user = self.request.user
        if not (user == slot.created_by or user.is_staff):
            logger.warning(
                f"Unauthorized delete attempt by user {user.get_full_name} on slot {slot.slot_date}"
            )
            raise PermissionDenied("You do not have permission to delete this slot.")
        return slot

    def delete(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        super().delete(request, *args, **kwargs)
        return Response(status=status.HTTP_204_NO_CONTENT)




# To add total_price to model:
class SlotCreateAPIView(generics.CreateAPIView):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    renderer_classes = [GenericJSONRenderer]
    object_label = "slot"

    def perform_create(self, serializer: SlotSerializer) -> None:
        try:
            slot = serializer.save(created_by=self.request.user)
            send_slot_confirmation_email(slot)
        except Exception as e:
            # Log the error for debugging
            logger.error(f"Error during slot creation: {e}")
            # Optionally, raise an APIException to return an error response to the client
            raise APIException("An error occurred while creating the slot.")



