from rest_framework import serializers
from .models import Conversation, ConversationMessage
from django.contrib.auth import get_user_model


User = get_user_model()


class ConversationListSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ('id', 'users', 'modified_at',)



