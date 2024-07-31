import logging

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from config.settings.local import SITE_NAME, DEFAULT_FROM_EMAIL

from core_apps.profiles.models import Profile

from .models import Slot



logger = logging.getLogger(__name__)


def send_broadcast_email(slot: Slot) -> None:
    try:
        subject = "New Slot Request"
        context = {"slot": slot, "site_name": SITE_NAME}
        html_email = render_to_string("emails/slot_broadcast_email.html", context)
        text_email = strip_tags(html_email)
        from_email = DEFAULT_FROM_EMAIL
        recipients = [profile.user.email for profile in Profile.objects.filter(occupation=Profile.Occupation.MINDER)]
        email = EmailMultiAlternatives(subject, text_email, from_email, recipients)

        email.attach_alternative(html_email, "text/html")
        email.send()
    except Exception as e:
        logger.error(
            f"Failed to send confirmation email for slot '{slot.slot_date}':{e}",
            exc_info=True,
        )

def send_slot_confirmation_email(slot: Slot) -> None:
    try:
        # Send broadcast email to all Minders
        send_broadcast_email(slot)

        # Send confirmation email to the Slot creator
        subject = "Slot Request Confirmation"
        context = {"slot": slot, "site_name": SITE_NAME}
        html_email = render_to_string("emails/slot_confirmation.html", context)
        text_email = strip_tags(html_email)
        from_email = DEFAULT_FROM_EMAIL
        to = [slot.created_by.email]
        email = EmailMultiAlternatives(subject, text_email, from_email, to)

        email.attach_alternative(html_email, "text/html")
        email.send()
    except Exception as e:
        logger.error(
            f"Failed to send confirmation email for slot '{slot.slot_date}':{e}",
            exc_info=True,
        )


def send_slot_completed_email(slot: Slot) -> None:
    try:
        subject = "Slot Completed"
        context = {"slot": slot, "site_name": SITE_NAME}
        html_email = render_to_string(
            "emails/slot_completed_notification.html", context
        )
        text_email = strip_tags(html_email)
        from_email = DEFAULT_FROM_EMAIL
        to = [slot.created_by.email]
        email = EmailMultiAlternatives(subject, text_email, from_email, to)

        email.attach_alternative(html_email, "text/html")
        email.send()
    except Exception as e:
        logger.error(
            f"Failed to send completion email for slot '{slot.slot_date}':{e}",
            exc_info=True,
        )


def send_completed_email(slot: Slot) -> None:
    try:
        subject = f"Slot Completed: {slot.slot_date}"
        from_email = DEFAULT_FROM_EMAIL
        recipient_list = [slot.created_by.email]
        context = {"slot": slot, "site_name": SITE_NAME}
        html_email = render_to_string(
            "emails/slot_completed_notification.html", context
        )
        text_email = strip_tags(html_email)
        email = EmailMultiAlternatives(subject, text_email, from_email, recipient_list)

        email.attach_alternative(html_email, "text/html")
        email.send()
    except Exception as e:
        logger.error(
            f"Failed to send completion email for slot '{slot.slot_date}':{e}",
            exc_info=True,
        )
