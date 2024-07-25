from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer, UserSerializer
from django_countries.serializer_fields import CountryField
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers


User = get_user_model()


class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ["id", "username", "first_name", "last_name", "password"]


class CustomUserSerializer(UserSerializer):
    full_name = serializers.CharField(source="get_full_name")
    gender = serializers.CharField(source="profile.gender")
    slug = serializers.CharField(source="profile.slug")
    occupation = serializers.CharField(source="profile.occupation")
    phone_number = PhoneNumberField(source="profile.phone_number")
    avatar = serializers.CharField(source="profile.avatar.url")

    class Meta(UserSerializer.Meta):
        model = User
        fields = [
            "id", "email", "first_name", "last_name", "username", "slug", "full_name",
            "gender", "occupation", "phone_number", "avatar", "date_joined",
        ]
        read_only_fields=["id", "email", "date_joined"]


        