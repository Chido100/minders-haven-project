# Generated by Django 4.2.11 on 2024-08-14 13:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("slots", "0004_slot_payment_intent_id_slot_payment_status"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="slot",
            name="payment_intent_id",
        ),
        migrations.RemoveField(
            model_name="slot",
            name="payment_status",
        ),
    ]