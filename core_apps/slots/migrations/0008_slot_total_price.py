# Generated by Django 4.2.11 on 2024-08-19 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("slots", "0007_remove_slot_total_price"),
    ]

    operations = [
        migrations.AddField(
            model_name="slot",
            name="total_price",
            field=models.FloatField(default="0.00", verbose_name="Total Price"),
        ),
    ]
