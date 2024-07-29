import logging

from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from rest_framework import serializers

from core_apps.common.models import ContentView
from .emails import send_completed_email
from .models import Slot


logger = logging.getLogger(__name__)


class SlotSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source="created_by.get_full_name")
    assigned_to = serializers.ReadOnlyField(source="assigned_to.get_full_name")
    view_count = serializers.SerializerMethodField()

    class Meta:
        model = Slot
        fields = [
            "id",
            "created_by",
            "assigned_to",
            "slot_date",
            "slot_time",
            "location",
            "additional_info",
            "status",
            "view_count",
        ]

    def get_view_count(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return ContentView.objects.filter(
            content_type=content_type, object_id=obj.pkid
        ).count()


class SlotStatusUpdateSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source="created_by.get_full_name")
    completed_by = serializers.ReadOnlyField(source="assigned_to.get_full_name")

    class Meta:
        model = Slot
        fields = [
            "slot_date",
            "slot_time",
            "created_by",
            "status",
            "completed_by",
            "completed_on",
        ]

    def update(self, instance: Slot, validated_data: dict) -> Slot:
        if (
            validated_data.get("status") == Slot.SlotStatus.COMPLETED
            and instance.status != Slot.SlotStatus.COMPLETED
        ):
            instance.completed_on = timezone.now().date()
            instance.save()
            send_completed_email(instance)
        return super().update(instance, validated_data)