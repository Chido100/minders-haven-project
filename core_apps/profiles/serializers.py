from django_countries.serializer_fields import CountryField
from rest_framework import serializers
from core_apps.apartments.serializers import ApartmentSerializer

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.ReadOnlyField(source="user.first_name")
    last_name = serializers.ReadOnlyField(source="user.last_name")
    username = serializers.ReadOnlyField(source="user.username")
    full_name = serializers.ReadOnlyField(source="user.get_full_name")
    city = serializers.ReadOnlyField(source="user.city")
    avatar = serializers.SerializerMethodField()
    date_joined = serializers.DateTimeField(source="user.date_joined", read_only=True)

    class Meta:
        model = Profile
        fields = [
            "id",
            "slug",
            "first_name",
            "last_name",
            "username",
            "full_name",
            "gender",
            "city",
            "bio",
            "occupation",
            "date_joined",
            "avatar",
        ]

    def get_avatar(self, obj: Profile) -> str | None:
        try:
            return obj.avatar.url
        except AttributeError:
            return None



class UpdateProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    username = serializers.CharField(source="user.username")
    country = serializers.CharField(source="user.city")

    class Meta:
        model = Profile
        fields = [
            "first_name",
            "last_name",
            "username",
            "gender",
            "city",
            "bio",
            "phone_number",
        ]


class AvatarUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["avatar"]