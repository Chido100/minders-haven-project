from autoslug import AutoSlugField
from cloudinary.models import CloudinaryField
from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _ 
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField

from core_apps.common.models import TimeStampedModel

User = get_user_model()



def get_user_username(instance: "Profile") -> str:
    return instance.user.username



class Profile(TimeStampedModel):
    class Gender(models.TextChoices):
        FEMALE = ("female", _("Female"))
        MALE = ("male", _("Male"))
        OTHER = ("other", _("Other"))

    class Occupation(models.TextChoices):
        PARENT = ("parent", _("Parent"))
        MINDER = ("minder", _("Minder"))


    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    avatar = CloudinaryField(verbose_name=_("Avatar"), blank=True, null=True)
    gender = models.CharField(choices=Gender.choices, default=Gender.OTHER, max_length=10, verbose_name=_("Gender"))
    bio = models.TextField(verbose_name=_("Bio"), blank=True, null=True)
    occupation = models.CharField(choices=Occupation.choices, default=Occupation.PARENT, max_length=20, verbose_name=_("Occupation"))
    phone_number = PhoneNumberField(verbose_name=_("Phone Number"), max_length=30, default="+447000000000")
    city = models.CharField(verbose_name=_("City"), max_length=100, default="London")
    slug = AutoSlugField(populate_from=get_user_username, unique=True)

    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    



