# Generated by Django 4.0.5 on 2022-06-26 10:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_order_taxprice'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shippingaddress',
            old_name='phone_no',
            new_name='phone',
        ),
    ]
