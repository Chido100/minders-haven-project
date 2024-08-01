# Generated by Django 4.2.11 on 2024-07-31 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("slots", "0002_slot_in_review_date_slot_is_completed_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="slot",
            name="in_review_date",
        ),
        migrations.RemoveField(
            model_name="slot",
            name="is_completed",
        ),
        migrations.AlterField(
            model_name="slot",
            name="status",
            field=models.CharField(
                choices=[
                    ("created", "Created"),
                    ("completed", "Completed"),
                    ("in_review", "In Review"),
                ],
                default="created",
                max_length=20,
                verbose_name="Status",
            ),
        ),
    ]