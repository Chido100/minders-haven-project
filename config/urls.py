from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions


schema_view = get_schema_view(
    openapi.Info(
        title="Minders Haven API",
        default_version="v1",
        description="A system API to connect parents and childminders",
        contact=openapi.Contact(email="dozie_chido@outlook.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path(
        "redoc/",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),
    path(settings.ADMIN_URL, admin.site.urls),
    path("api/v1/auth/", include("djoser.urls")),
    path("api/v1/auth/", include("core_apps.users.urls")),
    path("api/v1/profiles/", include("core_apps.profiles.urls")),
    path("api/v1/ratings/", include("core_apps.ratings.urls")),
    path("api/v1/posts/", include("core_apps.posts.urls")),
    path("api/v1/slots/", include("core_apps.slots.urls")),
    path("api/v1/chat/", include("core_apps.chat.urls")),
]

admin.site.site_header = "Minders Haven Admin"
admin.site.site_title = "Minders Haven Admin Portal"
admin.site.index_title = "Welcome to Minders Haven Admin Portal"
