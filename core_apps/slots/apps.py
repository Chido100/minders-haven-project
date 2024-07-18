from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _ 


class SlotsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.slots"
    verbose_name = _("Slots")
