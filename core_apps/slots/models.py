import logging

from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.db import models
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils.translation import gettext_lazy as _

from config.settings.local import SITE_NAME, DEFAULT_FROM_EMAIL
from core_apps.common.models import TimeStampedModel


User = get_user_model()

logger = logging.getLogger(__name__)


class Slot(TimeStampedModel):
    class SlotStatus(models.TextChoices):
        CREATED = ("created", _("Created"))
        COMPLETED = ("completed", _("Completed"))
        IN_REVIEW = ("in_review", _("In Review"))

    class SlotLocation(models.TextChoices):
        PARENT_LOCATION = ("parent_location", _("Parent Location"))
        MINDER_LOCATION = ("minder_location", _("Minder Location"))


    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="created_by_slots",
        verbose_name=_("Created by"),
    )
    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_to_slots",
        verbose_name=_("Assigned to"),
    )
    slot_date = models.DateField()
    slot_time = models.TimeField()
    duration = models.IntegerField()
    number_of_kids = models.IntegerField()
    kids_age = models.CharField(max_length=20)
    location = models.CharField(
        max_length=30,
        choices=SlotLocation.choices,
        default=SlotLocation.MINDER_LOCATION,
        verbose_name=_("Location"),
    )
    additional_info = models.TextField(verbose_name=_("Additional Information"))
    status = models.CharField(
        max_length=20,
        choices=SlotStatus.choices,
        default=SlotStatus.CREATED,
        verbose_name=_("Status"),
    )
    
    completed_on = models.DateField(verbose_name=_("Completed On"), null=True, blank=True)

    def __str__(self) -> str:
        return str(self.slot_date)


    def save(self, *args, **kwargs) -> None:
        is_existing_instance = self.pk is not None
        old_assigned_to = None

        if is_existing_instance:
            old_slot = Slot.objects.get(pk=self.pk)
            old_assigned_to = old_slot.assigned_to
        super().save(*args, **kwargs)


        if (
            is_existing_instance
            and self.assigned_to != old_assigned_to
            and self.assigned_to is not None
        ):
            self.notify_assigned_user()

    def notify_assigned_user(self) -> None:
        try:
            subject = f"New Slot Assigned: {self.title}"
            from_email = DEFAULT_FROM_EMAIL
            recipient_list = [self.assigned_to.email]

            context = {"slot": self, "site_name": SITE_NAME}

            html_email = render_to_string(
                "emails/issue_assignment_notification.html", context
            )

            text_email = strip_tags(html_email)

            email = EmailMultiAlternatives(
                subject, text_email, from_email, recipient_list
            )
            email.attach_alternative(html_email, "text/html")
            email.send()
        except Exception as e:
            logger.error(
                f"Failed to send slot assignment email for slot '{self.slot_date}':{e}"
            )
